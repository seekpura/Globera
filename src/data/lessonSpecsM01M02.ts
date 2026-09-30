export interface LessonSpec{
 code:string
 knowledgeTree:{id:string;title:string;defaultVisible:string;deepDive:string[]}[]
 cases:{title:string;type:'case'|'counterexample';summary:string}[]
 variables:{name:string;effect:string;state:'known'|'estimated'|'unknown'}[]
 interaction:{scene:string;actions:string[];motion:string[]}
 evidence:{level:'E1'|'E2'|'E3'|'E4'|'E5';need:string}[]
 gaps:string[]
}
export const lessonSpecs:Record<string,LessonSpec>={
'T01-M01-L01':{code:'T01-M01-L01',knowledgeTree:[
{id:'goods',title:'Goods Flow｜货物流',defaultVisible:'商品从供给端进入跨境履约，再到消费者。',deepDive:['库存位置决定履约选择','逆向物流会改变真实成本']},
{id:'info',title:'Information Flow｜信息流',defaultVisible:'商品事实、Listing、内容、订单和Tracking共同构成信息流。',deepDive:['错误信息会沿链路传播','平台状态不是企业内部真实状态的全部']},
{id:'money',title:'Money Flow｜资金流',defaultVisible:'消费者付款不等于卖家银行到账。',deepDive:['平台结算、退款、费用、汇率与税费需要分层','利润与现金是不同对象']}],cases:[
{title:'有订单但现金仍未回收',type:'case',summary:'用订单→履约→平台结算→跨境收款展示时间差。'},
{title:'把GMV当利润',type:'counterexample',summary:'成交额不能直接代表贡献利润或现金。'}],variables:[
{name:'库存位置',effect:'影响时效、资金占用与退货路径',state:'known'},{name:'退款率',effect:'影响净销售与现金回收',state:'estimated'}],interaction:{scene:'DynamicGraph + FlowJourney',actions:['点击三条主流','触发退款异常','切换直发/本地仓'],motion:['关系传播','异常路径高亮']},evidence:[{level:'E5',need:'教学链路模型'},{level:'E4',need:'真实订单/结算案例'}],gaps:['G4 真实订单与结算案例素材']},
'T01-M01-L02':{code:'T01-M01-L02',knowledgeTree:[
{id:'discovery',title:'Discovery Mechanism｜发现机制',defaultVisible:'平台差异先看用户如何发现商品。',deepDive:['搜索发现','内容发现','商城浏览','价格发现','直接访问']},
{id:'journey',title:'Commerce Journey｜交易旅程',defaultVisible:'发现后仍需经过理解、信任、交易与履约。',deepDive:['Amazon：搜索→SERP→PDP→评价/配送','TikTok：FYP/内容/达人/LIVE→商品入口→PDP→结算','Noon：搜索/类目→PDP→经营与履约路径']},
{id:'fit',title:'Product × Platform Fit｜商品与平台适配',defaultVisible:'商品适配是条件判断，不做平台好坏排名。',deepDive:['明确搜索型','强视觉演示型','区域消费型']}],cases:[
{title:'强视觉演示商品进入TikTok内容发现',type:'case',summary:'观察内容如何先于搜索创造商品理解。'},
{title:'只按平台流量规模选平台',type:'counterexample',summary:'平台规模不能替代商品级经营适配。'}],variables:[
{name:'商品发现类型',effect:'改变平台机制优先级',state:'known'},{name:'目标市场规则',effect:'改变站点/经营可行性',state:'unknown'}],interaction:{scene:'Platform Universe',actions:['点击平台钻取','比较Amazon×TikTok','切换商品原型'],motion:['Semantic Zoom｜语义缩放','关系线重排','上下文连续返回']},evidence:[{level:'E1',need:'平台官方卖家/帮助资料'},{level:'E2',need:'真实SERP/PDP/商城/内容入口观察'}],gaps:['G3 开课前更新平台入口与规则','G4 补充真实页面素材']},
'T01-M01-L03':{code:'T01-M01-L03',knowledgeTree:[
{id:'traffic',title:'Traffic Ownership｜流量来源',defaultVisible:'平台店、内容电商、独立站和分销的获客责任不同。',deepDive:['平台内流量','内容流量','自有流量','合作网络']},
{id:'inventory',title:'Inventory Responsibility｜库存责任',defaultVisible:'经营模式会改变库存位置和风险承担。',deepDive:['卖家库存','平台仓','本地仓','分销/代发']},
{id:'control',title:'Control vs Cost｜控制与成本',defaultVisible:'控制权增加通常意味着更多获客、技术或运营责任。',deepDive:['支付与数据控制','品牌资产','履约责任']}],cases:[
{title:'平台店与独立站并行',type:'case',summary:'同一商品在流量、数据与履约责任上的差异。'},
{title:'把独立站理解为低佣金平台',type:'counterexample',summary:'独立站不自带稳定流量，获客成本不能忽略。'}],variables:[
{name:'流量来源',effect:'改变获客成本与控制权',state:'known'},{name:'库存责任',effect:'改变资金占用和履约风险',state:'known'}],interaction:{scene:'Business Model Composer',actions:['组合平台×流量×库存×履约','比较两种模式'],motion:['结构拼装','责任高亮']},evidence:[{level:'E5',need:'教学模式模型'}],gaps:[]},
'T01-M01-L04':{code:'T01-M01-L04',knowledgeTree:[
{id:'net',title:'Net Sales｜净销售',defaultVisible:'售价需要先扣除折扣、退款等才能进入真实经营计算。',deepDive:['成交额与净销售分离']},
{id:'cost',title:'Complete Cost｜完整成本',defaultVisible:'商品成本只是成本结构的一部分。',deepDive:['包装','跨境物流','本地履约','平台/支付','达人/广告','售后','税费/汇率']},
{id:'cash',title:'Cash Timing｜现金时序',defaultVisible:'利润为正也可能出现现金压力。',deepDive:['采购先付款','库存占用','结算周期']}],cases:[
{title:'高毛利但广告后贡献为负',type:'case',summary:'逐项加入增长成本观察贡献变化。'},
{title:'只算采购价和售价',type:'counterexample',summary:'忽略履约、退款和获客会高估经营空间。'}],variables:[
{name:'售价',effect:'改变净销售与价格竞争力',state:'known'},{name:'退款率',effect:'影响净销售、售后和现金',state:'estimated'},{name:'广告成本',effect:'影响贡献与放大条件',state:'unknown'}],interaction:{scene:'ParameterLab + ProfitBridge',actions:['拖动售价/成本/退款','切换正常/保守情景'],motion:['利润桥动态重排','敏感变量传播']},evidence:[{level:'E4',need:'真实采购/物流/平台费用'},{level:'E5',need:'课堂模拟初始值'}],gaps:['G3 动态平台费用更新','G4 真实经营成本样本']},
'T01-M02-L01':{code:'T01-M02-L01',knowledgeTree:[
{id:'demand',title:'Demand｜需求',defaultVisible:'判断需求需要商品级证据，不能只看人口和GDP。',deepDive:['搜索/平台观察','成交与评论代理信号','季节性']},
{id:'competition',title:'Competition｜竞争',defaultVisible:'有效竞争是与目标商品真正争夺同一购买意图的商品集合。',deepDive:['价格带','卖点结构','评价壁垒']},
{id:'operation',title:'Operating Conditions｜经营条件',defaultVisible:'物流、支付、合规、内容和供应链共同影响可经营性。',deepDive:['履约','退货','语言文化','法规']}],cases:[
{title:'同一商品切换美国与阿联酋',type:'case',summary:'观察市场维度优先级随商品与区域变化。'},
{title:'按宏观市场规模直接排名',type:'counterexample',summary:'宏观大市场不保证具体商品的经营条件成立。'}],variables:[
{name:'商品类型',effect:'改变八维判断权重',state:'known'},{name:'法规要求',effect:'可能直接触发市场不可进入',state:'unknown'}],interaction:{scene:'Global Market Exploration Lab',actions:['切换商品','切换市场','逐层释放八维证据'],motion:['地图聚焦','维度渐进揭示','优先级重排']},evidence:[{level:'E1',need:'政府/平台/监管规则'},{level:'E2',need:'市场页面直接观察'},{level:'E3',need:'可信市场研究'}],gaps:['G1 部分国家商品级证据','G3 动态规则更新']},
'T01-M02-L02':{code:'T01-M02-L02',knowledgeTree:[
{id:'localization',title:'Localization｜本地化',defaultVisible:'北美与欧洲不是一个统一市场。',deepDive:['语言与表达','价格与税费','消费者权利与退货']},
{id:'compliance',title:'Compliance｜合规',defaultVisible:'产品类别决定适用法规与证明责任。',deepDive:['标签','安全','环保/包装','声明']},
{id:'fulfillment',title:'Fulfillment｜履约',defaultVisible:'配送承诺和退货体验影响转化与成本。',deepDive:['直发','本地仓','平台仓']}],cases:[
{title:'同商品美国版与欧盟版信息差异',type:'case',summary:'展示标签、声明与消费者信息要求需要分市场适配。'},
{title:'把“欧美市场”当一个规则集合',type:'counterexample',summary:'不同司法辖区规则与平台要求不可合并。'}],variables:[
{name:'目标国家',effect:'改变法规、税费和语言要求',state:'known'},{name:'产品类别',effect:'决定具体合规路径',state:'known'}],interaction:{scene:'Decision Lab + CompareSpace',actions:['美国/英国/欧盟切换','标出必须本地化项'],motion:['差异层高亮']},evidence:[{level:'E1',need:'目标市场监管/政府/平台原始资料'}],gaps:['G5 具体品类进入专项法律/合规审核']},
'T01-M02-L03':{code:'T01-M02-L03',knowledgeTree:[
{id:'country',title:'Country ≠ Region｜国家不等于区域',defaultVisible:'东南亚六国需要分别看平台、语言、支付、物流和价格带。',deepDive:['印尼','泰国','越南','马来西亚','菲律宾','新加坡']},
{id:'platform',title:'Platform Mix｜平台组合',defaultVisible:'各国平台与内容生态组合不同。',deepDive:['TikTok Shop','Shopee','Lazada']},
{id:'local',title:'Local Operating Reality｜本地经营现实',defaultVisible:'COD、地址、物流、宗教文化与语言会改变经营细节。',deepDive:['支付习惯','岛屿物流','本地内容表达']}],cases:[
{title:'印尼与马来西亚同类商品',type:'case',summary:'同区域商品在价格、语言、宗教文化和平台生态上的差异。'},
{title:'复制同一东南亚Listing',type:'counterexample',summary:'翻译并不等于本地化。'}],variables:[
{name:'国家',effect:'改变平台、语言、支付和履约条件',state:'known'},{name:'本地价格带',effect:'影响商品经济模型',state:'unknown'}],interaction:{scene:'SEA Atlas｜东南亚地图',actions:['国家切换','平台层切换','商品条件切换'],motion:['地图聚焦','差异层叠加']},evidence:[{level:'E1',need:'各国平台与监管资料'},{level:'E3',need:'支付/电商市场研究'}],gaps:['G1 六国最新商品级样本','G3 开课前平台规则刷新']},
'T01-M02-L04':{code:'T01-M02-L04',knowledgeTree:[
{id:'gcc',title:'Middle East｜中东',defaultVisible:'GCC内部市场与平台生态需要国家化判断。',deepDive:['阿联酋','沙特','区域履约与认证']},
{id:'jk',title:'Japan & Korea｜日韩',defaultVisible:'成熟电商、语言和消费者标准使本地化要求更细。',deepDive:['语言','品质预期','平台结构']},
{id:'latam',title:'Latin America｜拉美',defaultVisible:'支付、物流、税费与国家差异决定进入路径。',deepDive:['墨西哥','巴西及区域差异']}],cases:[
{title:'区域地图→国家判断',type:'case',summary:'先看区域，再下钻国家，不直接用区域平均值做经营决策。'},
{title:'“中东/拉美增长快所以值得做”',type:'counterexample',summary:'增长率不能替代商品、合规、物流和经济模型。'}],variables:[
{name:'区域',effect:'改变第一层研究问题',state:'known'},{name:'国家',effect:'决定具体经营条件',state:'known'}],interaction:{scene:'Region → Country Explorer',actions:['区域进入国家','比较两国经营条件'],motion:['空间下钻','语义缩放']},evidence:[{level:'E1',need:'国家级规则'},{level:'E3',need:'区域市场研究'}],gaps:['G1 国家级商品案例','G5 高监管品类专项审核']}
}
