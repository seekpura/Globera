import fs from 'node:fs'
const src=fs.readFileSync(new URL('../src/data/courseContent.ts',import.meta.url),'utf8')
const lessonCount=(src.match(/\['m\d\d','/g)||[]).length
const moduleCount=(src.match(/\['m\d\d','M\d\d'/g)||[]).length
if(moduleCount!==12||lessonCount!==48){ console.error('Content validation FAILED', {moduleCount,lessonCount}); process.exit(1) }
console.log(`Content validation PASS · ${moduleCount} modules · ${lessonCount} lessons`)
