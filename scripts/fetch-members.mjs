#!/usr/bin/env node
/**
 * Write the member data the site is built from (spec 2026-11-07-live-profiles-design.md, D12-D15).
 *
 * Runs before `media:images` in `npm run dev` and `npm run build`. Writes:
 *   - src/data/members.generated.json   what `getMembers()` imports (gitignored)
 *   - public/members-version.json       { version, cards }, published at the site root; KTP Manager
 *                                       reads it to show "Live on ktpcornell.com" (gitignored)
 *   - images/headshots/db/<file>        downloaded headshots (gitignored, cached in CI)
 *
 * SOURCES
 *   MEMBERS_ENDPOINT set     GET it with `Authorization: Bearer $MEMBERS_TOKEN` (KTP Manager's members
 *                            route). The build FAILS (exit 1) on a network error, a non-200, a bad
 *                            payload, or fewer than MIN_MEMBERS listed cards (default 40). Nothing is
 *                            deployed and the last good site stays up (D12).
 *   MEMBERS_SOURCE=file      copy data/members.json (the PR check; local dev). Wins over the endpoint.
 *   neither, CI set          fail: a deploy must never quietly publish the frozen file.
 *   neither, locally         copy data/members.json with a warning.
 *
 * A headshot that fails to download only warns: that card gets photo "" and shows the placeholder.
 * The token is never printed.
 */

import { mkdir, writeFile, readFile, readdir, rename, rm, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  DB_HEADSHOT_DIR,
  FILE_MODE_VERSION,
  checkFloor,
  chooseSource,
  countListedCards,
  orphanDerived,
  parseMinMembers,
  photosToDownload,
  toMembersData,
  validatePayload,
  versionFile,
} from './lib/members-build.mjs'

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..')
const MEMBERS_JSON = join(REPO, 'data', 'members.json')
const GENERATED = join(REPO, 'src', 'data', 'members.generated.json')
const VERSION_FILE = join(REPO, 'public', 'members-version.json')
const HEADSHOTS = join(REPO, ...DB_HEADSHOT_DIR.split('/'))
const DERIVED_HEADSHOTS = join(REPO, 'images-derived', 'headshots', 'db')

const TIMEOUT_MS = 30_000
const PHOTO_CONCURRENCY = 4

const log = (msg) => console.log(`fetch-members: ${msg}`)
const warn = (msg) => console.warn(`fetch-members: WARNING ${msg}`)

class BuildError extends Error {}

async function writeJson(file, value) {
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, `${JSON.stringify(value, null, 2)}\n`)
}

async function fromFile(reason) {
  const banner = '!'.repeat(78)
  console.warn(
    `\n${banner}\nfetch-members: ${reason}\n` +
      `fetch-members: building the Members page from data/members.json, NOT from KTP Manager.\n` +
      `fetch-members: Fine for local dev and PR checks. A deploy must set MEMBERS_ENDPOINT.\n${banner}\n`,
  )
  const data = JSON.parse(await readFile(MEMBERS_JSON, 'utf8'))
  await writeJson(GENERATED, data)
  await writeJson(VERSION_FILE, FILE_MODE_VERSION)
  log(`wrote src/data/members.generated.json from data/members.json, version "file"`)
}

async function fetchPayload(endpoint, token) {
  let res
  try {
    res = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
      // Never let a redirect carry the bearer somewhere else.
      redirect: 'manual',
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
  } catch (err) {
    const why = err?.name === 'TimeoutError' ? `no answer within ${TIMEOUT_MS / 1000}s` : err?.cause?.message ?? err?.message
    throw new BuildError(`could not reach the members endpoint (${why}).`)
  }
  if (res.status >= 300 && res.status < 400) {
    throw new BuildError(
      `the members endpoint redirected (HTTP ${res.status} to ${res.headers.get('location') ?? '?'}). ` +
        `Set MEMBERS_ENDPOINT to the final URL.`,
    )
  }
  if (res.status !== 200) {
    const hint = res.status === 401 || res.status === 403 ? ' Check that MEMBERS_TOKEN matches KTP Manager.' : ''
    throw new BuildError(`the members endpoint answered HTTP ${res.status}.${hint}`)
  }
  let text
  try {
    text = await res.text()
  } catch (err) {
    throw new BuildError(`the members endpoint's response was cut off (${err?.message}).`)
  }
  try {
    return JSON.parse(text)
  } catch {
    throw new BuildError(`the members endpoint did not return JSON (starts: ${JSON.stringify(text.slice(0, 80))}).`)
  }
}

