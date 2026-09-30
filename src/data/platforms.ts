import type { Mechanism, Platform, ProductArchetype } from '../types/platform'

export const mechanisms: Mechanism[] = [
  { id: 'search', zh: '搜索发现', en: 'Search Discovery', x: 50, y: 18 },
  { id: 'content', zh: '内容发现', en: 'Content Discovery', x: 78, y: 36 },
  { id: 'mall', zh: '商城浏览', en: 'Mall Browsing', x: 70, y: 72 },
  { id: 'deal', zh: '价格发现', en: 'Deal Discovery', x: 30, y: 72 },
  { id: 'direct', zh: '直接访问', en: 'Direct Visit', x: 22, y: 36 },
]

export const platforms: Platform[] = [
  { id:'amazon', name:'Amazon', x:48,y:7, mechanisms:['search','mall'], positioningZh:'以明确购物意图、搜索与商品页承接为核心的成熟电商平台。', discoveryZh:'用户常通过搜索、推荐与广告发现商品，再进入商品详情页比较。', trustZh:'评价、价格、配送承诺、品牌与商品信息共同降低购买不确定性。', fulfillmentZh:'可由平台履约或卖家履约；履约结构会显著影响配送体验与经营成本。', suitableZh:['已有明确搜索需求的标准化商品','规格和商品信息可清晰表达的商品'], cautionZh:['不能把平台规模直接等同于某个商品适合','搜索竞争与评价壁垒需要单独判断'], journey:[
    {id:'search',zh:'搜索 / 推荐',en:'Search / Recommendation',noteZh:'用户产生明确或半明确购买意图。'},
    {id:'serp',zh:'搜索结果页',en:'SERP',noteZh:'价格、图片、评价和配送信息进入第一轮比较。'},
    {id:'pdp',zh:'商品详情页',en:'PDP',noteZh:'规格、卖点、评价与交易条件承担核心承接。'},
    {id:'reviews',zh:'评价与信任',en:'Reviews & Trust',noteZh:'历史购买反馈帮助用户降低商品不确定性。'},
    {id:'fulfillment',zh:'履约',en:'Fulfillment',noteZh:'配送方式、速度和退货体验继续影响决策。'}]},
  { id:'tiktok', name:'TikTok Shop', x:88,y:33, mechanisms:['content','mall','search'], positioningZh:'把内容发现、达人、直播与商品交易连接起来的内容电商体系。', discoveryZh:'用户可能先看到短视频、达人或直播，再进入商品；也可能通过搜索和商城主动找商品。', trustZh:'真实演示、创作者表达、商品信息、评论与履约共同建立信任。', fulfillmentZh:'经营路径需要同时考虑平台要求、库存位置、物流时效和售后。', suitableZh:['视觉展示性强、过程或结果容易理解的商品','可以持续产生内容表达的商品'], cautionZh:['高播放不直接等于高购买需求','内容能力不能替代商品、利润和合规条件'], journey:[
    {id:'fyp',zh:'推荐流',en:'For You',noteZh:'用户可能在没有主动搜索时先被内容触达。'},
    {id:'video',zh:'短视频 / 达人 / 直播',en:'Video / Creator / LIVE',noteZh:'内容承担发现、解释、证明和信任建立。'},
    {id:'anchor',zh:'商品入口',en:'Product Anchor',noteZh:'用户从内容进入商品购买路径。'},
    {id:'pdp',zh:'商品详情页',en:'PDP',noteZh:'价格、规格、评价、配送等继续完成承接。'},
    {id:'checkout',zh:'结算与订单',en:'Checkout & Order',noteZh:'购买意图最终转化为交易。'}]},
  { id:'noon', name:'Noon', x:27,y:82, mechanisms:['search','mall','deal'], positioningZh:'面向中东市场的重要区域型电商平台之一，搜索、类目与商品页承担主要货架交易。', discoveryZh:'用户可通过搜索、类目、活动与商品详情页完成发现和比较。', trustZh:'商品信息、价格、配送、卖家/履约结构和平台体验共同影响信任。', fulfillmentZh:'跨境经营路径与履约路径需要分开理解；库存与配送方式会改变经营模型。', suitableZh:['面向中东消费市场且价格、履约和本地化可成立的商品','可通过搜索和商品页清晰表达价值的商品'], cautionZh:['区域市场不能简单等同于一个国家','跨境卖家身份与物流方式不能混为一谈'], journey:[
    {id:'search',zh:'搜索 / 类目',en:'Search / Category',noteZh:'用户从关键词或类目进入候选商品集合。'},
    {id:'serp',zh:'商品结果',en:'Product Results',noteZh:'价格、促销、评价和配送信号参与比较。'},
    {id:'pdp',zh:'商品详情页',en:'PDP',noteZh:'商品信息与交易条件承担核心承接。'},
    {id:'route',zh:'经营路径',en:'Seller Route',noteZh:'跨境、本地与目标市场条件需要单独确认。'},
    {id:'fulfillment',zh:'履约',en:'Fulfillment',noteZh:'直发、本地仓或平台物流会影响成本和体验。'}]},
  { id:'shopee',name:'Shopee',x:82,y:74,mechanisms:['search','mall','deal'],positioningZh:'东南亚等市场常见的综合电商平台。',discoveryZh:'搜索、活动、推荐与店铺等共同承担发现。',trustZh:'价格、评价、店铺表现和平台交易保障共同影响购买。',fulfillmentZh:'物流模式和站点差异需要按市场核验。',suitableZh:['适合明确区域市场与价格带的商品'],cautionZh:['不同国家站点不能视为同一市场'],journey:[] },
  { id:'lazada',name:'Lazada',x:91,y:61,mechanisms:['search','mall','deal'],positioningZh:'东南亚综合电商平台之一。',discoveryZh:'搜索、类目、活动、推荐等形成商品发现。',trustZh:'平台、店铺、评价和配送共同建立信任。',fulfillmentZh:'履约与站点规则需要按国家单独确认。',suitableZh:['区域化货架电商商品'],cautionZh:['市场与站点条件需要分别研究'],journey:[] },
  { id:'temu',name:'Temu',x:43,y:90,mechanisms:['deal','mall'],positioningZh:'强调商品池、价格发现与平台分发体验的跨境电商平台。',discoveryZh:'用户可通过平台推荐、类目和价格刺激发现商品。',trustZh:'平台交易体验、价格与商品信息共同影响购买。',fulfillmentZh:'具体经营与履约条件应按当前卖家模式核验。',suitableZh:['价格竞争力和供应能力较强的商品'],cautionZh:['不能把低价机制简单理解为所有商品都适合'],journey:[] },
  { id:'aliexpress',name:'AliExpress',x:16,y:70,mechanisms:['search','deal','mall'],positioningZh:'全球跨境零售平台之一。',discoveryZh:'搜索、推荐、促销和类目承担发现。',trustZh:'价格、评价、配送和卖家信息共同影响购买。',fulfillmentZh:'跨境物流与目标市场体验需要共同考虑。',suitableZh:['跨境可履约、信息结构清晰的商品'],cautionZh:['低采购价并不等于完整经营优势'],journey:[] },
  { id:'ebay',name:'eBay',x:10,y:45,mechanisms:['search','direct'],positioningZh:'搜索与列表型交易平台，覆盖新品、二手、收藏等多类交易。',discoveryZh:'用户通常通过搜索、分类和卖家商品列表寻找商品。',trustZh:'卖家信誉、商品描述、价格和交易记录非常重要。',fulfillmentZh:'履约取决于卖家设置与目标市场。',suitableZh:['长尾、特定型号、收藏及明确搜索需求商品'],cautionZh:['商品类型与用户意图差异很大'],journey:[] },
  { id:'dtc',name:'DTC',zh:'独立站',x:12,y:24,mechanisms:['direct','content'],positioningZh:'品牌或商家自有交易网站，不自带稳定流量。',discoveryZh:'通常依靠广告、内容、搜索、社交、邮件或已有品牌流量获得访问。',trustZh:'品牌、页面、支付、物流、评价与售后均由商家更主动承担。',fulfillmentZh:'商家需要自行组织支付、库存、仓配与售后体系。',suitableZh:['具备获客能力和品牌经营能力的商品/品牌'],cautionZh:['拥有独立站不等于拥有流量','平台佣金更低不等于总体获客成本更低'],journey:[] },
]

export const products: ProductArchetype[] = [
  {id:'search-product',zh:'明确搜索型商品',en:'Search-led Product',descriptionZh:'用户通常知道自己要买什么，规格、价格和评价对决策更重要。',strengths:{search:1,mall:.75,content:.35,deal:.55,direct:.3}},
  {id:'visual-product',zh:'强视觉演示型商品',en:'Visual-demo Product',descriptionZh:'商品价值能通过短时间演示、过程或结果被快速理解。',strengths:{content:1,search:.52,mall:.62,deal:.45,direct:.35}},
  {id:'regional-product',zh:'区域消费型商品',en:'Regional-market Product',descriptionZh:'需求与语言、价格、文化、物流和区域平台生态关系更强。',strengths:{mall:.9,search:.78,deal:.62,content:.58,direct:.25}},
]