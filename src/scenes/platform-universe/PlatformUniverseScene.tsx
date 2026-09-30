import { useEffect, useRef, useState } from 'react'
import { mechanisms, platforms, products } from '../../data/platforms'
import { useSceneStore } from '../../store/sceneStore'
import { useCourseStore } from '../../store/courseStore'
import { pulseNode, revealPanel } from '../../motion/platformMotion'
import type { MechanismId, Platform } from '../../types/platform'

const mechanismColor: Record<MechanismId, string> = {
  search: 'var(--mech-search)',
  content: 'var(--mech-content)',
  mall: 'var(--mech-mall)',
  deal: 'var(--mech-deal)',
  direct: 'var(--mech-direct)',
}

export function PlatformUniverseScene() {
  const selectedId = useSceneStore((s) => s.selectedPlatformId)
  const compareIds = useSceneStore((s) => s.compareIds)
  const productId = useSceneStore((s) => s.productId)
  const instructorMode = useCourseStore((s) => s.instructorMode)
  const resetToken = useCourseStore((s) => s.sceneResetToken)
  const showLabels = useSceneStore((s) => s.showLabels)
  const setSelected = useSceneStore((s) => s.setSelectedPlatformId)
  const toggleCompare = useSceneStore((s) => s.toggleCompare)
  const clearCompare = useSceneStore((s) => s.clearCompare)
  const setProductId = useSceneStore((s) => s.setProductId)
  const setShowLabels = useSceneStore((s) => s.setShowLabels)
  const reset = useSceneStore((s) => s.reset)
  const [compareMode,setCompareMode] = useState(false)
  const [activeMechanism,setActiveMechanism] = useState<MechanismId | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const selected = platforms.find((p) => p.id === selectedId) ?? null
  const compared = platforms.filter((p) => compareIds.includes(p.id))
  const activeProduct = products.find((p) => p.id === productId)!
  const mechanism = mechanisms.find((m)=>m.id===activeMechanism) ?? null
  const mechanismPlatforms = activeMechanism ? platforms.filter((p)=>p.mechanisms.includes(activeMechanism)) : []

  useEffect(() => {
    if (selected || compareIds.length) revealPanel(panelRef.current)
  }, [selectedId, compareIds.length, selected])

  useEffect(() => {
    reset()
    setCompareMode(false)
    setActiveMechanism(null)
  }, [resetToken, reset])

  function choosePlatform(id:string, target:SVGGElement){
    pulseNode(target)
    if(compareMode) toggleCompare(id)
    else setSelected(id)
  }

  function startCompare(ids:string[]=[]){
    clearCompare()
    setSelected(null)
    setCompareMode(true)
    ids.forEach(toggleCompare)
  }

  function exitCompare(){
    clearCompare()
    setCompareMode(false)
  }

  return (
    <div className="benchmark-layout platform-benchmark">
      <section className="universe-panel">
        <div className="scene-heading">
          <div>
            <div className="eyebrow">Benchmark 01｜Platform Universe｜平台世界</div>
            <h1>先理解“商品怎样被发现”，再理解平台。</h1>
            <p>点机制看连接，点平台做知识钻取；比较的是经营结构，不生成平台优劣分数。</p>
          </div>
          <div className="product-switcher">
            <label>Product Lens｜商品视角</label>
            <select value={productId} onChange={(e) => setProductId(e.target.value)}>
              {products.map((p) => <option key={p.id} value={p.id}>{p.zh}｜{p.en}</option>)}
            </select>
            <p>{activeProduct.descriptionZh}</p>
            <small>E5｜教学原型只改变课堂观察视角，不代表平台适配度评分。</small>
          </div>
        </div>

        <div className="platform-mode-strip">
          <button className={!activeMechanism&&!compareMode?'active':''} onClick={()=>{setActiveMechanism(null);exitCompare()}}>World｜全景</button>
          <button className={activeMechanism?'active':''} onClick={()=>{setActiveMechanism(activeMechanism??'content');exitCompare()}}>Mechanism｜发现机制</button>
          <button className={compareMode?'active':''} onClick={()=>compareMode?exitCompare():startCompare()}>Compare｜平台比较</button>
          <span>{compareMode?'选择两个平台进行结构比较':mechanism?mechanism.zh+'｜'+mechanism.en:'从发现机制进入平台知识世界'}</span>
        </div>

        <div className="universe-canvas">
          <svg viewBox="0 0 1000 650" role="img" aria-label="全球跨境平台发现机制关系图">
            <defs>
              <filter id="softGlow"><feGaussianBlur stdDeviation="8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>

            {mechanisms.map((m) => platforms.filter(p => p.mechanisms.includes(m.id)).map((p) => {
              const mechanismActive=!activeMechanism || activeMechanism===m.id
              const platformActive=!activeMechanism || p.mechanisms.includes(activeMechanism)
              return <path
                key={m.id+'-'+p.id}
                className={'relation-line '+(mechanismActive&&platformActive?'active':'muted')}
                d={'M '+(m.x*10)+' '+(m.y*6.5)+' Q 500 325 '+(p.x*10)+' '+(p.y*6.5)}
                stroke={mechanismColor[m.id]}
              />
            }))}

            {mechanisms.map((m) => {
              const active=activeMechanism===m.id
              return <g
                key={m.id}
                className={'mechanism-node '+(active?'selected':'')+(activeMechanism&&!active?' inactive':'')}
                transform={'translate('+(m.x*10)+','+(m.y*6.5)+')'}
                onClick={()=>{setActiveMechanism(active?null:m.id);exitCompare()}}
                role="button"
                tabIndex={0}
                onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setActiveMechanism(active?null:m.id);exitCompare()}}}
              >
                <circle className="mechanism-halo" r="55" fill={mechanismColor[m.id]} opacity=".10"/>
                <circle className="mechanism-core" r="41" stroke={mechanismColor[m.id]} strokeWidth="1.5"/>
                <text textAnchor="middle" y="-3" className="node-title">{m.zh}</text>
                <text textAnchor="middle" y="17" className="node-en">{m.en}</text>
              </g>
            })}

            <g transform="translate(500,325)" className="product-core" filter="url(#softGlow)">
              <circle r="67"/>
              <text textAnchor="middle" y="-8" className="product-title">商品</text>
              <text textAnchor="middle" y="17" className="node-en">Product</text>
              <text textAnchor="middle" y="39" className="product-sub">{activeProduct.zh}</text>
            </g>

            {platforms.map((p) => {
              const isSelected = selectedId === p.id || compareIds.includes(p.id)
              const mechanismRelated = !activeMechanism || p.mechanisms.includes(activeMechanism)
              const dimByPlatform = selectedId && !isSelected
              return (
                <g
                  key={p.id}
                  className={'platform-node '+(isSelected?'selected ':'')+(mechanismRelated?'related':'inactive')}
                  transform={'translate('+(p.x*10)+','+(p.y*6.5)+')'}
                  opacity={dimByPlatform ? 0.18 : mechanismRelated ? 1 : 0.16}
                  onClick={(e) => choosePlatform(p.id,e.currentTarget)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault(); if(compareMode)toggleCompare(p.id);else setSelected(p.id)}}}
                >
                  <circle r={36}/>
                  <text textAnchor="middle" y="4" className="platform-label">{p.name}</text>
                  {showLabels && p.zh && <text textAnchor="middle" y="22" className="node-en">{p.zh}</text>}
                </g>
              )
            })}
          </svg>
          <div className="canvas-hint">{compareMode?'Compare Mode｜比较模式：选择两个平台':activeMechanism?'Mechanism Focus｜机制聚焦：只强调与当前发现机制直接连接的平台':'点击发现机制或平台继续探索'}</div>
        </div>

        {mechanism && <div className="mechanism-focus-strip">
          <div><span>Mechanism Focus｜当前机制</span><strong>{mechanism.zh}｜{mechanism.en}</strong></div>
          <div className="mechanism-platforms">{mechanismPlatforms.map(p=><button key={p.id} onClick={()=>setSelected(p.id)}>{p.name}{p.zh?'｜'+p.zh:''}</button>)}</div>
          <small>这里只展示“结构上存在该发现入口”，不表示该平台对当前商品更优。</small>
        </div>}

        <div className="quick-actions">
          <button onClick={() => startCompare(['amazon','tiktok'])}>Amazon × TikTok Shop</button>
          <button onClick={() => startCompare(['tiktok','noon'])}>TikTok Shop × Noon</button>
          <button onClick={() => {setActiveMechanism('search');exitCompare()}}>Search｜搜索发现</button>
          <button onClick={() => {setActiveMechanism('content');exitCompare()}}>Content｜内容发现</button>
          <button onClick={() => setShowLabels(!showLabels)}>中文辅助 {showLabels?'ON':'OFF'}</button>
        </div>

        {instructorMode && <div className="instructor-strip">
          <span>讲师控制</span>
          <button onClick={()=>{setActiveMechanism(null);exitCompare();setSelected(null)}}>回到平台世界</button>
          <button onClick={()=>setActiveMechanism('content')}>步骤：内容发现</button>
          <button onClick={()=>startCompare(['amazon','tiktok'])}>步骤：Amazon / TikTok 对比</button>
        </div>}
      </section>

      <aside className="insight-panel" ref={panelRef}>
        {!selected && compared.length < 2 && <div className="empty-insight">
          <div className="eyebrow">Knowledge Zoom｜知识钻取</div>
          <h2>{mechanism?'从“'+mechanism.zh+'”看平台结构':'平台不是 Logo 清单。'}</h2>
          <p>{mechanism?'观察哪些平台包含该发现入口，再进入平台内部看“发现 → 理解 → 信任 → 交易 → 履约”怎样组织。':'点击任一平台，观察“发现 → 商品理解 → 信任 → 交易 → 履约”怎样重新组织。'}</p>
          <div className="legend">{mechanisms.map(m => <button key={m.id} className={activeMechanism===m.id?'active':''} onClick={()=>setActiveMechanism(activeMechanism===m.id?null:m.id)}><span style={{background:mechanismColor[m.id]}} />{m.zh}<small>{m.en}</small></button>)}</div>
        </div>}
        {selected && <PlatformDetail platform={selected} onClose={() => setSelected(null)} />}
        {compared.length === 2 && <PlatformCompare a={compared[0]} b={compared[1]} onClose={exitCompare} />}
        {compareMode && compared.length < 2 && <div className="empty-insight"><div className="eyebrow">Compare Space｜平台比较</div><h2>请选择两个平台。</h2><p>比较发现机制、信任结构、履约与经营边界；不输出“最佳平台”。</p><strong>{compared.length}/2 已选择</strong></div>}
      </aside>
    </div>
  )
}

