import { useMemo, useState } from 'react'

const steps=[
 {title:'Ready｜备货',owner:'Seller｜卖家',evidence:'库存 / 包装'},
 {title:'First Mile｜揽收',owner:'Carrier｜承运商',evidence:'首次扫描'},
 {title:'Origin Hub｜始发枢纽',owner:'Carrier｜承运商',evidence:'入仓扫描'},
 {title:'Export｜出口',owner:'Carrier / Customs｜承运/海关',evidence:'出口状态'},
 {title:'Linehaul｜干线',owner:'Carrier｜承运商',evidence:'运输事件'},
 {title:'Import Customs｜进口清关',owner:'Customs / Broker｜海关/代理',evidence:'清关状态'},
 {title:'Last Mile｜末端',owner:'Local Carrier｜本地承运',evidence:'派送扫描'},
 {title:'Delivered｜妥投',owner:'Local Carrier / Customer｜承运/客户',evidence:'妥投证据'}
]

export function LogisticsJourneyScene(){
 const [pos,setPos]=useState(2)
 const [incident,setIncident]=useState<'none'|'customs'|'lastmile'>('none')
 const [route,setRoute]=useState<'economy'|'priority'>('economy')
 const delay=incident==='customs'?4:incident==='lastmile'?2:0
 const eta=(route==='economy'?10:6)+delay
 const current=steps[pos]
 const consequence=useMemo(()=>incident==='customs'
  ?'Customs Delay｜清关延误：ETA延长，Tracking需要出现可解释状态，客服承诺与异常责任同步更新。'
  :incident==='lastmile'?'Last-mile Exception｜末端异常：妥投概率和客户体验受影响，应进入承运商跟进与客户沟通。'
  :'Normal Flow｜正常链路：仍需逐节点检查时间、责任方与证据。',[incident])
 return <section className="workbench logistics-benchmark">
  <div className="scene-heading"><div><div className="eyebrow">Benchmark 05｜国际物流旅程</div><h1>Tracking 不是一个单号，而是时间 × 位置 × 责任 × 证据的状态链。</h1><p>路线时效为教学模拟，不代表任何承运商真实 SLA｜服务时效。</p></div><div className="status-chip">ETA {eta} days｜预计 {eta} 天</div></div>
  <div className="logistics-toolbar"><div><button className={route==='economy'?'active':''} onClick={()=>setRoute('economy')}>Economy｜经济线</button><button className={route==='priority'?'active':''} onClick={()=>setRoute('priority')}>Priority｜优先线</button></div><div><button className={incident==='customs'?'active':''} onClick={()=>setIncident(incident==='customs'?'none':'customs')}>Customs Delay｜清关延误</button><button className={incident==='lastmile'?'active':''} onClick={()=>setIncident(incident==='lastmile'?'none':'lastmile')}>Last-mile Exception｜末端异常</button></div></div>
  <div className="route-journey-canvas">
   <svg viewBox="0 0 1000 180" aria-label="国际物流状态路径">
    <path className="journey-base-path" d="M70 90 C220 20 330 150 470 90 S760 25 930 90"/>
    <path className="journey-progress-path" pathLength="100" strokeDasharray={String(pos/(steps.length-1)*100)+' 100'} d="M70 90 C220 20 330 150 470 90 S760 25 930 90"/>
    {steps.map((s,i)=>{const x=70+i*(860/(steps.length-1));const y=90+(i%2===0?-18:18);return <g key={s.title} transform={'translate('+x+','+y+')'} className={i<pos?'route-node done':i===pos?'route-node current':'route-node'} onClick={()=>setPos(i)}><circle r={i===pos?14:10}/><text textAnchor="middle" y={i%2===0?-24:34}>{i+1}</text></g>})}
   </svg>
   <div className="parcel-state"><span>Current State｜当前状态</span><strong>{current.title}</strong><p>{current.owner} · Evidence｜证据：{current.evidence}</p></div>
  </div>
  <div className="logistics-line">{steps.map((s,i)=><button key={s.title} className={i<pos?'done':i===pos?'current':''} onClick={()=>setPos(i)}><span>{String(i+1).padStart(2,'0')}</span><strong>{s.title}</strong><small>{s.owner}</small>{incident==='customs'&&i===5&&<em>Delay｜延误</em>}{incident==='lastmile'&&i===6&&<em>Exception｜异常</em>}</button>)}</div>
  <div className={incident==='none'?'output-card':'output-card warning'}><strong>Propagation｜状态传播</strong><p>{consequence}</p><div className="propagation-chain"><span>Tracking｜追踪</span><i>→</i><span>ETA｜预计到达</span><i>→</i><span>Customer Promise｜客户承诺</span><i>→</i><span>Service / Cash｜服务/资金</span></div></div>
 </section>
}
