import type { LessonSpec } from './lessonSpecsM01M02'
export const lessonSpecsM03M04:Record<string,LessonSpec>={
'T01-M03-L01':{code:'T01-M03-L01',knowledgeTree:[
{id:'identity',title:'Seller Identity｜卖家身份',defaultVisible:'企业主体、卖家身份、目标市场和店铺站点是不同经营对象。',deepDive:['企业主体回答谁承担法律与经营责任','卖家身份回答平台如何识别和审核经营者']},
{id:'route',title:'Entry Route｜入驻路径',defaultVisible:'本土店、跨境店等路径必须与主体来源和平台开放条件匹配。',deepDive:['路径决定可申请站点与资料要求','路径状态必须区分已确认、条件开放、待研究']},
{id:'fulfillment',title:'Fulfillment Axis｜履约轴',defaultVisible:'店铺经营路径与履约方式不能混为同一个概念。',deepDive:['同一经营身份可能存在不同履约方案','库存位置会进一步改变成本与时效']}],cases:[
{title:'中国企业进入目标市场',type:'case',summary:'拆开企业主体、卖家身份、站点、入驻路径和履约五个维度。'},
{title:'把“跨境店”理解为一种物流方式',type:'counterexample',summary:'卖家路径与物流履约是两个独立维度。'}],variables:[
{name:'主体注册地',effect:'影响可用卖家路径与KYC资料',state:'known'},{name:'目标市场开放状态',effect:'影响当前能否申请',state:'unknown'}],interaction:{scene:'Seller Structure Lab',actions:['拆分五个经营维度','组合身份×站点×路径×履约'],motion:['分层展开','错误组合阻断']},evidence:[{level:'E1',need:'平台官方入驻资格与卖家类型说明'}],gaps:['G3 开课前刷新平台开放状态']},
'T01-M03-L02':{code:'T01-M03-L02',knowledgeTree:[
{id:'qualification',title:'Local Qualification｜本土资格',defaultVisible:'本土经营资格来自真实主体、地址、税务、结算等条件的组合。',deepDive:['不同市场要求不同','资格不能只看是否有当地公司']},
{id:'operation',title:'Local Operation｜本土经营',defaultVisible:'本土店仍需解决仓储、退货、客服和合规责任。',deepDive:['本地仓不等于本地主体','本地团队也不自动等于本土店资格']},
{id:'evidence',title:'Qualification Evidence｜资格证据',defaultVisible:'每个资格判断都应对应可核验文件或官方规则。',deepDive:['文件一致性','有效期与最新规则']}],cases:[
{title:'有海外公司但资料链不完整',type:'case',summary:'主体存在并不代表KYC、税务、地址和结算条件全部满足。'},
{title:'租一个海外仓就等于本土卖家',type:'counterexample',summary:'仓储位置不能替代卖家身份资格。'}],variables:[
{name:'当地企业主体',effect:'改变资格链起点',state:'known'},{name:'税务/地址/结算要求',effect:'决定资格链是否完整',state:'unknown'}],interaction:{scene:'Local Qualification Chain',actions:['逐项核验资格','注入缺失文件'],motion:['链路断点','证据状态传播']},evidence:[{level:'E1',need:'平台和当地监管官方要求'}],gaps:['G3 动态资格更新','G5 税务/法律专项复核']},
'T01-M03-L03':{code:'T01-M03-L03',knowledgeTree:[
{id:'crossborder',title:'Cross-border Route｜跨境路径',defaultVisible:'跨境路径要同时回答谁卖、卖到哪、从哪里发、平台是否开放。',deepDive:['卖家来源','目标站点','仓储/发货地','类目条件']},
{id:'status',title:'Route Status｜路径状态',defaultVisible:'路线结论必须区分已确认、条件开放、待研究和不适用。',deepDive:['Confirmed｜已确认','Conditional｜条件开放','Research Needed｜待研究','Not Applicable｜不适用']},
{id:'freshness',title:'Last Verified｜最后核验',defaultVisible:'跨境开放政策属于动态规则，需要记录最后核验时间。',deepDive:['历史开放不能代表当前开放','第三方文章不能覆盖官方最新规则']}],cases:[
{title:'同一主体切换两个目标站点',type:'case',summary:'比较平台开放条件、类目和履约限制。'},
{title:'看到旧教程就认定当前可开店',type:'counterexample',summary:'动态规则必须重新核验。'}],variables:[
{name:'目标站点',effect:'改变开放资格与类目限制',state:'known'},{name:'当前开放政策',effect:'决定路线是否成立',state:'unknown'}],interaction:{scene:'Cross-border Route Explorer',actions:['切换市场','标记路线状态','查看Last Verified'],motion:['路线显隐','状态变色']},evidence:[{level:'E1',need:'平台官方跨境招商/入驻资料'}],gaps:['G3 每期开课前刷新路线']},
'T01-M03-L04':{code:'T01-M03-L04',knowledgeTree:[
{id:'direct',title:'Direct Shipping｜跨境直发',defaultVisible:'低前置库存但时效、跨境运费和逆向物流压力更高。',deepDive:['适合验证期','需要关注体积重和妥投']},
{id:'local',title:'Local Stock｜本地库存',defaultVisible:'本地库存改善时效，但增加库存和现金风险。',deepDive:['补货提前期','滞销与仓储费用']},
{id:'hybrid',title:'Hybrid Fulfillment｜混合履约',defaultVisible:'验证与放量阶段可以采用不同库存结构。',deepDive:['测试期直发','稳定后本地备货','按SKU分层']}],cases:[
{title:'新品测试→稳定补货',type:'case',summary:'同一商品生命周期中切换履约方式。'},
{title:'所有SKU一次性备海外仓',type:'counterexample',summary:'忽略需求不确定性会放大库存现金风险。'}],variables:[
{name:'国际物流成本',effect:'影响贡献利润',state:'estimated'},{name:'本地库存量',effect:'影响时效与现金占用',state:'estimated'},{name:'退货率',effect:'影响逆向物流与损失',state:'unknown'}],interaction:{scene:'Fulfillment Simulator',actions:['切换直发/本地/平台/混合','调整库存与时效'],motion:['成本-时效联动','现金阴影扩展']},evidence:[{level:'E4',need:'真实物流报价、仓储和退货数据'},{level:'E5',need:'课堂模拟参数'}],gaps:['G4 真实物流报价与仓储样本']},
'T01-M04-L01':{code:'T01-M04-L01',knowledgeTree:[
{id:'consumer',title:'TikTok｜内容与消费者场',defaultVisible:'TikTok承载内容发现、互动和用户关系。',deepDive:['For You｜推荐流','Search｜搜索','LIVE｜直播']},
{id:'shop',title:'TikTok Shop｜交易场',defaultVisible:'TikTok Shop把商品、交易与内容场连接起来。',deepDive:['商品入口','商城/搜索','内容挂载商品']},
{id:'seller',title:'Seller Center｜卖家中心',defaultVisible:'卖家中心用于商品、订单、营销、账户和经营配置。',deepDive:['店铺与账号不是同一对象','权限与绑定关系需要单独管理']}],cases:[
{title:'内容账号→商品→订单',type:'case',summary:'沿用户发现到交易再到卖家履约的关系图理解生态。'},
{title:'把TikTok账号当成TikTok Shop店铺',type:'counterexample',summary:'内容身份、店铺和卖家后台承担不同角色。'}],variables:[
{name:'账号关系',effect:'影响内容、店铺与权限连接',state:'known'},{name:'市场功能开放',effect:'影响具体入口与功能',state:'unknown'}],interaction:{scene:'TikTok Commerce World',actions:['点击TikTok/TTS/Seller Center','追踪账号与商品关系'],motion:['动态图谱','语义缩放']},evidence:[{level:'E1',need:'TikTok Shop官方卖家资料'},{level:'E2',need:'真实前后台界面观察'}],gaps:['G3 功能入口动态更新','G4 真实界面素材']},
'T01-M04-L02':{code:'T01-M04-L02',knowledgeTree:[
{id:'discover',title:'Discovery｜发现',defaultVisible:'用户可以从短视频、达人、直播、搜索和商城进入商品。',deepDive:['内容发现不是唯一入口','不同入口的用户意图强弱不同']},
{id:'product',title:'Product Entry｜商品入口',defaultVisible:'内容兴趣必须通过商品锚点或商品页面进入交易理解。',deepDive:['商品卡','PDP｜商品详情页','评价与配送信息']},
{id:'checkout',title:'Transaction｜交易',defaultVisible:'交易完成前仍受价格、信任、配送和库存影响。',deepDive:['加入购物车','结算','订单状态']}],cases:[
{title:'短视频→商品锚点→PDP→结算',type:'case',summary:'逐状态观察用户从兴趣到交易。'},
{title:'视频播放高就等于成交能力强',type:'counterexample',summary:'注意力指标不能代替商品点击、转化和利润。'}],variables:[
{name:'入口类型',effect:'改变用户初始意图',state:'known'},{name:'PDP转化条件',effect:'决定内容流量能否转成订单',state:'unknown'}],interaction:{scene:'Commerce Journey',actions:['切换短视频/搜索/LIVE/商城入口','跟踪用户状态'],motion:['路径追踪','状态迁移']},evidence:[{level:'E1',need:'官方交易入口说明'},{level:'E2',need:'真实用户路径观察'}],gaps:['G4 不同入口真实案例']},
'T01-M04-L03':{code:'T01-M04-L03',knowledgeTree:[
{id:'organic',title:'Organic｜自然内容',defaultVisible:'自然内容用于验证用户注意、理解和商品证明。',deepDive:['内容信号','商品点击','自然成交']},
{id:'creator',title:'Creator & Affiliate｜达人与联盟',defaultVisible:'达人网络扩展内容供给和分销触点。',deepDive:['开放合作','定向合作','佣金与样品']},
{id:'paid',title:'Ads & LIVE｜广告与直播',defaultVisible:'付费和直播是放大机制，不应替代商品与内容验证。',deepDive:['GMV Max｜成交额最大化广告','LIVE｜直播','归因与增量区分']}],cases:[
{title:'自然内容验证后进入达人和广告',type:'case',summary:'先验证商品与创意，再逐步放大。'},
{title:'新品没有验证就直接大额投放',type:'counterexample',summary:'付费流量会放大错误商品、页面或经济模型。'}],variables:[
{name:'内容验证程度',effect:'影响是否适合放大',state:'estimated'},{name:'达人佣金',effect:'影响贡献利润与合作吸引力',state:'known'},{name:'广告增量效果',effect:'影响真实放大价值',state:'unknown'}],interaction:{scene:'Growth Mixer',actions:['调节自然/达人/广告/LIVE','观察经济与信号变化'],motion:['流量混合','风险传播']},evidence:[{level:'E1',need:'TikTok Shop Affiliate/Ads官方资料'},{level:'E4',need:'真实内容、达人、广告经营数据'}],gaps:['G3 GMV Max规则刷新','G4 真实增量案例']},
'T01-M04-L04':{code:'T01-M04-L04',knowledgeTree:[
{id:'health',title:'Store Health｜店铺健康',defaultVisible:'店铺健康由商品、履约、售后、内容与规则行为共同形成。',deepDive:['商品问题会传播到退款和评价','履约问题会影响体验与经营状态']},
{id:'risk',title:'Risk Propagation｜风险传播',defaultVisible:'一个局部异常可能沿订单、体验和平台治理链路扩散。',deepDive:['取消/延迟','退款/投诉','违规/限制']},
{id:'response',title:'Evidence Response｜证据化处理',defaultVisible:'异常处理要先确认事实、证据和责任节点。',deepDive:['记录状态','纠正动作','复核恢复']}],cases:[
{title:'物流延迟→投诉→健康指标变化',type:'case',summary:'观察风险如何跨节点传播。'},
{title:'只盯一个健康分数',type:'counterexample',summary:'总分不能替代具体原因和经营动作。'}],variables:[
{name:'履约异常率',effect:'影响用户体验与店铺状态',state:'estimated'},{name:'违规事件',effect:'可能触发功能限制',state:'unknown'}],interaction:{scene:'Store Health Simulation',actions:['注入履约/商品/内容异常','查看传播与恢复'],motion:['风险传播','节点阻断与恢复']},evidence:[{level:'E1',need:'平台官方店铺治理与绩效规则'},{level:'E4',need:'真实异常与恢复案例'}],gaps:['G3 治理指标动态更新','G4 失败/恢复案例']}
}