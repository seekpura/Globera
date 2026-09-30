import { Navigate, useParams } from 'react-router-dom'
import { getLesson } from '../lib/course'
import { SceneRouter } from '../scenes/SceneRouter'
import { IntegratedLessonScene } from '../scenes/IntegratedLessonScene'
import { lessonSpecs } from '../data/lessonSpecs'
import { FormalLessonLayer } from './FormalLessonLayer'
export function LessonPage(){const {moduleId,lessonId}=useParams();const lesson=getLesson(moduleId,lessonId);if(!lesson)return <Navigate to="/course/t01" replace/>;const spec=lessonSpecs[lesson.code];return <><IntegratedLessonScene lesson={lesson}><SceneRouter lesson={lesson}/></IntegratedLessonScene>{spec&&<FormalLessonLayer spec={spec}/>}</>}
