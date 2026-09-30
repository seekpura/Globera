import { Link, useParams } from 'react-router-dom'
import { modules } from '../lib/course'

export function JourneyRail() {
  const { moduleId } = useParams()
  return (
    <nav className="journey-rail" aria-label="T01 十二模块经营旅程">
      {modules.map((module) => (
        <Link
          key={module.id}
          to={`/course/t01/${module.id}/l01`}
          className={module.id === moduleId ? 'current' : ''}
          title={`${module.code}｜${module.titleZh}`}
        >
          <span>{module.code.replace('M', '')}</span>
          <small>{module.titleZh}</small>
        </Link>
      ))}
    </nav>
  )
}