function PlatformDetail({ platform, onClose }: { platform: Platform; onClose: () => void }) {
  return <div className="detail-view">
    <button className="back-btn" onClick={onClose}>← 返回平台世界</button>
    <div className="eyebrow">Knowledge Zoom｜知识钻取</div>
    <h2>{platform.name}{platform.zh ? '｜'+platform.zh : ''}</h2>
    <p className="lead">{platform.positioningZh}</p>
    <div className="journey-chain">{platform.journey.length ? platform.journey.map((j, idx) => <div key={j.id} className="journey-step"><div className="step-index">{String(idx+1).padStart(2,'0')}</div><div><strong>{j.zh}</strong><small>{j.en}</small><p>{j.noteZh}</p></div></div>) : <p className="muted">本课程先保留平台主结构；具体动态路径按开课时间核验。</p>}</div>
    <div className="knowledge-grid">
      <article><span>Discovery｜用户如何发现</span><p>{platform.discoveryZh}</p></article>
      <article><span>Trust｜用户为什么相信</span><p>{platform.trustZh}</p></article>
      <article><span>Fulfillment｜履约意味着什么</span><p>{platform.fulfillmentZh}</p></article>
      <article><span>Research Next｜下一步研究</span><p>{platform.suitableZh.join('；')}</p></article>
    </div>
    <div className="caution-box"><strong>Boundary｜判断边界</strong><p>{platform.cautionZh.join('；')}</p></div>
    <div className="source-card"><strong>Evidence Status｜资料状态</strong><span>教学结构示例；动态规则、费用、准入与履约条件需按开课时间核验。</span></div>
  </div>
}

function PlatformCompare({ a, b, onClose }: { a: Platform; b: Platform; onClose: () => void }) {
  const rows = [
    ['Positioning｜定位', a.positioningZh, b.positioningZh],
    ['Discovery｜用户如何发现', a.discoveryZh, b.discoveryZh],
    ['Trust｜信任如何形成', a.trustZh, b.trustZh],
    ['Fulfillment｜履约重点', a.fulfillmentZh, b.fulfillmentZh],
    ['Research Next｜适合进一步研究', a.suitableZh.join('；'), b.suitableZh.join('；')],
    ['Boundary｜需要警惕', a.cautionZh.join('；'), b.cautionZh.join('；')],
  ]
  return <div className="compare-view">
    <button className="back-btn" onClick={onClose}>← 退出比较</button>
    <div className="eyebrow">Compare Space｜平台比较</div>
    <div className="compare-head"><h2>{a.name}</h2><span>VS</span><h2>{b.name}</h2></div>
    <p className="compare-rule">比较经营结构，不给平台做“好坏排名”。</p>
    <div className="compare-table">{rows.map(([label,av,bv]) => <div className="compare-row" key={label}><strong>{label}</strong><p>{av}</p><p>{bv}</p></div>)}</div>
  </div>
}
