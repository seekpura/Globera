import { useNavigate } from 'react-router-dom'
import type { LessonContent } from '../types/content'
import { adjacentLesson, lessonHref } from '../lib/course'
import { useCourseStore } from '../store/courseStore'

export function TeachingControls({ lesson }: { lesson?: LessonContent }) {
  const navigate = useNavigate()
  const instructorMode = useCourseStore((s) => s.instructorMode)
  const reducedMotion = useCourseStore((s) => s.reducedMotion)
  const insightOpen = useCourseStore((s) => s.insightOpen)
  const setInstructorMode = useCourseStore((s) => s.setInstructorMode)
  const setReducedMotion = useCourseStore((s) => s.setReducedMotion)
  const setInsightOpen = useCourseStore((s) => s.setInsightOpen)
  const resetLessonUi = useCourseStore((s) => s.resetLessonUi)
  const resetScene = useCourseStore((s) => s.resetScene)

  const prev = lesson ? adjacentLesson(lesson, -1) : undefined
  const next = lesson ? adjacentLesson(lesson, 1) : undefined

  function fullscreen() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.()
    else document.exitFullscreen?.()
  }

  return (
    <div className="teaching-controls">
      <div className="control-group">
        <button disabled={!prev} onClick={() => prev && navigate(lessonHref(prev))}>← 上一课</button>
        <button disabled={!next} onClick={() => next && navigate(lessonHref(next))}>下一课 →</button>
      </div>
      <div className="control-group compact">
        <button className={insightOpen ? 'active' : ''} onClick={() => setInsightOpen(!insightOpen)}>深入知识</button>
        <button className={reducedMotion ? 'active' : ''} onClick={() => setReducedMotion(!reducedMotion)}>简化动效</button>
        <button className={instructorMode ? 'active' : ''} onClick={() => setInstructorMode(!instructorMode)}>讲师模式</button>
        <button onClick={fullscreen}>全屏教学</button>
        <button onClick={() => { resetLessonUi(); resetScene() }}>重置场景</button>
      </div>
    </div>
  )
}
