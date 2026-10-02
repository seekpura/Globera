import type {CoachingMachine,StateLikeForDataFlow,ToolWorkspaceState,WorkshopWorkspace} from './types';

type ToolSync={toolCode:string;row:Record<string,string|number>};
const stamp=()=>new Date().toISOString();
const clean=(v:unknown)=>String(v??'').trim();

export const workshopToolMap:Record<string,(ws:WorkshopWorkspace)=>ToolSync[]>= {
  'T01-W01':ws=>[{toolCode:'T01-K01',row:{'目标市场/站点':ws.values.market||'','主体与店型':ws.values.entity||'','履约方式':ws.values.fulfillment||'','当前缺口':ws.notes||'','下一步':ws.values.actions||''}}],
  'T01-W02':ws=>[{toolCode:'T01-K02',row:{'检查域':'经营就绪','检查项':'核心经营任务入口与受限能力','当前状态':ws.values.restricted?'需核验':'已完成','后台路径/证据':[ws.values.productPath,ws.values.orderPath,ws.values.affiliatePath].filter(Boolean).join('；'),'问题':ws.values.restricted||'','下一步':ws.notes||''}}],
  'T01-W03':ws=>[
    {toolCode:'T01-K03',row:{'候选SKU':ws.values.sku||'','商品/Shop信号':ws.values.signals||'','证据链接/日期':ws.evidence.map(e=>e.source||e.title).filter(Boolean).join('；'),'结论':'主测'}},
    {toolCode:'T01-K04',row:{'SKU':ws.values.sku||'','单位贡献':ws.values.unitContribution||''}},
    {toolCode:'T01-K05',row:{'候选SKU':ws.values.sku||'','利润':ws.values.unitContribution||'','TikTok信号':ws.values.signals||'','决策':'主测','测试假设':ws.notes||'','停止条件':ws.values.stop||''}}
  ],
  'T01-W04':ws=>[{toolCode:'T01-K06',row:{'检查域':'工作坊汇总','检查项':ws.values.sku||'Listing','当前值/证据':ws.values.pdp||'','结果':ws.values.review||'','问题':ws.values.category==='通过'?'':ws.values.category||'','修正动作':ws.notes||''}}],
  'T01-W05':ws=>[
    {toolCode:'T01-K07',row:{'案例链接/编号':ws.evidence.map(e=>e.source||e.title).filter(Boolean).join('；'),'商品/人群':ws.values.sku||'','Hook':ws.values.hook||'','Proof':ws.values.proof||'','可迁移结构':ws.values.angle||''}},
    {toolCode:'T01-K08',row:{'SKU':ws.values.sku||'','内容角度':ws.values.angle||'','Hook':ws.values.hook||'','主体/Proof':ws.values.proof||'','镜头表':ws.values.asset||'','版本变量':ws.notes||''}}
  ],
  'T01-W06':ws=>[{toolCode:'T01-K09',row:{'视频编号':ws.values.video||'','核心变量':ws.values.variable||'','CTR':ws.values.ctr||'','CTOR':ws.values.ctor||'','诊断':`工作坊观察：CTR ${ws.values.ctr||'—'} / CTOR ${ws.values.ctor||'—'}`,'下一版动作':ws.values.next||''}}],
  'T01-W07':ws=>[{toolCode:'T01-K10',row:{'Creator':'工作坊批次汇总','商业信号':`候选 ${ws.values.pool||0} / A档 ${ws.values.priority||0}`,'优先级':'A','理由':ws.values.outreach||''}},{toolCode:'T01-K11',row:{'Creator':'工作坊批次汇总','合作方式':ws.values.collab||'','当前状态':ws.values.outreach||'','下一步':ws.notes||''}}],
  'T01-W08':ws=>[{toolCode:'T01-K12',row:{'Campaign Type':ws.values.type||'','对象':ws.values.object||'','模式/Target ROI':ws.values.mode||'','预算':ws.values.budget||'','判断':ws.values.decision||'','归因说明':'Total ROI 按总渠道归因理解','下一步':ws.notes||''}}],
  'T01-W09':ws=>[{toolCode:'T01-K13',row:{'LIVE/场次':'工作坊演练','商品顺序/Pin':ws.values.sku||'','Offer':ws.values.offer||'','CTA':ws.values.cta||'','问题/下一步':ws.values.breakpoint||ws.notes||''}}],
  'T01-W10':ws=>[{toolCode:'T01-K14',row:{'订单/情景':ws.values.case||'','Shipping Type':ws.values.shipping||'','处理动作':ws.values.action||'','指标影响':ws.values.health||'','结果/证据':ws.notes||''}}],
  'T01-W11':ws=>[{toolCode:'T01-K15',row:{'数据来源':'T01-W11','经营环节':'整体经营','判断':ws.values.bottleneck||'','优先级':'P0','下一步动作':ws.values.p0||'','复盘日期':ws.values.reviewDate||''}},{toolCode:'T01-K15',row:{'数据来源':'T01-W11','经营环节':'整体经营','判断':ws.values.bottleneck||'','优先级':'P1','下一步动作':ws.values.p1||'','复盘日期':ws.values.reviewDate||''}}],
};

function upsertToolRow(store:Record<string,ToolWorkspaceState>,sync:ToolSync,source:string,mode:'real'|'simulated'|'mixed'){
  const old=store[sync.toolCode]||{rows:[],mode,status:'草稿',updatedAt:'',sources:[]};
  const sourceKey=`${source}:${sync.toolCode}`;
  const row={...sync.row,_sourceKey:sourceKey,_source:source,_syncedAt:stamp()};
  const idx=old.rows.findIndex(r=>r._sourceKey===sourceKey);
  const rows=idx>=0?old.rows.map((r,i)=>i===idx?row:r):[...old.rows.filter(r=>Object.keys(r).length>0),row];
  const mergedMode=old.sources?.length&&old.mode!==mode?'mixed':mode;
  return {...store,[sync.toolCode]:{...old,rows,mode:mergedMode,status:old.status||'草稿',updatedAt:stamp(),sources:Array.from(new Set([...(old.sources||[]),source]))}};
}

