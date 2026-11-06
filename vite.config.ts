import path from 'path'
import fs from 'fs'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * `images/` (originals) and `images-derived/` (generated WebP copies) live at the REPO ROOT,
 * not in `public/`, because KTP Manager's profile sync writes headshots to
 * `images/headshots/<Class>Class/` on this repo. This plugin serves both folders in dev and
 * copies them into `dist/` on build, so their URLs are `/images/...` and `/images-derived/...`.
 */
const STATIC_DIRS = ['images', 'images-derived']

function rootStaticDirs(): Plugin {
  const root = __dirname
  return {
    name: 'ktp-root-static-dirs',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = decodeURIComponent((req.url ?? '').split('?')[0])
        const dir = STATIC_DIRS.find((d) => url.startsWith(`/${d}/`))
        if (!dir) return next()
        const base = path.join(root, dir)
        const file = path.normalize(path.join(root, url))
        if (!file.startsWith(base + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
          return next()
        }
        res.setHeader('Cache-Control', 'no-cache')
        fs.createReadStream(file).pipe(res)
      })
    },
    closeBundle() {
      for (const dir of STATIC_DIRS) {
        const from = path.join(root, dir)
        if (fs.existsSync(from)) fs.cpSync(from, path.join(root, 'dist', dir), { recursive: true })
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), rootStaticDirs()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
