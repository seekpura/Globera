import { useEffect, useMemo, useState } from 'react'
import { useCourseStore } from '../../store/courseStore'

type EvidenceState='unknown'|'supported'|'conflicted'
type ProductType='visual'|'search'|'regional'
type MarketId='us'|'uk'|'my'|'sa'

const dimensions=[
 {id:'demand',label:'Demand｜需求与购买力',prompt:'先找商品级需求与购买证据，不用宏观人口代替。'},
 {id:'price',label:'Price Band｜价格带',prompt:'比较真实可比商品价格分布、促销与到手价。'},
 {id:'platform',label:'Platform Mix｜平台格局',prompt:'目标用户在哪些平台完成发现、比较和交易？'},
 {id:'language',label:'Language / Culture｜语言文化',prompt:'语言只是入口，还要检查表达、场景、禁忌与信任机制。'},
 {id:'payment',label:'Payment｜支付',prompt:'支付方式、拒付/失败与消费者习惯影响转化和现金。'},
 {id:'logistics',label:'Logistics / Returns｜物流退货',prompt:'时效、追踪、退货路径与成本必须进入经营模型。'},
 {id:'compliance',label:'Compliance｜产品合规',prompt:'按商品、司法辖区、标签/宣称和准入要求核验。'},
 {id:'content',label:'Content / Creator｜内容达人生态',prompt:'商品证明方式、内容供给和达人生态决定获客表达。'}
] as const

const markets=[
 {id:'us' as const,name:'United States｜美国',x:190,y:165,region:'North America｜北美',question:'这个商品在美国的商品级需求、完整成本和本地表达是否成立？'},
 {id:'uk' as const,name:'United Kingdom｜英国',x:455,y:130,region:'Europe｜欧洲',question:'英国应作为独立司法辖区核验，而不是直接用欧盟结论替代。'},
 {id:'sa' as const,name:'Saudi Arabia｜沙特阿拉伯',x:575,y:235,region:'GCC｜海湾地区',question:'按沙特本国准入、语言、支付、物流与内容环境逐项核验。'},
 {id:'my' as const,name:'Malaysia｜马来西亚',x:735,y:310,region:'Southeast Asia｜东南亚',question:'多语言、多渠道和区域履约条件需要商品级验证。'}
]

const productTypes:{id:ProductType;label:string;priority:string[]}[]=[
 {id:'visual',label:'Visual-demo Product｜强视觉演示型商品',priority:['content','language','platform','demand','price','logistics','compliance','payment']},
 {id:'search',label:'Search-led Product｜明确搜索型商品',priority:['demand','price','platform','logistics','compliance','language','payment','content']},
 {id:'regional',label:'Regional-market Product｜区域消费型商品',priority:['language','payment','logistics','compliance','platform','price','content','demand']}
]

