import { useMemo, useState } from 'react'

const beats=[
 {label:'Hook｜钩子',start:0,end:3,user:'Ignore → Notice｜忽略→注意',content:'第一画面 / 第一承诺',proof:'尚未建立证明',action:'继续观看'},
 {label:'Problem / Desire｜问题/欲望',start:3,end:7,user:'Notice → Understand｜注意→理解',content:'把场景和需求说清楚',proof:'商品与问题开始建立关系',action:'理解为什么与我有关'},
 {label:'Demo｜演示',start:7,end:14,user:'Understand → Believe｜理解→相信',content:'展示动作、过程或使用方式',proof:'可观察的商品行为',action:'形成商品理解'},
 {label:'Proof｜证明',start:14,end:21,user:'Believe → Want｜相信→想要',content:'证据、对比、细节或真实反馈',proof:'降低结果与商品事实的不确定性',action:'形成购买动机'},
 {label:'CTA｜行动引导',start:21,end:26,user:'Want → Act｜想要→行动',content:'明确下一步',proof:'不新增未经证明的承诺',action:'进入商品/购买动作'}
] as const

export function VideoAnalyzerScene(){
 const [t,setT]=useState(0)
 const [proofOn,setProofOn]=useState(true)
 const [variant,setVariant]=useState<'A'|'B'>('A')
 const beat=useMemo(()=>beats.find(x=>t>=x.start&&t<x.end)??beats[beats.length-1],[t])
 const belief=proofOn?(t<7?'低':t<14?'建立中':t<21?'增强':'可承接'):(t<14?'低':'证据断层')
 return <section className="workbench video-benchmark">
  <div className="scene-heading"><div><div className="eyebrow">Benchmark 04｜视频成交解剖</div><h1>拖动时间，不是看“剪辑”，而是看用户状态如何被内容改变。</h1><p>教学案例为 E5｜模拟。接入真实视频后，播放头、结构、商品证明与用户状态可按同一时间轴同步。</p></div><div className="status-chip">4-track Timeline｜四轨时间轴</div></div>
  <div className="video-analysis-stage">
   <div className="video-surface">
    <div className="video-topline"><span>Case {variant}｜案例 {variant}</span><strong>{t.toFixed(1)}s / 26s</strong></div>
    <div className="video-frame"><div><span>{beat.label}</span><h2>{variant==='A'?'结构完整：证明与行动连续':'开场更强：但证明位置后移'}</h2><p>本地真实案例视频素材接入位。当前先验证教学交互、时间同步与课堂推演。</p></div></div>
    <input aria-label="视频时间轴" type="range" min="0" max="26" step=".1" value={t} onChange={e=>setT(Number(e.target.value))}/>
    <div className="beat-track">{beats.map(b=><button key={b.label} className={beat===b?'active':''} onClick={()=>setT(b.start)}><strong>{b.label}</strong><small>{b.start}–{b.end}s</small></button>)}</div>
   </div>
   <aside className="video-control-room">
    <div className="eyebrow">Teaching Controls｜教学控制</div>
    <div className="ab-switch"><button className={variant==='A'?'active':''} onClick={()=>setVariant('A')}>A｜结构完整</button><button className={variant==='B'?'active':''} onClick={()=>setVariant('B')}>B｜钩子更强</button></div>
    <button className={proofOn?'active':''} onClick={()=>setProofOn(v=>!v)}>{proofOn?'Remove Proof｜移除证明':'Restore Proof｜恢复证明'}</button>
    <article><span>Belief State｜相信状态</span><strong>{belief}</strong><p>{proofOn?'证明轨道存在，观察用户状态能否继续推进。':'Proof｜证明被移除：注意力仍可能存在，但“相信”与“想要”之间出现断层。'}</p></article>
   </aside>
  </div>
  <div className="multi-track-timeline">
   <div><span>User State｜用户状态</span><strong>{beat.user}</strong></div>
   <div><span>Content Structure｜内容结构</span><strong>{beat.content}</strong></div>
   <div className={!proofOn?'track-muted':''}><span>Product Proof｜商品证明</span><strong>{proofOn?beat.proof:'REMOVED｜已移除'}</strong></div>
   <div><span>Next Action｜下一动作</span><strong>{beat.action}</strong></div>
  </div>
 </section>
}
