import type { LessonSpec } from './lessonSpecsM01M02'
export const lessonSpecsM05M06:Record<string,LessonSpec>={
'T01-M05-L01':{code:'T01-M05-L01',knowledgeTree:[
{id:'assets',title:'Operating Assets｜经营资产',defaultVisible:'主体、账号、设备、网络、邮箱、手机号、店铺和收款账户都应明确所有权与用途。',deepDive:['资产归属决定恢复能力','共享资产需要清楚责任人和授权边界']},
{id:'permission',title:'Access & Permission｜访问与权限',defaultVisible:'能登录不等于拥有资产；权限需要按角色和业务必要性配置。',deepDive:['Owner｜所有者','Admin｜管理员','Operator｜操作人员','第三方协作']},
{id:'dependency',title:'Single Point of Failure｜单点故障',defaultVisible:'关键资产只有一个恢复路径时，会形成经营连续性风险。',deepDive:['手机号/邮箱丢失','唯一管理员离职','恢复信息不可用']}],cases:[
{title:'店铺可登录但关键邮箱不属于公司',type:'case',summary:'通过Access Graph定位资产所有权和恢复链风险。'},
{title:'用频繁切换环境解决平台限制',type:'counterexample',summary:'经营环境课程关注真实、稳定、可恢复的合规运营，不教授规避平台风控。'}],variables:[
{name:'资产所有权',effect:'影响账号恢复与经营连续性',state:'known'},{name:'权限角色',effect:'影响误操作和越权风险',state:'known'},{name:'平台安全规则',effect:'决定当前允许的登录与验证行为',state:'unknown'}],interaction:{scene:'Access Graph｜访问关系图',actions:['连接资产与责任人','撤销关键节点模拟故障','检查恢复路径'],motion:['依赖传播','单点故障高亮']},evidence:[{level:'E1',need:'平台官方账户安全与权限说明'},{level:'E4',need:'企业真实资产清单'}],gaps:['G3 账户安全规则开课前刷新','G4 企业资产案例']},
'T01-M05-L02':{code:'T01-M05-L02',knowledgeTree:[
{id:'route',title:'Operating Route｜经营路线',defaultVisible:'市场、卖家来源、入驻路径、站点、履约和类目必须形成一条一致路线。',deepDive:['任何一项改变都可能影响后续配置','路线需要保存假设和核验日期']},
{id:'language',title:'Language & Content Market｜语言与内容市场',defaultVisible:'店铺市场、商品语言和内容语言需要根据消费者场景分别配置。',deepDive:['翻译不等于本地化','内容语言可能与主体所在地无关']},
{id:'consistency',title:'Route Consistency｜路线一致性',defaultVisible:'路线中的主体、仓库、退货、结算和类目不能互相矛盾。',deepDive:['配置前先核验资格','变更路线需要重新检查依赖']}],cases:[
{title:'中国主体→目标站点→跨境履约',type:'case',summary:'把经营路线拆成可检查配置，而不是一句“开某国店”。'},
{title:'先注册再决定仓库与类目',type:'counterexample',summary:'前置路线不清会导致后续资料和配置反复。'}],variables:[
{name:'目标市场',effect:'改变站点、语言和规则',state:'known'},{name:'卖家来源',effect:'改变可用入驻路径',state:'known'},{name:'类目开放条件',effect:'影响路线是否成立',state:'unknown'}],interaction:{scene:'Route Configurator｜路线配置器',actions:['组合市场×主体×路径×履约×类目','触发矛盾配置'],motion:['依赖联动','冲突节点阻断']},evidence:[{level:'E1',need:'平台当前入驻与类目规则'}],gaps:['G3 动态路线规则刷新']},
'T01-M05-L03':{code:'T01-M05-L03',knowledgeTree:[
{id:'entity',title:'Legal Entity Consistency｜主体一致性',defaultVisible:'公司名称、注册信息和提交文件必须指向同一真实主体。',deepDive:['拼写/格式差异需要区分可接受与实质冲突','文件有效期需要核验']},
{id:'person',title:'Representative & Beneficial Owner｜代表人与受益所有人',defaultVisible:'自然人身份信息需要与企业角色和平台要求一致。',deepDive:['授权关系','身份文件','受益所有权要求因市场而异']},
{id:'operations',title:'Operational Facts｜经营事实',defaultVisible:'地址、仓库、退货、结算、联系人属于不同事实字段，不能为了“看起来一致”而虚构。',deepDive:['真实地址与用途','银行账户归属','联系人权限']}],cases:[
{title:'企业名称一致但地址文件过期',type:'case',summary:'字段一致不代表证据有效。'},
{title:'为了通过审核修改事实使文件一致',type:'counterexample',summary:'一致性的目标是真实事实相互吻合，不是制造一致。'}],variables:[
{name:'文件有效性',effect:'影响KYC是否可验证',state:'known'},{name:'字段冲突',effect:'触发补件或人工审核',state:'estimated'},{name:'市场KYC要求',effect:'决定所需字段与文件',state:'unknown'}],interaction:{scene:'KYC Consistency Map｜KYC一致性图',actions:['连接主体/人员/地址/结算字段','注入Missing/Conflict/Verify'],motion:['冲突传播','证据链断点']},evidence:[{level:'E1',need:'平台官方KYC/验证资料要求'}],gaps:['G3 KYC资料要求动态更新','G5 复杂主体结构需法律/税务专业审核']},
'T01-M05-L04':{code:'T01-M05-L04',knowledgeTree:[
{id:'foundation',title:'Account Foundation｜账户基础',defaultVisible:'账户、权限、绑定关系和通知先于商品发布。',deepDive:['管理员与协作者','安全与恢复','通知渠道']},
{id:'operations',title:'Operating Configuration｜经营配置',defaultVisible:'仓库、退货、物流、结算和服务配置共同决定店铺是否可经营。',deepDive:['缺少任一关键配置都可能阻断履约','配置状态需要可复查']},
{id:'readiness',title:'READY FOR PRODUCT｜商品经营就绪',defaultVisible:'“已开店”与“可安全发布并履约商品”是两个状态。',deepDive:['NOT READY｜未就绪','VERIFY｜待核验','READY FOR PRODUCT｜商品经营就绪']}],cases:[
{title:'店铺已创建但退货与结算未配置',type:'case',summary:'通过依赖顺序判断为什么还不能进入商品发布。'},
{title:'看到后台首页就认为开店完成',type:'counterexample',summary:'界面可访问不代表经营链路完整。'}],variables:[
{name:'关键配置完成度',effect:'决定是否进入商品阶段',state:'known'},{name:'平台审核状态',effect:'可能阻断部分功能',state:'unknown'}],interaction:{scene:'Seller Center Frontend Simulation｜卖家中心前端模拟',actions:['依序完成配置','故意跳过依赖','Reset并重做'],motion:['状态机推进','阻断原因显现']},evidence:[{level:'E1',need:'平台官方后台配置说明'},{level:'E2',need:'真实Seller Center界面观察'}],gaps:['G3 后台入口与字段动态更新','G4 真实界面截图/录屏']},
'T01-M06-L01':{code:'T01-M06-L01',knowledgeTree:[
{id:'demand',title:'Demand｜需求',defaultVisible:'需求判断要回答“谁为什么需要它”，并用商品级证据支持。',deepDive:['搜索/成交/评论/内容信号分开看','代理信号不能冒充真实搜索量']},
{id:'competition',title:'Effective Competition｜有效竞争',defaultVisible:'真正竞争者是争夺同一购买意图、价格带和使用场景的可比商品。',deepDive:['不是把整个类目商品都算竞争者','强品牌/强评价/强内容形成不同壁垒']},
{id:'advantage',title:'Product Advantage｜产品优势',defaultVisible:'优势必须能落到规格、体验、供应、内容证明或经营结构。',deepDive:['卖点要可证明','供应改进需要样品验证']},
{id:'fit',title:'TikTok Fit｜TikTok内容适配',defaultVisible:'商品是否容易在短时间内被看懂、演示和证明，会影响内容成交能力。',deepDive:['视觉变化','问题-解决','对比证明','场景化']},
{id:'economics',title:'Business Viability｜经营可行性',defaultVisible:'需求和内容成立后仍要检查完整成本、退货、佣金、广告和现金。',deepDive:['单位经济','压力情景','补货和现金']},
{id:'risk',title:'Risk Gate｜风险闸门',defaultVisible:'合规、安全、知识产权、运输等硬风险可以直接阻断商品。',deepDive:['商业吸引力不能覆盖硬风险','UNKNOWN需要核验而不是自动通过']}],cases:[
{title:'厨房电子秤：高销量但需继续核验经营空间',type:'case',summary:'高销量只解决部分需求证据，仍需看竞争、内容、成本和风险。'},
{title:'无线标签打印机：商业吸引力覆盖无线合规',type:'counterexample',summary:'涉及无线/技术要求时，硬风险闸门优先于机会判断。'}],variables:[
{name:'需求证据强度',effect:'影响是否值得继续研究',state:'estimated'},{name:'有效竞争密度',effect:'影响进入难度与差异化要求',state:'estimated'},{name:'完整贡献空间',effect:'决定测试与放大是否可持续',state:'unknown'},{name:'硬风险状态',effect:'可直接触发STOP',state:'unknown'}],interaction:{scene:'Product Opportunity Lab｜商品机会实验室',actions:['六层语义钻取','圈定有效竞争','切换证据状态','调整经营变量','触发风险闸门'],motion:['机会空间重排','证据传播','STOP阻断']},evidence:[{level:'E1',need:'平台/监管产品规则'},{level:'E2',need:'真实SERP/PDP/内容/评论观察'},{level:'E3',need:'可信市场研究'},{level:'E4',need:'供应商报价、样品、订单和退款数据'},{level:'E5',need:'教学模拟案例'}],gaps:['G1 商品级研究持续补充','G3 动态规则刷新','G4 真实商品/供应/经营案例']},
'T01-M06-L02':{code:'T01-M06-L02',knowledgeTree:[
{id:'market',title:'Market Evidence｜市场证据',defaultVisible:'市场层回答需求空间、价格带、竞争结构和平台可见信号。',deepDive:['公开页面可观察什么','不可观察的数据保持UNKNOWN']},
{id:'user',title:'User Evidence｜用户证据',defaultVisible:'评论、问答和内容反馈用于理解问题、期望和失败原因。',deepDive:['高频问题','改进机会','评论偏差']},
{id:'content',title:'Content Evidence｜内容证据',defaultVisible:'内容信号回答商品是否能被快速理解和证明。',deepDive:['观看不是成交','内容结构与商品证明分开']},
{id:'business',title:'Business Test｜经营测试',defaultVisible:'最终要用报价、样品、小单和真实经营数据验证商业假设。',deepDive:['供应报价','样品QC','20–50单小测试','退货与售后']}],cases:[
{title:'公开页面信号强，但供应报价未取得',type:'case',summary:'机会可以继续研究，但采购准备度仍是UNKNOWN。'},
{title:'把第三方估算写成平台官方销量',type:'counterexample',summary:'来源类型必须与结论强度匹配。'}],variables:[
{name:'证据来源',effect:'决定可支持的结论强度',state:'known'},{name:'证据新鲜度',effect:'影响动态市场判断可靠性',state:'known'},{name:'真实业务验证',effect:'提高采购和放量准备度',state:'unknown'}],interaction:{scene:'Evidence Lab｜证据实验室',actions:['分类Supported/Contradicted/Conflicted/Unknown','切换E1–E5来源','检查证据日期'],motion:['证据聚合','冲突显现','置信边界变化']},evidence:[{level:'E1',need:'官方规则/原始资料'},{level:'E2',need:'真实页面观察'},{level:'E3',need:'第三方结构化研究'},{level:'E4',need:'真实业务验证'},{level:'E5',need:'教学模拟'}],gaps:['G4 真实商品证据包']},
'T01-M06-L03':{code:'T01-M06-L03',knowledgeTree:[
{id:'platform',title:'Platform Rule Gate｜平台规则闸门',defaultVisible:'先检查商品是否允许销售、是否需要额外资质。',deepDive:['禁限售','类目资质','平台市场差异']},
{id:'product',title:'Product Compliance Gate｜产品合规闸门',defaultVisible:'产品安全、技术、标签、包装和声明按品类判断。',deepDive:['安全/化学/电气/无线','标签与语言','功效与健康声明']},
{id:'rights',title:'IP & Rights Gate｜知识产权闸门',defaultVisible:'品牌、外观、图片、音乐和内容素材都可能形成权利风险。',deepDive:['商标','专利/外观','版权','授权链']},
{id:'shipping',title:'Shipping Gate｜运输闸门',defaultVisible:'电池、液体、磁性、危险品等属性会改变可运输性。',deepDive:['承运商限制','包装要求','目的国规则']}],cases:[
{title:'普通家居商品通过基础闸门',type:'case',summary:'逐项检查后进入样品和经营测试。'},
{title:'无线商品因技术合规未确认而STOP',type:'counterexample',summary:'利润和内容潜力不能绕过强制要求。'}],variables:[
{name:'品类',effect:'决定适用规则集合',state:'known'},{name:'目标市场',effect:'改变法规与标签要求',state:'known'},{name:'认证/测试证据',effect:'决定PASS/VERIFY/STOP',state:'unknown'}],interaction:{scene:'Product Gate｜商品闸门',actions:['逐闸门标记UNCHECKED/PASS/RISK/VERIFY/STOP','切换市场'],motion:['硬风险阻断','依赖规则展开']},evidence:[{level:'E1',need:'平台、政府、监管和标准原始资料'},{level:'E4',need:'供应商测试报告/证书/样品信息'}],gaps:['G3 规则与标准动态更新','G5 高风险品类专业合规审核']},
'T01-M06-L04':{code:'T01-M06-L04',knowledgeTree:[
{id:'roles',title:'Portfolio Roles｜组合角色',defaultVisible:'首批商品不是全部“主推”，而应承担主推、测试、备选或探索角色。',deepDive:['Primary｜主推','Test｜测试','Backup｜备选','Exploration/Hold｜探索/暂缓']},
{id:'constraints',title:'Portfolio Constraints｜组合约束',defaultVisible:'预算、库存、供应商、类目、风险、内容相似度和测试能力限制组合规模。',deepDive:['避免全部商品共享同一失败原因','测试容量比候选数量更重要']},
{id:'experiment',title:'Test Contract｜测试合同',defaultVisible:'每个SKU都要写清假设、预算、周期、指标、风险和退出条件。',deepDive:['成功条件','停止条件','下一步动作']}],cases:[
{title:'5个候选商品形成1主推+2测试+1备选+1暂缓',type:'case',summary:'用有限预算构造可学习的首批组合。'},
{title:'把评分最高的5个商品全部采购',type:'counterexample',summary:'单品机会高不代表组合层面风险分散和测试能力成立。'}],variables:[
{name:'测试预算',effect:'限制同时测试SKU数量',state:'known'},{name:'库存风险',effect:'影响角色和首单数量',state:'estimated'},{name:'供应准备度',effect:'决定是否可进入采购',state:'unknown'}],interaction:{scene:'Portfolio Board｜商品组合板',actions:['拖动商品到角色区','设置预算/周期/退出条件','检查组合约束'],motion:['组合重排','约束冲突提示']},evidence:[{level:'E4',need:'报价、样品、MOQ、交期和测试数据'},{level:'E5',need:'课堂候选商品集'}],gaps:['G4 真实首批组合案例']}
}