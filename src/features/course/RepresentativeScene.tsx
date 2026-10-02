import {FlowGraph} from '../../components/visual/FlowGraph';
import {ContentAnalyzer} from '../../components/visual/ContentAnalyzer';
import {GmvAttributionLab} from '../../components/visual/GmvAttributionLab';
import {FunnelDiagnoser} from '../../components/visual/FunnelDiagnoser';
import LessonSceneLab from '../../components/visual/LessonSceneLab';
import {SellerCenterSimulator,ListingStudio,VideoCommerceStudio,CreatorWorkbench,LiveDirector,OrderConsole,ShopHealthConsole} from '../../components/visual/HighFidelityScenes';
export function RepresentativeScene({id}:{id:string;interaction:string}){
  if(id==='T01-C01')return <FlowGraph/>;
  if(id==='T01-C05')return <SellerCenterSimulator/>;
  if(id==='T01-C09')return <ListingStudio mode="structure"/>;
  if(id==='T01-C10')return <ListingStudio mode="copy"/>;
  if(id==='T01-C11')return <ListingStudio mode="media"/>;
  if(id==='T01-C12')return <ListingStudio mode="commerce"/>;
  if(id==='T01-C14')return <VideoCommerceStudio mode="analysis"/>;
  if(id==='T01-C16')return <VideoCommerceStudio mode="script"/>;
  if(id==='T01-C17')return <VideoCommerceStudio mode="publish"/>;
  if(id==='T01-C18')return <CreatorWorkbench mode="mechanism"/>;
  if(id==='T01-C19')return <CreatorWorkbench mode="search"/>;
  if(id==='T01-C20')return <CreatorWorkbench mode="economics"/>;
  if(id==='T01-C22')return <GmvAttributionLab/>;
  if(id==='T01-C23')return <LiveDirector/>;
  if(id==='T01-C24')return <OrderConsole mode="fulfillment"/>;
  if(id==='T01-C25')return <OrderConsole mode="aftersales"/>;
  if(id==='T01-C26')return <ShopHealthConsole/>;
  if(id==='T01-C27')return <FunnelDiagnoser/>;
  return <LessonSceneLab id={id}/>;
}
