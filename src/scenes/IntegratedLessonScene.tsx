import type { LessonContent } from '../types/content'
import { useCourseStore } from '../store/courseStore'

export function IntegratedLessonScene({lesson,children}:{lesson:LessonContent;children:React.ReactNode}){
 const presenterStep=useCourseStore(s=>s.instructorStep)
 const instructorMode=useCourseStore(s=>s.instructorMode)
 return <div
  className={`lesson-presentation step-${instructorMode?presenterStep:5}`}
  data-presenter-step={instructorMode?presenterStep:5}
  data-lesson-code={lesson.code}
 >
  <div className="reveal-scene">{children}</div>
 </div>
}
