import { useMemo, useState } from 'react'

export function IncrementalityLab(){
  const [baseline,setBaseline]=useState(120)
  const [current,setCurrent]=useState(180)
  const [control,setControl]=useState(140)
  const [attributed,setAttributed]=useState(110)
  const [spend,setSpend]=useState(40)
  const [contributionRate,setContributionRate]=useState(35)

  const observedLift=current-baseline
  const comparisonLift=current-control
  const attributedGap=attributed-comparisonLift
  const contributionAfterSpend=useMemo(
    ()=>comparisonLift*(contributionRate/100)-spend,
    [comparisonLift,contributionRate,spend],
  )

  const note=comparisonLift<=0
    ? '当前对照差额没有显示正向提升；先检查样本、周期和可比性。'
    : attributedGap>0
      ? '归因成交高于同期对照差额。归因结果不能直接解释为全部新增成交。'
      : '归因成交没有超过同期对照差额，但仍需检查样本、季节性和其他同时发生的变化。'

  const fields=[
    ['Baseline Net Sales｜基准净销售',baseline,setBaseline,20,300],
    ['Current Net Sales｜当前净销售',current,setCurrent,20,400],
    ['Comparable Control｜可比对照',control,setControl,20,300],
    ['Attributed Sales｜归因成交',attributed,setAttributed,0,300],
    ['Ad Spend｜广告花费',spend,setSpend,0,180],
    ['Contribution Rate｜贡献率',contributionRate,setContributionRate,5,70],
  ] as const

  return <section className="incrementality-lab mother-component">
    <header><span>Incrementality Lab｜增量判断实验室</span><strong>Attribution｜归因 ≠ Incrementality｜增量</strong></header>
    <div className="incrementality-grid">
      <div className="incrementality-controls">
        {fields.map(([label,value,set,min,max],i)=><label key={label}>
          <span>{label}</span>
          <input type="range" min={min} max={max} value={value} onChange={e=>set(Number(e.target.value))}/>
          <strong>{value}{i===5?'%':''}</strong>
        </label>)}
      </div>
      <div className="incrementality-stage" aria-live="polite">
        <article><span>Observed Lift｜基准差额</span><strong>{observedLift>=0?'+':''}{observedLift}</strong><small>当前净销售 − 基准净销售</small></article>
        <article><span>Comparison Lift｜对照差额</span><strong>{comparisonLift>=0?'+':''}{comparisonLift}</strong><small>仅在对照组可比时用于辅助解释</small></article>
        <article><span>Attributed Gap｜归因差额</span><strong>{attributedGap>=0?'+':''}{attributedGap}</strong><small>归因成交 − 对照差额</small></article>
        <article className={contributionAfterSpend<0?'warning':''}><span>Contribution after Spend｜扣广告后贡献变化</span><strong>{contributionAfterSpend>=0?'+':''}{contributionAfterSpend.toFixed(1)}</strong><small>教学估算：对照差额 × 贡献率 − 广告花费</small></article>
      </div>
    </div>
    <div className="incrementality-verdict"><strong>Interpretation｜课堂解释</strong><p>{note}</p><small>这是教学模拟。没有随机对照、稳定对照或充分时间序列时，不把差额直接解释为广告因果效果。</small></div>
  </section>
}
