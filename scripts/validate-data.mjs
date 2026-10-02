import fs from 'node:fs';import path from 'node:path';
const base=path.resolve('src/data/t01');const j=n=>JSON.parse(fs.readFileSync(path.join(base,n),'utf8'));
const course=j('course.json'),routes=j('routes.json'),work=j('workshops.json'),coach=j('coaching.json'),gloss=j('glossary.json'),tools=j('tools.json'),scenes=j('scenes.json');
const lessons=course.stages.flatMap(s=>s.courses), ids=new Set(lessons.map(x=>x.code));const ws=new Set(work.machines.map(x=>x.code)),ps=new Set(coach.machines.map(x=>x.code));
const assert=(c,m)=>{if(!c)throw new Error(m)};
assert(course.version==='2.8','course version must be 2.8');
assert(lessons.length===28,'C01-C28数量错误');assert(work.machines.length===11,'W01-W11数量错误');assert(coach.machines.length===5,'P01-P05数量错误');assert(routes.stages.length===9,'阶段数量错误');assert(tools.tools.length===15,'K01-K15数量错误');assert(scenes.scenes.length===39,'课程/工作坊场景数量错误');
for(const s of routes.stages){for(const id of s.course_ids)assert(ids.has(id),`缺课程 ${id}`);for(const id of s.workshop_ids)assert(ws.has(id),`缺工作坊 ${id}`);for(const id of s.coaching_ids)assert(ps.has(id),`缺陪跑 ${id}`)}
for(const m of work.machines){const state=new Set(m.states.map(s=>s.key));assert(state.has(m.initial_state),`${m.code} initial state missing`);for(const t of m.transitions){assert(state.has(t.from)&&state.has(t.to),`${m.code} transition invalid ${t.id}`)}}
for(const m of coach.machines){const state=new Set(m.states.map(s=>s.key));assert(state.has(m.initial_state),`${m.code} initial state missing`);for(const t of m.transitions){for(const f of t.from)if(f!=='*')assert(state.has(f),`${m.code} transition from invalid`);assert(state.has(t.to),`${m.code} transition to invalid`)}}
for(const k of ['TikTok Shop','Seller Center','Creator','Affiliate','GMV Max','PDP','SKU','CTR','CTOR','LIVE'])assert(gloss.terms[k],`glossary missing ${k}`);
for(const t of tools.tools){assert(/^T01-K\d{2}$/.test(t.code),`工具编号错误 ${t.code}`);assert(t.fields.length>=7,`工具字段过少 ${t.code}`)}
const sceneOwners=new Set(scenes.scenes.map(s=>s.owner));for(const id of ids)assert(sceneOwners.has(id),`缺课程互动场景 ${id}`);
console.log(`PASS: ${lessons.length} courses / ${work.machines.length} workshops / ${coach.machines.length} coaching / ${tools.tools.length} tools / ${routes.stages.length} stages / ${scenes.scenes.length} scenes`);
