import { Navigate, useParams } from 'react-router-dom'
import { getLesson } from '../lib/course'
import { SceneRouter } from '../scenes/SceneRouter'
import { lessonSpecs } from '../data/lessonSpecsM01M02'
import { FormalLessonLayer } from './FormalLessonLayer'
export function LessonPage(){const {moduleId,lessonId}=useParams();const lesson=getLesson(moduleId,lessonId);if(!lesson)return <Navigate to="/course/t01" replace/>;const spec=lessonSpecs[lesson.code];return <><SceneRouter lesson={lesson}/>{spec&&<FormalLessonLayer spec={spec}/>}</>}