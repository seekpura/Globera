import { useMemo, useState } from 'react'

export function OperatingEconomicsLab(){
 const [gmv,setGmv]=useState(130)
 const [refund,setRefund]=useState(15)
 const [cogs,setCogs]=useState(34)
 const [logistics,setLogistics]=useState(16)
 const [platform,setPlatform]=useState(9)
 const [growth,setGrowth]=useState(22)
 const [afterSales,setAfterSales]=useState(5)
 const [tax,setTax]=useState(6)
 const netSales=Math.max(0,gmv-refund)
 const contribution=useMemo(()=>netSales-cogs-logistics-platform-growth-afterSales-tax,[netSales,cogs,logistics,platform,growth,afterSales,tax])
 const margin=netSales?contribution/netSales*100:0
 const rows=[
  ['GMV｜成交总额',gmv,'income'],
  ['Refund / Cancel｜退款/取消',refund,'cost'],
  ['COGS｜商品成本',cogs,'cost'],
  ['Logistics｜物流',logistics,'cost'],
  ['Platform｜平台/支付',platform,'cost'],
  ['Growth｜达人/广告',growth,'cost'],
  ['After-sales｜售后',afterSales,'cost'],
  ['Tax Reserve｜税费准备',tax,'reserve']
 ] as const
 return <section className="mother-component operating-economics-lab">
  <header><span>Operating Economics｜经营经济</span><strong>销量增加，贡献利润仍可能下降</strong></header>
  <div className="economics-main">
   <div className="economics-waterfall">{rows.map(([name,value,kind],i)=><article key={name} className={kind}><span>{String(i+1).padStart(2,'0')}</span><strong>{name}</strong><i style={{width:String(Math.max(4,Number(value)/Math.max(gmv,1)*100))+'%'}}/><b>{kind==='income'?'+':'−'}{value}</b></article>)}</div>
   <aside><span>Contribution｜贡献利润</span><strong className={contribution<0?'danger':''}>{contribution.toFixed(1)}</strong><p>Margin｜贡献率 {margin.toFixed(1)}%</p><small>E5｜教学模拟，不代表真实费率或利润。</small></aside>
  </div>
  <div className="economics-controls">{[
   ['GMV｜成交总额',gmv,setGmv,60,260],['Refund｜退款',refund,setRefund,0,60],['COGS｜商品成本',cogs,setCogs,10,90],['Logistics｜物流',logistics,setLogistics,5,60],['Platform｜平台/支付',platform,setPlatform,0,40],['Growth｜增长成本',growth,setGrowth,0,80],['After-sales｜售后',afterSales,setAfterSales,0,30],['Tax Reserve｜税费准备',tax,setTax,0,30]
  ] as const).map(([name,value,setter,min,max])=><label key={String(name)}><span>{name}</span><input type="range" min={Number(min)} max={Number(max)} value={Number(value)} onChange={e=>(setter as (x:number)=>void)(Number(e.target.value))}/><strong>{String(value)}</strong></label>)}</div>
  <div className="cash-shadow"><span>D0｜采购付款</span><i>→</i><span>D20｜形成可售库存</span><i>→</i><span>D35｜产生订单/利润</span><i>→</i><span>D50｜平台结算</span><i>→</i><span>D55｜银行到账</span></div>
 </section>
}
