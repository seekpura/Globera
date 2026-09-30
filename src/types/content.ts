export type BuildState = 'not-started' | 'researching' | 'blocked' | 'ready' | 'review' | 'approved'

export interface ModuleContent {
  id: string
  code: string
  titleZh: string
  missionZh: string
  world: string
}

export interface LessonContent {
  code: string
  module: string
  lesson: string
  title: string
  goal: string
  highlights: string[]
  tool: string
  output: string
  practice: string[]
  homework: string[]
  completion: string
  boundary: string
  coreStatement: string
  sceneType: string
  buildStatus: Record<'research' | 'content' | 'assets' | 'frontend', BuildState>
}

export interface CourseContentData {
  modules: ModuleContent[]
  lessons: LessonContent[]
}

export type EvidenceBucket = 'support' | 'contradict' | 'conflict' | 'unknown'
export type ValueState = 'known' | 'estimated' | 'unknown'
