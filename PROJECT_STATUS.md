# T01 React 工程状态

## 当前正式范围

- 12 个模块 / 48 节正式课程全部进入 React 路由、正式 Lesson Spec 与结构化内容层。
- 48 / 48 Lesson Spec 已覆盖；48 / 48 母组件映射已覆盖。
- 6 个独立标杆场景：Platform Universe｜平台世界、Global Market Explorer｜全球市场判断、Product Opportunity Lab｜商品机会实验室、Video Commerce Analyzer｜视频成交解剖、Logistics Journey｜国际物流旅程、Operating Decision Room｜经营决策室。
- M01–M04、M05–M08、M09–M12 已形成三组综合教学 Scene；普通课程不再只依赖通用 Family Scene。
- 18 个教学母组件已经进入工程；当前重点是场景化组合与专业内容深化，而不是继续增加组件数量。
- Presenter Step｜讲师演示步骤已进入课程壳：Scene｜场景 → Observe｜观察 → Explore｜探索 → Decide｜判断 → Reflect｜结论。
- Platform / Market / Product Opportunity 三个前半程核心标杆已与 Presenter Step 同步。
- 中文是第一阅读语言；可见英文专业表达采用中文对应说明。
- 静态优先：无登录、数据库、后台 CMS 或业务 API 依赖。

## 已完成的高级交互

- Platform Universe：发现机制 → 平台 → 用户路径 / 平台比较；商品原型只改变观察视角，不生成平台优劣评分。
- Market Explorer：商品条件化研究顺序、国家下钻、逐层 Reveal、Supported / Unknown / Conflicted 证据状态。
- Product Opportunity：六问商品假设、Evidence Class｜证据等级、Effective Competition Cohort｜有效竞争集合、Hard Gates｜硬风险闸门、Unit Economics｜单位经济、Small Test Contract｜小范围测试契约。
- Video Analyzer：四轨时间轴、A/B 结构、Remove Proof｜移除证明实验。
- Logistics Journey：SVG 路径、路线切换、清关 / 末端异常与 Tracking → ETA → Customer Promise → Service / Cash 状态传播。
- Decision Room：Problem → Evidence → Impact × Control → Top 3 → 30-day Plan。
- Paid Growth / Diagnosis：Attribution vs Incrementality｜归因与增量实验。
- Settlement / P&L：Order-to-Cash｜订单到资金回收与 Operating Economics｜经营经济实验。

## 工程 Gate

GitHub Actions 当前校验链：

1. Node.js 22
2. npm install --no-audit --no-fund
3. npm run validate
4. npm run typecheck
5. npm run build
6. main 构建通过后才进入 GitHub Pages 部署；Pull Request 只执行校验，不部署

当前静态结构审计已确认：

- 12 modules
- 48 lessons
- 48 formal lesson specs
- 48 mother-component mappings
- 6 benchmark routes
- learner-facing integrated scenes 不暴露内部组件名
- PresenterController 只挂载一次
- 不再使用 Offline-ready 未验证声明
- 不再把全部课程硬编码为 approved / ready
- Platform benchmark 不存在伪综合评分
- Platform / Market / Product Opportunity 均接入 Presenter Step

CI / dependency install / TypeScript / Vite build 的真实运行结果仍需以 GitHub Actions 或可联网 Node 环境为准；在拿到真实执行结果前，不把工程状态表述为“已构建通过”。

## 内容原则

- 动态平台规则、费率、准入、税务、广告产品与物流 SLA｜服务时效按开课日期核验。
- UNKNOWN｜未知保持未知。
- E5｜教学模拟不得伪装为真实经营结果。
- 商业判断使用证据、反证、限制条件与下一步动作，不使用虚假综合评分。
- 内部研究方法、算法包和组件实现名不作为学员课程品牌暴露。
- 专业方法是内容生产引擎，正式课程结构是教学结构引擎，React / SVG / Motion 是呈现与交互引擎。

## 下一阶段

- 给 48 节课逐课补真实案例、素材、来源日期与 Research Gap。
- 深化 M04 / M05 / M08 / M10 / M11 中需要状态传播、模拟后台、Listing、广告与订单数据的专属场景。
- 接入真实本地视频 / 商品页 / 物流 / 经营案例素材，完成 Asset Manifest 与权利状态。
- 补 Vitest / Playwright、浏览器视觉 QA、响应式 / 无障碍 / Reduced Motion / 静态离线资产验收。
