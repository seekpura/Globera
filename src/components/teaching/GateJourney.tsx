import { useState } from 'react'
export type GateState='unchecked'|'pass'|'risk'|'verify'|'stop'
export interface Gate{title:string;note:string}
const labels={unchecked:'UNCHECKED｜未检查',pass:'PASS｜通过',risk:'RISK｜风险',verify:'VERIFY｜核验',stop:'STOP｜停止'}
export function GateJourney({gates}:{gates:Gate[]}){const [states,setStates]=useState<Record<number,GateState>>({});return <div className="gate-journey">{gates.map((g,i)=>{const state=states[i]??'unchecked';return <article key={g.title} className={`gate ${state}`}><span>{String(i+1).padStart(2,'0')}</span><strong>{g.title}</strong><p>{g.note}</p><select value={state} onChange={e=>setStates(v=>({...v,[i]:e.target.value as GateState}))}>{Object.entries(labels).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select></article>})}</div>}