async function downloadPhoto(file, url) {
  const out = join(HEADSHOTS, file)
  if (existsSync(out) && (await stat(out)).size > 0) return 'cached'
  const part = `${out}.part`
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const bytes = Buffer.from(await res.arrayBuffer())
    if (bytes.length === 0) throw new Error('empty file')
    await writeFile(part, bytes)
    await rename(part, out)
    return 'downloaded'
  } catch (err) {
    await rm(part, { force: true })
    throw err
  }
}

/** Remove headshots (and their WebP copies) nobody references any more, so they leave the site. */
async function prune(keptFiles) {
  const kept = new Set(keptFiles)
  let removed = 0
  for (const name of existsSync(HEADSHOTS) ? await readdir(HEADSHOTS) : []) {
    if (kept.has(name)) continue
    await rm(join(HEADSHOTS, name), { force: true, recursive: true })
    removed++
  }
  if (existsSync(DERIVED_HEADSHOTS)) {
    for (const name of orphanDerived(await readdir(DERIVED_HEADSHOTS), keptFiles)) {
      await rm(join(DERIVED_HEADSHOTS, name), { force: true })
      removed++
    }
  }
  if (removed) log(`removed ${removed} unreferenced headshot file${removed === 1 ? '' : 's'}`)
}

async function fromEndpoint(env) {
  const started = Date.now()
  let min
  try {
    min = parseMinMembers(env.MIN_MEMBERS)
  } catch (err) {
    throw new BuildError(err.message)
  }
  const endpoint = env.MEMBERS_ENDPOINT.trim()
  let host = endpoint
  try {
    host = new URL(endpoint).host
  } catch {
    throw new BuildError(`MEMBERS_ENDPOINT is not a URL.`)
  }
  log(`fetching members from ${host}`)

  const payload = await fetchPayload(endpoint, env.MEMBERS_TOKEN.trim())
  const errors = validatePayload(payload)
  if (errors.length) {
    const shown = errors.slice(0, 15).map((e) => `  - ${e}`).join('\n')
    const more = errors.length > 15 ? `\n  … and ${errors.length - 15} more` : ''
    throw new BuildError(`the members payload is not in the expected shape:\n${shown}${more}`)
  }
  const floor = checkFloor(payload, min)
  if (floor) throw new BuildError(floor)

  // Headshots: skip ones already on disk (CI restores this folder from cache).
  await mkdir(HEADSHOTS, { recursive: true })
  const photos = [...photosToDownload(payload)]
  const failed = new Set()
  let downloaded = 0
  let cached = 0
  let i = 0
  await Promise.all(
    Array.from({ length: Math.min(PHOTO_CONCURRENCY, photos.length) }, async () => {
      while (i < photos.length) {
        const [file, url] = photos[i++]
        try {
          if ((await downloadPhoto(file, url)) === 'cached') cached++
          else downloaded++
        } catch (err) {
          failed.add(file)
          warn(`headshot ${file} did not download (${err?.message ?? err}); that card shows the placeholder`)
        }
      }
    }),
  )
  await prune(photos.map(([file]) => file).filter((f) => !failed.has(f)))

  await writeJson(GENERATED, toMembersData(payload, failed))
  await writeJson(VERSION_FILE, versionFile(payload))
  const secs = ((Date.now() - started) / 1000).toFixed(1)
  log(
    `${countListedCards(payload)} listed cards (floor ${min}), ${payload.eboard.length} eboard, ` +
      `${Object.keys(payload.classes).length} sections · headshots: ${downloaded} downloaded, ${cached} cached, ` +
      `${failed.size} failed · version ${payload.version} · ${secs}s`,
  )
}

async function main() {
  const source = chooseSource(process.env)
  if (source.mode === 'error') throw new BuildError(source.message)
  if (source.mode === 'file') {
    await fromFile(
      process.env.MEMBERS_SOURCE === 'file' ? 'MEMBERS_SOURCE=file.' : 'MEMBERS_ENDPOINT is not set.',
    )
    return
  }
  await fromEndpoint(process.env)
}

main().catch((err) => {
  if (err instanceof BuildError) console.error(`\nfetch-members: FAILED: ${err.message}\n`)
  else console.error('\nfetch-members: FAILED:', err)
  process.exit(1)
})
