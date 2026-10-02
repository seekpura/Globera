import fs from 'node:fs';import path from 'node:path';
const root=path.resolve('.');const read=p=>fs.readFileSync(path.join(root,p),'utf8');const j=p=>JSON.parse(read(p));const assert=(c,m)=>{if(!c)throw new Error(m)};
const pages=j('src/data/t01/pages.json'),components=j('src/data/t01/components.json'),scenes=j('src/data/t01/scenes.json');
const registry=new Set(components.learning.map(x=>x.name));
const expected={
'T01-C05':'SellerCenterSimulator','T01-C09':'ListingStudio','T01-C10':'ListingStudio','T01-C11':'ListingStudio','T01-C12':'ListingStudio',
'T01-C14':'VideoCommerceStudio','T01-C16':'VideoCommerceStudio','T01-C17':'VideoCommerceStudio','T01-C18':'CreatorWorkbench','T01-C19':'CreatorWorkbench','T01-C20':'CreatorWorkbench',
'T01-C22':'GmvAttributionLab','T01-C23':'LiveDirector','T01-C24':'OrderConsole','T01-C25':'OrderConsole','T01-C26':'ShopHealthConsole','T01-C27':'FunnelDiagnoser'};
for(const [owner,workbench] of Object.entries(expected)){const p=pages.recipes.find(x=>x.owner===owner);assert(p,`missing page recipe ${owner}`);assert(p.workbench===workbench,`${owner} workbench mismatch`);assert(registry.has(workbench),`component registry missing ${workbench}`);const s=scenes.scenes.find(x=>x.owner===owner);assert(s?.implementation_component===workbench,`${owner} scene component mismatch`)}
const rep=read('src/features/course/RepresentativeScene.tsx');for(const w of new Set(Object.values(expected)))assert(rep.includes(w),`RepresentativeScene missing ${w}`);
const bp=read('src/features/workshop/workshopBlueprints.ts');for(let i=1;i<=11;i++){const code=`T01-W${String(i).padStart(2,'0')}`;assert(bp.includes(`'${code}'`),`workshop blueprint missing ${code}`)}
const wr=read('src/features/workshop/WorkshopRunner.tsx');assert(wr.includes('WorkshopWorkbench'),`WorkshopRunner must render WorkshopWorkbench`);assert(wr.includes('finalGate'),`Workshop completion must use evidence/quality gate`);
const cc=read('src/features/coaching/CoachingCaseCenter.tsx');for(const token of ['证据收件箱','案件时间线','暂停 / 阻断','恢复案件'])assert(cc.includes(token),`CoachingCaseCenter missing ${token}`);
const state=read('src/state/AppState.tsx');for(const action of ['WORKSHOP_EVIDENCE_ADD','COACH_TRANSITION','COACH_PAUSE','COACH_RESUME'])assert(state.includes(action),`state action missing ${action}`);
const css=read('src/styles/globals.css');for(const cls of ['listingStudio','videoStudio','creatorDesk','gmvConsole','liveDirector','orderConsole','healthConsole','workbenchShell','caseCenter','evidenceLedger'])assert(css.includes('.'+cls),`CSS missing ${cls}`);
const app=read('src/app/AppShell.tsx');assert(app.includes('2.8'),'AppShell version mismatch');
console.log(`PASS: ${Object.keys(expected).length} high-fidelity course bindings / 11 workshop mission workbenches / coaching case center`);
const flow=read('src/domain/dataFlow.ts');for(let i=1;i<=11;i++){const code=`T01-W${String(i).padStart(2,'0')}`;assert(flow.includes(`'${code}'`),`data flow mapping missing ${code}`)}
for(const token of ['syncWorkshopToTools','getUpstreamSeed','buildResultSnapshot'])assert(flow.includes(token),`data flow helper missing ${token}`);
const tool=read('src/features/tools/ToolWorkspace.tsx');assert(tool.includes('state.toolWorkspace'),'tools must use shared AppState data');
console.log('PASS: operating data flow contracts / shared tool state / milestone snapshots');
