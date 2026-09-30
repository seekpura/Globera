import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { getLesson } from '../lib/course'
import { SceneRouter } from '../scenes/SceneRouter'
import { IntegratedLessonScene } from '../scenes/IntegratedLessonScene'
import { lessonSpecs } from '../data/lessonSpecs'
import { FormalLessonLayer } from './FormalLessonLayer'
import { useCourseStore } from '../store/courseStore'

export function LessonPage(){
  const {moduleId,lessonId}=useParams()
  const lesson=getLesson(moduleId,lessonId)
  const instructorMode=useCourseStore(s=>s.instructorMode)
  const instructorStep=useCourseStore(s=>s.instructorStep)
  const setInstructorStep=useCourseStore(s=>s.setInstructorStep)
  const insightOpen=useCourseStore(s=>s.insightOpen)
  useEffect(()=>{ setInstructorStep(0) },[lesson?.code,setInstructorStep])
  if(!lesson)return <Navigate to="/course/t01" replace/>
  const spec=lessonSpecs[lesson.code]
  return <div className={`lesson-sequence ${instructorMode?`presenter-step-${instructorStep}`:'learner-sequence'}`}>
    <IntegratedLessonScene lesson={lesson}><SceneRouter lesson={lesson}/></IntegratedLessonScene>
    {spec&&insightOpen&&<div className="reveal-reflect"><FormalLessonLayer spec={spec}/></div>}
  </div>
}
