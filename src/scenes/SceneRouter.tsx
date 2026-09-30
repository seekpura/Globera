import type { LessonContent } from '../types/content'
import { PlatformUniverseScene } from './platform-universe/PlatformUniverseScene'
import { MarketExplorerScene } from './market-explorer/MarketExplorerScene'
import { ProductOpportunityScene } from './product-opportunity/ProductOpportunityScene'
import { VideoAnalyzerScene } from './video-analyzer/VideoAnalyzerScene'
import { LogisticsJourneyScene } from './logistics-journey/LogisticsJourneyScene'
import { DecisionRoomScene } from './decision-room/DecisionRoomScene'
import { KnowledgeWorldScene } from './families/KnowledgeWorldScene'
import { DecisionLabScene } from './families/DecisionLabScene'
import { EconomicSimulatorScene } from './families/EconomicSimulatorScene'
import { ProductWorkbenchScene } from './families/ProductWorkbenchScene'
import { MediaLabScene } from './families/MediaLabScene'
import { ProcessJourneyScene } from './families/ProcessJourneyScene'
import { M05M08Scene } from './integrated/M05M08Scene'
import { M09M12Scene } from './integrated/M09M12Scene'

const economic = new Set(['economics-lab','cost-lab','inventory-cash','paid-growth','money-flow','pnl-lab'])
const product = new Set(['supply-map','purchase-journey','product-structure','listing-builder','asset-lineage','publish-qa'])
const media = new Set(['content-match','ai-content','content-remix','creator-fit','affiliate-system','live-fit'])
const process = new Set(['fulfillment-simulator','readiness-check','commerce-journey','health-simulator','order-timeline','customs-lab'])
const decision = new Set(['market-localization','sea-atlas','region-explorer','route-configurator','kyc-map','evidence-lab','product-gate','portfolio-board','growth-mixer','signal-lab','funnel-diagnosis'])
export function SceneRouter({lesson}:{lesson:LessonContent}){
 if(['m05','m06','m07','m08'].includes(lesson.module) && lesson.sceneType!=='product-opportunity') return <M05M08Scene lesson={lesson}/>
 if(['m09','m10','m11','m12'].includes(lesson.module) && !['video-analyzer','logistics-journey','decision-room'].includes(lesson.sceneType)) return <M09M12Scene lesson={lesson}/>
 switch(lesson.sceneType){
  case 'platform-universe': return <PlatformUniverseScene/>
  case 'market-explorer': return <MarketExplorerScene/>
  case 'product-opportunity': return <ProductOpportunityScene/>
  case 'video-analyzer': return <VideoAnalyzerScene/>
  case 'logistics-journey': return <LogisticsJourneyScene/>
  case 'decision-room': return <DecisionRoomScene/>
 }
 if(economic.has(lesson.sceneType)) return <EconomicSimulatorScene lesson={lesson}/>
 if(product.has(lesson.sceneType)) return <ProductWorkbenchScene lesson={lesson}/>
 if(media.has(lesson.sceneType)) return <MediaLabScene lesson={lesson}/>
 if(process.has(lesson.sceneType)) return <ProcessJourneyScene lesson={lesson}/>
 if(decision.has(lesson.sceneType)) return <DecisionLabScene lesson={lesson}/>
 return <KnowledgeWorldScene lesson={lesson}/>
}