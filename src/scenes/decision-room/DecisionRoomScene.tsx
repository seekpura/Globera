import { useState } from 'react'

const issues=[
 {id:'refund',title:'退款率上升',evidence:'退款原因集中在“尺寸/规格理解错误”',impact:'高',control:'高',metric:'退款率',action:'修正商品信息与内容证明，复核商品实际规格'},
 {id:'ctr',title:'商品点击率下降',evidence:'连续两个观察周期入口 CTR｜点击率下降',impact:'高',control:'高',metric:'CTR｜点击率',action:'只改入口素材与商品匹配，保留其他变量'},
 {id:'proof',title:'内容证明不足',evidence:'观看存在，但商品点击与评论中的“看不懂效果”同时出现',impact:'中高',control:'高',metric:'商品点击率',action:'补 Demo｜演示与 Proof｜证明段'},
 {id:'creator',title:'达人样品效率低',evidence:'样品寄出多，出片率与目标受众匹配偏低',impact:'中',control:'高',metric:'出片率/有效订单',action:'收紧达人筛选与样品条件'},
 {id:'ads',title:'广告归因成交高',evidence:'归因成交上升，但自然与达人同时上升，增量尚未确认',impact:'中高',control:'中',metric:'增量证据/贡献',action:'分离基线、归因和实际新增，控制测试预算'},
 {id:'delivery',title:'物流时效波动',evidence:'追踪事件显示进口与末端阶段波动',impact:'高',control:'中',metric:'妥投时效',action:'按责任节点拆解，不只看平均时效'},
 {id:'stock',title:'库存现金占用',evidence:'在库天数上升，补货仍按旧速度执行',impact:'中高',control:'高',metric:'库存天数/现金回收',action:'降低补货并按 SKU 分层'},
 {id:'listing',title:'Listing信息不一致',evidence:'图片、规格与变体存在冲突反馈',impact:'高',control:'高',metric:'前台QA/退款原因',action:'执行前台 QA｜质检并冻结事实源'}
]

export function DecisionRoomScene(){
 const [evidenceOpen,setEvidenceOpen]=useState(false)
 const [chosen,setChosen]=useState<string[]>([])
 const toggle=(id:string)=>setChosen(v=>v.includes(id)?v.filter(x=>x!==id):v.length<3?[...v,id]:v)
 const selected=chosen.map(id=>issues.find(x=>x.id===id)!).filter(Boolean)
 return <section className="workbench decision-benchmark">
  <div className="scene-heading"><div><div className="eyebrow">Benchmark 06｜经营决策室</div><h1>问题很多，但行动只能来自证据、影响和可控程度。</h1><p>训练目标不是自动排名，而是把“感觉有问题”转成可解释、可行动、可复盘的 Top 3｜前三优先事项。</p></div><div className="status-chip">{chosen.length}/3 · Top Priorities｜优先事项</div></div>
  <div className="decision-pipeline"><span>Problem｜问题</span><i>→</i><span>Evidence｜证据</span><i>→</i><span>Impact × Control｜影响×可控</span><i>→</i><span>Top 3｜前三</span><i>→</i><span>30-day Plan｜30天计划</span></div>
  <div className="decision-toolbar"><button className={evidenceOpen?'active':''} onClick={()=>setEvidenceOpen(v=>!v)}>{evidenceOpen?'Hide Evidence｜隐藏证据':'Inject Evidence｜注入经营证据'}</button><p>{evidenceOpen?'现在可以基于证据判断；仍然不要让单一指标自动替你做决策。':'先观察问题名称，体会“没有证据时”为什么无法可靠排序。'}</p></div>
  <div className="priority-grid">{issues.map(x=><button key={x.id} disabled={!evidenceOpen} className={chosen.includes(x.id)?'selected':''} onClick={()=>toggle(x.id)}><span>{x.impact} Impact｜影响 · {x.control} Control｜可控</span><strong>{x.title}</strong><small>{evidenceOpen?x.evidence:'Evidence Locked｜证据未打开'}</small></button>)}</div>
  <div className="decision-evidence-summary">{selected.length?selected.map((x,i)=><article key={x.id}><span>0{i+1}</span><div><strong>{x.title}</strong><p>{x.evidence}</p></div><b>{x.metric}</b></article>):<p>打开证据，然后只选择最多三个当前最值得行动的问题。</p>}</div>
  <div className="plan-weeks">{[1,2,3,4].map((w,i)=>{const x=selected[i%Math.max(selected.length,1)];return <article key={w}><span>WEEK {w}</span><h3>{x?.title??'等待锁定优先事项'}</h3><p>{x?x.action:'动作 → 指标 → 复盘日期 → 停止/调整条件'}</p><small>{x?'Metric｜指标：'+x.metric:'先完成 Evidence Check｜证据检查'}</small></article>})}</div>
 </section>
}
