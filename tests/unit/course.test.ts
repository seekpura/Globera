import { describe, expect, it } from 'vitest'
import { adjacentLesson, getLesson, getLessonByCode, lessonHref, lessons, moduleLessons, modules } from '../../src/lib/course'

describe('T01 course registry', () => {
  it('contains 12 modules and 48 unique lessons', () => {
    expect(modules).toHaveLength(12)
    expect(lessons).toHaveLength(48)
    expect(new Set(lessons.map((lesson) => lesson.code)).size).toBe(48)
  })

  it('contains four lessons in every module', () => {
    for (const module of modules) expect(moduleLessons(module.id)).toHaveLength(4)
  })

  it('resolves deep links and lesson codes consistently', () => {
    const lesson = getLesson('m06', 'l01')
    expect(lesson?.code).toBe('T01-M06-L01')
    expect(getLessonByCode('T01-M06-L01')?.title).toBe(lesson?.title)
    expect(lesson && lessonHref(lesson)).toBe('/course/t01/m06/l01')
  })

  it('walks the complete course in sequence', () => {
    const first = lessons[0]
    const second = adjacentLesson(first, 1)
    const last = lessons[lessons.length - 1]
    expect(second?.code).toBe('T01-M01-L02')
    expect(adjacentLesson(last, 1)).toBeUndefined()
  })
})
