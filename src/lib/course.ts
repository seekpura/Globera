import { course, modules, lessons } from '../data/courseContent'
import type { LessonContent, ModuleContent } from '../types/content'
export { course, modules, lessons }
export function getModule(moduleId?: string): ModuleContent | undefined { return modules.find((m)=>m.id===moduleId) }
export function getLesson(moduleId?: string, lessonId?: string): LessonContent | undefined { if(!moduleId||!lessonId)return undefined; return lessons.find((l)=>l.module===moduleId&&l.lesson===lessonId) }
export function getLessonByCode(code:string){ return lessons.find((l)=>l.code===code) }
export function lessonHref(lesson:LessonContent){ return `/course/t01/${lesson.module}/${lesson.lesson}` }
export function moduleLessons(moduleId:string){ return lessons.filter((l)=>l.module===moduleId) }
export function adjacentLesson(lesson:LessonContent,delta:-1|1){ const index=lessons.findIndex((l)=>l.code===lesson.code); return lessons[index+delta] }
