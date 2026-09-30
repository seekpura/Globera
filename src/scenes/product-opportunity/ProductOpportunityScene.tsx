import { useEffect, useMemo, useState } from 'react'
import { useCourseStore } from '../../store/courseStore'

type EvidenceState='supported'|'unknown'|'conflicted'|'contradicted'
type GateState='unchecked'|'pass'|'verify'|'stop'
type EvidenceClass='E1'|'E2'|'E3'|'E4'|'E5'

const questions=[
 {id:'demand',title:'Demand｜需求',short:'需求',prompt:'目标用户为什么现在需要它？',falsify:'如果只有播放/浏览，没有商品级购买或明确需求证据，需求假设仍未成立。'},
 {id:'competition',title:'Effective Competition｜有效竞争',short:'竞争',prompt:'真正与本商品争夺同一购买决策的对手是谁？',falsify:'结果很多不等于有效竞争强；需要先建立可比商品集合。'},
 {id:'advantage',title:'Product Advantage｜产品优势',short:'优势',prompt:'商品结构、供应或体验优势能否被用户感知？',falsify:'采购价低、功能多、供应商说“更好”都不能单独证明优势。'},
 {id:'content',title:'TikTok Fit｜内容适配',short:'内容',prompt:'商品价值能否被短时间展示、解释或证明？',falsify:'高播放不能代替商品证明与购买意图。'},
 {id:'economics',title:'Business Viability｜经营可行',short:'经济',prompt:'在退款、物流、佣金与获客成本后，经营是否仍成立？',falsify:'只看毛利或采购价，会隐藏完整经营成本。'},
 {id:'risk',title:'Risk｜风险',short:'风险',prompt:'平台、合规、安全、知识产权与运输是否存在硬阻断？',falsify:'商业吸引力不能覆盖硬性风险。'}
] as const

const gateDefs=[
 {id:'platform',label:'Platform｜平台',note:'商品是否允许销售'},
 {id:'cert',label:'Certification｜认证',note:'是否存在强制认证/检测'},
 {id:'safety',label:'Safety / Tech｜安全/技术',note:'电气、无线、儿童、安全等要求'},
 {id:'label',label:'Label / Package｜标签/包装',note:'目标市场标签与包装'},
 {id:'ip',label:'IP / Claims｜知识产权/宣称',note:'商标、版权、功效宣称'},
 {id:'shipping',label:'Shipping｜运输',note:'危险品、尺寸、重量、禁限运'}
] as const

const evidenceLabels:Record<EvidenceState,string>={supported:'Supported｜有支持',unknown:'Unknown｜未知',conflicted:'Conflicted｜冲突',contradicted:'Contradicted｜被反证'}
const gateLabels:Record<GateState,string>={unchecked:'UNCHECKED｜未检查',pass:'PASS｜通过',verify:'VERIFY｜待核验',stop:'STOP｜停止'}

const cases=[
 {id:'blank',name:'Blank Hypothesis｜空白商品假设',note:'从零判断；所有关键结论都需要证据。',price:100,cost:32,logistics:18,growth:15,refund:8,evidence:{demand:'unknown',competition:'unknown',advantage:'unknown',content:'unknown',economics:'unknown',risk:'unknown'} as Record<string,EvidenceState>,gates:{} as Record<string,GateState>},
 {id:'scale',name:'Kitchen Scale｜厨房电子秤',note:'E5｜教学模拟：搜索需求可能存在，但“销量高”并不自动等于适合本次经营测试。',price:72,cost:24,logistics:14,growth:11,refund:6,evidence:{demand:'supported',competition:'conflicted',advantage:'unknown',content:'supported',economics:'supported',risk:'unknown'} as Record<string,EvidenceState>,gates:{platform:'pass',cert:'verify',safety:'verify',label:'verify',ip:'pass',shipping:'pass'} as Record<string,GateState>},
 {id:'printer',name:'Bluetooth Label Printer｜蓝牙标签打印机',note:'E5｜教学模拟：内容演示强，但无线/电池/认证与运输条件可能成为硬门槛，必须单独核验。',price:128,cost:42,logistics:19,growth:22,refund:10,evidence:{demand:'supported',competition:'unknown',advantage:'supported',content:'supported',economics:'supported',risk:'conflicted'} as Record<string,EvidenceState>,gates:{platform:'pass',cert:'verify',safety:'verify',label:'verify',ip:'pass',shipping:'verify'} as Record<string,GateState>},
 {id:'organizer',name:'Visual Organizer｜强视觉收纳商品',note:'E5｜教学模拟：展示性强、结构简单，但仍需验证真实需求、同质竞争与完整成本。',price:86,cost:27,logistics:21,growth:17,refund:7,evidence:{demand:'unknown',competition:'conflicted',advantage:'supported',content:'supported',economics:'unknown',risk:'supported'} as Record<string,EvidenceState>,gates:{platform:'pass',cert:'pass',safety:'pass',label:'verify',ip:'pass',shipping:'pass'} as Record<string,GateState>}
] as const

