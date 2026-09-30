import { useMemo, useState } from 'react'
export interface GraphNode{id:string;label:string;note?:string}
export interface GraphEdge{from:string;to:string;label?:string}
export function DynamicGraph({nodes,edges}:{nodes:GraphNode[];edges:GraphEdge[]}){
 const [focus,setFocus]=useState(nodes[0]?.id)
 const [depth,setDepth]=useState(1)
 const related=useMemo(()=>new Set(edges.flatMap(e=>e.from===focus?[e.to]:e.to===focus?[e.from]:[])),[edges,focus])
 const focusNode=nodes.find(n=>n.id===focus)
 const positions=nodes.map((_,i)=>{const a=(Math.PI*2*i/Math.max(nodes.length,1))-Math.PI/2;const radius=depth===2?150:depth===0?110:135;return{x:450+Math.cos(a)*radius,y:210+Math.sin(a)*radius}})
 return <div className={`dynamic-graph semantic-depth-${depth}`}>
  <div className="graph-toolbar">
   <span>Semantic Zoom｜语义缩放</span>
   <div><button onClick={()=>setDepth(Math.max(0,depth-1))} disabled={depth===0}>−</button><strong>L{depth+1}</strong><button onClick={()=>setDepth(Math.min(2,depth+1))} disabled={depth===2}>＋</button><button onClick={()=>{setFocus(nodes[0]?.id);setDepth(1)}}>Reset｜复位</button></div>
  </div>
  <svg viewBox="0 0 900 420" role="img" aria-label="Dynamic relationship graph｜动态关系图">
   <defs><marker id="graph-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z"/></marker></defs>
   {edges.map((e,i)=>{const a=nodes.findIndex(n=>n.id===e.from),b=nodes.findIndex(n=>n.id===e.to);if(a<0||b<0)return null;const active=e.from===focus||e.to===focus;return <g key={`${e.from}-${e.to}-${i}`} className={active?'edge-active':'edge-muted'}><line x1={positions[a].x} y1={positions[a].y} x2={positions[b].x} y2={positions[b].y} markerEnd="url(#graph-arrow)"/>{depth===2&&e.label&&<text x={(positions[a].x+positions[b].x)/2} y={(positions[a].y+positions[b].y)/2-6}>{e.label}</text>}</g>})}
   {nodes.map((n,i)=>{const state=n.id===focus?'selected':related.has(n.id)?'related':'inactive';return <g key={n.id} transform={`translate(${positions[i].x},${positions[i].y})`} className={state} onClick={()=>setFocus(n.id)} tabIndex={0} role="button" onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setFocus(n.id)}}}><circle r={state==='selected'?52:state==='related'?44:38}/><text textAnchor="middle" y="4">{n.label}</text>{depth===2&&n.note&&<text className="graph-node-note" textAnchor="middle" y="66">{n.note.slice(0,18)}</text>}</g>})}
  </svg>
  <div className="graph-focus-readout"><span>Focus｜当前焦点</span><strong>{focusNode?.label}</strong><p>{depth===0?'先观察系统骨架；继续放大查看关系与解释。':focusNode?.note??'点击节点观察关系传播；相邻节点会进入 Related｜相关状态。'}</p></div>
 </div>
}
