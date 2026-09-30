import { Navigate, Route, Routes } from 'react-router-dom'
import { CourseShell } from '../course/CourseShell'
import { CourseHome } from '../course/CourseHome'
import { LessonPage } from '../course/LessonPage'

export default function App() {
  return (
    <Routes>
      <Route path="/course/t01" element={<CourseShell><CourseHome /></CourseShell>} />
      <Route path="/course/t01/:moduleId/:lessonId" element={<CourseShell><LessonPage /></CourseShell>} />
      <Route path="*" element={<Navigate to="/course/t01" replace />} />
    </Routes>
  )
}
