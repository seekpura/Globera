import { Link, useParams } from 'react-router-dom'
import { moduleLessons } from '../lib/course'

export function LessonNavigator() {
  const { moduleId = 'm01', lessonId = 'l01' } = useParams()
  const items = moduleLessons(moduleId)
  return (
    <div className="lesson-nav" aria-label="当前模块课程">
      {items.map((lesson) => (
        <Link key={lesson.code} to={`/course/t01/${lesson.module}/${lesson.lesson}`} className={lesson.lesson === lessonId ? 'current' : ''}>
          <span>{lesson.lesson.toUpperCase()}</span>
          <strong>{lesson.title}</strong>
        </Link>
      ))}
    </div>
  )
}
