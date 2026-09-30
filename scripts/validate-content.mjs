import fs from 'node:fs'
const read=(p)=>fs.readFileSync(new URL(p,import.meta.url),'utf8')
const course=read('../src/data/courseContent.ts')
const registry=read('../src/data/lessonSpecs.ts')
const componentMap=read('../src/data/motherComponentMap.ts')
const moduleCount=(course.match(/\['m\d\d','M\d\d'/g)||[]).length
const lessonRows=[...course.matchAll(/\['(m\d\d)','[^']+','([^']+)'\]/g)]
const lessonCount=lessonRows.length
const codes=lessonRows.map((m,i)=>{const n=Number(m[1].slice(1));return `T01-M${String(n).padStart(2,'0')}-L${String(i%4+1).padStart(2,'0')}`})
const missingModules=[...Array(12)].map((_,i)=>`M${String(i+1).padStart(2,'0')}`).filter(x=>!course.includes(`'${x}'`))
const registryImports=[...registry.matchAll(/lessonSpecsM(\d\d)M(\d\d)/g)].map(x=>x[0])
const mappedCodes=[...componentMap.matchAll(/'T01-M\d\d-L\d\d'/g)].map(x=>x[0].slice(1,-1))
const duplicateCodes=codes.filter((x,i)=>codes.indexOf(x)!==i)
const missingComponentMaps=codes.filter(x=>!mappedCodes.includes(x))
const benchmarkTypes=['platform-universe','market-explorer','product-opportunity','video-analyzer','logistics-journey','decision-room']
const missingBenchmarks=benchmarkTypes.filter(x=>!course.includes(`'${x}'`))
const errors=[]
if(moduleCount!==12)errors.push(`expected 12 modules, got ${moduleCount}`)
if(lessonCount!==48)errors.push(`expected 48 lessons, got ${lessonCount}`)
if(missingModules.length)errors.push(`missing modules: ${missingModules.join(', ')}`)
if(duplicateCodes.length)errors.push(`duplicate lesson codes: ${[...new Set(duplicateCodes)].join(', ')}`)
if(registryImports.length<5||!registry.includes('lessonSpecsM11M12'))errors.push('formal lesson registry does not cover M01-M12')
if(missingComponentMaps.length)errors.push(`missing mother-component maps: ${missingComponentMaps.join(', ')}`)
if(missingBenchmarks.length)errors.push(`missing benchmark scenes: ${missingBenchmarks.join(', ')}`)
if(errors.length){console.error('Content validation FAILED\n- '+errors.join('\n- '));process.exit(1)}
console.log(`Content validation PASS · ${moduleCount} modules · ${lessonCount} lessons · 48 component maps · 6 benchmark scene types · formal registry M01-M12`)