export function syncWorkshopToTools(store:Record<string,ToolWorkspaceState>,code:string,ws:WorkshopWorkspace|undefined,mode:'real'|'simulated'|'mixed'){
  if(!ws||!workshopToolMap[code])return store;
  return workshopToolMap[code](ws).reduce((acc,s)=>upsertToolRow(acc,s,code,mode),store);
}

export const upstreamSeeds:Record<string,(s:StateLikeForDataFlow)=>Record<string,string>>={
  'T01-W04':s=>({sku:s.workshopWorkspace['T01-W03']?.values.sku||''}),
  'T01-W05':s=>({sku:s.workshopWorkspace['T01-W04']?.values.sku||s.workshopWorkspace['T01-W03']?.values.sku||''}),
  'T01-W06':s=>({video:s.workshopWorkspace['T01-W05']?.values.asset||''}),
  'T01-W08':s=>({object:s.workshopWorkspace['T01-W04']?.values.sku||s.workshopWorkspace['T01-W03']?.values.sku||''}),
  'T01-W09':s=>({sku:s.workshopWorkspace['T01-W04']?.values.sku||s.workshopWorkspace['T01-W03']?.values.sku||''}),
};
export function getUpstreamSeed(code:string,s:StateLikeForDataFlow){return upstreamSeeds[code]?.(s)||{}}

export function buildReviewSignals(s:StateLikeForDataFlow){
 const c=(code:string)=>s.coachingCases[code];
 const state=(code:string)=>s.coachingState[code]||'未发起';
 return [
  ['SKU',`${s.workshopWorkspace['T01-W03']?.values.sku||'—'} · 单位贡献 ${s.workshopWorkspace['T01-W03']?.values.unitContribution||'—'}`],
  ['内容',`CTR ${s.workshopWorkspace['T01-W06']?.values.ctr||'—'} · CTOR ${s.workshopWorkspace['T01-W06']?.values.ctor||'—'} · ${s.workshopWorkspace['T01-W06']?.values.next||''}`],
  ['达人',`候选 ${s.workshopWorkspace['T01-W07']?.values.pool||'—'} · A档 ${s.workshopWorkspace['T01-W07']?.values.priority||'—'} · ${s.workshopWorkspace['T01-W07']?.values.outreach||''}`],
  ['达人真实推进',`${state('T01-P04')} · ${(c('T01-P04')?.evidence?.length||0)}条证据`],
  ['广告',`${s.workshopWorkspace['T01-W08']?.values.type||'—'} · ${s.workshopWorkspace['T01-W08']?.values.decision||'—'}`],
  ['LIVE',`${s.workshopWorkspace['T01-W09']?.values.sku||'—'} · ${s.workshopWorkspace['T01-W09']?.values.breakpoint||'—'}`],
  ['履约',`${s.workshopWorkspace['T01-W10']?.values.case||'—'} · ${s.workshopWorkspace['T01-W10']?.values.health||''}`],
  ['真实订单',`${state('T01-P05')} · ${(c('T01-P05')?.evidence?.length||0)}条证据`]
 ];
}

const resultWorkshop:Record<string,string[]>={
 'T01-R01':['T01-W01'],'T01-R02':['T01-W02'],'T01-R03':['T01-W03'],'T01-R04':['T01-W04'],'T01-R05':['T01-W05','T01-W06'],'T01-R06':['T01-W07'],'T01-R07':['T01-W08','T01-W09'],'T01-R08':['T01-W10'],'T01-R09':['T01-W11'],'T01-R10':['T01-W11']
};
const resultCoaching:Record<string,string[]>={'T01-R02':['T01-P01'],'T01-R04':['T01-P02'],'T01-R05':['T01-P03'],'T01-R06':['T01-P04'],'T01-R08':['T01-P05']};
export function buildResultSnapshot(id:string,s:StateLikeForDataFlow,coaching:CoachingMachine[]){
 const ws=(resultWorkshop[id]||[]).map(code=>({code,values:s.workshopWorkspace[code]?.values||{},evidence:s.workshopWorkspace[code]?.evidence?.length||0,state:s.workshopState[code]||''}));
 const cases=(resultCoaching[id]||[]).map(code=>{const m=coaching.find(x=>x.code===code);const cur=s.coachingState[code]||m?.initial_state||'';const c=s.coachingCases[code];return{code,state:cur,label:m?.states.find(x=>x.key===cur)?.label_zh||cur,evidence:c?.evidence?.length||0,paused:Boolean(c?.paused),last:c?.timeline?.at(-1)?.label||''}});
 const highlights:string[]=[];
 for(const w of ws){const v=w.values;if(clean(v.sku))highlights.push(`${w.code} SKU：${v.sku}`);if(clean(v.video))highlights.push(`${w.code} 内容：${v.video}`);if(clean(v.bottleneck))highlights.push(`${w.code} 瓶颈：${v.bottleneck}`);if(clean(v.outreach))highlights.push(`${w.code} 达人：${v.outreach}`);if(clean(v.decision))highlights.push(`${w.code} 判断：${v.decision}`);if(clean(v.breakpoint))highlights.push(`${w.code} 断点：${v.breakpoint}`);}
 for(const c of cases)highlights.push(`${c.code}：${c.label}${c.evidence?` · ${c.evidence}条证据`:''}`);
 return{workshops:ws,cases,highlights:highlights.slice(0,6)};
}
