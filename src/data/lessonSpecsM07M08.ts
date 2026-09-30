import type { LessonSpec } from './lessonSpecsM01M02'
export const lessonSpecsM07M08:Record<string,LessonSpec>={
'T01-M07-L01':{code:'T01-M07-L01',knowledgeTree:[
{id:'sources',title:'Supply Sources｜供应来源',defaultVisible:'自有供应、工厂直采、产业带、平台/贸易商、本地供应和代发承担不同成本与控制责任。',deepDive:['来源不是“越靠近工厂越好”','不同阶段需要不同灵活性和控制力']},
{id:'dimensions',title:'Supplier Dimensions｜供应维度',defaultVisible:'价格之外还要比较MOQ、质量、交期、定制、合规、库存、售后与扩产。',deepDive:['最低报价可能伴随更高MOQ或质量波动','供应稳定性会影响前台经营承诺']},
{id:'readiness',title:'Supply Readiness｜供应准备度',defaultVisible:'能找到商品不等于已经具备采购条件。',deepDive:['报价','样品','规格确认','质量标准','交期与产能']}],cases:[
{title:'1688贸易商与工厂直采比较',type:'case',summary:'用MOQ、样品速度、定制、质量和扩产能力而非单价做判断。'},
{title:'最低报价供应商直接下大货',type:'counterexample',summary:'没有样品、规格和QC验证时，低价不能代表可采购。'}],variables:[
{name:'MOQ｜最小起订量',effect:'影响测试成本和库存风险',state:'known'},{name:'交期',effect:'影响补货与断货风险',state:'estimated'},{name:'质量稳定性',effect:'影响退款、评价与售后',state:'unknown'}],interaction:{scene:'Supply Map｜供应地图',actions:['切换供应来源','比较八个供应维度','标记准备度'],motion:['供应网络展开','风险节点高亮']},evidence:[{level:'E4',need:'真实供应商报价、MOQ、样品、交期与质量数据'},{level:'E5',need:'课堂供应商模拟'}],gaps:['G4 真实供应商样本与报价']},
'T01-M07-L02':{code:'T01-M07-L02',knowledgeTree:[
{id:'requirement',title:'Requirement → RFQ｜需求到询价',defaultVisible:'采购前先把商品规格、数量、包装、合规和交付要求写清楚。',deepDive:['模糊询价无法形成可比报价','RFQ字段应与最终验收标准相连']},
{id:'sample',title:'Sample & Spec Freeze｜样品与规格冻结',defaultVisible:'样品验证后才能冻结量产规格和质量标准。',deepDive:['功能/尺寸/材质/颜色','包装/标签','关键质量点']},
{id:'qc',title:'QC & Mass Production｜质量检查与量产',defaultVisible:'质量检查要区分Critical、Major、Minor问题并定义处理规则。',deepDive:['Critical｜严重问题','Major｜主要问题','Minor｜次要问题','出货前检查']}],cases:[
{title:'RFQ→多供应商比较→样品→规格冻结→量产',type:'case',summary:'把采购从“找货”变成可验证流程。'},
{title:'口头确认样品后直接量产',type:'counterexample',summary:'没有冻结规格和验收标准，量产争议无法客观判断。'}],variables:[
{name:'样品结果',effect:'决定是否进入规格冻结',state:'known'},{name:'缺陷等级',effect:'决定返工、接受或停止',state:'known'},{name:'量产一致性',effect:'决定是否放行出货',state:'unknown'}],interaction:{scene:'Purchase Journey｜采购验证旅程',actions:['推进RFQ到量产','注入Critical/Major/Minor缺陷','执行放行/返工/停止'],motion:['流程状态推进','失败与恢复路径']},evidence:[{level:'E4',need:'真实RFQ、样品、QC与出货资料'}],gaps:['G4 真实采购与QC案例']},
'T01-M07-L03':{code:'T01-M07-L03',knowledgeTree:[
{id:'sales',title:'Selling Price → Net Sales｜售价到净销售',defaultVisible:'标价需要扣除折扣、退款等才能得到可用于经营分析的净销售。',deepDive:['促销不能只看前台价格','退款影响收入也可能产生额外成本']},
{id:'costs',title:'Complete Cost Stack｜完整成本栈',defaultVisible:'商品、包装、国际物流、本地履约、平台、支付、达人、广告、售后、税费和汇率应进入同一模型。',deepDive:['Known｜已知','Estimated｜估算','Unknown｜待核验']},
{id:'stress',title:'Stress Test｜压力测试',defaultVisible:'正常情景盈利不代表经营安全，需要测试成本上升、退款和广告波动。',deepDive:['Normal｜正常','Conservative｜保守','Break-even｜盈亏平衡']}],cases:[
{title:'售价100的商品逐层扣除完整成本',type:'case',summary:'用Profit Bridge展示毛利、贡献和现金不是同一个数字。'},
{title:'只用售价减采购价计算利润率',type:'counterexample',summary:'会系统性高估跨境商品的经营空间。'}],variables:[
{name:'售价',effect:'影响净销售和转化条件',state:'known'},{name:'国际物流',effect:'影响贡献利润且受重量体积影响',state:'estimated'},{name:'退款损失',effect:'影响收入、物流与售后',state:'unknown'},{name:'广告/达人成本',effect:'影响增长后的真实贡献',state:'unknown'}],interaction:{scene:'Unit Economics Lab｜单位经济实验室',actions:['拖动成本参数','切换正常/保守情景','寻找盈亏平衡点'],motion:['Profit Bridge动态变化','敏感性传播']},evidence:[{level:'E4',need:'真实采购、物流、平台、广告、退款费用'},{level:'E5',need:'课堂模拟初始值'}],gaps:['G3 平台费率动态更新','G4 完整真实成本案例']},
'T01-M07-L04':{code:'T01-M07-L04',knowledgeTree:[
{id:'price',title:'Price Corridor｜价格走廊',defaultVisible:'定价要同时满足消费者可接受区间、竞争环境和自身经济底线。',deepDive:['市场价格带','促销空间','最低可持续价格']},
{id:'inventory',title:'Inventory Timeline｜库存时间线',defaultVisible:'库存是时间变量：在途、可售、安全库存和补货提前期共同决定断货与积压。',deepDive:['需求波动','补货点','交期不确定性']},
{id:'cash',title:'Cash Shadow｜现金阴影',defaultVisible:'采购、物流和库存先占用现金，平台结算通常晚于成本支出。',deepDive:['现金转换周期','库存积压','增长速度与资金需求']}],cases:[
{title:'销量增长但现金越来越紧',type:'case',summary:'补货支出提前、结算滞后导致利润为正仍可能缺现金。'},
{title:'看到销量增长就无限补货',type:'counterexample',summary:'忽略需求稳定性、交期和结算周期会放大库存风险。'}],variables:[
{name:'售价',effect:'影响转化与单位贡献',state:'known'},{name:'补货提前期',effect:'影响安全库存和断货概率',state:'estimated'},{name:'结算周期',effect:'影响现金占用时间',state:'known'},{name:'未来需求',effect:'影响补货决策',state:'unknown'}],interaction:{scene:'Price × Inventory × Cash Lab',actions:['调整售价/销量/交期/库存','观察现金阴影','触发断货或积压'],motion:['库存时间线推进','现金阴影扩张/收缩']},evidence:[{level:'E4',need:'真实库存、销售、补货和结算数据'},{level:'E5',need:'课堂模拟'}],gaps:['G4 真实补货现金案例']},
'T01-M08-L01':{code:'T01-M08-L01',knowledgeTree:[
{id:'category',title:'Category｜类目',defaultVisible:'类目决定属性、规则、搜索理解和部分经营权限。',deepDive:['错误类目会影响审核与发现','类目不是营销标签']},
{id:'family',title:'Product Family & Variant｜商品族与变体',defaultVisible:'同一商品下的颜色、尺寸等变体需要保持真实可理解的结构。',deepDive:['变体维度要对消费者有意义','不能用变体规避独立商品规则']},
{id:'sku',title:'SKU｜库存单元',defaultVisible:'SKU应与真实可管理的物理库存一一对应。',deepDive:['库存、价格、条码与仓储需要一致','前台变体和后台SKU关系要可追踪']}],cases:[
{title:'同款两颜色两尺寸形成4个SKU',type:'case',summary:'从商品族→变体→SKU→库存建立一一对应。'},
{title:'把完全不同商品塞进颜色变体',type:'counterexample',summary:'会破坏商品结构并可能违反平台规则。'}],variables:[
{name:'类目',effect:'决定属性与规则集合',state:'known'},{name:'变体维度',effect:'影响前台选择与库存结构',state:'known'},{name:'必填属性',effect:'随类目和市场变化',state:'unknown'}],interaction:{scene:'Product Structure｜商品结构工作台',actions:['建立商品族','组合变体','映射SKU与库存'],motion:['结构树展开','错误映射高亮']},evidence:[{level:'E1',need:'平台类目、属性与变体规则'},{level:'E4',need:'真实SKU与库存资料'}],gaps:['G3 类目属性动态更新']},
'T01-M08-L02':{code:'T01-M08-L02',knowledgeTree:[
{id:'facts',title:'Product Facts｜商品事实',defaultVisible:'标题和卖点必须先建立在真实规格、功能、材质、尺寸和适用场景上。',deepDive:['不可生成不存在的性能','事实字段应与包装和图片一致']},
{id:'intent',title:'Search Intent｜搜索意图',defaultVisible:'关键词的作用是连接用户意图与商品事实，不是堆满搜索词。',deepDive:['核心商品词','用途/场景词','属性词','不相关高流量词应排除']},
{id:'language',title:'Localized Expression｜本地化表达',defaultVisible:'语言本地化要保持事实准确，同时符合目标市场自然表达。',deepDive:['翻译≠本地化','关键词密度不能破坏可读性']}],cases:[
{title:'事实→意图→本地语言→标题/卖点',type:'case',summary:'先建立Keyword Graph再生成Listing表达。'},
{title:'标题塞入大量热门但无关关键词',type:'counterexample',summary:'可能降低理解、相关性并引入误导。'}],variables:[
{name:'商品事实',effect:'限定可表达内容',state:'known'},{name:'搜索意图',effect:'影响关键词选择和顺序',state:'estimated'},{name:'本地语言习惯',effect:'影响可读性和理解',state:'unknown'}],interaction:{scene:'Listing Builder｜Listing构建器',actions:['锁定事实','连接Intent Cluster','重组标题和卖点'],motion:['关键词图谱聚类','事实锁定提示']},evidence:[{level:'E1',need:'平台Listing政策与字段规则'},{level:'E2',need:'真实SERP/PDP关键词与表达观察'},{level:'E4',need:'真实商品规格'}],gaps:['G1 市场关键词研究','G4 真实Listing对照案例']},
'T01-M08-L03':{code:'T01-M08-L03',knowledgeTree:[
{id:'truth',title:'Visual Truth｜视觉真实性',defaultVisible:'主图、详情图和视频必须与实际商品、规格、数量和功能一致。',deepDive:['AI可以改变场景表达但不能改变商品事实','效果图与实拍需要明确用途']},
{id:'hierarchy',title:'Visual Evidence Hierarchy｜视觉证据层级',defaultVisible:'不同素材承担识别、规格、使用、证明和信任等不同任务。',deepDive:['白底商品识别','尺寸/结构','使用场景','功能证明','包装/交付']},
{id:'lineage',title:'Asset Lineage｜素材血缘',defaultVisible:'原始商品资产、衍生设计、AI生成和最终审核版本应可追溯。',deepDive:['Source｜源资产','Derived｜衍生资产','Approved｜审核通过','Blocked｜阻断']}],cases:[
{title:'真实产品图→场景扩展→人工审核→发布素材',type:'case',summary:'保留商品结构和事实，AI仅用于允许的表达层。'},
{title:'AI把商品数量、颜色或结构改掉',type:'counterexample',summary:'视觉更好看也不能牺牲商品真实性。'}],variables:[
{name:'源资产真实性',effect:'决定后续生成可信基础',state:'known'},{name:'AI衍生程度',effect:'增加事实偏移风险',state:'estimated'},{name:'版权/授权状态',effect:'决定素材能否发布',state:'unknown'}],interaction:{scene:'Asset Lineage｜素材血缘工作台',actions:['追踪Source→Derived→Approved','触发事实偏移','执行阻断'],motion:['血缘链追踪','差异区域高亮']},evidence:[{level:'E1',need:'平台图片/视频真实性与知识产权规则'},{level:'E4',need:'真实商品源图和设计资产'}],gaps:['G4 真实商品素材链案例','G5 特定素材权利审核']},
'T01-M08-L04':{code:'T01-M08-L04',knowledgeTree:[
{id:'config',title:'Commercial Configuration｜经营配置',defaultVisible:'价格、库存、配送、SKU和销售状态需要在发布前一致。',deepDive:['错误库存会制造不可履约订单','价格与促销需要检查前台展示']},
{id:'publish',title:'Publish State｜发布状态',defaultVisible:'商品可能处于Draft、Review、Published、Rejected或Suspended等不同状态。',deepDive:['Published｜已发布不等于前台正确','Rejected｜驳回要追踪具体原因']},
{id:'qa',title:'Front-end QA｜前台质检',defaultVisible:'发布后必须从消费者视角检查标题、图片、价格、变体、库存、配送和内容。',deepDive:['后台保存值与前台显示可能不同','移动端和市场站点需要实际检查']}],cases:[
{title:'后台发布成功但前台配送承诺错误',type:'case',summary:'通过发布后QA发现经营配置问题。'},
{title:'看到Published状态就结束检查',type:'counterexample',summary:'上线状态不能替代真实前台验收。'}],variables:[
{name:'发布状态',effect:'决定商品当前可见/可售程度',state:'known'},{name:'前台展示',effect:'决定消费者实际看到的信息',state:'unknown'},{name:'配送配置',effect:'影响承诺与转化',state:'known'}],interaction:{scene:'Publish & QA Simulator｜发布与质检模拟',actions:['配置价格/库存/配送','提交审核','切换前台视角','注入驳回/展示错误'],motion:['状态机变化','后台→前台映射']},evidence:[{level:'E1',need:'平台商品发布规则'},{level:'E2',need:'真实后台与前台页面观察'}],gaps:['G3 发布字段/状态动态更新','G4 真实发布失败案例']}
}