export function MarketExplorerScene(){
 const instructorMode=useCourseStore(s=>s.instructorMode)
 const instructorStep=useCourseStore(s=>s.instructorStep)
 const [market,setMarket]=useState<MarketId>('us')
 const [level,setLevel]=useState<1|2|3|4>(1)
 const [product,setProduct]=useState<ProductType>('visual')
 const [revealed,setRevealed]=useState(3)
 const [states,setStates]=useState<Record<string,EvidenceState>>({})
 const activeMarket=markets.find(x=>x.id===market)!
 const productDef=productTypes.find(x=>x.id===product)!
 const ordered=useMemo(()=>productDef.priority.map(id=>dimensions.find(d=>d.id===id)!),[productDef])
 const key=(dim:string)=>market+':'+dim
 const supported=ordered.filter(d=>(states[key(d.id)]??'unknown')==='supported').length
 const conflicted=ordered.filter(d=>(states[key(d.id)]??'unknown')==='conflicted').length
 const visible=ordered.slice(0,revealed)
 useEffect(()=>{
  if(!instructorMode)return
  const presenterReveal=[2,3,5,8,8]
  setRevealed(presenterReveal[instructorStep]??8)
 },[instructorMode,instructorStep])

 return <section className="workbench market-benchmark">
  <div className="scene-heading">
   <div><div className="eyebrow">Benchmark 02｜全球市场判断</div><h1>市场不是排名题，而是“商品 × 国家 × 证据”的条件判断。</h1><p>商品不同，研究顺序会变化；国家不同，证据必须重新核验。这里不生成市场总分。</p></div>
   <div className="market-product-switch"><label>Product Lens｜商品视角</label><select value={product} onChange={e=>{setProduct(e.target.value as ProductType);setRevealed(3)}}>{productTypes.map(x=><option key={x.id} value={x.id}>{x.label}</option>)}</select></div>
  </div>

  <div className="semantic-level-bar market-level-bar"><span>Semantic Zoom｜语义缩放</span><button className={level===1?'active':''} onClick={()=>setLevel(1)}>L1 Region｜区域</button><button className={level===2?'active':''} onClick={()=>setLevel(2)}>L2 Country｜国家</button><button className={level===3?'active':''} onClick={()=>setLevel(3)}>L3 Product｜商品</button><button className={level===4?'active':''} onClick={()=>setLevel(4)}>L4 Evidence｜证据</button></div>

  <div className={'market-explorer-stage market-level-'+level}>
   <div className="market-space">
    <div className="market-space-toolbar"><span>{level===1?'Region View｜区域视图':level===2?'Country Focus｜国家焦点':level===3?'Product-conditioned Country｜商品条件化国家':'Evidence Drill｜证据钻取'}</span><div>{markets.map(x=><button key={x.id} className={x.id===market?'active':''} onClick={()=>setMarket(x.id)}>{x.name.split('｜')[1]}</button>)}</div></div>
    <svg viewBox="0 0 900 440" role="img" aria-label="商品条件化全球市场研究空间">
     <path className="market-contour" d="M70 95 C160 35 255 60 310 120 C360 170 410 130 460 80 C520 20 650 45 720 105 C800 175 835 290 780 350 C720 415 635 382 565 335 C500 292 445 315 385 355 C315 400 205 390 130 320 C60 255 25 150 70 95Z"/>
     <path className="market-route" d="M190 165 C310 95 360 105 455 130 S520 195 575 235 S665 285 735 310"/>
     {markets.map(x=><g key={x.id} transform={'translate('+x.x+','+x.y+')'} className={x.id===market?'market-pin selected':'market-pin'} onClick={()=>setMarket(x.id)} role="button" tabIndex={0} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setMarket(x.id)}}><circle r={x.id===market?24:17}/><circle r="5" className="market-pin-core"/><text textAnchor="middle" y="-34">{x.name}</text><text textAnchor="middle" y="43" className="market-pin-region">{x.region}</text></g>)}
    </svg>
    <div className="market-focus-card"><span>Current Question｜当前问题</span><strong>{activeMarket.name}</strong><p>{activeMarket.question}</p></div>
   </div>

   <aside className="market-research-queue">
    <div className="queue-head"><div><span>Research Sequence｜研究顺序</span><strong>{productDef.label}</strong></div><button onClick={()=>setRevealed(Math.min(dimensions.length,revealed+1))} disabled={revealed===dimensions.length}>Reveal Next｜展开下一项</button></div>
    <div className="research-sequence">{ordered.map((d,i)=>{const open=i<revealed;const state=states[key(d.id)]??'unknown';return <article key={d.id} className={(open?'open ':'locked ')+state}><span>{String(i+1).padStart(2,'0')}</span><div><strong>{d.label}</strong><p>{open?d.prompt:'Locked｜按研究顺序逐步展开'}</p></div>{open&&<select value={state} onChange={e=>setStates(v=>({...v,[key(d.id)]:e.target.value as EvidenceState}))}><option value="unknown">Unknown｜未知</option><option value="supported">Supported｜有支持</option><option value="conflicted">Conflicted｜冲突</option></select>}</article>})}</div>
   </aside>
  </div>

  <div className="market-evidence-strip four">
   <article><span>Visible Dimensions｜已展开</span><strong>{visible.length}/8</strong><p>逐步释放信息，避免一开始把所有维度变成表格噪音。</p></article>
   <article><span>Evidence State｜证据状态</span><strong>{supported} Supported · {conflicted} Conflicted</strong><p>未标记的维度保持 Unknown｜未知。</p></article>
   <article><span>Freshness｜证据新鲜度</span><strong>COURSE BASELINE｜课程基线</strong><p>市场与平台动态事实必须在开课前更新来源与日期。</p></article>
   <article className="market-decision"><span>Current Decision｜当前判断</span><strong>{conflicted?'RESOLVE CONFLICT｜先解决冲突':supported>=5?'TEST HYPOTHESIS｜进入商品级测试':'CONTINUE RESEARCH｜继续研究'}</strong><p>这是研究进度判断，不是国家优劣排名，也不代表市场规模结论。</p></article>
  </div>
 </section>
}
