import {createContext,useContext,useEffect,useMemo,useReducer,type PropsWithChildren} from 'react';
import {LocalRepository} from '../domain/repositories';
import {syncWorkshopToTools} from '../domain/dataFlow';
import type {CoachingCase,ToolWorkspaceState,WorkshopWorkspace,WorkspaceEvidence} from '../domain/types';
const repo=new LocalRepository();
export type State={lessonStatus:Record<string,string>;workshopState:Record<string,string>;coachingState:Record<string,string>;workshopWorkspace:Record<string,WorkshopWorkspace>;coachingCases:Record<string,CoachingCase>;toolWorkspace:Record<string,ToolWorkspaceState>;rules:Record<string,{status:string;verifiedAt:string}>;resultStatus:Record<string,string>;resultNotes:Record<string,string>;mode:'real'|'simulated'|'mixed'};
type Action={type:string;id?:string;value?:string;payload?:any};
const initial:State={lessonStatus:{},workshopState:{},coachingState:{},workshopWorkspace:{},coachingCases:{},toolWorkspace:{},rules:{},resultStatus:{},resultNotes:{},mode:'simulated'};
const emptyWorkshop=():WorkshopWorkspace=>({values:{},checks:{},branchFlags:{},notes:'',evidence:[],updatedAt:new Date().toISOString()});
const emptyCase=():CoachingCase=>({owner:'',nextCheck:'',severity:'normal',paused:false,blockedReason:'',notes:'',evidence:[],timeline:[],updatedAt:new Date().toISOString()});
const stamp=()=>new Date().toISOString();
function reducer(s:State,a:Action):State{switch(a.type){
 case'LESSON':return{...s,lessonStatus:{...s.lessonStatus,[a.id!]:a.value!}};
 case'WORKSHOP':{const toolWorkspace=a.value==='COMPLETE'?syncWorkshopToTools(s.toolWorkspace,a.id!,s.workshopWorkspace[a.id!],s.mode):s.toolWorkspace;return{...s,workshopState:{...s.workshopState,[a.id!]:a.value!},toolWorkspace}}
 case'WORKSHOP_VALUE':{const old=s.workshopWorkspace[a.id!]||emptyWorkshop();const next={...old,values:{...old.values,[a.payload.key]:a.payload.value},updatedAt:stamp()};const toolWorkspace=s.workshopState[a.id!]==='COMPLETE'?syncWorkshopToTools(s.toolWorkspace,a.id!,next,s.mode):s.toolWorkspace;return{...s,workshopWorkspace:{...s.workshopWorkspace,[a.id!]:next},toolWorkspace}}
 case'WORKSHOP_CHECK':{const old=s.workshopWorkspace[a.id!]||emptyWorkshop();return{...s,workshopWorkspace:{...s.workshopWorkspace,[a.id!]:{...old,checks:{...old.checks,[a.payload.key]:Boolean(a.payload.value)},updatedAt:stamp()}}}}
 case'WORKSHOP_BRANCH':{const old=s.workshopWorkspace[a.id!]||emptyWorkshop();return{...s,workshopWorkspace:{...s.workshopWorkspace,[a.id!]:{...old,branchFlags:{...old.branchFlags,[a.payload.key]:Boolean(a.payload.value)},updatedAt:stamp()}}}}
 case'WORKSHOP_NOTE':{const old=s.workshopWorkspace[a.id!]||emptyWorkshop();const next={...old,notes:a.value||'',updatedAt:stamp()};const toolWorkspace=s.workshopState[a.id!]==='COMPLETE'?syncWorkshopToTools(s.toolWorkspace,a.id!,next,s.mode):s.toolWorkspace;return{...s,workshopWorkspace:{...s.workshopWorkspace,[a.id!]:next},toolWorkspace}}
 case'WORKSHOP_EVIDENCE_ADD':{const old=s.workshopWorkspace[a.id!]||emptyWorkshop();return{...s,workshopWorkspace:{...s.workshopWorkspace,[a.id!]:{...old,evidence:[...old.evidence,a.payload as WorkspaceEvidence],updatedAt:stamp()}}}}
 case'WORKSHOP_EVIDENCE_REMOVE':{const old=s.workshopWorkspace[a.id!]||emptyWorkshop();return{...s,workshopWorkspace:{...s.workshopWorkspace,[a.id!]:{...old,evidence:old.evidence.filter(x=>x.id!==a.value),updatedAt:stamp()}}}}
 case'TOOL_WORKSPACE_SET':return{...s,toolWorkspace:{...s.toolWorkspace,[a.id!]:{...a.payload,updatedAt:stamp()}}};
 case'COACH':return{...s,coachingState:{...s.coachingState,[a.id!]:a.value!}};
 case'COACH_TRANSITION':{const old=s.coachingCases[a.id!]||emptyCase();const at=stamp();const event=a.payload?.event||'状态更新';return{...s,coachingState:{...s.coachingState,[a.id!]:a.value!},coachingCases:{...s.coachingCases,[a.id!]:{...old,timeline:[...old.timeline,{id:`tl-${Date.now()}`,at,kind:'transition',label:event,detail:`${a.payload?.from||''} → ${a.value||''}`}],updatedAt:at}}}}
 case'COACH_CASE_PATCH':{const old=s.coachingCases[a.id!]||emptyCase();return{...s,coachingCases:{...s.coachingCases,[a.id!]:{...old,...a.payload,updatedAt:stamp()}}}}
 case'COACH_EVIDENCE_ADD':{const old=s.coachingCases[a.id!]||emptyCase();const at=stamp();const ev=a.payload as WorkspaceEvidence;return{...s,coachingCases:{...s.coachingCases,[a.id!]:{...old,evidence:[...old.evidence,ev],timeline:[...old.timeline,{id:`tl-${Date.now()}`,at,kind:'evidence',label:`新增证据：${ev.title}`,detail:ev.source}],updatedAt:at}}}}
 case'COACH_EVIDENCE_REMOVE':{const old=s.coachingCases[a.id!]||emptyCase();return{...s,coachingCases:{...s.coachingCases,[a.id!]:{...old,evidence:old.evidence.filter(x=>x.id!==a.value),updatedAt:stamp()}}}}
 case'COACH_PAUSE':{const old=s.coachingCases[a.id!]||emptyCase();const at=stamp();return{...s,coachingCases:{...s.coachingCases,[a.id!]:{...old,paused:true,severity:'blocked',blockedReason:a.value||old.blockedReason,timeline:[...old.timeline,{id:`tl-${Date.now()}`,at,kind:'pause',label:'案件暂停/阻断',detail:a.value||old.blockedReason}],updatedAt:at}}}}
 case'COACH_RESUME':{const old=s.coachingCases[a.id!]||emptyCase();const at=stamp();return{...s,coachingCases:{...s.coachingCases,[a.id!]:{...old,paused:false,severity:'attention',timeline:[...old.timeline,{id:`tl-${Date.now()}`,at,kind:'resume',label:'案件恢复执行'}],updatedAt:at}}}}
 case'MODE':return{...s,mode:a.value as State['mode']};
 case'RULE':return{...s,rules:{...s.rules,[a.id!]:a.payload as any}};
 case'RESULT':return{...s,resultStatus:{...s.resultStatus,[a.id!]:a.value!}};
 case'RESULT_NOTE':return{...s,resultNotes:{...s.resultNotes,[a.id!]:a.value!}};
 case'HYDRATE':{const v=(a.payload||{}) as Partial<State>;return{...initial,...v,lessonStatus:v.lessonStatus||{},workshopState:v.workshopState||{},coachingState:v.coachingState||{},workshopWorkspace:v.workshopWorkspace||{},coachingCases:v.coachingCases||{},toolWorkspace:v.toolWorkspace||{},rules:v.rules||{},resultStatus:v.resultStatus||{},resultNotes:v.resultNotes||{}}}
 default:return s}}
const C=createContext<{state:State;dispatch:React.Dispatch<Action>}>({state:initial,dispatch:()=>{}});
export function AppStateProvider({children}:PropsWithChildren){const[state,dispatch]=useReducer(reducer,initial);useEffect(()=>{repo.get('state',initial).then(v=>dispatch({type:'HYDRATE',payload:v}))},[]);useEffect(()=>{repo.set('state',state)},[state]);const value=useMemo(()=>({state,dispatch}),[state]);return <C.Provider value={value}>{children}</C.Provider>}
export const useAppState=()=>useContext(C);
