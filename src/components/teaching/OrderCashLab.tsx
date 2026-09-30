import { useMemo, useState } from 'react'

const stages=['Order｜订单','Adjustment｜调整','Settlement｜平台结算','FX / Collection｜换汇/收款','Bank Receipt｜银行到账']

export function OrderCashLab(){
 const [stage,setStage]=useState(0)
 const [order,setOrder]=useState(120)
 const [refund,setRefund]=useState(12)
 const [platform,setPlatform]=useState(9)
 const [growth,setGrowth]=useState(18)
 const [tax,setTax]=useState(8)
 const [fx,setFx]=useState(2)
 const settlement=useMemo(()=>Math.max(0,order-refund-platform-growth-tax),[order,refund,platform,growth,tax])
 const bank=Math.max(0,settlement-fx)
 return <section className="mother-component order-cash-lab">
  <header><span>Order-to-Cash｜订单到资金回收</span><strong>平台结算 ≠ 利润 ≠ 银行到账</strong></header>
  <div className="order-cash-stages">{stages.map((x,i)=><button key={x} className={i<stage?'done':i===stage?'active':''} onClick={()=>setStage(i)}><span>{String(i+1).padStart(2,'0')}</span><strong>{x}</strong></button>)}</div>
  <div className="order-cash-grid">
   <div className="order-cash-controls">
    {[
     ['Order Amount｜订单金额',order,setOrder,40,240],
     ['Refund / Discount｜退款/折扣',refund,setRefund,0,60],
     ['Platform / Payment｜平台/支付',platform,setPlatform,0,40],
     ['Affiliate / Ads｜达人/广告',growth,setGrowth,0,60],
     ['Tax Reserve｜税费准备',tax,setTax,0,40],
     ['FX / Collection｜换汇/收款',fx,setFx,0,20],
    ].map(([name,value,setter,min,max])=><label key={String(name)}><span>{name}</span><input type="range" min={Number(min)} max={Number(max)} value={Number(value)} onChange={e=>(setter as (x:number)=>void)(Number(e.target.value))}/><strong>{String(value)}</strong></label>)}
   </div>
   <aside>
    <article><span>Settlement｜平台结算</span><strong>{settlement}</strong><p>订单金额扣除退款、平台/支付、增长与税费准备后的教学模拟。</p></article>
    <article><span>Bank Receipt｜银行到账</span><strong>{bank}</strong><p>再扣除换汇/收款成本。真实账务需以平台账单、支付机构和银行流水对账。</p></article>
   </aside>
  </div>
  <p className="component-callout">Current Stage｜当前阶段：{stages[stage]}。同一订单在不同时间点看到的金额对象不同。</p>
 </section>
}
