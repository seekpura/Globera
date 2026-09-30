import type { LessonTeachingSpec } from '../../types/teaching'
const steps=(prefix:string)=>[
{id:`${prefix}-s1`,phase:'intro' as const,titleZh:'建立问题',instructionZh:'先展示核心经营问题，不提前给结论。'},
{id:`${prefix}-s2`,phase:'observe' as const,titleZh:'观察结构',instructionZh:'让学员点击、比较或拖动，先描述看到的关系。'},
{id:`${prefix}-s3`,phase:'decide' as const,titleZh:'形成判断',instructionZh:'要求学员基于证据形成条件化判断。'},
{id:`${prefix}-s4`,phase:'reflect' as const,titleZh:'揭示边界',instructionZh:'展示反例、未知项与结论失效条件。'},
{id:`${prefix}-s5`,phase:'complete' as const,titleZh:'形成产出',instructionZh:'保存本课判断与下一步核验动作。'}]
export const m01m02TeachingSpecs:LessonTeachingSpec[]=[
{lessonCode:'T01-M01-L01',defaultVisibleIds:['chain'],knowledgeTree:[
{id:'chain',titleZh:'跨境经营主链',titleEn:'Cross-border Commerce Chain',depth:'L1',summaryZh:'商品、信息、资金、履约与责任不是五张独立清单，而是同一笔交易的联动系统。',whyZh:'任一链路断裂都会把前端成交转化为退款、延迟、损失或合规风险。'},
{id:'goods',titleZh:'商品流',depth:'L2',summaryZh:'商品从供应端经过备货、出口、国际运输、进口与末端履约到消费者。',boundaryZh:'商品到达并不代表资金已经回收。'},
{id:'info',titleZh:'信息流',depth:'L2',summaryZh:'Listing、内容、订单、Tracking、售后与平台状态持续改变经营决策。'},
{id:'money',titleZh:'资金流',depth:'L2',summaryZh:'消费者付款、平台结算、退款、费用、换汇和银行到账存在时间差。'},
{id:'exception',titleZh:'异常传播',depth:'L3',summaryZh:'缺货、延误、错误信息、退款等异常会跨链路传播。'}],evidence:[
{id:'m01l01-e1',titleZh:'订单状态示例',level:'E5',verdict:'supported',sourceType:'simulation',sourceZh:'课堂状态机模拟',supportsZh:'说明商品、信息和资金状态不同步。'}],variables:[
{id:'lead',labelZh:'履约周期',kind:'number',min:2,max:30,step:1,defaultValue:8,unit:'天',sourceStatus:'estimated',impacts:['库存','客户承诺','退款风险','现金周期']}],cases:[
{id:'m01l01-c1',titleZh:'成交后缺货',kind:'counterexample',contextZh:'商品已产生订单，但库存实际不可履约。',promptZh:'哪些链路会同时受到影响？',revealZh:'商品流先失败，随后信息流进入取消/售后，资金流可能退款，店铺健康也可能受影响。'}],presenterSteps:steps('m01l01')},
{lessonCode:'T01-M01-L02',defaultVisibleIds:['discovery'],knowledgeTree:[
{id:'discovery',titleZh:'商品发现机制',titleEn:'Discovery Mechanism',depth:'L1',summaryZh:'平台差异首先来自用户如何发现商品。'},
{id:'search',titleZh:'搜索发现',titleEn:'Search Discovery',depth:'L2',summaryZh:'用户带着明确或半明确需求主动寻找商品。'},
{id:'content',titleZh:'内容发现',titleEn:'Content Discovery',depth:'L2',summaryZh:'用户可能先被内容触达，再形成商品需求。'},
{id:'pdp',titleZh:'商品承接',titleEn:'Product Detail Page',depth:'L3',summaryZh:'发现之后仍需要商品信息、价格、评价、配送等完成交易承接。'},
{id:'compare',titleZh:'平台比较边界',depth:'L4',summaryZh:'比较经营结构，不给平台做脱离商品条件的好坏排名。'}],evidence:[
{id:'m01l02-e1',titleZh:'平台公开前台观察',level:'E2',verdict:'supported',sourceType:'observed',sourceZh:'公开搜索结果页 / 商品详情页 / 内容交易入口',supportsZh:'支持不同平台存在不同发现与承接路径。'}],variables:[
{id:'product-archetype',labelZh:'商品发现原型',kind:'choice',defaultValue:'visual',sourceStatus:'known',impacts:['发现机制优先级','平台研究重点']}],cases:[
{id:'m01l02-c1',titleZh:'明确搜索商品与强演示商品',kind:'simulation',contextZh:'同一市场中比较标准配件与强视觉演示商品。',promptZh:'两类商品应优先研究哪些发现机制？',revealZh:'前者更重搜索意图与商品页比较，后者更重内容演示与内容到商品的承接。'}],presenterSteps:steps('m01l02')},
{lessonCode:'T01-M01-L03',defaultVisibleIds:['axes'],knowledgeTree:[
{id:'axes',titleZh:'经营模式四轴',depth:'L1',summaryZh:'平台、流量、库存与履约是独立但联动的经营轴。'},
{id:'platform',titleZh:'交易载体',depth:'L2',summaryZh:'平台店、内容电商、独立站等决定交易与规则环境。'},
{id:'traffic',titleZh:'流量来源',depth:'L2',summaryZh:'搜索、内容、达人、广告与自有流量决定获客方式。'},
{id:'inventory',titleZh:'库存位置',depth:'L2',summaryZh:'中国备货、本地仓、平台仓等改变资金和时效。'},
{id:'fulfillment',titleZh:'履约责任',depth:'L2',summaryZh:'商家、平台与第三方的责任划分影响成本和体验。'}],evidence:[],variables:[
{id:'inventory-position',labelZh:'库存位置',kind:'choice',defaultValue:'crossborder',sourceStatus:'known',impacts:['时效','现金占用','退货处理']}],cases:[
{id:'m01l03-c1',titleZh:'内容电商不等于直发',kind:'counterexample',contextZh:'把流量模式和履约模式误当成同一个概念。',promptZh:'应该拆成哪些独立轴？',revealZh:'内容电商描述发现/成交机制；直发描述履约方式，两者可以组合但不能互相替代。'}],presenterSteps:steps('m01l03')},
{lessonCode:'T01-M01-L04',defaultVisibleIds:['contribution'],knowledgeTree:[
{id:'contribution',titleZh:'单位贡献',titleEn:'Unit Contribution',depth:'L1',summaryZh:'售价减去商品、履约、平台、增长、退款等可归属成本后，才接近单笔经营贡献。'},
{id:'breakeven',titleZh:'盈亏平衡',titleEn:'Break-even',depth:'L2',summaryZh:'固定投入与单位贡献共同决定需要多少有效订单才能覆盖投入。'},
{id:'cash',titleZh:'现金周期',depth:'L2',summaryZh:'利润为正仍可能因为备货和结算时间差产生现金压力。'},
{id:'stress',titleZh:'压力测试',depth:'L3',summaryZh:'退款、广告、物流和汇率变化都应进入保守情景。'}],evidence:[],variables:[
{id:'price',labelZh:'成交价',kind:'currency',min:10,max:200,step:1,defaultValue:100,unit:'$',sourceStatus:'estimated',impacts:['贡献','转化']},
{id:'refund',labelZh:'退款损失',kind:'percentage',min:0,max:40,step:1,defaultValue:5,unit:'%',sourceStatus:'estimated',impacts:['贡献','现金']}],cases:[
{id:'m01l04-c1',titleZh:'有销量但没有贡献',kind:'simulation',contextZh:'商品销量增长，同时广告和退款快速上升。',promptZh:'GMV增长能否证明经营质量改善？',revealZh:'不能。需要回到净销售额、完整成本和贡献，并检查现金周期。'}],presenterSteps:steps('m01l04')},
{lessonCode:'T01-M02-L01',defaultVisibleIds:['conditioned'],knowledgeTree:[
{id:'conditioned',titleZh:'条件化市场判断',depth:'L1',summaryZh:'不存在脱离商品、经营能力和证据条件的固定“最佳市场”。'},
{id:'demand',titleZh:'需求与购买力',depth:'L2',summaryZh:'宏观规模只是背景，商品级需求仍需直接证据。'},
{id:'competition',titleZh:'竞争与价格带',depth:'L2',summaryZh:'竞争要看真正可替代的商品集合，而不是类目总商品数。'},
{id:'localization',titleZh:'本地化条件',depth:'L2',summaryZh:'语言、文化、支付、内容表达和售后都会改变经营难度。'},
{id:'compliance',titleZh:'准入与合规',depth:'L3',summaryZh:'硬性准入条件可以直接改变市场可行性。'}],evidence:[
{id:'m02l01-e1',titleZh:'市场宏观数据',level:'E3',verdict:'unknown',sourceType:'research',sourceZh:'开课前补充目标市场最新研究',supportsZh:'用于建立市场背景，不直接证明某个SKU机会。'}],variables:[
{id:'product-type',labelZh:'商品类型',kind:'choice',defaultValue:'visual',sourceStatus:'known',impacts:['维度优先级','证据需求']},
{id:'fulfillment-capability',labelZh:'履约能力',kind:'choice',defaultValue:'crossborder',sourceStatus:'estimated',impacts:['可售市场','时效','成本']}],cases:[
{id:'m02l01-c1',titleZh:'同一市场，不同商品结论不同',kind:'simulation',contextZh:'视觉演示型商品与高合规门槛商品同时评估一个大市场。',promptZh:'为什么不能用同一固定市场评分？',revealZh:'商品属性会改变合规、内容、物流、价格和竞争的重要性，市场判断必须随条件重算。'}],presenterSteps:steps('m02l01'),researchGaps:[{id:'g-m02-1',priority:'P0',type:'research',descriptionZh:'开课前更新目标国家平台规模、消费与物流背景。'}]},
{lessonCode:'T01-M02-L02',defaultVisibleIds:['naeu'],knowledgeTree:[
{id:'naeu',titleZh:'北美与欧洲不是单一市场',depth:'L1',summaryZh:'国家、语言、税务、产品要求、物流和消费者习惯必须拆开。'},
{id:'local',titleZh:'本地化表达',depth:'L2',summaryZh:'语言翻译只是第一层，本地语境、尺寸、单位、承诺和售后都影响理解。'},
{id:'rules',titleZh:'规则与责任',depth:'L3',summaryZh:'产品与消费者保护要求应按具体国家和商品类别核验。'}],evidence:[],variables:[{id:'localization-depth',labelZh:'本地化深度',kind:'number',min:1,max:5,step:1,defaultValue:2,sourceStatus:'estimated',impacts:['理解','信任','成本']}],cases:[{id:'m02l02-c1',titleZh:'只翻译英文Listing',kind:'counterexample',contextZh:'把美国版页面直接机器翻译后用于欧洲多个国家。',promptZh:'还缺哪些判断？',revealZh:'至少还要检查语言、单位、产品责任、税务/价格展示、物流、退货和当地表达。'}],presenterSteps:steps('m02l02'),researchGaps:[{id:'g-m02-2',priority:'P0',type:'compliance',descriptionZh:'动态法规只提供教学框架，具体商品进入市场前必须按国家与品类重新核验。'}]},
{lessonCode:'T01-M02-L03',defaultVisibleIds:['sea'],knowledgeTree:[
{id:'sea',titleZh:'东南亚六国差异',depth:'L1',summaryZh:'印尼、马来西亚、泰国、越南、菲律宾、新加坡在语言、支付、价格、物流与平台生态上存在明显差异。'},
{id:'mobile',titleZh:'移动与内容消费',depth:'L2',summaryZh:'移动端与社交内容重要，但不能因此假设所有商品都适合内容电商。'},
{id:'country',titleZh:'国家级验证',depth:'L3',summaryZh:'每个国家都要单独验证商品、平台、支付、履约与准入。'}],evidence:[],variables:[{id:'country',labelZh:'目标国家',kind:'choice',defaultValue:'ID',sourceStatus:'known',impacts:['语言','价格','支付','物流','合规']}],cases:[{id:'m02l03-c1',titleZh:'把东南亚当成一个市场',kind:'counterexample',contextZh:'用同一价格、语言和物流方案覆盖六国。',promptZh:'哪些变量必须按国家拆开？',revealZh:'至少拆语言、货币/价格、平台、支付、物流、合规和内容语境。'}],presenterSteps:steps('m02l03'),researchGaps:[{id:'g-m02-3',priority:'P0',type:'research',descriptionZh:'六国动态平台与支付数据需按开课时间更新。'}]},
{lessonCode:'T01-M02-L04',defaultVisibleIds:['regions'],knowledgeTree:[
{id:'regions',titleZh:'区域只是第一层地图',depth:'L1',summaryZh:'中东、日韩和拉美内部差异很大，必须从区域继续下钻到国家。'},
{id:'gcc',titleZh:'中东与GCC',depth:'L2',summaryZh:'语言、进口、认证、支付和区域平台生态共同影响商品进入。'},
{id:'jk',titleZh:'日本与韩国',depth:'L2',summaryZh:'商品质量、信息精度、本地表达和消费者预期需要单独研究。'},
{id:'latam',titleZh:'拉美',depth:'L2',summaryZh:'国家间支付、物流、税费、语言与平台差异不能用单一模板覆盖。'}],evidence:[],variables:[{id:'region',labelZh:'区域',kind:'choice',defaultValue:'GCC',sourceStatus:'known',impacts:['国家池','研究优先级']}],cases:[{id:'m02l04-c1',titleZh:'区域热度替代国家判断',kind:'counterexample',contextZh:'看到某区域增长后直接决定进入。',promptZh:'还需要下钻哪些层？',revealZh:'至少进入国家、平台、商品、准入、物流、支付和经营经济层。'}],presenterSteps:steps('m02l04'),researchGaps:[{id:'g-m02-4',priority:'P0',type:'research',descriptionZh:'目标国家池和平台动态信息开课前刷新。'}]}
]