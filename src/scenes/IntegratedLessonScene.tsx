import type { LessonContent } from '../types/content'
import { GateJourney } from '../components/teaching/GateJourney'
import { ParameterLab } from '../components/teaching/ParameterLab'
import { ProductStructure } from '../components/teaching/ProductStructure'
import { AssetLineage } from '../components/teaching/AssetLineage'
import { ProfitBridge } from '../components/teaching/ProfitBridge'
import { MoneyFlow } from '../components/teaching/MoneyFlow'
import { PortfolioBoard } from '../components/teaching/PortfolioBoard'
import { EvidenceWall } from '../components/teaching/EvidenceWall'
import { componentsForLesson } from '../data/motherComponentMap'
import { lessonSpecs } from '../data/lessonSpecs'

const gates=(lesson:LessonContent)=>lesson.highlights.map((x,i)=>({title:x,note:i===0?'先确认事实和适用条件。':i===1?'寻找反证、限制和缺失信息。':'只有证据足够时才进入下一状态。'}))
const evidence=(lesson:LessonContent)=>lessonSpecs[lesson.code]?.evidence.map(x=>({title:x.level,source:x.level==='E1'?'官方原始资料':x.level==='E2'?'真实页面观察':x.level==='E3'?'可信研究':x.level==='E4'?'真实业务数据':'教学模拟',summary:x.need,initial:'unknown' as const}))??[]
function Mother({name,lesson}:{name:string;lesson:LessonContent}){
 if(name==='GateJourney')return <GateJourney gates={gates(lesson)}/>
 if(name==='ParameterLab')return <ParameterLab parameters={[{name:'核心变量A',min:0,max:100,initial:55,unit:'%'},{name:'核心变量B',min:0,max:100,initial:35,unit:'%'},{name:'风险/损失',min:0,max:100,initial:20,unit:'%'}]} formula={v=>v[0]+v[1]-v[2]}/>
 if(name==='ProductStructure')return <ProductStructure/>
 if(name==='AssetLineage')return <AssetLineage/>
 if(name==='ProfitBridge')return <ProfitBridge/>
 if(name==='MoneyFlow')return <MoneyFlow nodes={[{label:'Net Sales｜净销售',value:100,kind:'income'},{label:'商品/履约',value:48,kind:'cost'},{label:'增长/平台',value:24,kind:'cost'},{label:'风险准备',value:8,kind:'reserve'}]}/>
 if(name==='PortfolioBoard')return <PortfolioBoard items={['A','B','C','D','E'].map((x,i)=>({id:x,title:`Candidate ${i+1}｜候选商品${i+1}`}))}/>
 if(name==='EvidenceWall')return <EvidenceWall items={evidence(lesson)}/>
 return null
}
export function IntegratedLessonScene({lesson,children}:{lesson:LessonContent;children:React.ReactNode}){
 const names=componentsForLesson(lesson.code)
 const renderable=names.filter(x=>['GateJourney','ParameterLab','ProductStructure','AssetLineage','ProfitBridge','MoneyFlow','PortfolioBoard','EvidenceWall'].includes(x)).slice(0,2)
 if(!renderable.length)return <>{children}</>
 return <><>{children}</><section className="integrated-lab"><div className="section-title"><div className="eyebrow">Interactive Practice Layer｜交互实操层</div><h2>{lesson.code} · 把知识判断变成可操作实验</h2><p>这里调用课程母组件，不重复讲知识；操作结果用于观察变量、状态、证据和经营结果之间的关系。</p></div><div className="integrated-lab-grid">{renderable.map(name=><div key={name} className="integrated-lab-cell"><div className="component-label">{name}</div><Mother name={name} lesson={lesson}/></div>)}</div></section></>
}
