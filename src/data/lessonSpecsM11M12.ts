import type { LessonSpec } from './lessonSpecsM01M02'
export const lessonSpecsM11M12:Record<string,LessonSpec>={
'T01-M11-L01':{code:'T01-M11-L01',knowledgeTree:[
{id:'states',title:'Order State Machine｜订单状态机',defaultVisible:'订单不是“下单→发货”两步，而是一组可验证状态。',deepDive:['Order Created｜订单创建','Payment｜支付','Picking｜拣货','Packing｜打包','Label｜面单','Handover｜交接','Shipped｜已发货','Transit｜运输中','Delivered｜妥投']},
{id:'exceptions',title:'Exception Paths｜异常路径',defaultVisible:'取消、缺货、错货、破损、轨迹停滞和派送失败都需要独立处理路径。',deepDive:['异常发生在哪个节点决定责任和动作','恢复后仍需验证最终状态']},
{id:'aftersales',title:'After-sales｜售后',defaultVisible:'妥投不是经营链终点，退款、退货、评价和投诉会继续影响订单经济结果。',deepDive:['售后原因分类','逆向物流','退款与库存恢复']}],cases:[
{title:'正常订单从创建到妥投',type:'case',summary:'逐状态检查库存、包裹、轨迹和平台状态。'},
{title:'缺货后仍生成面单并标记发货',type:'counterexample',summary:'用错误状态掩盖履约失败会制造更严重的消费者和平台风险。'}],variables:[
{name:'库存可用性',effect:'决定是否能进入拣货',state:'known'},{name:'承运轨迹',effect:'决定运输状态可见性',state:'unknown'},{name:'售后结果',effect:'改变收入、成本和库存',state:'unknown'}],interaction:{scene:'Order Timeline｜订单时间线',actions:['推进订单状态','注入取消/缺货/错货/破损','执行恢复路径'],motion:['状态机迁移','异常分支展开','恢复路径回流']},evidence:[{level:'E1',need:'平台订单与履约规则'},{level:'E4',need:'真实订单、物流与售后记录'}],gaps:['G3 订单状态规则动态刷新','G4 真实失败/恢复案例']},
'T01-M11-L02':{code:'T01-M11-L02',knowledgeTree:[
{id:'route',title:'First Mile → Last Mile｜首公里到末公里',defaultVisible:'国际物流需要拆成首公里、仓/枢纽、出口、干线、中转、进口清关和末公里。',deepDive:['每个节点都有责任主体和状态','线路名称不能替代实际节点理解']},
{id:'tracking',title:'Tracking｜物流轨迹',defaultVisible:'轨迹是物流事件的可见记录，不等于包裹真实位置的连续GPS。',deepDive:['扫描事件','交接事件','清关事件','派送事件']},
{id:'tradeoff',title:'Route Trade-off｜线路权衡',defaultVisible:'物流线路需要同时看成本、速度、可追踪性、限制和异常恢复。',deepDive:['Economy｜经济线','Priority｜优先线','商品属性限制']},
{id:'eta',title:'ETA & Incident｜预计送达与异常',defaultVisible:'清关延迟、航班、末公里失败等事件会改变预计送达和消费者体验。',deepDive:['ETA不是保证时间','异常要映射到责任节点和沟通动作']}],cases:[
{title:'中国直发→出口→干线→进口→末公里',type:'case',summary:'拖动时间轴观察包裹、轨迹和责任节点同步变化。'},
{title:'轨迹两天没更新就判断包裹丢失',type:'counterexample',summary:'轨迹缺口需要结合线路节点、扫描频率和承运商状态判断。'}],variables:[
{name:'线路类型',effect:'改变成本、时效和轨迹密度',state:'known'},{name:'清关耗时',effect:'改变ETA',state:'unknown'},{name:'末公里失败',effect:'影响妥投和售后',state:'unknown'}],interaction:{scene:'Logistics Journey｜物流旅程',actions:['切换经济/优先线路','拖动日历','触发清关延迟/末公里失败','查看责任节点'],motion:['SVG路径追踪','包裹沿路径移动','ETA动态延展']},evidence:[{level:'E4',need:'真实物流线路、报价、轨迹和异常记录'},{level:'E5',need:'教学线路模拟'}],gaps:['G4 真实跨境轨迹与异常样本']},
'T01-M11-L03':{code:'T01-M11-L03',knowledgeTree:[
{id:'facts',title:'Product Fact Builder｜商品事实构建',defaultVisible:'申报与归类先从真实商品名称、材质、功能、数量、价值和原产地开始。',deepDive:['商业名称不等于海关品名','关键材质和用途会影响归类']},
{id:'hs',title:'HS Candidate｜HS候选',defaultVisible:'系统可以帮助形成候选编码与核验问题，但不能把自动推荐当成最终法律归类。',deepDive:['同类外观商品可能因材质/用途不同而归类不同','目的国细分税则需要核验']},
{id:'docs',title:'Commercial Documents｜商业单证',defaultVisible:'Commercial Invoice｜商业发票与Packing List｜装箱单需要与真实货物和申报信息一致。',deepDive:['数量/价值/重量','发货人与收货人','商品描述']},
{id:'terms',title:'Duty & Delivery Responsibility｜税费与交付责任',defaultVisible:'DDP、DAP等交付条件会改变税费、清关和交付责任，但不能用术语掩盖真实责任。',deepDive:['DDP｜完税后交货','DAP｜目的地交货','具体合同与当地规则需核验']}],cases:[
{title:'从商品事实生成HS核验问题和CI/PL字段',type:'case',summary:'课程训练事实收集和核验，不自动给出最终HS结论。'},
{title:'为了降低税费故意低报价值或错误归类',type:'counterexample',summary:'课程不教授虚假申报、低报或规避海关监管。'}],variables:[
{name:'商品材质/用途',effect:'影响HS候选和监管要求',state:'known'},{name:'目的国税则',effect:'决定最终细分归类与税率',state:'unknown'},{name:'申报价值',effect:'必须与真实交易和适用规则一致',state:'known'}],interaction:{scene:'Customs Lab｜海关与单证实验',actions:['填写商品事实','生成HS候选核验树','检查CI/PL一致性','切换交付责任'],motion:['字段依赖展开','冲突字段阻断']},evidence:[{level:'E1',need:'海关/政府税则与监管原始资料'},{level:'E4',need:'真实商品规格与商业单证'}],gaps:['G3 税则和监管动态更新','G5 最终归类/税务由报关、税务或法律专业人员复核']},
'T01-M11-L04':{code:'T01-M11-L04',knowledgeTree:[
{id:'gross',title:'Order Amount → Net Sales｜订单金额到净销售',defaultVisible:'订单金额需要经过折扣、取消、退款等调整后才形成净销售。',deepDive:['订单状态改变收入确认','退款会反向影响后续结算']},
{id:'fees',title:'Fees & Deductions｜费用与扣减',defaultVisible:'平台、支付、达人、广告、税费等可能在不同环节发生或扣减。',deepDive:['费用发生与扣款时间可能不同','需要保留费用明细而非只看净打款']},
{id:'settlement',title:'Settlement｜平台结算',defaultVisible:'平台结算是平台账务状态，不等于利润，也不一定等于银行已到账。',deepDive:['Settlement Cycle｜结算周期','Reserve/Hold｜保留/冻结','Currency｜结算币种']},
{id:'bank',title:'Bank Receipt & FX｜银行到账与汇率',defaultVisible:'跨境收款还涉及收款渠道、到账时间、汇率和费用。',deepDive:['平台币种→收款币种→银行币种','汇兑差异需要进入对账']}],cases:[
{title:'100订单金额最终银行到账并非100',type:'case',summary:'沿Money Flow逐项查看折扣、退款、费用、结算和汇率。'},
{title:'平台显示Settled就记为利润',type:'counterexample',summary:'结算、利润和银行现金是三个不同经营对象。'}],variables:[
{name:'退款/取消',effect:'改变净销售和结算',state:'unknown'},{name:'平台/支付费用',effect:'改变平台净结算',state:'known'},{name:'FX｜汇率',effect:'改变最终本币到账',state:'unknown'},{name:'结算周期',effect:'影响现金时点',state:'known'}],interaction:{scene:'Money Flow｜资金流',actions:['追踪订单金额到银行到账','切换退款/费用/汇率','对比利润与现金'],motion:['资金节点递减','币种转换','时间延迟']},evidence:[{level:'E1',need:'平台结算与费用规则'},{level:'E4',need:'真实平台账单、收款和银行流水'}],gaps:['G3 费率/结算规则刷新','G4 完整对账样本']},
'T01-M12-L01':{code:'T01-M12-L01',knowledgeTree:[
{id:'funnel',title:'Operating Funnel｜经营漏斗',defaultVisible:'诊断从Exposure、Click/Visit、Product View、Add、Order、Refund、Repeat/Review逐层寻找变化。',deepDive:['CTR｜点击率','CVR｜转化率','退款率','复购/评价']},
{id:'health',title:'Health Overlay｜健康状态叠加',defaultVisible:'漏斗问题还要与库存、履约、商品健康和平台治理状态一起看。',deepDive:['流量下降可能不是创意问题','转化下降可能来自库存/配送/评价']},
{id:'diagnosis',title:'Diagnose Before Optimize｜先诊断后优化',defaultVisible:'每轮必须提出一个主要瓶颈，并用至少两个支持数据验证。',deepDive:['相关变化不自动等于因果','一次尽量只改变一个主要变量']},
{id:'experiment',title:'One-variable Change｜单变量实验',defaultVisible:'明确假设、动作、指标和复盘时间，避免同时修改所有环节。',deepDive:['Baseline｜基线','Change｜改变','Observation｜观察','Decision｜决策']}],cases:[
{title:'曝光稳定但商品点击下降',type:'case',summary:'先定位内容→商品入口，而不是同时改价格、标题、达人和广告。'},
{title:'GMV下降就直接增加广告预算',type:'counterexample',summary:'没有定位漏斗瓶颈时，增加流量可能放大已有问题。'}],variables:[
{name:'CTR｜点击率',effect:'反映曝光到点击环节',state:'known'},{name:'CVR｜转化率',effect:'反映访问到订单环节',state:'known'},{name:'退款率',effect:'反映成交质量与商品/履约问题',state:'known'},{name:'真实原因',effect:'需要证据诊断',state:'unknown'}],interaction:{scene:'Funnel Diagnosis｜漏斗诊断',actions:['点击漏斗节点','选择一个主瓶颈','绑定两项证据','设置单变量实验'],motion:['漏斗收缩','瓶颈聚焦','因果假设路径']},evidence:[{level:'E4',need:'真实店铺、商品、订单与健康数据'},{level:'E5',need:'课堂经营数据集'}],gaps:['G4 跨场景真实诊断案例']},
'T01-M12-L02':{code:'T01-M12-L02',knowledgeTree:[
{id:'content',title:'Content Signals｜内容信号',defaultVisible:'观看、停留、互动、商品点击等用于判断内容是否完成注意、理解和导流。',deepDive:['Vanity Metric｜表面指标','Business Signal｜经营信号']},
{id:'creator',title:'Creator Signals｜达人信号',defaultVisible:'达人需要同时看内容产出、有效触达、商品点击、成交、退款和成本。',deepDive:['样品出片率','达人集中度','佣金后贡献']},
{id:'ads',title:'Ads Signals｜广告信号',defaultVisible:'广告分析要区分平台归因表现与真实增量经营效果。',deepDive:['Attributed Sales｜归因成交','Incrementality｜增量','边际成本']},
{id:'live',title:'LIVE Signals｜直播信号',defaultVisible:'直播间流量、互动、商品点击、订单、退款和利润应连成同一链。',deepDive:['在线人数不是最终目标','成交质量决定可持续性']}],cases:[
{title:'播放量上涨但净贡献下降',type:'case',summary:'把内容信号继续连接广告、达人、退款和利润。'},
{title:'只看最高播放视频复制',type:'counterexample',summary:'高播放可能来自娱乐性而非有效商品需求。'}],variables:[
{name:'内容指标',effect:'描述内容层表现',state:'known'},{name:'渠道归因',effect:'描述平台分配的成交来源',state:'known'},{name:'因果增量',effect:'判断渠道真正新增价值',state:'unknown'}],interaction:{scene:'Growth Signal Lab｜增长信号实验',actions:['切换Content/Creator/Ads/LIVE','从表面指标追到业务结果','标记归因与因果'],motion:['信号链连接','虚荣指标淡化','利润节点聚焦']},evidence:[{level:'E1',need:'平台指标与归因口径说明'},{level:'E4',need:'真实内容、达人、广告、直播、订单和利润数据'}],gaps:['G3 指标/归因口径刷新','G4 多渠道真实数据案例']},
'T01-M12-L03':{code:'T01-M12-L03',knowledgeTree:[
{id:'revenue',title:'GMV → Net Sales｜成交额到净销售',defaultVisible:'GMV先扣除取消、退款等，才能得到更接近经营收入的净销售。',deepDive:['不同平台口径需核验','退款发生时间可能跨周期']},
{id:'cost',title:'Operating Cost Stack｜经营成本栈',defaultVisible:'COGS、物流、平台/支付、达人、广告、售后和税费准备金共同决定Contribution。',deepDive:['固定/变动成本区分','商品级与周期级成本分配']},
{id:'contribution',title:'Contribution｜贡献',defaultVisible:'贡献用于判断商品或经营活动是否在覆盖相关变动成本后留下经营空间。',deepDive:['不能与会计净利润直接等同','口径必须固定']},
{id:'cash',title:'Cash Track｜现金轨道',defaultVisible:'P&L｜损益与Cash｜现金需要并行观察。',deepDive:['采购/库存先占现金','平台结算和银行到账滞后']}],cases:[
{title:'GMV增长但Contribution和Cash恶化',type:'case',summary:'退款、广告、补货和结算周期共同造成表面增长与经营质量背离。'},
{title:'用GMV增长率判断商品赚钱',type:'counterexample',summary:'成交额不包含完整成本和现金时序。'}],variables:[
{name:'GMV｜成交总额',effect:'描述成交规模',state:'known'},{name:'退款/取消',effect:'改变净销售',state:'known'},{name:'完整成本',effect:'决定贡献',state:'estimated'},{name:'现金到账时点',effect:'决定资金可用性',state:'known'}],interaction:{scene:'Business P&L Simulator｜经营损益模拟',actions:['从GMV逐层扣减','调整退款/广告/物流','并行查看Cash Track'],motion:['Profit Bridge变化','损益与现金双轨同步']},evidence:[{level:'E4',need:'真实订单、费用、库存、结算与银行数据'},{level:'E5',need:'课堂P&L模拟'}],gaps:['G4 完整商品周期P&L案例']},
'T01-M12-L04':{code:'T01-M12-L04',knowledgeTree:[
{id:'problem',title:'Problem → Evidence｜问题到证据',defaultVisible:'决策从具体问题开始，每个问题都必须绑定证据而不是感觉。',deepDive:['Problem Wall｜问题墙','Evidence Check｜证据检查','缺证据时先研究']},
{id:'priority',title:'Impact × Controllability｜影响×可控性',defaultVisible:'优先级同时考虑影响大小与当前团队能否有效改变。',deepDive:['高影响低可控需要监测或规避','高影响高可控优先进入行动']},
{id:'action',title:'Action Contract｜行动合同',defaultVisible:'行动必须包含负责人、动作、指标、复盘日期和停止/调整条件。',deepDive:['Action｜行动','Metric｜指标','Review Date｜复盘日期','Stop/Adjust｜停止/调整']},
{id:'plan',title:'30-day Operating Plan｜30天经营计划',defaultVisible:'每轮只锁定Top 3优先事项，并分四周推进验证、执行和复盘。',deepDive:['Week 1 Diagnose｜诊断','Week 2 Execute｜执行','Week 3 Measure｜测量','Week 4 Decide｜决策']}],cases:[
{title:'12个问题中锁定3个可行动优先项',type:'case',summary:'通过证据、影响和可控性压缩行动范围并形成30天计划。'},
{title:'一次列20个优化动作全部推进',type:'counterexample',summary:'没有优先级和复盘条件会让团队无法判断哪个动作有效。'}],variables:[
{name:'证据强度',effect:'决定问题是否足以进入决策',state:'estimated'},{name:'影响程度',effect:'决定经营价值',state:'estimated'},{name:'可控性',effect:'决定当前是否能有效行动',state:'estimated'},{name:'未来结果',effect:'通过复盘验证',state:'unknown'}],interaction:{scene:'Operating Decision Room｜经营决策室',actions:['接收数据注入','整理Problem Wall','执行Evidence Check','放入Impact×Controllability矩阵','锁定Top 3','排入四周计划'],motion:['知识召回','问题聚类','优先级锁定','30天时间线展开']},evidence:[{level:'E4',need:'真实经营复盘数据与行动结果'},{level:'E5',need:'综合课堂案例'}],gaps:['G4 完整30天经营复盘案例']}
}