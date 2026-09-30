import { useEffect, useRef } from 'react'
import { mechanisms, platforms, products } from '../../data/platforms'
import { useSceneStore } from '../../store/sceneStore'
import { useCourseStore } from '../../store/courseStore'
import { pulseNode, revealPanel } from '../../motion/platformMotion'
import type { MechanismId, Platform } from '../../types/platform'

const mechanismColor: Record<MechanismId, string> = {
  search: 'var(--mech-search)', content: 'var(--mech-content)', mall: 'var(--mech-mall)', deal: 'var(--mech-deal)', direct: 'var(--mech-direct)'
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
  const panelRef = useRef<HTMLDivElement>(null)

  const selected = platforms.find((p) => p.id === selectedId) ?? null
  const compared = platforms.filter((p) => compareIds.includes(p.id))
  const activeProduct = products.find((p) => p.id === productId)!

  useEffect(() => {
    if (selected || compareIds.length) revealPanel(panelRef.current)
  }, [selectedId, compareIds.length, selected])
  useEffect(() => { reset() }, [resetToken, reset])

  return (
    <div className="benchmark-layout">
      <section className="universe-panel">
        <div className="scene-heading">
          <div><div className="eyebrow">核心场景 01 · Platform Universe｜平台世界</div><h1>先理解“用户如何发现商品”，再理解平台。</h1></div>
          <div className="product-switcher">
            <label>当前商品原型</label>
            <select value={productId} onChange={(e) => setProductId(e.target.value)}>
              {products.map((p) => <option key={p.id} value={p.id}>{p.zh}｜{p.en}</option>)}
            </select>
            <p>{activeProduct.descriptionZh}</p><small>商品原型只改变课堂观察视角，不生成平台优劣分数。</small>
          </div>
        </div>
        <div className="universe-canvas">
          <svg viewBox="0 0 1000 650" role="img" aria-label="全球跨境平台发现机制关系图">
            <defs><filter id="softGlow"><feGaussianBlur stdDeviation="8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
            {mechanisms.map((m) => platforms.filter(p => p.mechanisms.includes(m.id)).map((p) => (
              <path key={`${m.id}-${p.id}`} className="relation-line" d={`M ${m.x*10} ${m.y*6.5} Q 500 325 ${p.x*10} ${p.y*6.5}`} stroke={mechanismColor[m.id]} />
            )))}
            {mechanisms.map((m) => (
              <g key={m.id} className="mechanism-node" transform={`translate(${m.x*10},${m.y*6.5})`}>
                <circle r="55" fill={mechanismColor[m.id]} opacity=".10" /><circle r="41" fill="var(--surface-2)" stroke={mechanismColor[m.id]} strokeWidth="1.5" />
                <text textAnchor="middle" y="-3" className="node-title">{m.zh}</text><text textAnchor="middle" y="17" className="node-en">{m.en}</text>
              </g>
            ))}
            <g transform="translate(500,325)" className="product-core" filter="url(#softGlow)">
              <circle r="67" /><text textAnchor="middle" y="-8" className="product-title">商品</text><text textAnchor="middle" y="17" className="node-en">Product</text><text textAnchor="middle" y="39" className="product-sub">{activeProduct.zh}</text>
            </g>
            {platforms.map((p) => {
              const isSelected = selectedId === p.id || compareIds.includes(p.id)
              return (
                <g key={p.id} className={`platform-node ${isSelected ? 'selected' : ''}`} transform={`translate(${p.x*10},${p.y*6.5})`} opacity={selectedId && !isSelected ? 0.22 : 1}
                  onClick={(e) => { pulseNode(e.currentTarget); if (compareIds.length) toggleCompare(p.id); else setSelected(p.id) }}>
                  <circle r={36} /><text textAnchor="middle" y="4" className="platform-label">{p.name}</text>
                  {showLabels && p.zh && <text textAnchor="middle" y="22" className="node-en">{p.zh}</text>}
                </g>
              )
            })}
          </svg>
          <div className="canvas-hint">点击平台进入知识世界；开启“平台比较”后选择两个平台。</div>
        </div>
        <div className="quick-actions">
          <button className={compareIds.length ? 'active' : ''} onClick={() => compareIds.length ? clearCompare() : toggleCompare('amazon')}>平台比较</button>
          <button onClick={() => { clearCompare(); toggleCompare('amazon'); toggleCompare('tiktok') }}>Amazon × TikTok Shop</button>
          <button onClick={() => { clearCompare(); toggleCompare('tiktok'); toggleCompare('noon') }}>TikTok Shop × Noon</button>
          <button onClick={() => setShowLabels(!showLabels)}>Mechanism Labels｜机制辅助 {showLabels?'ON':'OFF'}</button>
        </div>
        {instructorMode && <div className="instructor-strip"><span>讲师控制</span><button onClick={() => setShowLabels(!showLabels)}>{showLabels ? '隐藏平台中文辅助' : '显示平台中文辅助'}</button><button onClick={() => setSelected(null)}>回到平台世界</button><button onClick={() => { clearCompare(); toggleCompare('amazon'); toggleCompare('tiktok') }}>步骤：打开 Amazon / TikTok 对比</button></div>}
      </section>
      <aside className="insight-panel" ref={panelRef}>
        {!selected && compared.length < 2 && <div className="empty-insight"><div className="eyebrow">深入理解</div><h2>平台不是 Logo 清单。</h2><p>点击任一平台，观察“发现 → 商品理解 → 信任 → 交易 → 履约”怎样重新组织。</p><div className="legend">{mechanisms.map(m => <div key={m.id}><span style={{background:mechanismColor[m.id]}} />{m.zh}<small>{m.en}</small></div>)}</div></div>}
        {selected && <PlatformDetail platform={selected} onClose={() => setSelected(null)} />}
        {compared.length === 2 && <PlatformCompare a={compared[0]} b={compared[1]} onClose={clearCompare} />}
      </aside>
    </div>
  )
}

