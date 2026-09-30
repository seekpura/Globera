import { useMemo, useState } from 'react'

export function SettlementBridge(){
  const [order,setOrder]=useState(120)
  const [refund,setRefund]=useState(12)
  const [platform,setPlatform]=useState(9)
  const [growth,setGrowth]=useState(18)
  const [tax,setTax]=useState(8)
  const [fx,setFx]=useState(3)
  const [delay,setDelay]=useState(14)

  const settlement=useMemo(()=>order-refund-platform-growth-tax,[order,refund,platform,growth,tax])
  const bankReceipt=settlement-fx
  const deductions=[
    ['Refund / Cancel｜退款/取消',refund],
    ['Platform / Payment｜平台/支付',platform],
    ['Affiliate / Ads｜达人/广告',growth],
    ['Tax Reserve｜税费准备',tax],
    ['FX / Collection｜换汇/收款',fx],
  ] as const

  return <section className="settlement-bridge mother-component">
    <header><span>Order-to-Cash Bridge｜订单到现金桥</span><strong>Order Amount｜订单金额 ≠ Settlement｜平台结算 ≠ Bank Receipt｜银行到账</strong></header>
    <div className="settlement-layout">
      <div className="settlement-controls">
        <label><span>Order Amount｜订单金额</span><input type="range" min="40" max="300" value={order} onChange={e=>setOrder(Number(e.target.value))}/><strong>{order}</strong></label>
        {deductions.map(([label,value],i)=>{
          const setters=[setRefund,setPlatform,setGrowth,setTax,setFx] as const
          return <label key={label}><span>{label}</span><input type="range" min="0" max="60" value={value} onChange={e=>setters[i](Number(e.target.value))}/><strong>−{value}</strong></label>
        })}
        <label><span>Settlement Delay｜结算等待</span><input type="range" min="1" max="45" value={delay} onChange={e=>setDelay(Number(e.target.value))}/><strong>{delay}天</strong></label>
      </div>
      <div className="settlement-readout">
        <article><span>Order｜订单</span><strong>{order}</strong></article>
        <i>→</i>
        <article><span>Settlement｜平台结算</span><strong>{settlement}</strong><small>扣除退款、平台/支付、达人/广告、税费准备后的教学示例</small></article>
        <i>→</i>
        <article><span>Bank Receipt｜银行到账</span><strong>{bankReceipt}</strong><small>再扣换汇/收款成本后的教学示例</small></article>
      </div>
    </div>
    <div className="settlement-timeline">
      <span style={{left:'0%'}}>D0 · Order｜订单</span>
      <span style={{left:'24%'}}>D7 · Adjustment｜调整</span>
      <span style={{left:`${Math.min(78,32+delay)}%`}}>D{delay} · Settlement｜结算</span>
      <span style={{left:`${Math.min(92,38+delay)}%`}}>D{delay+2} · Bank｜到账</span>
      <div className="settlement-line"/>
    </div>
    <p className="component-callout">该组件只解释资金路径与时序。是否盈利仍要把 COGS｜商品成本、物流、售后等完整经营成本纳入 P&amp;L｜损益。</p>
  </section>
}
