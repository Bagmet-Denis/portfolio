import sharp from 'sharp'
import { promises as fs } from 'node:fs'
import { dirname, join } from 'node:path'

const roots = ['src/assets', 'public']
const pngRe = /\.png$/i
const files = []

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      await walk(fullPath)
    } else if (pngRe.test(entry.name)) {
      files.push(fullPath)
    }
  }
}

function formatSize(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(1)}M`
}

for (const root of roots) {
  await walk(root)
}

let changed = 0
let skipped = 0
let beforeTotal = 0
let afterTotal = 0
let savedTotal = 0

for (const file of files) {
  const before = (await fs.stat(file)).size
  const tempFile = join(dirname(file), `.opt-${Date.now()}-${Math.random().toString(36).slice(2)}.png`)
  beforeTotal += before

  try {
    await sharp(file, { animated: false, limitInputPixels: false })
      .png({ compressionLevel: 9, adaptiveFiltering: true, effort: 10 })
      .toFile(tempFile)

    const after = (await fs.stat(tempFile)).size
    if (after > 0 && after < before) {
      await fs.rename(tempFile, file)
      changed += 1
      afterTotal += after
      savedTotal += before - after
    } else {
      await fs.unlink(tempFile)
      skipped += 1
      afterTotal += before
    }
  } catch (error) {
    try {
      await fs.unlink(tempFile)
    } catch {}
    skipped += 1
    afterTotal += before
    console.error(`Failed to optimize ${file}: ${error.message}`)
  }
}

console.log(
  JSON.stringify(
    {
      processed: files.length,
      changed,
      skipped,
      before: formatSize(beforeTotal),
      after: formatSize(afterTotal),
      saved: formatSize(savedTotal),
      savedPercent: `${((savedTotal / beforeTotal) * 100).toFixed(1)}%`,
    },
    null,
    2,
  ),
)
