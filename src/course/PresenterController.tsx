import { useEffect } from 'react'
import { useCourseStore } from '../store/courseStore'
const labels=['Scene｜场景','Observe｜观察','Explore｜探索','Decide｜判断','Reflect｜结论']
export function PresenterController(){
 const mode=useCourseStore(s=>s.instructorMode),step=useCourseStore(s=>s.instructorStep),set=useCourseStore(s=>s.setInstructorStep)
 useEffect(()=>{if(!mode)return;const on=(e:KeyboardEvent)=>{if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();set(Math.min(4,step+1))}if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();set(Math.max(0,step-1))}if(e.key==='Home')set(0);if(e.key==='End')set(4)};window.addEventListener('keydown',on);return()=>window.removeEventListener('keydown',on)},[mode,step,set])
 if(!mode)return null
 return <aside className="presenter-controller" aria-label="Presenter Step｜讲师演示步骤"><div className="presenter-progress">{labels.map((x,i)=><button key={x} className={i===step?'active':i<step?'done':''} onClick={()=>set(i)}><i>{i+1}</i><span>{x}</span></button>)}</div><div className="presenter-actions"><button onClick={()=>set(Math.max(0,step-1))} disabled={step===0}>← 上一步</button><strong>{step+1}/5 · {labels[step]}</strong><button onClick={()=>set(Math.min(4,step+1))} disabled={step===4}>下一步 →</button></div><small>键盘：← / → · PageUp / PageDown · Space｜空格</small></aside>
}