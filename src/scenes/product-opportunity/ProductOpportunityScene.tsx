import { useMemo, useState } from 'react'

type EvidenceState='supported'|'unknown'|'conflicted'|'contradicted'
type GateState='unchecked'|'pass'|'verify'|'stop'

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

const evidenceLabels:Record<EvidenceState,string>={
 supported:'Supported｜有支持',
 unknown:'Unknown｜未知',
 conflicted:'Conflicted｜冲突',
 contradicted:'Contradicted｜被反证'
}
const gateLabels:Record<GateState,string>={
 unchecked:'UNCHECKED｜未检查',
 pass:'PASS｜通过',
 verify:'VERIFY｜待核验',
 stop:'STOP｜停止'
}

const cases=[
 {id:'visual',name:'Visual Demo｜视觉演示型',note:'价值可被短视频直接展示，但仍要验证真实需求、退款与完整成本。',price:100,productCost:32,logistics:18,growth:15,refund:8,evidence:{demand:'supported',competition:'unknown',advantage:'supported',content:'supported',economics:'unknown',risk:'unknown'} as Record<string,EvidenceState>},
 {id:'printer',name:'Label Printer｜标签打印机',note:'内容展示强，但无线/电气/耗材与运输等要求可能让硬风险先于商业吸引力。',price:88,productCost:31,logistics:14,growth:18,refund:7,evidence:{demand:'supported',competition:'conflicted',advantage:'supported',content:'supported',economics:'unknown',risk:'conflicted'} as Record<string,EvidenceState>},
 {id:'scale',name:'Kitchen Scale｜厨房电子秤',note:'需求容易被“销量很多”误导；需要重新确认有效竞争、价格带、差异和单位经济。',price:35,productCost:11,logistics:10,growth:8,refund:4,evidence:{demand:'supported',competition:'conflicted',advantage:'unknown',content:'unknown',economics:'unknown',risk:'unknown'} as Record<string,EvidenceState>}
]

