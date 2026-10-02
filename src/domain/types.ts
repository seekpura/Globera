export type CourseStatus='locked'|'available'|'in_progress'|'submitted'|'passed'|'needs_revision';
export type EvidenceMode='real'|'simulated'|'mixed';
export type Lesson={code:string;title:string;duration:string;objective:string;tree:string[];visible:string[];deep:string[];demo:string;cases:string[];variables:string[];interaction:string;assessment:string;gaps:string[]};
export type Stage={stage:string;courses:Lesson[]};
export type WorkshopState={key:string;label_zh:string;instruction?:string;completion?:string;kind:string};
export type WorkshopMachine={code:string;stage:string;title:string;duration:string;initial_state:string;states:WorkshopState[];transitions:{id:string;event:string;from:string;to:string}[];branches:{id:string;policy:string;resolver:string}[];tools:string[];results:string[];evidence:string[];fallback:string;completion:string};
export type CoachingState={key:string;label_en:string;label_zh:string;description:string;terminal:boolean};
export type CoachingMachine={code:string;stage:string;title:string;entry:string;initial_state:string;states:CoachingState[];transitions:{id:string;event:string;from:string[];to:string}[];evidence_required:string[];notify_policy:string;dynamic_rule_note:string;exit:string};
export type DynamicRule={id:string;market:string;topic:string;sourceUrl:string;verifiedAt:string;status:'effective'|'preview'|'expired'|'needs_verification';summary:string;payload:Record<string,unknown>};
export type Evidence={id:string;evidenceType:'screenshot'|'url'|'text'|'file'|'metric'|'note';source:string;capturedAt:string;market?:string;mode:EvidenceMode;fileOrUrl?:string;notes:string};
export type WorkspaceEvidence={id:string;type:'截图'|'链接'|'数据'|'说明'|'文件';title:string;source:string;notes:string;createdAt:string;mode:EvidenceMode};
export type WorkshopWorkspace={values:Record<string,string>;checks:Record<string,boolean>;branchFlags:Record<string,boolean>;notes:string;evidence:WorkspaceEvidence[];updatedAt:string};
export type CaseTimelineItem={id:string;at:string;kind:'transition'|'note'|'evidence'|'pause'|'resume';label:string;detail?:string};
export type CoachingCase={owner:string;nextCheck:string;severity:'normal'|'attention'|'blocked';paused:boolean;blockedReason:string;notes:string;evidence:WorkspaceEvidence[];timeline:CaseTimelineItem[];updatedAt:string};

export type ToolRow=Record<string,string|number>;
export type ToolWorkspaceState={rows:ToolRow[];mode:EvidenceMode;status:string;updatedAt:string;sources:string[]};
export type StateLikeForDataFlow={workshopState:Record<string,string>;coachingState:Record<string,string>;workshopWorkspace:Record<string,WorkshopWorkspace>;coachingCases:Record<string,CoachingCase>;toolWorkspace:Record<string,ToolWorkspaceState>;mode:EvidenceMode};
