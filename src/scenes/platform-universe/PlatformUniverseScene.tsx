import { useEffect, useMemo, useRef, useState } from 'react'
import { mechanisms, platforms, products } from '../../data/platforms'
import { useSceneStore } from '../../store/sceneStore'
import { useCourseStore } from '../../store/courseStore'
import { pulseNode, revealPanel } from '../../motion/platformMotion'
import type { MechanismId, Platform } from '../../types/platform'

const mechanismColor: Record<MechanismId, string> = {
 search:'var(--mech-search)',content:'var(--mech-content)',mall:'var(--mech-mall)',deal:'var(--mech-deal)',direct:'var(--mech-direct)'
}

const productLenses:Record<string,MechanismId[]>={
 'search-product':['search','mall'],
 'visual-product':['content','mall'],
 'regional-product':['mall','search','content']
}

export function PlatformUniverseScene(){
 const selectedId=useSceneStore(s=>s.selectedPlatformId)
 const compareIds=useSceneStore(s=>s.compareIds)
 const productId=useSceneStore(s=>s.productId)
 const showLabels=useSceneStore(s=>s.showLabels)
 const setSelected=useSceneStore(s=>s.setSelectedPlatformId)
 const toggleCompare=useSceneStore(s=>s.toggleCompare)
 const clearCompare=useSceneStore(s=>s.clearCompare)
 const setProductId=useSceneStore(s=>s.setProductId)
 const setShowLabels=useSceneStore(s=>s.setShowLabels)
 const reset=useSceneStore(s=>s.reset)
 const instructorMode=useCourseStore(s=>s.instructorMode)
 const resetToken=useCourseStore(s=>s.sceneResetToken)
 const [level,setLevel]=useState<1|2|3>(1)
 const [mechanismFocus,setMechanismFocus]=useState<MechanismId|null>(null)
 const panelRef=useRef<HTMLDivElement>(null)

 const selected=platforms.find(p=>p.id===selectedId)??null
 const compared=platforms.filter(p=>compareIds.includes(p.id))
 const activeProduct=products.find(p=>p.id===productId)!
 const lens=productLenses[productId]??[]
 const related=useMemo(()=>mechanismFocus?new Set(platforms.filter(p=>p.mechanisms.includes(mechanismFocus)).map(p=>p.id)):new Set<string>(),[mechanismFocus])

 useEffect(()=>{if(selected||compareIds.length)revealPanel(panelRef.current)},[selectedId,compareIds.length,selected])
 useEffect(()=>{reset();setLevel(1);setMechanismFocus(null)},[resetToken,reset])

 function focusMechanism(id:MechanismId){setMechanismFocus(id);setLevel(2);setSelected(null)}
 function focusPlatform(id:string,e:SVGGElement){pulseNode(e);if(compareIds.length)toggleCompare(id);else{setSelected(id);setLevel(3)}}

 return <div className="benchmark-layout platform-benchmark">
  <section className="universe-panel">
   <div className="scene-heading">
    <div><div className="eyebrow">Benchmark 01｜Platform Universe｜平台世界</div><h1>先理解“用户如何发现商品”，再理解平台。</h1><p>平台比较的是发现机制、商品承接、信任与履约结构，不做平台好坏排名。</p></div>
    <div className="product-switcher"><label>Product Lens｜商品视角</label><select value={productId} onChange={e=>{setProductId(e.target.value);setMechanismFocus(null);setLevel(1)}}>{products.map(p=><option key={p.id} value={p.id}>{p.zh}｜{p.en}</option>)}</select><p>{activeProduct.descriptionZh}</p><small>当前优先观察：{lens.map(id=>mechanisms.find(m=>m.id===id)?.zh).join(' / ')}。这是教学观察顺序，不是平台评分。</small></div>
   </div>

   <div className="semantic-level-bar">
    <span>Semantic Zoom｜语义缩放</span>
    <button className={level===1?'active':''} onClick={()=>{setLevel(1);setMechanismFocus(null);setSelected(null)}}>L1 系统骨架</button>
    <button className={level===2?'active':''} onClick={()=>setLevel(2)}>L2 发现机制</button>
    <button className={level===3?'active':''} onClick={()=>setLevel(3)}>L3 平台路径</button>
   </div>

   <div className={'universe-canvas semantic-l'+level}>
    <svg viewBox="0 0 1000 650" role="img" aria-label="全球跨境平台发现机制关系图">
     <defs><filter id="softGlow"><feGaussianBlur stdDeviation="7" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
     {mechanisms.flatMap(m=>platforms.filter(p=>p.mechanisms.includes(m.id)).map(p=>{
      const focus=mechanismFocus===m.id
      const lensActive=!mechanismFocus&&lens.includes(m.id)
      const platformActive=!mechanismFocus||related.has(p.id)
      const opacity=focus?0.95:lensActive?0.62:mechanismFocus&&platformActive?0.45:0.16
      return <path key={m.id+'-'+p.id} className="relation-line" d={'M '+(m.x*10)+' '+(m.y*6.5)+' Q 500 325 '+(p.x*10)+' '+(p.y*6.5)} stroke={mechanismColor[m.id]} style={{opacity}}/>
     }))}
     {mechanisms.map(m=>{
      const selectedMechanism=mechanismFocus===m.id
      const priority=lens.includes(m.id)
      return <g key={m.id} className={'mechanism-node '+(selectedMechanism?'selected ':'')+(priority?'priority':'')} transform={'translate('+(m.x*10)+','+(m.y*6.5)+')'} onClick={()=>focusMechanism(m.id)} role="button" tabIndex={0} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();focusMechanism(m.id)}}><circle r={selectedMechanism?55:48} fill={mechanismColor[m.id]} opacity=".10"/><circle r={selectedMechanism?42:36} fill="var(--surface-2)" stroke={mechanismColor[m.id]} strokeWidth={selectedMechanism?2.5:1.5}/><text textAnchor="middle" y="-3" className="node-title">{m.zh}</text><text textAnchor="middle" y="17" className="node-en">{m.en}</text></g>
     })}
     <g transform="translate(500,325)" className="product-core" filter="url(#softGlow)"><circle r={level===1?72:58}/><text textAnchor="middle" y="-8" className="product-title">商品</text><text textAnchor="middle" y="16" className="node-en">Product</text><text textAnchor="middle" y="39" className="product-sub">{activeProduct.zh}</text></g>
     {platforms.map(p=>{
      const isSelected=selectedId===p.id||compareIds.includes(p.id)
      const isRelated=!mechanismFocus||related.has(p.id)
      const opacity=selectedId&&!isSelected?0.18:mechanismFocus&&!isRelated?0.12:1
      return <g key={p.id} className={'platform-node '+(isSelected?'selected ':'')+(isRelated?'related':'')} transform={'translate('+(p.x*10)+','+(p.y*6.5)+')'} opacity={opacity} onClick={e=>focusPlatform(p.id,e.currentTarget)} role="button" tabIndex={0} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();if(compareIds.length)toggleCompare(p.id);else{setSelected(p.id);setLevel(3)}}}}><circle r={isSelected?41:35}/><text textAnchor="middle" y="4" className="platform-label">{p.name}</text>{showLabels&&p.zh&&<text textAnchor="middle" y="22" className="node-en">{p.zh}</text>}</g>
     })}
    </svg>
    <div className="canvas-hint">{mechanismFocus?'当前机制：'+mechanisms.find(m=>m.id===mechanismFocus)?.zh+'。高亮的是与该发现机制有关的平台。':'点击发现机制观察关系；点击平台进入其用户路径。'}</div>
   </div>

   <div className="platform-observation-strip">
    <article><span>Product Lens｜商品视角</span><strong>{activeProduct.zh}</strong><p>改变“先观察什么”，不改变平台结论。</p></article>
    <article><span>Mechanism Focus｜机制焦点</span><strong>{mechanismFocus?mechanisms.find(m=>m.id===mechanismFocus)?.zh:'全局'}</strong><p>{mechanismFocus?'只突出相关连接，观察平台发现结构差异。':'从商品→发现机制→平台建立系统骨架。'}</p></article>
    <article><span>Knowledge Depth｜知识深度</span><strong>L{level}</strong><p>{level===1?'系统骨架':level===2?'机制关系':'平台路径与比较'}</p></article>
   </div>

   <div className="quick-actions">
    <button className={compareIds.length?'active':''} onClick={()=>compareIds.length?clearCompare():toggleCompare('amazon')}>Compare Mode｜平台比较</button>
    <button onClick={()=>{clearCompare();toggleCompare('amazon');toggleCompare('tiktok');setLevel(3)}}>Amazon × TikTok Shop</button>
    <button onClick={()=>{clearCompare();toggleCompare('tiktok');toggleCompare('noon');setLevel(3)}}>TikTok Shop × Noon</button>
    <button onClick={()=>setShowLabels(!showLabels)}>Chinese Labels｜中文辅助 {showLabels?'ON':'OFF'}</button>
   </div>
   {instructorMode&&<div className="instructor-strip"><span>Presenter Control｜讲师控制</span><button onClick={()=>{setLevel(1);setMechanismFocus(null);setSelected(null);clearCompare()}}>Step 1｜系统骨架</button><button onClick={()=>focusMechanism('content')}>Step 2｜内容发现</button><button onClick={()=>{setSelected('tiktok');setLevel(3)}}>Step 3｜TikTok路径</button></div>}
  </section>

  <aside className="insight-panel" ref={panelRef}>
   {!selected&&compared.length<2&&<div className="empty-insight"><div className="eyebrow">Knowledge Lens｜知识视角</div><h2>{mechanismFocus?'正在观察发现机制':'平台不是 Logo 清单。'}</h2><p>{mechanismFocus?'点击高亮平台，继续下钻其“发现 → 理解 → 信任 → 交易 → 履约”路径。':'先从商品原型出发，观察不同发现机制如何连接到不同平台。'}</p><div className="legend">{mechanisms.map(m=><button key={m.id} className={mechanismFocus===m.id?'active':''} onClick={()=>focusMechanism(m.id)}><span style={{background:mechanismColor[m.id]}}/>{m.zh}<small>{m.en}</small></button>)}</div></div>}
   {selected&&<PlatformDetail platform={selected} onClose={()=>{setSelected(null);setLevel(2)}}/>}
   {compared.length===2&&<PlatformCompare a={compared[0]} b={compared[1]} onClose={clearCompare}/>}
  </aside>
 </div>
}

