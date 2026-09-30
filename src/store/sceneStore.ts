import { create } from 'zustand'

interface SceneStore {
  selectedPlatformId: string | null
  compareIds: string[]
  productId: string
  instructorMode: boolean
  showLabels: boolean
  setSelectedPlatformId: (id: string | null) => void
  toggleCompare: (id: string) => void
  clearCompare: () => void
  setProductId: (id: string) => void
  setInstructorMode: (value: boolean) => void
  setShowLabels: (value: boolean) => void
  reset: () => void
}

export const useSceneStore = create<SceneStore>((set) => ({
  selectedPlatformId: null,
  compareIds: [],
  productId: 'visual-product',
  instructorMode: false,
  showLabels: true,
  setSelectedPlatformId: (id) => set({ selectedPlatformId: id, compareIds: [] }),
  toggleCompare: (id) => set((state) => {
    if (state.compareIds.includes(id)) return { compareIds: state.compareIds.filter((x) => x !== id), selectedPlatformId: null }
    if (state.compareIds.length >= 2) return { compareIds: [state.compareIds[1], id], selectedPlatformId: null }
    return { compareIds: [...state.compareIds, id], selectedPlatformId: null }
  }),
  clearCompare: () => set({ compareIds: [] }),
  setProductId: (id) => set({ productId: id }),
  setInstructorMode: (value) => set({ instructorMode: value }),
  setShowLabels: (value) => set({ showLabels: value }),
  reset: () => set({ selectedPlatformId: null, compareIds: [], productId: 'visual-product', showLabels: true }),
}))
