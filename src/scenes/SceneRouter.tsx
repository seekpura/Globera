import type { LessonContent } from '../types/content'
import { PlatformUniverseScene } from './platform-universe/PlatformUniverseScene'
import { MarketExplorerScene } from './market-explorer/MarketExplorerScene'
import { ProductOpportunityScene } from './product-opportunity/ProductOpportunityScene'
import { VideoAnalyzerScene } from './video-analyzer/VideoAnalyzerScene'
import { LogisticsJourneyScene } from './logistics-journey/LogisticsJourneyScene'
import { DecisionRoomScene } from './decision-room/DecisionRoomScene'
import { LessonWorkbench } from './generic/LessonWorkbench'

export function SceneRouter({ lesson }: { lesson: LessonContent }) {
  switch (lesson.sceneType) {
    case 'platform-universe': return <PlatformUniverseScene />
    case 'market-explorer': return <MarketExplorerScene />
    case 'product-opportunity': return <ProductOpportunityScene />
    case 'video-analyzer': return <VideoAnalyzerScene />
    case 'logistics-journey': return <LogisticsJourneyScene />
    case 'decision-room': return <DecisionRoomScene />
    default: return <LessonWorkbench lesson={lesson} />
  }
}
