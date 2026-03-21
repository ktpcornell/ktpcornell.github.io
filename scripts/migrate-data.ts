/**
 * Migration script: seeds Firestore with member + FAQ data and uploads
 * headshot images to Firebase Storage.
 *
 * Prerequisites:
 *   gcloud auth application-default login   (only needed once)
 *
 * Run:
 *   npm run migrate
 *
 * After the script completes you can delete public/images/headshots/
 */

import { readFileSync } from 'fs'
import { join, extname, dirname } from 'path'
import { fileURLToPath } from 'url'
import admin from 'firebase-admin'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

// ---------------------------------------------------------------------------
// Init — uses gcloud application-default credentials (no service account JSON)
// ---------------------------------------------------------------------------

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  storageBucket: 'ktpcornell-app.firebasestorage.app',
})

const db = admin.firestore()
const bucket = admin.storage().bucket()

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function slugify(str: string) {
  return str.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9._-]/g, '')
}

async function uploadImage(localPath: string, storagePath: string): Promise<string> {
  const [file] = await bucket.upload(localPath, {
    destination: storagePath,
    metadata: { cacheControl: 'public, max-age=31536000' },
  })
  await file.makePublic()
  return `https://storage.googleapis.com/${bucket.name}/${encodeURIComponent(storagePath).replace(/%2F/g, '/')}`
}

function findHeadshotFile(
  dir: string,
  name: string,
): string | null {
  try {
    const files = readdirSync(dir)
    // Exact match first (case-insensitive)
    for (const f of files) {
      if (f.toLowerCase().startsWith(name.toLowerCase().split(' ')[0])) {
        const fullPath = join(dir, f)
        if (statSync(fullPath).isFile()) return fullPath
      }
    }
    // Fuzzy: any file whose name contains the member's first name
    for (const f of files) {
      const fullPath = join(dir, f)
      if (statSync(fullPath).isFile()) return fullPath
    }
  } catch {
    // dir doesn't exist
  }
  return null
}

// ---------------------------------------------------------------------------
// Member data (copied verbatim from the original members.json)
// ---------------------------------------------------------------------------

const CLASS_DIR_MAP: Record<string, string> = {
  eboard: 'AlphaClass',
  alpha: 'AlphaClass',
  beta: 'BetaClass',
  founders: 'Founders',
  gamma: 'GammaClass',
}

interface RawMember {
  name: string
  major: string
  photo: string
  hometown: string
  linkedin?: string
  email?: string
  description?: string
  role?: string
}

interface RawMembersData {
  eboard: RawMember[]
  alpha: RawMember[]
  beta: RawMember[]
  founders: RawMember[]
  gamma?: RawMember[]
  [key: string]: RawMember[] | undefined
}

async function migrateMembers() {
  console.log('\n=== Migrating members ===')

  const raw: RawMembersData = JSON.parse(
    readFileSync(join(root, 'scripts', 'seed', 'members.json'), 'utf-8'),
  )

  // Clear existing members
  const existing = await db.collection('members').listDocuments()
  if (existing.length) {
    const batch = db.batch()
    existing.forEach((d) => batch.delete(d))
    await batch.commit()
    console.log(`Deleted ${existing.length} existing member docs`)
  }

  const classes = Object.keys(raw) as (keyof RawMembersData)[]
  let total = 0

  for (const cls of classes) {
    const members = raw[cls]
    if (!members || members.length === 0) continue

    for (let i = 0; i < members.length; i++) {
      const m = members[i]
      let photoUrl = ''

      // Try to upload headshot
      const headshotDir = join(root, 'public', 'images', 'headshots', CLASS_DIR_MAP[cls] ?? '')
      const ext = extname(m.photo) || '.jpeg'
      const storagePath = `headshots/${cls}/${slugify(m.name)}${ext}`

      // Find the file by matching the existing photo filename
      const photoFilename = m.photo.split('/').pop() ?? ''
      const localPath = join(headshotDir, photoFilename)

      try {
        photoUrl = await uploadImage(localPath, storagePath)
        console.log(`  ✓ Uploaded ${m.name} headshot`)
      } catch {
        // File not found — use a placeholder or leave empty
        console.warn(`  ⚠ Could not upload headshot for ${m.name} (${localPath})`)
        photoUrl = ''
      }

      await db.collection('members').add({
        name: m.name,
        major: m.major,
        photo: photoUrl,
        hometown: m.hometown,
        linkedin: m.linkedin ?? '',
        email: m.email ?? '',
        description: m.description ?? '',
        role: m.role ?? '',
        ktpClass: cls,
        order: i,
      })

      total++
    }
  }

  console.log(`Seeded ${total} members`)
}

// ---------------------------------------------------------------------------
// FAQ data
// ---------------------------------------------------------------------------

interface FaqItem {
  question: string
  answer: string
}

async function migrateFaq() {
  console.log('\n=== Migrating FAQ ===')

  const raw: { faqs: FaqItem[] } = JSON.parse(
    readFileSync(join(root, 'scripts', 'seed', 'faq.json'), 'utf-8'),
  )

  // Clear existing
  const existing = await db.collection('faq').listDocuments()
  if (existing.length) {
    const batch = db.batch()
    existing.forEach((d) => batch.delete(d))
    await batch.commit()
    console.log(`Deleted ${existing.length} existing faq docs`)
  }

  for (let i = 0; i < raw.faqs.length; i++) {
    await db.collection('faq').add({ ...raw.faqs[i], order: i })
  }

  console.log(`Seeded ${raw.faqs.length} FAQ items`)
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

async function main() {
  try {
    await migrateMembers()
    await migrateFaq()
    console.log('\n✅ Migration complete.')
    console.log('You can now delete public/images/headshots/ from the repo.')
  } catch (err) {
    console.error('\n❌ Migration failed:', err)
    process.exit(1)
  }
}

main()
