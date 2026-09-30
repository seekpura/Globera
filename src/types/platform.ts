export type MechanismId = 'search' | 'content' | 'mall' | 'deal' | 'direct'

export interface Mechanism {
  id: MechanismId
  zh: string
  en: string
  x: number
  y: number
}

export interface PlatformJourneyNode {
  id: string
  zh: string
  en: string
  noteZh: string
}

export interface Platform {
  id: string
  name: string
  zh?: string
  x: number
  y: number
  mechanisms: MechanismId[]
  positioningZh: string
  discoveryZh: string
  trustZh: string
  fulfillmentZh: string
  suitableZh: string[]
  cautionZh: string[]
  journey: PlatformJourneyNode[]
}

export interface ProductArchetype {
  id: string
  zh: string
  en: string
  descriptionZh: string
  strengths: Partial<Record<MechanismId, number>>
}