const competitors=[
 {id:'a',name:'A｜同用途 / 同价格带',why:'核心用途、价格带和目标人群高度重叠'},
 {id:'b',name:'B｜同用途 / 高价格',why:'用途相同，但价值证明和价格带不同'},
 {id:'c',name:'C｜相似外观 / 不同用途',why:'外观相似，但购买任务不同'},
 {id:'d',name:'D｜同关键词 / 配件类',why:'搜索结果可能出现，但并不争夺同一最终购买决策'},
 {id:'e',name:'E｜区域同类商品',why:'同用途且在目标市场真实成交，优先进入可比集合'}
]

export function ProductOpportunityScene(){
 const instructorMode=useCourseStore(s=>s.instructorMode)
 const instructorStep=useCourseStore(s=>s.instructorStep)
 const [level,setLevel]=useState<1|2|3|4>(1)
 const [active,setActive]=useState(0)
 const [caseId,setCaseId]=useState('blank')
 const [evidence,setEvidence]=useState<Record<string,EvidenceState>>(cases[0].evidence)
 const [evidenceClass,setEvidenceClass]=useState<Record<string,EvidenceClass>>({})
 const [gates,setGates]=useState<Record<string,GateState>>(cases[0].gates)
 const [cohort,setCohort]=useState<string[]>(['a','e'])
 const [price,setPrice]=useState<number>(cases[0].price)
 const [productCost,setProductCost]=useState<number>(cases[0].cost)
 const [logistics,setLogistics]=useState<number>(cases[0].logistics)
 const [growth,setGrowth]=useState<number>(cases[0].growth)
 const [refund,setRefund]=useState<number>(cases[0].refund)
 const [testBudget,setTestBudget]=useState(180)
 const [testDays,setTestDays]=useState(14)

 const activeQ=questions[active]
 const activeCase=cases.find(x=>x.id===caseId)!
 const contribution=price-productCost-logistics-growth-refund
 const stopped=Object.values(gates).includes('stop')
 const unresolved=questions.filter(q=>['unknown','conflicted'].includes(evidence[q.id]??'unknown')).length
 const contradicted=questions.filter(q=>evidence[q.id]==='contradicted').length
 const decision=stopped?'STOP｜停止推进':contradicted?'RETHINK｜重做假设':unresolved>1?'EVIDENCE NEEDED｜继续补证据':'SMALL TEST｜小范围测试'
 const decisionNote=stopped?'至少一个硬风险闸门已触发 STOP。其他商业优势不能覆盖它。':contradicted?'核心商品假设出现反证，先重构商品或市场假设。':unresolved>1?'关键问题仍存在未知/冲突，先补证据而不是打总分。':'关键问题已有基本证据，可定义预算、周期、指标与退出条件。'
 const portfolioRole=stopped||contradicted?'REJECT / HOLD｜拒绝/暂缓':unresolved>1?'EXPLORATION｜探索':contribution>0?'PRIMARY TEST｜主测试':'BACKUP / REWORK｜备选/重做'
 const positions=questions.map((_,i)=>{const a=Math.PI*2*i/questions.length-Math.PI/2;return{x:450+Math.cos(a)*170,y:230+Math.sin(a)*155}})
 const activeState=evidence[activeQ.id]??'unknown'
 const states=useMemo(()=>questions.map(q=>evidence[q.id]??'unknown'),[evidence])
 useEffect(()=>{if(!instructorMode)return;const map:[1|2|3|4,1|2|3|4,1|2|3|4,1|2|3|4,1|2|3|4]=[1,1,2,3,4];setLevel(map[instructorStep]??4)},[instructorMode,instructorStep])

 function applyCase(id:string){
  const next=cases.find(x=>x.id===id)!
  setCaseId(id);setEvidence({...next.evidence});setEvidenceClass({});setGates({...next.gates});setPrice(next.price);setProductCost(next.cost);setLogistics(next.logistics);setGrowth(next.growth);setRefund(next.refund);setActive(0);setCohort(['a','e'])
 }

 return <section className="workbench opportunity-benchmark">
  <div className="scene-heading">
   <div><div className="eyebrow">Benchmark 03｜Product Opportunity Lab｜商品机会实验室</div><h1>商品机会不是雷达总分，而是一组可以被证据推翻的经营假设。</h1><p>六个问题分别判断；有效竞争先建立可比集合；硬风险独立阻断；Unknown｜未知必须保留为未知。</p></div>
   <div className={stopped?'status-chip danger':'status-chip'}>{decision}</div>
  </div>

  <div className="semantic-level-bar opportunity-level-bar"><span>Semantic Zoom｜语义缩放</span><button className={level===1?'active':''} onClick={()=>setLevel(1)}>L1 Hypothesis｜假设</button><button className={level===2?'active':''} onClick={()=>setLevel(2)}>L2 Evidence｜证据</button><button className={level===3?'active':''} onClick={()=>setLevel(3)}>L3 Gate & Economics｜闸门与经济</button><button className={level===4?'active':''} onClick={()=>setLevel(4)}>L4 Test Contract｜测试契约</button></div>

  <div className="opportunity-casebar">
   <div><span>Case Lens｜案例视角</span><strong>{activeCase.name}</strong><p>{activeCase.note}</p></div>
   <select value={caseId} onChange={e=>applyCase(e.target.value)}>{cases.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select>
  </div>

  <div className={'opportunity-stage opportunity-level-'+level}>
   <div className="opportunity-space">
    <svg viewBox="0 0 900 460" role="img" aria-label="商品机会六问关系空间">
     <defs><marker id="opp-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10 z"/></marker></defs>
     {positions.map((p,i)=><line key={'l'+i} x1="450" y1="230" x2={p.x} y2={p.y} className={i===active?'opp-line active':'opp-line'}/>)}
     <g transform="translate(450,230)" className="opp-core"><circle r="76"/><text textAnchor="middle" y="-8">Product Hypothesis</text><text textAnchor="middle" y="14">商品经营假设</text><text textAnchor="middle" y="38" className="opp-sub">{portfolioRole}</text></g>
     {questions.map((q,i)=>{const p=positions[i];const state=evidence[q.id]??'unknown';return <g key={q.id} transform={'translate('+p.x+','+p.y+')'} className={'opp-node '+state+(i===active?' selected':'')} onClick={()=>setActive(i)} role="button" tabIndex={0} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setActive(i)}}}><circle r={i===active?50:43}/><text textAnchor="middle" y="-3">{q.short}</text><text textAnchor="middle" y="17" className="opp-node-state">{state==='supported'?'SUPPORTED':state==='unknown'?'UNKNOWN':state==='conflicted'?'CONFLICT':'CONTRADICT'}</text></g>})}
    </svg>
    <div className="opportunity-legend"><span className="supported">Supported｜有支持</span><span className="unknown">Unknown｜未知</span><span className="conflicted">Conflicted｜冲突</span><span className="contradicted">Contradicted｜反证</span></div>
   </div>

   <aside className="opportunity-inspector">
    <div className="eyebrow">Evidence Lens｜证据视角</div>
    <h2>{activeQ.title}</h2>
    <p>{activeQ.prompt}</p>
    <div className="evidence-state-switch">{(Object.keys(evidenceLabels) as EvidenceState[]).map(s=><button key={s} className={activeState===s?'active':''} onClick={()=>setEvidence(v=>({...v,[activeQ.id]:s}))}>{evidenceLabels[s]}</button>)}</div>
    <article><span>Evidence Class｜证据等级</span><div className="evidence-class-row">{(['E1','E2','E3','E4','E5'] as EvidenceClass[]).map(x=><button key={x} className={evidenceClass[activeQ.id]===x?'active':''} onClick={()=>setEvidenceClass(v=>({...v,[activeQ.id]:x}))}>{x}</button>)}</div><p>{evidenceClass[activeQ.id]?'当前证据类别：'+evidenceClass[activeQ.id]:'尚未指定证据类别。E1官方 / E2直接观察 / E3研究 / E4真实业务 / E5教学模拟。'}</p></article>
    <article><span>Falsification｜如何推翻</span><p>{activeQ.falsify}</p></article>
   </aside>
  </div>

  <section className={'competition-cohort opportunity-layer evidence-layer '+(level>=2?'is-visible':'is-muted')}>
   <div className="section-mini-head"><div><span>Effective Competition Cohort｜有效竞争集合</span><strong>先定义“真正可比”，再讨论竞争强弱</strong></div><small>{cohort.length} / {competitors.length} included｜已纳入</small></div>
   <div className="cohort-grid">{competitors.map(x=><button key={x.id} className={cohort.includes(x.id)?'selected':''} onClick={()=>setCohort(v=>v.includes(x.id)?v.filter(id=>id!==x.id):[...v,x.id])}><strong>{x.name}</strong><small>{x.why}</small><span>{cohort.includes(x.id)?'Comparable｜纳入可比':'Not Comparable｜暂不纳入'}</span></button>)}</div>
   <p className="component-callout">搜索结果数量只是候选池。只有购买任务、用途、价格带、目标人群或商品结构足够可比的对象，才应进入有效竞争分析。</p>
  </section>

  <div className={'opportunity-lower-grid opportunity-layer gate-layer '+(level>=3?'is-visible':'is-muted')}>
   <section className="hard-gate-panel">
    <div className="section-mini-head"><div><span>Hard Gates｜硬风险闸门</span><strong>任何 STOP 都独立阻断推进</strong></div><small>不使用需求、内容或利润优势抵消硬风险。</small></div>
    <div className="hard-gate-grid">{gateDefs.map(g=>{const state=gates[g.id]??'unchecked';return <article key={g.id} className={'hard-gate '+state}><strong>{g.label}</strong><p>{g.note}</p><select value={state} onChange={e=>setGates(v=>({...v,[g.id]:e.target.value as GateState}))}>{(Object.keys(gateLabels) as GateState[]).map(s=><option key={s} value={s}>{gateLabels[s]}</option>)}</select></article>})}</div>
   </section>

   <section className="opportunity-economics">
    <div className="section-mini-head"><div><span>Unit Economics｜单位经济</span><strong>完整成本进入同一经营判断</strong></div><small>E5｜教学模拟</small></div>
    <div className="opp-econ-controls">
     {([
      ['Selling Price｜售价',price,setPrice,40,180],
      ['Product Cost｜商品成本',productCost,setProductCost,10,80],
      ['Logistics｜物流',logistics,setLogistics,5,60],
      ['Creator / Ads｜达人/广告',growth,setGrowth,0,60],
      ['Refund Shock｜退款冲击',refund,setRefund,0,40]
     ] as const).map(([name,value,setter,min,max])=><label key={String(name)}><span>{name}</span><input type="range" min={Number(min)} max={Number(max)} value={Number(value)} onChange={e=>(setter as (x:number)=>void)(Number(e.target.value))}/><strong>{String(value)}</strong></label>)}
    </div>
    <div className={contribution<0?'opp-contribution danger':'opp-contribution'}><span>Contribution｜贡献</span><strong>{contribution.toFixed(1)}</strong><p>用于观察变量关系，不把模拟结果当成真实利润。</p></div>
   </section>
  </div>

  <section className={'test-plan-lab opportunity-layer test-layer '+(level>=4?'is-visible':'is-muted')}>
   <div className="section-mini-head"><div><span>Small Test Contract｜小范围测试契约</span><strong>不是“先上架看看”，而是先定义预算、时间、指标和退出条件</strong></div><small>{decision==='SMALL TEST｜小范围测试'?'READY TO DEFINE｜可定义测试':'LOCKED BY EVIDENCE｜仍受证据限制'}</small></div>
   <div className="test-plan-grid"><label><span>Test Budget｜测试预算</span><input type="range" min="50" max="1000" step="10" value={testBudget} onChange={e=>setTestBudget(Number(e.target.value))}/><strong>{testBudget}</strong></label><label><span>Test Window｜测试周期</span><input type="range" min="3" max="30" value={testDays} onChange={e=>setTestDays(Number(e.target.value))}/><strong>{testDays} 天</strong></label><article><span>Primary Metric｜主指标</span><strong>商品级有效转化 + 贡献</strong><p>同时观察退款、内容证明和硬风险变化。</p></article><article><span>Exit Condition｜退出条件</span><strong>关键假设被反证 / Gate STOP</strong><p>停止条件应在投入前写清楚。</p></article></div>
  </section>

  <div className="opportunity-decision-strip">
   <div><span>6 Questions｜六问状态</span><strong>{states.filter(x=>x==='supported').length} Supported · {unresolved} Unresolved · {contradicted} Contradicted</strong></div>
   <div><span>Effective Cohort｜有效竞争</span><strong>{cohort.length} Comparable｜可比对象</strong><p>集合质量优先于结果数量。</p></div>
   <div><span>Hard Gate｜硬闸门</span><strong>{stopped?'STOP ACTIVE｜已阻断':'No STOP Yet｜暂未阻断'}</strong></div>
   <div className="decision-main"><span>Portfolio Role｜组合角色</span><strong>{portfolioRole}</strong><p>{decisionNote}</p></div>
  </div>

 </section>
}
