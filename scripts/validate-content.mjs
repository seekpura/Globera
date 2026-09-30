import fs from 'node:fs'

const read=(p)=>fs.readFileSync(new URL(p,import.meta.url),'utf8')
const course=read('../src/data/courseContent.ts')
const registry=read('../src/data/lessonSpecs.ts')
const componentMap=read('../src/data/motherComponentMap.ts')
const router=read('../src/scenes/SceneRouter.tsx')
const shell=read('../src/course/CourseShell.tsx')
const lessonPage=read('../src/course/LessonPage.tsx')
const workflow=read('../.github/workflows/deploy-pages.yml')
const platformScene=read('../src/scenes/platform-universe/PlatformUniverseScene.tsx')
const marketScene=read('../src/scenes/market-explorer/MarketExplorerScene.tsx')
const productScene=read('../src/scenes/product-opportunity/ProductOpportunityScene.tsx')
const integratedScenes=[
 read('../src/scenes/integrated/M01M04Scene.tsx'),
 read('../src/scenes/integrated/M05M08Scene.tsx'),
 read('../src/scenes/integrated/M09M12Scene.tsx'),
]
const formalSpecs=[
 read('../src/data/lessonSpecsM01M02.ts'),
 read('../src/data/lessonSpecsM03M04.ts'),
 read('../src/data/lessonSpecsM05M06.ts'),
 read('../src/data/lessonSpecsM07M08.ts'),
 read('../src/data/lessonSpecsM09M10.ts'),
 read('../src/data/lessonSpecsM11M12.ts'),
].join('\n')

const moduleCount=(course.match(/\['m\d\d','M\d\d'/g)||[]).length
const lessonRows=[...course.matchAll(/\['(m\d\d)','[^']+','([^']+)'\]/g)]
const lessonCount=lessonRows.length
const codes=lessonRows.map((m,i)=>{const n=Number(m[1].slice(1));return `T01-M${String(n).padStart(2,'0')}-L${String(i%4+1).padStart(2,'0')}`})
const missingModules=[...Array(12)].map((_,i)=>`M${String(i+1).padStart(2,'0')}`).filter(x=>!course.includes(`'${x}'`))
const mappedCodes=[...componentMap.matchAll(/'T01-M\d\d-L\d\d'/g)].map(x=>x[0].slice(1,-1))
const formalCodes=[...new Set([...formalSpecs.matchAll(/T01-M\d\d-L\d\d/g)].map(x=>x[0]))]
const duplicateCodes=codes.filter((x,i)=>codes.indexOf(x)!==i)
const missingComponentMaps=codes.filter(x=>!mappedCodes.includes(x))
const missingFormalSpecs=codes.filter(x=>!formalCodes.includes(x))
const benchmarkTypes=['platform-universe','market-explorer','product-opportunity','video-analyzer','logistics-journey','decision-room']
const missingBenchmarks=benchmarkTypes.filter(x=>!course.includes(`'${x}'`))
const missingBenchmarkRoutes=benchmarkTypes.filter(x=>!router.includes(`case '${x}'`))
const errors=[]

if(moduleCount!==12)errors.push(`expected 12 modules, got ${moduleCount}`)
if(lessonCount!==48)errors.push(`expected 48 lessons, got ${lessonCount}`)
if(missingModules.length)errors.push(`missing modules: ${missingModules.join(', ')}`)
if(duplicateCodes.length)errors.push(`duplicate lesson codes: ${[...new Set(duplicateCodes)].join(', ')}`)
if(!registry.includes('lessonSpecsM11M12'))errors.push('formal lesson registry does not include M11-M12')
if(missingFormalSpecs.length)errors.push(`missing formal lesson specs: ${missingFormalSpecs.join(', ')}`)
if(missingComponentMaps.length)errors.push(`missing mother-component maps: ${missingComponentMaps.join(', ')}`)
if(missingBenchmarks.length)errors.push(`missing benchmark scene types: ${missingBenchmarks.join(', ')}`)
if(missingBenchmarkRoutes.length)errors.push(`missing benchmark routes: ${missingBenchmarkRoutes.join(', ')}`)

if(integratedScenes.some(x=>x.includes('mapped.join(')))errors.push('internal mother-component names are exposed in learner-facing integrated scenes')
if(integratedScenes.some(x=>x.includes('componentsForLesson(')))errors.push('integrated scenes still depend on learner-visible component-map rendering')
if(shell.includes('Offline-ready'))errors.push('course shell still claims unverified Offline-ready status')
if(course.includes("research:'approved',content:'approved',assets:'ready',frontend:'ready'"))errors.push('course buildStatus is hardcoded to fully approved/ready')
if((lessonPage.match(/PresenterController/g)||[]).length)errors.push('PresenterController must be mounted only by CourseShell')
if((shell.match(/<PresenterController/g)||[]).length!==1)errors.push('CourseShell must mount exactly one PresenterController')

for(const cmd of ['npm run validate','npm run typecheck','npm run build'])if(!workflow.includes(cmd))errors.push(`workflow missing: ${cmd}`)
if((workflow.match(/pull_request:/g)||[]).length!==1)errors.push('workflow must contain exactly one pull_request trigger')

if(platformScene.includes('scorePlatform'))errors.push('platform benchmark contains synthetic platform scoring')
if(!platformScene.includes('instructorStep'))errors.push('platform benchmark is not synchronized with Presenter Step')
if(!marketScene.includes('Research Sequence｜研究顺序'))errors.push('market benchmark missing progressive research sequence')
if(!marketScene.includes('instructorStep'))errors.push('market benchmark is not synchronized with Presenter Step')
if(!productScene.includes('Hard Gates｜硬风险闸门'))errors.push('product benchmark missing independent hard gates')
if(!productScene.includes('cases.map')||!productScene.includes('applyCase'))errors.push('product benchmark missing scenario switching')
if(!productScene.includes('instructorStep'))errors.push('product benchmark is not synchronized with Presenter Step')

if(errors.length){
 console.error('T01 validation FAILED\n- '+errors.join('\n- '))
 process.exit(1)
}
console.log(`T01 validation PASS · ${moduleCount} modules · ${lessonCount} lessons · ${formalCodes.length} formal spec codes · 48 component maps · 6 benchmark routes · presenter/CI contracts checked`)
