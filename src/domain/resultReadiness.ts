import type {State} from '../state/AppState';
import type {WorkshopMachine,CoachingMachine} from './types';

export const resultDependencies:Record<string,{workshops:string[];coaching?:string[]}>= {
 'T01-R01':{workshops:['T01-W01']},
 'T01-R02':{workshops:['T01-W02'],coaching:['T01-P01']},
 'T01-R03':{workshops:['T01-W03']},
 'T01-R04':{workshops:['T01-W04'],coaching:['T01-P02']},
 'T01-R05':{workshops:['T01-W05','T01-W06'],coaching:['T01-P03']},
 'T01-R06':{workshops:['T01-W07'],coaching:['T01-P04']},
 'T01-R07':{workshops:['T01-W08','T01-W09']},
 'T01-R08':{workshops:['T01-W10'],coaching:['T01-P05']},
 'T01-R09':{workshops:['T01-W11']},
 'T01-R10':{workshops:['T01-W11']},
};
export function resultReadiness(id:string,state:State,workshops:WorkshopMachine[],coaching:CoachingMachine[]){
 const dep=resultDependencies[id]||{workshops:[]};
 const wDone=dep.workshops.filter(code=>{const m=workshops.find(x=>x.code===code);if(!m)return false;return (state.workshopState[code]||m.initial_state)===m.states[m.states.length-1]?.key}).length;
 const cList=dep.coaching||[];
 const cStarted=cList.filter(code=>{const m=coaching.find(x=>x.code===code);if(!m)return false;return (state.coachingState[code]||m.initial_state)!==m.initial_state}).length;
 const cDone=cList.filter(code=>{const m=coaching.find(x=>x.code===code);if(!m)return false;const cur=state.coachingState[code]||m.initial_state;return Boolean(m.states.find(s=>s.key===cur)?.terminal)}).length;
 const abilityReady=wDone===dep.workshops.length;
 const world = cList.length===0?'not_applicable':cDone===cList.length?'terminal':cStarted>0?'pending':'not_started';
 return {abilityReady,wDone,wTotal:dep.workshops.length,cDone,cTotal:cList.length,cStarted,world};
}
