/**
 * The payload KTP Manager's members endpoint returns, read at build time by
 * `scripts/fetch-members.mjs` (spec `2026-11-07-live-profiles-design.md`, D15).
 *
 * SOURCE OF TRUTH: KTP Manager's `src/lib/public-members.ts`. These are copies; change that file
 * first, then mirror it here and in `scripts/lib/members-build.mjs` (the build's validator).
 */

export type PublicMember = {
  name: string
  /** e.g. "Computer Science '28" */
  major: string
  hometown: string
  linkedin: string
  email: string
  description: string
  /** Eboard only: "President" or "VP Finance / VP Committees". "" elsewhere. */
  role: string
  /** `url` is a short-lived signed link; `file` is a unique, stable file name, e.g. "ck123-1730999.jpg". */
  photo: { url: string; file: string } | null
}

export type MembersPayload = {
  version: string
  generatedAt: string
  /** Lowercase section key (alpha, beta, gamma, founders, …) -> that section's cards. */
  classes: Record<string, PublicMember[]>
  /** Unordered. The site orders it with `src/data/eboard.ts`. */
  eboard: PublicMember[]
  /** email -> hash of that card. Published in `/members-version.json`. */
  cards: Record<string, string>
}
