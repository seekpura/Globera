import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(process.cwd())
const file = path.join(root, 'src/data/courseContent.json')
const data = JSON.parse(fs.readFileSync(file, 'utf8'))
const errors = []

if (data.modules.length !== 12) errors.push(`modules expected 12, got ${data.modules.length}`)
if (data.lessons.length !== 48) errors.push(`lessons expected 48, got ${data.lessons.length}`)

const codes = new Set()
for (const lesson of data.lessons) {
  if (codes.has(lesson.code)) errors.push(`duplicate lesson code: ${lesson.code}`)
  codes.add(lesson.code)
  for (const key of ['title','goal','coreStatement','sceneType','tool','output','completion','boundary']) {
    if (!lesson[key] || String(lesson[key]).trim().length < 2) errors.push(`${lesson.code} missing ${key}`)
  }
  if (!Array.isArray(lesson.highlights) || lesson.highlights.length < 3) errors.push(`${lesson.code} needs >=3 highlights`)
  if (!Array.isArray(lesson.practice) || lesson.practice.length < 1) errors.push(`${lesson.code} needs practice`)
}

const benchmarks = ['platform-universe','market-explorer','product-opportunity','video-analyzer','logistics-journey','decision-room']
for (const type of benchmarks) if (!data.lessons.some((l) => l.sceneType === type)) errors.push(`missing benchmark scene ${type}`)

if (errors.length) {
  console.error('Content validation FAILED')
  for (const e of errors) console.error('-', e)
  process.exit(1)
}
console.log(`Content validation PASS · ${data.modules.length} modules · ${data.lessons.length} lessons · ${new Set(data.lessons.map(l => l.sceneType)).size} scene types`)