export function ProductOpportunityScene(){
 const [caseId,setCaseId]=useState('visual')
 const initialCase=cases[0]
 const [active,setActive]=useState(0)
 const [evidence,setEvidence]=useState<Record<string,EvidenceState>>(initialCase.evidence)
 const [gates,setGates]=useState<Record<string,GateState>>({})
 const [price,setPrice]=useState(initialCase.price)
 const [productCost,setProductCost]=useState(initialCase.productCost)
 const [logistics,setLogistics]=useState(initialCase.logistics)
 const [growth,setGrowth]=useState(initialCase.growth)
 const [refund,setRefund]=useState(initialCase.refund)
 const activeCase=cases.find(x=>x.id===caseId)??initialCase
 function switchCase(id:string){
  const next=cases.find(x=>x.id===id)??initialCase
  setCaseId(id);setActive(0);setEvidence({...next.evidence});setGates({})
  setPrice(next.price);setProductCost(next.productCost);setLogistics(next.logistics);setGrowth(next.growth);setRefund(next.refund)
 }
 const activeQ=questions[active]
 const contribution=price-productCost-logistics-growth-refund
 const stopped=Object.values(gates).includes('stop')
 const unresolved=questions.filter(q=>['unknown','conflicted'].includes(evidence[q.id])).length
 const contradicted=questions.filter(q=>evidence[q.id]==='contradicted').length
 const decision=stopped?'STOP｜停止推进':contradicted?'RETHINK｜重做假设':unresolved>1?'EVIDENCE NEEDED｜继续补证据':'SMALL TEST｜小范围测试'
 const decisionNote=stopped?'至少一个硬风险闸门已触发 STOP。其他商业优势不能覆盖它。':contradicted?'核心商品假设出现反证，先重构商品或市场假设。':unresolved>1?'关键问题仍存在未知/冲突，先补证据而不是打总分。':'关键问题已有基本证据，可定义预算、周期、指标与退出条件。'
 const positions=questions.map((_,i)=>{const a=Math.PI*2*i/questions.length-Math.PI/2;return{x:450+Math.cos(a)*170,y:230+Math.sin(a)*155}})
 const activeState=evidence[activeQ.id]

 const states=useMemo(()=>questions.map(q=>evidence[q.id]),[evidence])

 return <section className="workbench opportunity-benchmark">
  <div className="scene-heading">
   <div><div className="eyebrow">Benchmark 03｜商品机会实验室</div><h1>商品机会不是雷达总分，而是一组可以被证据推翻的经营假设。</h1><p>六个问题分别判断；硬风险独立阻断；Unknown｜未知必须保留为未知。</p></div>
   <div className={stopped?'status-chip danger':'status-chip'}>{decision}</div>
  </div>
  <div className="opportunity-case-switch">
   <div><span>Case Lens｜案例视角</span><strong>{activeCase.name}</strong><p>{activeCase.note}</p></div>
   <div>{cases.map(x=><button key={x.id} className={caseId===x.id?'active':''} onClick={()=>switchCase(x.id)}>{x.name}</button>)}</div>
   <small>E5｜教学模拟案例。案例用于训练证据、闸门与经济判断，不代表真实市场结论。</small>
  </div>

  <div className="opportunity-stage">
   <div className="opportunity-space">
    <svg viewBox="0 0 900 460" role="img" aria-label="商品机会六问关系空间">
     <defs><marker id="opp-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10 z"/></marker></defs>
     {positions.map((p,i)=><line key={'l'+i} x1="450" y1="230" x2={p.x} y2={p.y} className={i===active?'opp-line active':'opp-line'}/>)}
     <g transform="translate(450,230)" className="opp-core"><circle r="76"/><text textAnchor="middle" y="-8">Product Hypothesis</text><text textAnchor="middle" y="14">商品经营假设</text><text textAnchor="middle" y="38" className="opp-sub">{decision}</text></g>
     {questions.map((q,i)=>{const p=positions[i];const state=evidence[q.id];return <g key={q.id} transform={'translate('+p.x+','+p.y+')'} className={'opp-node '+state+(i===active?' selected':'')} onClick={()=>setActive(i)} role="button" tabIndex={0} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setActive(i)}}><circle r={i===active?50:43}/><text textAnchor="middle" y="-3">{q.short}</text><text textAnchor="middle" y="17" className="opp-node-state">{state==='supported'?'SUPPORTED':state==='unknown'?'UNKNOWN':state==='conflicted'?'CONFLICT':'CONTRADICT'}</text></g>})}
    </svg>
    <div className="opportunity-legend"><span className="supported">Supported｜有支持</span><span className="unknown">Unknown｜未知</span><span className="conflicted">Conflicted｜冲突</span><span className="contradicted">Contradicted｜反证</span></div>
   </div>

   <aside className="opportunity-inspector">
    <div className="eyebrow">Evidence Lens｜证据视角</div>
    <h2>{activeQ.title}</h2>
    <p>{activeQ.prompt}</p>
    <div className="evidence-state-switch">{(Object.keys(evidenceLabels) as EvidenceState[]).map(s=><button key={s} className={activeState===s?'active':''} onClick={()=>setEvidence(v=>({...v,[activeQ.id]:s}))}>{evidenceLabels[s]}</button>)}</div>
    <article><span>Falsification｜如何推翻</span><p>{activeQ.falsify}</p></article>
    <article><span>Evidence Class｜证据等级</span><p>E1 官方原始资料 / E2 真实页面观察 / E3 可信研究 / E4 真实业务验证 / E5 教学模拟。</p></article>
   </aside>
  </div>

  <div className="opportunity-lower-grid">
   <section className="hard-gate-panel">
    <div className="section-mini-head"><div><span>Hard Gates｜硬风险闸门</span><strong>任何 STOP 都独立阻断推进</strong></div><small>不使用需求、内容或利润优势抵消硬风险。</small></div>
    <div className="hard-gate-grid">{gateDefs.map(g=>{const state=gates[g.id]??'unchecked';return <article key={g.id} className={'hard-gate '+state}><strong>{g.label}</strong><p>{g.note}</p><select value={state} onChange={e=>setGates(v=>({...v,[g.id]:e.target.value as GateState}))}>{(Object.keys(gateLabels) as GateState[]).map(s=><option key={s} value={s}>{gateLabels[s]}</option>)}</select></article>})}</div>
   </section>

   <section className="opportunity-economics">
    <div className="section-mini-head"><div><span>Unit Economics｜单位经济</span><strong>完整成本进入同一经营判断</strong></div><small>E5｜教学模拟</small></div>
    <div className="opp-econ-controls">
     {[
      ['Selling Price｜售价',price,setPrice,40,180],
      ['Product Cost｜商品成本',productCost,setProductCost,10,80],
      ['Logistics｜物流',logistics,setLogistics,5,60],
      ['Creator / Ads｜达人/广告',growth,setGrowth,0,60],
      ['Refund Shock｜退款冲击',refund,setRefund,0,40]
     ].map(([name,value,setter,min,max])=><label key={String(name)}><span>{name}</span><input type="range" min={Number(min)} max={Number(max)} value={Number(value)} onChange={e=>(setter as (x:number)=>void)(Number(e.target.value))}/><strong>{String(value)}</strong></label>)}
    </div>
    <div className={contribution<0?'opp-contribution danger':'opp-contribution'}><span>Contribution｜贡献</span><strong>{contribution.toFixed(1)}</strong><p>用于观察变量关系，不把模拟结果当成真实利润。</p></div>
   </section>
  </div>

  <div className="opportunity-decision-strip">
   <div><span>6 Questions｜六问状态</span><strong>{states.filter(x=>x==='supported').length} Supported · {unresolved} Unresolved · {contradicted} Contradicted</strong></div>
   <div><span>Hard Gate｜硬闸门</span><strong>{stopped?'STOP ACTIVE｜已阻断':'No STOP Yet｜暂未阻断'}</strong></div>
   <div className="decision-main"><span>Current Decision｜当前判断</span><strong>{decision}</strong><p>{decisionNote}</p></div>
  </div>
 </section>
}
