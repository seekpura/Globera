import {useAppState} from '../../state/AppState';
export function ModeBadge(){const{state,dispatch}=useAppState();return <div className="modeRow" aria-label="学习数据模式">{(['real','simulated','mixed'] as const).map(x=><button key={x} className={'pill '+(state.mode===x?'active':'')} onClick={()=>dispatch({type:'MODE',value:x})}>{x==='real'?'真实':x==='simulated'?'模拟':'混合'}</button>)}</div>}
