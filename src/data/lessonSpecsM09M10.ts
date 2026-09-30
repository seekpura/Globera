import type { LessonSpec } from './lessonSpecsM01M02'
export const lessonSpecsM09M10:Record<string,LessonSpec>={
'T01-M09-L01':{code:'T01-M09-L01',knowledgeTree:[
{id:'attention',title:'Ignore → Notice｜忽略到注意',defaultVisible:'商业内容第一步不是讲完整产品，而是让目标用户意识到“这与我有关”。',deepDive:['Hook｜钩子需要连接真实问题、欲望或视觉变化','高刺激不等于高质量注意']},
{id:'understand',title:'Understand｜理解',defaultVisible:'用户需要迅速理解商品是什么、解决什么问题以及怎么使用。',deepDive:['Problem / Desire｜问题或欲望','Demo｜演示','信息密度与认知负担']},
{id:'believe',title:'Believe｜相信',defaultVisible:'成交内容需要证明，而不仅是主张。',deepDive:['Proof｜证明可来自演示、对比、细节、真实反馈','证明必须与商品事实一致']},
{id:'act',title:'Want → Act｜想要到行动',defaultVisible:'CTA｜行动引导应建立在理解、信任和商品条件已经成立的基础上。',deepDive:['价格/优惠/库存/配送影响最后决策','行动指标要继续连接PDP与订单']}],cases:[
{title:'25秒商品视频逐段拆解',type:'case',summary:'把Hook、Problem/Desire、Demo、Proof、CTA映射到用户状态变化。'},
{title:'播放量高但商品点击和转化低',type:'counterexample',summary:'注意力没有完成理解与证明，不能等同成交能力。'}],variables:[
{name:'Hook强度',effect:'影响前段停留但可能增加错配流量',state:'estimated'},{name:'Proof完整度',effect:'影响信任与商品理解',state:'estimated'},{name:'PDP承接',effect:'决定内容兴趣能否继续转化',state:'unknown'}],interaction:{scene:'Video Commerce Anatomy｜视频成交解剖',actions:['拖动时间轴','标记Hook/Demo/Proof/CTA','移除Proof观察链路','A/B结构比较'],motion:['视频currentTime同步','四轨时间线','用户状态联动']},evidence:[{level:'E2',need:'真实平台内容与商品页面观察'},{level:'E4',need:'真实视频指标与订单数据'},{level:'E5',need:'课堂结构模拟'}],gaps:['G4 可授权真实成交视频与指标样本']},
'T01-M09-L02':{code:'T01-M09-L02',knowledgeTree:[
{id:'types',title:'Commerce Video Types｜成交视频类型',defaultVisible:'视频类型应按“如何证明商品价值”选择，而不是追逐固定模板。',deepDive:['Direct Demo｜直接演示','Problem-solving｜问题解决','Before/After｜前后对比','Scenario｜场景','UGC｜用户表达','Test｜测试','Story｜故事','Creator｜达人','LIVE Clip｜直播切片']},
{id:'proof',title:'Proof Mechanism｜证明机制',defaultVisible:'不同商品需要不同证明方式：动作、结果、细节、对比或社会证明。',deepDive:['证明应可视化且真实','强效果声明需要额外合规审查']},
{id:'match',title:'Product × Creative Match｜商品与创意匹配',defaultVisible:'创意类型与商品问题、演示难度、购买风险和内容场景需要匹配。',deepDive:['不是九种都做','优先测试最能展示核心价值的结构']}],cases:[
{title:'宠物除毛工具选择直接演示+前后对比',type:'case',summary:'商品效果能快速可视化，因此Proof可成为视频主体。'},
{title:'所有商品都套同一个“痛点三秒钩子”',type:'counterexample',summary:'模板相同会忽略商品证明机制和目标用户状态。'}],variables:[
{name:'商品证明难度',effect:'影响视频结构和时长',state:'estimated'},{name:'内容类型',effect:'改变用户理解路径',state:'known'},{name:'真实素材可用性',effect:'限制可采用的证明方式',state:'known'}],interaction:{scene:'Content Match Lab｜内容匹配实验',actions:['拖商品到九类视频','选择Proof机制','比较错误匹配'],motion:['结构重组','证明节点高亮']},evidence:[{level:'E2',need:'真实TikTok内容样本'},{level:'E4',need:'真实创意表现数据'}],gaps:['G4 九类授权案例素材库']},
'T01-M09-L03':{code:'T01-M09-L03',knowledgeTree:[
{id:'source',title:'Real Product Assets｜真实商品资产',defaultVisible:'AI生产链必须从真实商品图、视频、规格和品牌资料开始。',deepDive:['源资产决定事实锚点','低质量源资产会增加生成偏差']},
{id:'generation',title:'AI Production｜AI生产',defaultVisible:'AI可用于场景、镜头、视频、配音、字幕和多语言表达。',deepDive:['Image → Video｜图生视频','Text/Storyboard → Video｜文本/分镜到视频','TTS｜文本转语音','Localization｜本地化']},
{id:'truth',title:'Truth Lock｜事实锁定',defaultVisible:'生成过程不得改变商品结构、数量、颜色、功能、规格或制造不存在的证明。',deepDive:['生成前锁定事实','生成后逐项人工复核']},
{id:'review',title:'Human Review｜人工审核',defaultVisible:'最终发布责任仍需要人审查事实、语言、权利和平台合规。',deepDive:['AI不是合规责任主体','多语言需要语义与文化复核']}],cases:[
{title:'真实商品图→AI场景→视频→TTS→字幕→人工审核',type:'case',summary:'AI提高制作效率，但商品事实始终来自源资产。'},
{title:'AI生成不存在的功能演示',type:'counterexample',summary:'视觉可信度不能替代真实产品能力。'}],variables:[
{name:'源资产质量',effect:'影响生成一致性',state:'known'},{name:'生成偏差',effect:'增加事实风险',state:'estimated'},{name:'目标语言质量',effect:'影响理解与品牌可信度',state:'unknown'}],interaction:{scene:'AI Content Pipeline｜AI内容生产线',actions:['锁定商品事实','生成场景/视频/声音层','逐层审核','阻断事实偏移'],motion:['Asset Lineage追踪','Truth Lock差异高亮']},evidence:[{level:'E1',need:'平台AI内容/广告/知识产权规则'},{level:'E4',need:'真实商品源资产与生成结果'}],gaps:['G3 AI内容规则动态更新','G4 Seedance/TTS真实教学素材']},
'T01-M09-L04':{code:'T01-M09-L04',knowledgeTree:[
{id:'dna',title:'Creative DNA｜创意DNA',defaultVisible:'可以研究优秀内容的结构逻辑，但不等于复制具体表达资产。',deepDive:['开场机制','信息顺序','证明方式','节奏','CTA逻辑']},
{id:'rebuild',title:'Abstract → Rebuild｜抽象后重建',defaultVisible:'先把案例拆成抽象结构，再用自己的商品、素材和表达重新构建。',deepDive:['Structure｜结构可学习','Expression｜表达重新创作','Product Facts｜商品事实重新验证']},
{id:'rights',title:'Rights Graph｜权利图谱',defaultVisible:'视频、图片、音乐、人物、品牌和脚本都需要明确权利来源。',deepDive:['版权','肖像','商标','音乐授权','达人内容授权']}],cases:[
{title:'学习爆款“演示→反差→证明”结构后重拍',type:'case',summary:'保留成交逻辑，商品、镜头、脚本和素材全部重新创作。'},
{title:'下载竞品视频换字幕直接投放',type:'counterexample',summary:'结构学习不能变成素材复制和权利侵害。'}],variables:[
{name:'结构相似度',effect:'帮助学习成熟表达逻辑',state:'estimated'},{name:'素材原创度',effect:'影响权利与品牌资产',state:'known'},{name:'授权状态',effect:'决定素材是否可使用',state:'unknown'}],interaction:{scene:'Creative DNA Lab｜创意DNA实验室',actions:['拆结构层','锁定Rights Graph','重新组合自有素材'],motion:['内容剥离','抽象结构保留','新表达重构']},evidence:[{level:'E1',need:'平台版权/广告/知识产权政策'},{level:'E4',need:'自有或授权素材'}],gaps:['G4 授权对照案例','G5 复杂版权问题专项审核']},
'T01-M10-L01':{code:'T01-M10-L01',knowledgeTree:[
{id:'merchant',title:'Merchant Fit｜商家适配',defaultVisible:'商家需要明确商品、佣金、样品、库存和合作目标。',deepDive:['可提供什么内容资产','能承担多少样品和佣金成本']},
{id:'creator',title:'Creator Fit｜达人适配',defaultVisible:'达人适配应看受众、类目、内容风格、信任、演示能力和商业匹配。',deepDive:['粉丝量不是唯一指标','历史内容语境影响商品可信度']},
{id:'consumer',title:'Audience Match｜消费者匹配',defaultVisible:'最终判断是达人能否把商品价值可信地传递给目标消费者。',deepDive:['Audience｜受众','Context｜内容语境','Proof｜证明能力']}],cases:[
{title:'中腰部垂类达人高适配商品',type:'case',summary:'受众、内容风格和演示能力比单纯粉丝量更匹配。'},
{title:'只按粉丝量选择达人',type:'counterexample',summary:'大粉丝量不能保证目标受众、商品理解和转化。'}],variables:[
{name:'受众匹配',effect:'影响有效触达',state:'estimated'},{name:'内容证明能力',effect:'影响商品理解与信任',state:'estimated'},{name:'历史转化',effect:'提供参考但不能保证未来结果',state:'unknown'}],interaction:{scene:'Creator Fit Lab｜达人匹配实验',actions:['连接商家-商品-达人-消费者','切换达人档案','比较匹配原因'],motion:['网络关系聚焦','错配节点显现']},evidence:[{level:'E2',need:'达人公开内容与商品表现观察'},{level:'E4',need:'真实合作、样品、佣金和转化数据'}],gaps:['G4 真实达人合作案例']},
'T01-M10-L02':{code:'T01-M10-L02',knowledgeTree:[
{id:'open',title:'Open Collaboration｜开放合作',defaultVisible:'开放合作让符合条件的达人在联盟市场发现并推广商品。',deepDive:['扩大覆盖','控制商品、佣金与样品策略']},
{id:'target',title:'Target Collaboration｜定向合作',defaultVisible:'定向合作针对特定达人建立更明确的沟通和合作条件。',deepDive:['达人筛选','邀约','样品','内容要求与授权']},
{id:'economics',title:'Affiliate Economics｜联盟经济模型',defaultVisible:'佣金和样品是获客投资，必须受单位经济约束。',deepDive:['佣金率不能脱离贡献利润','退货会改变真实达人渠道成本']}],cases:[
{title:'开放合作获取广度，定向合作验证重点达人',type:'case',summary:'两种机制可承担不同的达人增长任务。'},
{title:'为了吸引达人无限提高佣金',type:'counterexample',summary:'佣金必须与净销售、退款和其他成本共同计算。'}],variables:[
{name:'佣金率',effect:'影响达人吸引力与贡献利润',state:'known'},{name:'样品成本',effect:'影响合作测试成本',state:'known'},{name:'达人出片率',effect:'影响样品投资效率',state:'unknown'}],interaction:{scene:'Affiliate System｜联盟系统',actions:['切换开放/定向','调整佣金和样品','观察贡献空间'],motion:['合作网络扩展','经济边界联动']},evidence:[{level:'E1',need:'TikTok Shop Affiliate官方机制与当前规则'},{level:'E4',need:'真实佣金、样品和合作结果'}],gaps:['G3 Affiliate规则刷新','G4 真实合作漏斗数据']},
'T01-M10-L03':{code:'T01-M10-L03',knowledgeTree:[
{id:'readiness',title:'Paid Growth Readiness｜付费增长准备度',defaultVisible:'广告前先检查Product、Creative、Conversion、Economics、Data和Budget六个条件。',deepDive:['商品是否已验证','创意是否有信号','PDP是否承接','经济模型是否允许放大']},
{id:'gmvmax',title:'GMV Max｜成交额最大化广告',defaultVisible:'GMV Max属于自动化成交增长工具，仍需理解素材、商品、预算与归因边界。',deepDive:['Product GMV Max｜商品成交额最大化','LIVE GMV Max｜直播成交额最大化','具体功能随市场与时间变化']},
{id:'incrementality',title:'Attribution ≠ Incrementality｜归因不等于增量',defaultVisible:'广告系统归因到的成交可能包含原本来自自然内容或达人等触点的需求。',deepDive:['看Attributed Sales｜归因成交','同时检查边际增量、佣金、退款和利润']},
{id:'scale',title:'Test → Scale｜测试到放大',defaultVisible:'状态应从暂不投、小额测试到可放大逐步推进。',deepDive:['Do Not Scale｜暂不放大','Small Test｜小额测试','Scale Ready｜可放大']}],cases:[
{title:'已有自然/达人信号后小额测试GMV Max',type:'case',summary:'同时观察归因成交、净销售、广告成本、佣金、退款与贡献。'},
{title:'ROAS好就认定广告创造了全部成交',type:'counterexample',summary:'平台归因口径不能直接证明全部成交都是广告增量。'}],variables:[
{name:'广告预算',effect:'改变流量获取和风险暴露',state:'known'},{name:'归因成交',effect:'反映平台归因结果',state:'known'},{name:'真实增量',effect:'决定广告新增价值',state:'unknown'},{name:'退款/佣金',effect:'影响广告后真实贡献',state:'unknown'}],interaction:{scene:'Paid Growth Lab｜付费增长实验',actions:['检查六项准备度','切换暂不投/小测/放大','调预算','比较归因与增量'],motion:['准备度闸门','预算-贡献联动','归因路径叠加']},evidence:[{level:'E1',need:'TikTok Ads/TikTok Shop当前GMV Max官方资料'},{level:'E4',need:'真实广告、自然、达人、退款和利润数据'}],gaps:['G3 GMV Max功能与归因规则开课前刷新','G4 真实增量实验案例']},
'T01-M10-L04':{code:'T01-M10-L04',knowledgeTree:[
{id:'need',title:'Does the Business Need LIVE?｜是否需要直播',defaultVisible:'直播不是每个商品的必选项，要先判断商品、内容、库存、服务、团队和经济模型。',deepDive:['商品是否适合连续演示','是否有足够内容和库存支撑时长']},
{id:'modes',title:'Human / AI / Hybrid LIVE｜真人/AI/混合直播',defaultVisible:'不同直播模式改变生产效率、互动质量、人员和技术责任。',deepDive:['Human｜真人直播','AI-assisted｜AI辅助','Hybrid｜混合','具体自动化能力受平台规则约束']},
{id:'operations',title:'LIVE Operations｜直播经营',defaultVisible:'直播仍需商品、脚本、互动、库存、客服、订单和复盘形成闭环。',deepDive:['直播间流量不是最终目标','成交质量要看退款、利润和售后']},
{id:'oversight',title:'Human Oversight｜人工监督',defaultVisible:'AI提高生产和持续运营能力，但不能移除事实审核、平台合规和人工责任。',deepDive:['异常接管','内容审核','商品事实','用户服务']}],cases:[
{title:'真人主讲+AI辅助素材与多语言',type:'case',summary:'把AI用于生产效率，同时保留真人监督和异常处理。'},
{title:'部署AI直播后无人负责内容和订单异常',type:'counterexample',summary:'自动化不等于取消经营责任。'}],variables:[
{name:'商品演示适配',effect:'影响直播价值',state:'estimated'},{name:'库存深度',effect:'限制放量能力',state:'known'},{name:'直播人力/技术成本',effect:'影响经营模型',state:'estimated'},{name:'平台AI直播规则',effect:'决定允许的实现方式',state:'unknown'}],interaction:{scene:'LIVE Fit Lab｜直播适配实验',actions:['评估六项准备度','切换真人/AI辅助/混合','注入库存/客服异常'],motion:['直播系统拓扑变化','异常接管路径']},evidence:[{level:'E1',need:'TikTok LIVE、AI内容及商业功能当前规则'},{level:'E4',need:'真实直播运营与成交质量数据'},{level:'E5',need:'教学直播模拟'}],gaps:['G3 LIVE/AI规则动态刷新','G4 真人与AI辅助直播对照案例']}
}