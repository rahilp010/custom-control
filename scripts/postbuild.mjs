import fs from 'node:fs'
import path from 'node:path'

const DIST = 'dist'
const TARGET = path.join(DIST, 'custom-control.css')

// Vite emits lib-mode CSS as style.css; expose it under a stable, documented name.
const candidates = ['custom-control.css', 'style.css']
const source = candidates.map((file) => path.join(DIST, file)).find((file) => fs.existsSync(file))

if (!source) {
    console.error('postbuild: no stylesheet found in dist/')
    process.exit(1)
}

if (source !== TARGET) fs.renameSync(source, TARGET)

// Copy TypeScript declarations
const dtsSource = path.join('src', 'index.d.ts')
const dtsTarget = path.join(DIST, 'index.d.ts')
if (fs.existsSync(dtsSource)) {
    fs.copyFileSync(dtsSource, dtsTarget)
    console.log(`postbuild: copied ${dtsTarget}`)
}

const size = (fs.statSync(TARGET).size / 1024).toFixed(2)
console.log(`postbuild: ${path.basename(TARGET)} (${size} kB)`)
