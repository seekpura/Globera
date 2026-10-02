import {useEffect,useMemo,useState} from 'react';
import {Link,useParams} from 'react-router-dom';
import {getTool} from '../../data/t01';
import {safeRatio} from '../../domain/calculations';
import type {ToolRow} from '../../domain/types';
import {useAppState} from '../../state/AppState';

const numberish=(field:string)=>/(价|成本|费用|佣金|预算|GMV|Spend|Views|Impressions|Clicks|Orders|金额|退款|损失|贡献|GPM|ROI|CTR|CTOR)/i.test(field);
const fmt=(n:number,percent=false)=>Number.isFinite(n)?(percent?(n*100).toFixed(1)+'%':n.toFixed(2)):'0';
function applyFormula(tool:{formula?:string;fields:string[]},row:ToolRow){
  const n=(k:string)=>Number(row[k]||0);const out={...row};
  if(tool.formula==='profit'){const received=n('标价')-n('卖家折扣');const contribution=received-['商品成本','包装','履约/物流','平台/支付费用','Affiliate佣金','广告成本分摊','售后/损耗'].reduce((s,k)=>s+n(k),0);out['预计销售实收']=received;out['单位贡献']=contribution;out['贡献率']=fmt(safeRatio(contribution,received),true)}
  if(tool.formula==='content'){out['CTR']=fmt(safeRatio(n('Product Clicks'),n('Product Impressions')),true);out['CTOR']=fmt(safeRatio(n('SKU Orders'),n('Product Clicks')),true);out['GPM']=fmt(safeRatio(n('GMV'),n('Video Views'))*1000)}
  if(tool.formula==='gmvmax')out['Total ROI']=fmt(safeRatio(n('Total GMV'),n('Spend')));
  if(tool.formula==='live'){out['CTR']=fmt(safeRatio(n('Product Clicks'),n('Impressions/Views')),true);out['CTOR']=fmt(safeRatio(n('SKU Orders'),n('Product Clicks')),true);out['Show/Watch GPM']=fmt(safeRatio(n('GMV'),n('Impressions/Views'))*1000)}
  return out;
}
export default function ToolWorkspace(){
  const{id=''}=useParams();const tool=getTool(id);const{state,dispatch}=useAppState();
  const stored=tool?state.toolWorkspace[tool.code]:undefined;const[rows,setRows]=useState<ToolRow[]>(stored?.rows?.length?stored.rows:[{}]);const[mode,setMode]=useState<'real'|'simulated'|'mixed'>(stored?.mode||state.mode);const[status,setStatus]=useState(stored?.status||'草稿');const[saved,setSaved]=useState('');
  useEffect(()=>{if(!tool)return;const v=state.toolWorkspace[tool.code];setRows(v?.rows?.length?v.rows:[{}]);setMode(v?.mode||state.mode);setStatus(v?.status||'草稿')},[tool?.code,stored?.updatedAt]);
  const computed=useMemo(()=>tool?rows.map(r=>applyFormula(tool,r)):rows,[rows,tool]);
  if(!tool)return <div className="card">工具不存在：{id}</div>;
  const update=(ri:number,field:string,value:string)=>setRows(prev=>prev.map((r,i)=>i===ri?{...r,[field]:numberish(field)&&value!==''?Number(value):value}:r));
  const save=()=>{dispatch({type:'TOOL_WORKSPACE_SET',id:tool.code,payload:{rows:computed,mode,status,sources:stored?.sources||[]}});setRows(computed);setSaved(new Date().toLocaleTimeString())};
  const add=()=>setRows(r=>[...r,{}]);
  const exportJson=()=>{const blob=new Blob([JSON.stringify({tool:tool.code,title:tool.title,mode,status,sources:stored?.sources||[],rows:computed,exportedAt:new Date().toISOString()},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`${tool.code}.json`;a.click();URL.revokeObjectURL(a.href)};
  const exportCsv=()=>{const esc=(v:unknown)=>`"${String(v??'').replaceAll('"','""')}"`;const csv='\uFEFF'+[tool.fields.map(esc).join(','),...computed.map(r=>tool.fields.map(f=>esc(r[f])).join(','))].join('\n');const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`${tool.code}.csv`;a.click();URL.revokeObjectURL(a.href)};
  const completion=Math.round(computed.reduce((acc,r)=>acc+tool.fields.filter(f=>String(r[f]??'').trim()!=='').length,0)/(Math.max(1,computed.length*tool.fields.length))*100);
  return <div><div className="hero toolHero"><div><div className="eyebrow">{tool.code} · 阶段{tool.stage}</div><h1>{tool.title}</h1><p>工作坊完成后会自动把关键结果带入这里；你仍可以补充、校正并验收。所有数据保存在本浏览器。</p>{stored?.sources?.length?<div className="dataSourceStrip">自动来源：{stored.sources.join(' / ')}</div>:null}</div><div className="toolHeroStats"><div><span>完成度</span><b>{completion}%</b></div><div><span>证据模式</span><select value={mode} onChange={e=>setMode(e.target.value as any)}><option value="real">真实</option><option value="simulated">模拟</option><option value="mixed">混合</option></select></div><div><span>验收状态</span><select value={status} onChange={e=>setStatus(e.target.value)}><option>草稿</option><option>待验收</option><option>通过</option><option>需返工</option></select></div></div></div>
    <div className="toolbar section"><Link className="btn secondary" to="/t01/tools">← 工具库</Link><button className="btn secondary" onClick={add}>新增一行</button><button className="btn" onClick={save}>保存</button><button className="btn secondary" onClick={exportJson}>导出JSON</button><button className="btn secondary" onClick={exportCsv}>导出CSV</button>{saved&&<span className="subtle">已保存 {saved}</span>}</div>
    <div className="toolGrid section">{computed.map((row,ri)=><div className="card toolRow" key={ri}><div className="toolRowHead"><div><b>记录 {ri+1}</b>{row._source&&<small className="flowSource">来自 {String(row._source)}</small>}</div><button className="textBtn" onClick={()=>setRows(r=>r.filter((_,i)=>i!==ri).length?r.filter((_,i)=>i!==ri):[{}])}>删除</button></div><div className="formGrid">{tool.fields.map(field=>{const auto=['预计销售实收','单位贡献','贡献率','CTR','CTOR','GPM','Total ROI','Show/Watch GPM'].includes(field)&&Boolean(tool.formula);return <label key={field}><span>{field}</span>{auto?<output>{String(row[field]??'—')}</output>:numberish(field)?<input type="number" step="any" value={String(rows[ri]?.[field]??'')} onChange={e=>update(ri,field,e.target.value)} placeholder="0"/>:<textarea rows={2} value={String(rows[ri]?.[field]??'')} onChange={e=>update(ri,field,e.target.value)} placeholder="填写…"/>}</label>})}</div></div>)}</div>
    <div className="card section acceptanceCard"><div className="eyebrow">ACCEPTANCE｜工具验收</div><h3>自动带入只是起点，不等于验收。</h3><p>工作坊同步的字段会保留来源标记；涉及动态平台规则的结论仍需记录站点、来源和核验日期，并由学员/讲师补齐证据。</p></div>
  </div>}
