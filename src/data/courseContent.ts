import type { CourseContentData, LessonContent, ModuleContent } from '../types/content'

const moduleSpecs = [
['m01','M01','跨境电商基础与全球平台','建立跨境经营全局认知。','commerce-network'],
['m02','M02','全球市场与区域特点','掌握海外市场判断框架。','market-atlas'],
['m03','M03','商家主体、本土店与跨境店','拆开理解主体、身份、站点与履约。','seller-structure'],
['m04','M04','TikTok Shop平台与商业生态','理解 TikTok Shop 商业生态。','tiktok-ecosystem'],
['m05','M05','经营环境、入驻与店铺基础','完成经营启动准备。','launch-readiness'],
['m06','M06','商品、选品与基础合规','建立商品机会与风险判断。','product-opportunity'],
['m07','M07','供应链、成本与定价基础','理解供应、成本、定价、库存与现金。','supply-economics'],
['m08','M08','Listing与店铺基础运营','把商品事实转化为可发布商品信息。','product-workbench'],
['m09','M09','TikTok内容电商与AI内容认知','理解内容成交与 AI 内容边界。','content-studio'],
['m10','M10','达人、Affiliate、广告与直播商业模式','理解主要增长方式与启动条件。','growth-network'],
['m11','M11','订单、物流、关务、结算与税费基础','看懂订单到资金回收的完整链路。','order-journey'],
['m12','M12','数据与经营复盘','诊断经营结果并形成下一周期行动。','decision-room'],
] as const

export const modules: ModuleContent[] = moduleSpecs.map(([id,code,titleZh,missionZh,world])=>({id,code,titleZh,missionZh,world}))

const lessonSpecs = [
['m01','跨境电商完整链路：商品、平台、流量、履约与资金','system-map'],['m01','全球跨境平台地图：Amazon、TikTok Shop、Shopee、Lazada、Temu、AliExpress、eBay、Noon与独立站','platform-universe'],['m01','跨境电商经营模式：平台店、内容电商、独立站、分销与海外仓','model-composer'],['m01','一笔跨境生意的基础经济账：成本、费用、毛利与现金意识','economics-lab'],
['m02','判断海外市场的八个维度','market-explorer'],['m02','北美与欧洲市场特点','market-localization'],['m02','东南亚六国市场特点','sea-atlas'],['m02','中东、日韩与拉美市场基础认知','region-explorer'],
['m03','主体、卖家身份、站点与店铺模式','identity-map'],['m03','本地卖家与本土店','local-seller'],['m03','跨境商家与跨境店','crossborder-route'],['m03','直发、本地仓、平台仓与混合履约','fulfillment-simulator'],
['m04','TikTok、TikTok Shop、Seller Center与账号关系','ecosystem-map'],['m04','TikTok Shop主要成交场景','commerce-journey'],['m04','内容、达人、广告与LIVE如何协同','growth-mixer'],['m04','规则、店铺健康、生命周期与风险','health-simulator'],
['m05','经营环境与资产权限','access-graph'],['m05','本期统一经营路线','route-configurator'],['m05','入驻资料与KYC一致性','kyc-map'],['m05','Seller Center基础配置与经营就绪','readiness-check'],
['m06','商品判断：什么值得进入TikTok测试','product-opportunity'],['m06','市场、商品与内容信号验证','evidence-lab'],['m06','基础产品合规与风险闸门','product-gate'],['m06','首批测试商品组合','portfolio-board'],
['m07','供应链来源地图','supply-map'],['m07','采购验证流程','purchase-journey'],['m07','完整成本与单位经济','cost-lab'],['m07','定价、库存、补货与现金','inventory-cash'],
['m08','类目、属性、SKU与变体','product-structure'],['m08','标题、关键词、卖点与语言','listing-builder'],['m08','主图、详情、视频与素材真实性','asset-lineage'],['m08','价格、库存、配送、发布与QA','publish-qa'],
['m09','内容为什么成交','video-analyzer'],['m09','九类带货视频与适配场景','content-match'],['m09','AI内容生产与人工审核','ai-content'],['m09','结构复刻、本地化与版权边界','content-remix'],
['m10','Creator达人生态与商品匹配','creator-fit'],['m10','Affiliate开放合作与定向合作','affiliate-system'],['m10','GMV Max与付费增长基础','paid-growth'],['m10','真人LIVE、AI直播与适用判断','live-fit'],
['m11','订单履约与异常状态','order-timeline'],['m11','国际物流、Tracking、直邮与海外仓基础','logistics-journey'],['m11','HS、出口报关、进口清关、关税与常见单证','customs-lab'],['m11','平台结算、跨境收款、汇率、税费与基础对账','money-flow'],
['m12','店铺、商品与Shop Health：基础经营漏斗','funnel-diagnosis'],['m12','内容、达人、广告与LIVE数据怎么看','signal-lab'],['m12','单品与周期P&L：有销量为什么也可能亏','pnl-lab'],['m12','第一阶段经营复盘与下一阶段30天计划','decision-room'],
] as const

const core: Record<string,string> = {
'platform-universe':'平台差异首先来自用户如何发现、理解、信任并购买商品。',
'market-explorer':'没有脱离商品条件的“最好市场”；市场判断会随着证据和经营约束增加而变化。',
'product-opportunity':'商品机会来自需求、竞争、产品优势、内容适配、经营经济与风险的共同判断。',
'video-analyzer':'内容成交不是播放量本身，而是让用户从注意逐步进入理解、相信、想要与行动。',
'logistics-journey':'包裹位置、Tracking、时效、责任方与异常属于同一条物流时间链。',
'decision-room':'经营复盘的价值不是列出所有问题，而是用证据把复杂问题收敛成三个优先事项和未来30天行动。'
}

export const lessons: LessonContent[] = lessonSpecs.map(([module,title,sceneType],index)=>{
 const moduleNo=Number(module.slice(1)); const lessonNo=(index%4)+1; const code=`T01-M${String(moduleNo).padStart(2,'0')}-L${String(lessonNo).padStart(2,'0')}`
 return {code,module,lesson:`l0${lessonNo}`,title,goal:`掌握“${title}”的核心判断逻辑，并形成可保存、可解释、可复盘的课堂产出。`,highlights:['核心结构与关键变量','证据、边界与常见误判','从知识理解进入经营判断'],tool:`T01-K${String(Math.ceil((index+1)/2)).padStart(2,'0')} 核心教学工具`,output:`${title}课堂产出`,practice:['观察案例并标出关键变量','基于证据完成一次判断或操作','说明结论成立的条件与待核验信息'],homework:['整理本节课堂产出并补齐依据与日期'],completion:'形成一份可打开、可查看、关键判断有依据的课堂成果；动态规则与数据注明来源和日期。',boundary:'本课建立0–1基础经营能力；复杂专业问题进入对应专项课程或陪跑。',coreStatement:core[sceneType] ?? `理解“${title}”不是记住术语，而是看懂结构、证据、变量与经营结果之间的关系。`,sceneType,buildStatus:{research:'researching',content:'approved',assets:'researching',frontend:'review'}} as LessonContent
})

export const course: CourseContentData = { modules, lessons }
