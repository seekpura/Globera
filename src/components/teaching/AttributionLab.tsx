import { useMemo, useState } from 'react'

export function AttributionLab(){
 const [baseline,setBaseline]=useState(60)
 const [observed,setObserved]=useState(92)
 const [attributed,setAttributed]=useState(78)
 const [spend,setSpend]=useState(24)
 const proxy=useMemo(()=>Math.max(0,observed-baseline),[observed,baseline])
 const overlap=Math.max(0,attributed-proxy)
 const max=Math.max(observed,attributed,baseline,1)
 return <section className="mother-component attribution-lab">
  <header><span>Attribution vs Incrementality｜归因与增量</span><strong>被归因的成交，不等于广告创造的新增成交</strong></header>
  <div className="attribution-bars" aria-label="归因与增量教学对比">
   {[['Baseline｜基线',baseline],['Observed｜观察成交',observed],['Attributed｜归因成交',attributed],['Incremental Proxy｜增量代理',proxy]].map(([name,value])=><div key={String(name)}><span>{name}</span><i style={{width:String(Number(value)/max*100)+'%'}}/><b>{value}</b></div>)}
  </div>
  <div className="attribution-controls">
   <label><span>Baseline｜基线成交</span><input type="range" min="0" max="140" value={baseline} onChange={e=>setBaseline(Number(e.target.value))}/><strong>{baseline}</strong></label>
   <label><span>Observed｜观察成交</span><input type="range" min="0" max="160" value={observed} onChange={e=>setObserved(Number(e.target.value))}/><strong>{observed}</strong></label>
   <label><span>Attributed｜归因成交</span><input type="range" min="0" max="160" value={attributed} onChange={e=>setAttributed(Number(e.target.value))}/><strong>{attributed}</strong></label>
   <label><span>Ad Spend｜广告花费</span><input type="range" min="0" max="100" value={spend} onChange={e=>setSpend(Number(e.target.value))}/><strong>{spend}</strong></label>
  </div>
  <div className="attribution-readout"><article><span>Teaching Proxy｜教学代理</span><strong>{proxy}</strong><p>观察成交 − 基线成交。它只是课堂代理，不自动建立因果。</p></article><article><span>Attributed Overlap｜归因重叠</span><strong>{overlap}</strong><p>归因成交中可能包含原本就会发生的自然/达人/LIVE成交。</p></article><article><span>Spend / Proxy｜花费/代理增量</span><strong>{proxy?(spend/proxy).toFixed(2):'—'}</strong><p>仅用于观察关系；正式经营判断需要实验、时间序列或其他增量证据。</p></article></div>
 </section>
}
