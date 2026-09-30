import type { LessonSpec } from '../data/lessonSpecs'
import { componentsForLesson } from '../data/motherComponentMap'
import { KnowledgeZoom } from '../components/teaching/KnowledgeZoom'
import { EvidenceWall } from '../components/teaching/EvidenceWall'
import { GateJourney } from '../components/teaching/GateJourney'
import { ParameterLab } from '../components/teaching/ParameterLab'
import { ProductStructure } from '../components/teaching/ProductStructure'
import { AssetLineage } from '../components/teaching/AssetLineage'
import { PortfolioBoard } from '../components/teaching/PortfolioBoard'
import { FlowJourney } from '../components/teaching/FlowJourney'
import { ProfitBridge } from '../components/teaching/ProfitBridge'
import { MoneyFlow } from '../components/teaching/MoneyFlow'
import { useCourseStore } from '../store/courseStore'

function EmbeddedLab({spec}:{spec:LessonSpec}){
 const names=componentsForLesson(spec.code)
 const primary=names.find(x=>['GateJourney','ParameterLab','ProductStructure','AssetLineage','PortfolioBoard','FlowJourney','ProfitBridge','MoneyFlow'].includes(x))
 if(!primary)return null
 if(primary==='GateJourney')return <GateJourney gates={spec.knowledgeTree.map(x=>({title:x.title,note:x.defaultVisible}))}/>
 if(primary==='ParameterLab')return <ParameterLab parameters={spec.variables.slice(0,4).map((x,i)=>({name:x.name,min:0,max:100,initial:[60,35,20,10][i]??20,unit:'%'}))}/>
 if(primary==='ProductStructure')return <ProductStructure/>
 if(primary==='AssetLineage')return <AssetLineage/>
 if(primary==='PortfolioBoard')return <PortfolioBoard items={spec.cases.map((x,i)=>({id:String(i),title:x.title}))}/>
 if(primary==='FlowJourney')return <FlowJourney steps={spec.knowledgeTree.map(x=>({title:x.title,note:x.defaultVisible,exception:x.deepDive[0]}))}/>
 if(primary==='ProfitBridge')return <ProfitBridge/>
 return <MoneyFlow nodes={[{label:'Net Sales｜净销售',value:100,kind:'income'},{label:'Product / COGS｜商品成本',value:34,kind:'cost'},{label:'Logistics｜物流',value:16,kind:'cost'},{label:'Growth｜增长',value:18,kind:'cost'},{label:'Reserve｜售后/税费准备',value:7,kind:'reserve'}]}/>
}
export function FormalLessonLayer({spec}:{spec:LessonSpec}){
 const instructorMode=useCourseStore(s=>s.instructorMode)
 const presenterStep=useCourseStore(s=>s.instructorStep)
 const reveal=(n:number)=>!instructorMode||presenterStep>=n
 const components=componentsForLesson(spec.code)
 return <section className={`formal-lesson-layer presenter-step-${presenterStep}`}>
  <div className="section-title"><div className="eyebrow">Formal Digital Teaching Content｜正式数字教学内容</div><h2>专业知识层 · 案例 · 反例 · 变量 · 证据</h2></div>
  {reveal(1)&&<KnowledgeZoom nodes={spec.knowledgeTree.map(x=>({title:x.title,summary:x.defaultVisible,why:x.deepDive[0]??x.defaultVisible,how:x.deepDive[1]??'结合证据和经营条件判断。',boundary:'结论仅在当前证据与条件下成立；动态规则需重新核验。'}))}/>}
  {reveal(2)&&<div className="formal-grid"><section><h3>案例与反例</h3>{spec.cases.map(x=><article key={x.title} className={x.type}><span>{x.type==='case'?'CASE｜案例':'COUNTEREXAMPLE｜反例'}</span><strong>{x.title}</strong><p>{x.summary}</p></article>)}</section><section><h3>可操作变量</h3>{spec.variables.map(x=><article key={x.name}><strong>{x.name}</strong><p>{x.effect}</p><small>{x.state==='known'?'KNOWN｜已知':x.state==='estimated'?'ESTIMATED｜估算':'UNKNOWN｜待核验'}</small></article>)}</section></div>}
  {reveal(3)&&<section className="embedded-teaching-lab"><div className="section-title compact"><div className="eyebrow">Interactive Teaching Lab｜交互教学实验</div><h3>{spec.interaction.scene}</h3><p>本课组件组合：{components.join(' · ')}</p></div><EmbeddedLab spec={spec}/></section>}
  {reveal(3)&&<EvidenceWall items={spec.evidence.map(x=>({title:x.level,source:x.level==='E1'?'官方 / 监管 / 平台原始资料':x.level==='E2'?'真实页面直接观察':x.level==='E3'?'可信市场研究':x.level==='E4'?'真实业务数据':'教学模拟',summary:x.need,initial:x.level==='E5'?'unknown':'support'}))}/>}
  {reveal(4)&&<div className="interaction-contract"><strong>交互场景：{spec.interaction.scene}</strong><span>动作：{spec.interaction.actions.join(' · ')}</span><span>动效：{spec.interaction.motion.join(' · ')}</span>{spec.gaps.length>0&&<small>研究 / 素材缺口：{spec.gaps.join('；')}</small>}</div>}
 </section>
}