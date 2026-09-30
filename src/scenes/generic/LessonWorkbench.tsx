import { useMemo, useState } from 'react'
import type { LessonContent } from '../../types/content'
import { useCourseStore } from '../../store/courseStore'

type EvidenceState = '支持' | '反证' | '待核验' | '信息不足'

export function LessonWorkbench({ lesson }: { lesson: LessonContent }) {
  const [active, setActive] = useState(0)
  const [evidence, setEvidence] = useState<EvidenceState>('待核验')
  const [variable, setVariable] = useState(50)
  const [revealed, setRevealed] = useState(false)
  const instructor = useCourseStore((s) => s.instructorMode)
  const insightOpen = useCourseStore((s) => s.insightOpen)
  const family = useMemo(() => ({
    'system-map':'关系图实验','comparison-lab':'比较实验','decision-lab':'判断实验','economics-lab':'经营经济实验',
    'structure-lab':'结构实验','evidence-lab':'证据实验','process-lab':'过程实验','configuration-lab':'配置实验'
  }[lesson.sceneType] ?? '经营判断实验'), [lesson.sceneType])

  return (
    <section className="lesson-workbench">
      <header className="lesson-hero">
        <div>
          <div className="eyebrow">{lesson.code} · {family}</div>
          <h1>{lesson.title}</h1>
          <p className="core-statement">{lesson.coreStatement}</p>
        </div>
        <div className="completion-card"><span>本课完成标准</span><strong>{lesson.completion}</strong></div>
      </header>

      <div className="workbench-grid">
        <article className="knowledge-canvas">
          <div className="canvas-head"><span>知识结构</span><b>点击深入 · 调整变量 · 观察反馈</b></div>
          <div className="knowledge-orbit">
            <button className="core-node">{lesson.title}</button>
            {lesson.highlights.map((item, i) => (
              <button key={item} onClick={() => setActive(i)} className={active === i ? 'knowledge-node active' : 'knowledge-node'}>
                <small>0{i+1}</small><span>{item}</span>
              </button>
            ))}
          </div>
          <div className="experiment-strip">
            <label><span>情景变量</span><input type="range" min="0" max="100" value={variable} onChange={(e)=>setVariable(Number(e.target.value))}/><b>{variable}</b></label>
            <div className="causal-readout">
              <span>变量变化</span><i>→</i><strong>{variable < 35 ? '当前条件偏弱，需要补证据' : variable > 70 ? '条件增强，但仍需检查风险边界' : '处于可继续验证区间'}</strong>
            </div>
          </div>
        </article>

        <aside className="decision-panel">
          <div className="panel-section"><span className="panel-label">当前深入</span><h2>{lesson.highlights[active]}</h2><p>把这一知识点放回真实经营情景中判断。系统不替学员给出“高分答案”，而是要求说明证据、反证、未知与条件。</p></div>
          <div className="panel-section">
            <span className="panel-label">证据状态</span>
            <div className="evidence-buttons">{(['支持','反证','待核验','信息不足'] as EvidenceState[]).map(x=><button className={evidence===x?'active':''} onClick={()=>setEvidence(x)} key={x}>{x}</button>)}</div>
            <p className="feedback">当前结论：<b>{evidence}</b>。{evidence==='支持'?'可以继续推进，但仍需确认适用范围。':evidence==='反证'?'原判断需要修改，先定位冲突来自商品、市场还是执行条件。':'保留 UNKNOWN｜未知，不用虚构数字填空。'}</p>
          </div>
          {insightOpen && <div className="panel-section insight"><span className="panel-label">为什么</span><p>{lesson.goal}</p><span className="panel-label">课程边界</span><p>{lesson.boundary}</p></div>}
        </aside>
      </div>

      <div className="practice-deck">
        <article><span>课堂实操</span><h3>{lesson.practice[0]}</h3><button onClick={()=>setRevealed(!revealed)}>{revealed?'收起判断提示':'打开判断提示'}</button>{revealed&&<p>先写结论，再列支持证据、反证或未知，最后写一个能改变结论的条件。</p>}</article>
        <article><span>核心工具</span><h3>{lesson.tool}</h3><p>工具用于形成经营记录，不把复杂业务压成单一分数。</p></article>
        <article><span>课堂产出</span><h3>{lesson.output}</h3><p>结论必须可观察、可提交、可复核。</p></article>
      </div>
      {instructor && <InstructorStrip lesson={lesson}/>}
    </section>
  )
}

function InstructorStrip({lesson}:{lesson:LessonContent}) {
  const [step,setStep]=useState(0)
  const steps=['显示核心命题','打开知识结构','要求学员先判断','揭示证据与反例','形成可提交输出']
  return <div className="instructor-strip"><span>讲师演示</span><strong>{step+1}/{steps.length} · {steps[step]}</strong><button disabled={step===0} onClick={()=>setStep(step-1)}>上一步</button><button disabled={step===steps.length-1} onClick={()=>setStep(step+1)}>下一步</button><small>{lesson.code}</small></div>
}
