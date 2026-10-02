import {useAppState} from '../../state/AppState';
const nodes=[
 ['T01-W03','SKU决策','首测SKU'],['T01-W04','Listing','商品上线'],['T01-W05','内容生产','成片/脚本'],['T01-W06','内容测试','指标/迭代'],['T01-W07','达人/Affiliate','合作结果'],['T01-W11','经营复盘','30天动作']
];
export default function DataFlowRail(){const{state}=useAppState();return <div className="dataFlowRail">{nodes.map(([code,title,out])=>{const ws=state.workshopWorkspace[code];const filled=Object.values(ws?.values||{}).filter(v=>String(v).trim()).length;const complete=state.workshopState[code]==='COMPLETE';return <div className="dataFlowNode" key={code}><span>{code}</span><b>{title}</b><small>{complete?'已闭环':filled?`已有 ${filled} 项经营数据`:'等待上游'} · 输出：{out}</small></div>})}</div>}
