import {Link} from 'react-router-dom';
import {coreTools} from '../../data/t01';

export default function ToolLibrary(){
  return <div>
    <div className="hero"><div className="eyebrow">TOOLS｜核心工具</div><h1>把经营动作直接变成可填写工作区。</h1><p>所有工具都保存在浏览器本地；真实数据优先，模拟数据必须标识。涉及平台动态规则的字段，每期开课先核验。</p></div>
    <div className="grid grid3 section">{coreTools.map((tool)=><Link className="card toolCard" key={tool.code} to={`/t01/tools/${tool.code.toLowerCase()}`}><span className="eyebrow">{tool.code} · 阶段{tool.stage}</span><h3>{tool.title}</h3><p className="subtle">{tool.fields.slice(0,4).join(' · ')}{tool.fields.length>4?' …':''}</p><div className="toolOpen">进入工作区 →</div></Link>)}</div>
  </div>
}
