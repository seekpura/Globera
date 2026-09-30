# T01 TikTok 跨境电商 0–1｜高级交互教学前端

这是 T01《TikTok 跨境电商 0–1 实战班》的 React + TypeScript 静态交互教学工程。它不是 LMS、SaaS 或卖家后台，而是一套用于现场教学、线上连线教学与线上/线下陪跑的数字课程前端。

## 当前范围

- 12 个模块 / 48 节正式课程全部进入 React 路由、结构化内容层与正式 Lesson Spec。
- 6 个标杆课程使用独立高级交互 Scene：
  - M01-L02 Platform Universe｜全球跨境平台世界
  - M02-L01 Global Market Explorer｜全球市场判断
  - M06-L01 Product Opportunity Lab｜商品机会实验室
  - M09-L01 Video Commerce Analyzer｜视频成交解剖
  - M11-L02 Logistics Journey｜国际物流旅程
  - M12-L04 Operating Decision Room｜经营决策室
- 其余课程按 M01–M04、M05–M08、M09–M12 三组综合教学世界进入专属交互场景，并复用教学母组件。
- Presenter Step｜讲师演示步骤已接入课程壳：Scene｜场景 → Observe｜观察 → Explore｜探索 → Decide｜判断 → Reflect｜结论。
- Learner Mode｜学员模式与 Instructor Mode｜讲师模式共用同一静态前端；不依赖登录、数据库或业务后台。
- 中文是第一阅读语言；可见英文专业表达配中文说明。
- E1–E5 证据等级、Unknown｜未知、反证、硬风险闸门与教学模拟边界进入课程交互。

## 已验证工程 Gate

GitHub Actions 使用 Node.js 22 执行：

```bash
npm install --no-audit --no-fund
npm run validate
npm run typecheck
npm run build
```

Run 181 已真实通过 validate、TypeScript typecheck 与 Vite build，并成功生成 `t01-dist` 构建产物。GitHub Pages 部署作为可选步骤，当前仓库未启用 Pages 时不会阻断工程校验。

## 技术栈

- React + TypeScript + Vite
- React Router（Hash Router，适配静态托管）
- GSAP（高级动效接口）
- Zustand（本地课程 / 场景状态）
- SVG 为关系图、流程、地图与时间轴的主要图形技术
- 纯静态构建，无业务后端

## 本地运行

```bash
npm install
npm run validate
npm run typecheck
npm run dev
```

正式构建：

```bash
npm run build
npm run preview
```

输出目录为 `dist/`，可部署到支持静态前端的托管环境。

## 路由

课程全景：

```text
#/course/t01
```

任意课程：

```text
#/course/t01/m06/l01
```

所有 48 节均可直接深链打开。

## 内容与程序分离

课程正式数据位于：

```text
src/data/courseContent.ts
src/data/lessonSpecs*.ts
```

交互场景位于：

```text
src/scenes/
src/components/teaching/
```

动态规则、案例、素材与证据应继续与组件实现解耦。

## 设计边界

本项目当前不包含：

- 登录 / 注册
- 云端作业提交
- 数据库
- 后台 CMS
- 商家真实自动操作
- 实时 AI 作为课程主路径
- 支付、积分、排行榜

真实平台页面、实时规则、费率、准入、税务与物流 SLA｜服务时效需要在开课前按官方或直接证据刷新。离线优先是工程目标，完整离线资产验收仍作为独立 Gate 执行。
