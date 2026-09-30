import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CourseStore {
  instructorMode: boolean
  reducedMotion: boolean
  insightOpen: boolean
  instructorStep: number
  activeCaseId: string | null
  lessonProgress: Record<string, number>
  sceneResetToken: number
  setInstructorMode: (value: boolean) => void
  setReducedMotion: (value: boolean) => void
  setInsightOpen: (value: boolean) => void
  setInstructorStep: (value: number) => void
  setActiveCaseId: (value: string | null) => void
  setLessonProgress: (code: string, value: number) => void
  resetLessonUi: () => void
  resetScene: () => void
}

export const useCourseStore = create<CourseStore>()(
  persist(
    (set) => ({
      instructorMode: false,
      reducedMotion: false,
      insightOpen: true,
      instructorStep: 0,
      activeCaseId: null,
      lessonProgress: {},
      sceneResetToken: 0,
      setInstructorMode: (value) => set({ instructorMode: value }),
      setReducedMotion: (value) => set({ reducedMotion: value }),
      setInsightOpen: (value) => set({ insightOpen: value }),
      setInstructorStep: (value) => set({ instructorStep: value }),
      setActiveCaseId: (value) => set({ activeCaseId: value }),
      setLessonProgress: (code, value) => set((state) => ({ lessonProgress: { ...state.lessonProgress, [code]: value } })),
      resetLessonUi: () => set({ instructorStep: 0, activeCaseId: null }),
      resetScene: () => set((state) => ({ sceneResetToken: state.sceneResetToken + 1, instructorStep: 0, activeCaseId: null })),
    }),
    { name: 't01-course-state', partialize: (state) => ({ instructorMode: state.instructorMode, reducedMotion: state.reducedMotion, lessonProgress: state.lessonProgress }) },
  ),
)