function PlatformDetail({platform,onClose}:{platform:Platform;onClose:()=>void}){
 return <div className="detail-view"><button className="back-btn" onClick={onClose}>← 返回机制世界</button><div className="eyebrow">Knowledge Zoom｜知识钻取</div><h2>{platform.name}{platform.zh?'｜'+platform.zh:''}</h2><p className="lead">{platform.positioningZh}</p>
  <div className="journey-chain">{platform.journey.length?platform.journey.map((j,idx)=><div key={j.id} className="journey-step"><div className="step-index">{String(idx+1).padStart(2,'0')}</div><div><strong>{j.zh}</strong><small>{j.en}</small><p>{j.noteZh}</p></div></div>):<p className="muted">当前先展示平台主结构；深层路径需要后续真实平台素材补强。</p>}</div>
  <div className="knowledge-grid"><article><span>Discovery｜用户如何发现</span><p>{platform.discoveryZh}</p></article><article><span>Trust｜用户为什么相信</span><p>{platform.trustZh}</p></article><article><span>Fulfillment｜履约意味着什么</span><p>{platform.fulfillmentZh}</p></article><article><span>Research Next｜下一步研究</span><p>{platform.suitableZh.join('；')}</p></article></div>
  <div className="caution-box"><strong>Boundary｜边界</strong><p>{platform.cautionZh.join('；')}</p></div><div className="source-card"><strong>Evidence State｜资料状态</strong><span>教学结构示例｜动态平台规则、费率、准入与功能需按开课时间核验</span></div>
 </div>
}

function PlatformCompare({a,b,onClose}:{a:Platform;b:Platform;onClose:()=>void}){
 const rows=[['Positioning｜定位',a.positioningZh,b.positioningZh],['Discovery｜发现',a.discoveryZh,b.discoveryZh],['Trust｜信任',a.trustZh,b.trustZh],['Fulfillment｜履约',a.fulfillmentZh,b.fulfillmentZh],['Research Next｜进一步研究',a.suitableZh.join('；'),b.suitableZh.join('；')],['Boundary｜警惕',a.cautionZh.join('；'),b.cautionZh.join('；')]]
 return <div className="compare-view"><button className="back-btn" onClick={onClose}>← 退出比较</button><div className="eyebrow">Compare Space｜平台比较</div><div className="compare-head"><h2>{a.name}</h2><span>VS</span><h2>{b.name}</h2></div><p className="compare-rule">比较经营结构与用户路径，不生成“谁更好”的排序。</p><div className="compare-table">{rows.map(([label,av,bv])=><div className="compare-row" key={label}><strong>{label}</strong><p>{av}</p><p>{bv}</p></div>)}</div></div>
}
