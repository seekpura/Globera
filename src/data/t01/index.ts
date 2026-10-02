import course from './course.json'; import routes from './routes.json'; import glossary from './glossary.json'; import workshops from './workshops.json'; import coaching from './coaching.json'; import rules from './rules.json'; import tools from './tools.json';
import type {Lesson,Stage,WorkshopMachine,CoachingMachine,DynamicRule} from '../../domain/types';
export const stages=course.stages as Stage[];
export const allLessons=stages.flatMap(s=>s.courses);
export const getLesson=(id:string)=>allLessons.find(x=>x.code.toLowerCase()===id.toLowerCase());
export const getStageById=(id:string)=>{const n=Number(id.replace('stage-',''))-1;return stages[n]};
export const routeStages=routes.stages;
export const glossaryTerms=glossary.terms as Record<string,string>;
export const workshopMachines=workshops.machines as WorkshopMachine[];
export const coachingMachines=coaching.machines as CoachingMachine[];
export const dynamicRules=rules.rules as DynamicRule[];

export const coreTools=tools.tools as {code:string;title:string;stage:string;fields:string[];formula?:string}[];
export const getTool=(id:string)=>coreTools.find(x=>x.code.toLowerCase()===id.toLowerCase());
