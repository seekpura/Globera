import { Navigate, useParams } from 'react-router-dom'
import { getLesson } from '../lib/course'
import { SceneRouter } from '../scenes/SceneRouter'

export function LessonPage() {
  const { moduleId, lessonId } = useParams()
  const lesson = getLesson(moduleId, lessonId)
  if (!lesson) return <Navigate to="/course/t01" replace />
  return <SceneRouter lesson={lesson} />
}
