import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getLesson, getModule } from '../lib/course'
import { JourneyRail } from './JourneyRail'
import { LessonNavigator } from './LessonNavigator'
import { TeachingControls } from './TeachingControls'
import { PresenterController } from './PresenterController'
import { useCourseStore } from '../store/courseStore'

export function CourseShell({ children }: { children: ReactNode }) {
  const { moduleId, lessonId } = useParams()
  const lesson = getLesson(moduleId, lessonId)
  const module = getModule(moduleId)
  const instructorMode = useCourseStore((s) => s.instructorMode)
  const reducedMotion = useCourseStore((s) => s.reducedMotion)

  return (
    <div className={`course-shell ${instructorMode ? 'instructor-mode' : ''} ${reducedMotion ? 'reduced-motion' : ''}`}>
      <header className="context-bar">
        <Link className="brand-mark" to="/course/t01" aria-label="返回 T01 课程全景">
          <span>T01</span><small>INTERACTIVE COURSE｜交互课程</small>
        </Link>
        <div className="context-copy">
          <div className="eyebrow">{lesson?.code ?? 'T01'} · {module?.code ?? '课程全景'}</div>
          <div className="context-title">
            {lesson?.title ?? 'TikTok 跨境电商 0–1 经营全景'}
            {module && <span>{module.titleZh}</span>}
          </div>
        </div>
        <div className="context-badge">
          <span>纯前端 · Static-first｜静态优先</span>
          {instructorMode && <strong>讲师模式</strong>}
        </div>
      </header>
      <JourneyRail />
      {lesson && <LessonNavigator />}
      <main className="teaching-stage">{children}</main>
      <PresenterController />
      <TeachingControls lesson={lesson} />
      <footer className="teaching-footer">
        <span>{lesson ? `核心结论：${lesson.coreStatement}` : 'T01｜从跨境认知到首轮经营复盘的完整教学闭环'}</span>
        <span className="source-note">动态平台规则 / 费率 / 准入 / SLA｜服务时效需按开课时间核验</span>
      </footer>
    </div>
  )
}
