# T01 TikTok 跨境电商 0–1｜React 交互教学系统

版本：2.8

T01 是以 TikTok / TikTok Shop 为唯一主经营场景的 0–1 实战教学前端。主路线不是跨境百科，而是让学员把第一轮真实经营闭环跑出来：

**经营路线 → Shop 就绪 → 首测 SKU → Listing → TikTok 内容 → Creator/Affiliate → GMV Max → LIVE → 订单/Shop Health → 数据/P&L → 下一轮 30 天。**

## 当前结构

- 9 个经营阶段
- 28 门核心课
- 11 个实操工作坊
- 5 个真实经营陪跑案件
- 15 个可填写/计算/保存/导出的核心工具
- 10 个毕业经营里程碑
- 纯静态 React + TypeScript，可部署到 CDN / GitHub Pages / 对象存储

## 2.8 数据流

课程系统不再是互相独立的页面。关键经营结果会沿业务链自动流动：

- W03 首测 SKU → W04 Listing / W05 内容 / W08 GMV Max / W09 LIVE
- 工作坊完成 → K01–K15 工具自动生成带来源的记录
- W05 成片 → W06 发布测试
- P01–P05 的审核、内容、达人、订单状态 → R01–R10 经营档案自动汇总
- 人工验收仍独立存在，自动汇总不会冒充“通过”

## 技术

- React 19 + TypeScript + Vite
- React Router HashRouter
- Framer Motion
- 浏览器本地持久化；Repository 接口可替换为未来 SaaS 后端
- Node >= 22
- pnpm >= 10

## 本地运行

```bash
corepack enable
pnpm install
pnpm test:static
pnpm test:ui-contracts
pnpm test
pnpm build
pnpm dev
```

## 关键目录

```text
src/data/t01/              课程、工作坊、陪跑、工具与动态规则真源
src/domain/dataFlow.ts     跨阶段经营数据流
src/features/course/       核心课与阶段
src/features/workshop/     W01–W11 实操工作台
src/features/coaching/     P01–P05 真实案件中心
src/features/tools/        K01–K15 工具工作区
src/features/results/      R01–R10 经营档案
src/components/visual/     高保真教学工作台
```

## 教学边界

真实平台规则、入口、费率、资格、税务和履约阈值均属于动态信息。系统通过动态规则核验台记录当前站点、官方来源与核验日期，不把历史界面或阈值硬编码成永久事实。
