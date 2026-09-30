import type { LessonTeachingSpec } from '../../types/teaching'
import { m01m02TeachingSpecs } from './m01-m02'
export const teachingSpecs:LessonTeachingSpec[]=[...m01m02TeachingSpecs]
export const teachingSpecByLesson=new Map(teachingSpecs.map(spec=>[spec.lessonCode,spec]))
export function getTeachingSpec(lessonCode:string){return teachingSpecByLesson.get(lessonCode)}