function PlatformDetail({ platform, onClose }: { platform: Platform; onClose: () => void }) {
  return <div className="detail-view"><button className="back-btn" onClick={onClose}>← 返回平台世界</button><div className="eyebrow">Knowledge Zoom｜知识钻取</div><h2>{platform.name}{platform.zh ? `｜${platform.zh}` : ''}</h2><p className="lead">{platform.positioningZh}</p>
    <div className="journey-chain">{platform.journey.length ? platform.journey.map((j, idx) => <div key={j.id} className="journey-step"><div className="step-index">{String(idx+1).padStart(2,'0')}</div><div><strong>{j.zh}</strong><small>{j.en}</small><p>{j.noteZh}</p></div></div>) : <p className="muted">本标杆版本先实现平台主结构；深层路径将在后续课程资产中继续补齐。</p>}</div>
    <div className="knowledge-grid"><article><span>用户如何发现</span><p>{platform.discoveryZh}</p></article><article><span>用户为什么相信</span><p>{platform.trustZh}</p></article><article><span>履约意味着什么</span><p>{platform.fulfillmentZh}</p></article><article><span>适合进一步研究</span><p>{platform.suitableZh.join('；')}</p></article></div>
    <div className="caution-box"><strong>不要直接下结论</strong><p>{platform.cautionZh.join('；')}</p></div><div className="source-card"><strong>资料状态</strong><span>教学结构示例｜动态规则需按开课时间核验</span></div></div>
}

function PlatformCompare({ a, b, onClose }: { a: Platform; b: Platform; onClose: () => void }) {
  const rows = [['定位', a.positioningZh, b.positioningZh],['用户如何发现', a.discoveryZh, b.discoveryZh],['信任如何形成', a.trustZh, b.trustZh],['履约重点', a.fulfillmentZh, b.fulfillmentZh],['适合进一步研究', a.suitableZh.join('；'), b.suitableZh.join('；')],['需要警惕', a.cautionZh.join('；'), b.cautionZh.join('；')]]
  return <div className="compare-view"><button className="back-btn" onClick={onClose}>← 退出比较</button><div className="eyebrow">Compare Space｜平台比较</div><div className="compare-head"><h2>{a.name}</h2><span>VS</span><h2>{b.name}</h2></div><p className="compare-rule">比较的是经营结构，不是给平台做“好坏排名”。</p><div className="compare-table">{rows.map(([label,av,bv]) => <div className="compare-row" key={label}><strong>{label}</strong><p>{av}</p><p>{bv}</p></div>)}</div></div>
}