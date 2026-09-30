# T01 React 工程状态

## 当前正式范围

- 12 个模块 / 48 节正式课程全部进入 React 路由、正式 Lesson Spec 与结构化内容层。
- 48 / 48 Lesson Spec 已覆盖；48 / 48 母组件映射已覆盖。
- 6 个独立标杆场景：Platform Universe｜平台世界、Global Market Explorer｜全球市场判断、Product Opportunity Lab｜商品机会实验室、Video Commerce Analyzer｜视频成交解剖、Logistics Journey｜国际物流旅程、Operating Decision Room｜经营决策室。
- M01–M04、M05–M08、M09–M12 已形成三组综合教学 Scene。
- 18 个教学母组件已经进入工程；当前重点是场景深化、证据与素材生产，不继续堆组件数量。
- Presenter Step｜讲师演示步骤：Scene｜场景 → Observe｜观察 → Explore｜探索 → Decide｜判断 → Reflect｜结论。
- Platform / Market / Product Opportunity 三个前半程标杆已进入语义缩放、证据钻取与 Presenter Step 联动。
- 静态优先：无登录、数据库、后台 CMS 或业务 API 依赖。

## 已完成的高级交互

- Platform Universe：发现机制聚焦、平台知识钻取、双平台结构比较；不生成平台优劣评分。
- Market Explorer：L1 Region → L2 Country → L3 Product → L4 Evidence 语义缩放、商品条件化研究顺序、证据新鲜度。
- Product Opportunity：六问商品假设、Case Lens｜案例视角、Evidence Class｜证据等级、Effective Competition Cohort｜有效竞争集合、Hard Gates｜硬风险闸门、Unit Economics｜单位经济、Small Test Contract｜小范围测试契约。
- Video Analyzer：四轨时间轴、A/B 结构、Remove Proof｜移除证明实验。
- Logistics Journey：SVG 路径、路线切换、清关 / 末端异常与 Tracking → ETA → Customer Promise → Service / Cash 状态传播。
- Decision Room：Problem → Evidence → Impact × Control → Top 3 → 30-day Plan。
- Paid Growth / Diagnosis：Attribution vs Incrementality｜归因与增量实验。
- Settlement / P&L：Order-to-Cash｜订单到资金回收与 Operating Economics｜经营经济实验。

## 工程 Gate

GitHub Actions 校验链：

1. Node.js 22
2. npm install --no-audit --no-fund
3. npm run validate
4. npm run typecheck
5. npm run build
6. 上传 `t01-dist` 构建产物
7. GitHub Pages 仅在仓库启用且显式打开部署变量后执行

已确认的结构 Gate：

- 12 modules
- 48 lessons
- 48 formal lesson specs
- 48 mother-component mappings
- 6 benchmark routes
- learner-facing integrated scenes 不暴露内部组件实现名
- PresenterController 只挂载一次
- 不使用未验证的 Offline-ready 声明
- 不把全部课程硬编码为 approved / ready
- Platform benchmark 不存在伪综合评分
- Platform / Market / Product Opportunity 接入 Presenter Step

**真实运行结果：GitHub Actions Run 181 已通过 npm install、validate、TypeScript typecheck、Vite build，并成功上传 t01-dist。**

这证明当前主线可以完成真实生产构建。后续提交仍必须继续通过同一 Gate。

## 尚未完成的生产验收

- 浏览器级视觉 QA：运行环境对 file:// 与 localhost 页面访问有管理员阻断，尚未形成可声明为通过的浏览器截图验收。
- 响应式设备矩阵仍需专项验收。
- 完整离线资产 / 缓存策略仍需专项验收。
- Vitest / Playwright 自动化测试尚未正式进入仓库。
- 真实视频、商品页、物流、广告、订单与财务案例素材仍需继续补充。
- 动态平台规则、费率、准入、税务、广告产品与物流 SLA｜服务时效需要开课前刷新证据日期。

## 下一阶段

- 建立 48 课生产状态矩阵：Research Ready / Content Ready / Asset Ready / Frontend Ready。
- 逐课补真实案例、素材、来源日期、Research Gap 与权利状态。
- 深化 M04 / M05 / M08 / M10 / M11 的状态传播、模拟后台、Listing、广告与订单场景。
- 加入 Vitest + Playwright，并把核心 6 个标杆 Scene、48 路由、Presenter Step、Reduced Motion 与移动端纳入自动验收。
- 完成离线资产、响应式、无障碍与课堂投屏专项验收。
