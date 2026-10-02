import {glossaryTerms} from '../../data/t01';
export function GlossaryRow({text}:{text:string}){const terms=Object.entries(glossaryTerms).filter(([k])=>text.includes(k)).slice(0,10);if(!terms.length)return null;return <div className="termRow">{terms.map(([en,zh])=><span className="pill term" key={en}>{en}｜{zh}<span className="tip">{en}：{zh}</span></span>)}</div>}
