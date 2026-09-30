# T01 TikTok 跨境电商 0–1｜高级交互教学前端

这是 T01《TikTok 跨境电商 0–1 实战班》的完整 React 静态前端工程。它不是 LMS、SaaS 或卖家后台，而是一套用于现场教学、线上连线教学与陪跑的交互式数字课程。

## 当前范围

- 12 个模块 / 48 节正式课程全部进入 React 路由与结构化内容层。
- 课程正式内容来自 T01 正式最终同步课程总案，并在前端中以“核心结论 → 知识对象 → 判断实验 → 课堂实操 → 完成标准”的方式呈现。
- 6 个标杆课程拥有专门交互场景：
  - M01-L02 全球跨境平台地图
  - M02-L01 全球市场判断
  - M06-L01 TikTok 商品机会实验室
  - M09-L01 视频成交解剖
  - M11-L02 国际物流旅程
  - M12-L04 经营决策室
- 48 节课程都已进入专属或综合交互 Scene；6 个标杆课保留独立场景，其余课程按模块进入 M01–M04 / M05–M08 / M09–M12 综合教学世界，并复用 18 个教学母组件。
- Learner Mode｜学员模式与 Instructor Mode｜讲师模式共用同一静态前端；不需要账号、数据库或后台。
- 所有关键动态事实都保留“来源 / 日期 / 待核验”概念；模拟结果不得当作真实经营结果。
- 中文是第一阅读语言；可见英文专业术语均作为中文辅助而不是替代中文。

## 技术栈

- React + TypeScript + Vite
- React Router（Hash Router，方便静态托管）
- GSAP（标杆场景高级动效接口）
- Zustand（本地课程 / 场景状态）
- SVG 为流程、地图、关系图和时间轴主图形技术
- 纯静态构建，无业务后端

## 运行

```bash
npm install
npm run validate
npm run dev
```

正式构建：

```bash
npm run build
npm run preview
```

输出目录为 `dist/`，可以部署到 GitHub Pages、Cloudflare Pages、Vercel 静态托管或任意静态 Web Server。

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
```

交互程序位于：

```text
src/scenes/
```

更新课程内容、案例或动态规则时，原则上不需要重写场景组件。

## 设计边界

本项目不包含：

- 登录 / 注册
- 云端作业提交
- 数据库
- 后台 CMS
- 商家真实自动操作
- 实时 AI 作为课程主路径
- 支付、积分、排行榜

真实平台页面、实时规则和最新费率仅作为外部核验资料；课程主路径应在断网状态下仍可完整教学。


## 工程校验

Pull Request｜拉取请求会执行完整前端校验链：

```bash
npm install --no-audit --no-fund
npm run validate
npm run typecheck
npm run build
```

只有 main｜主分支构建会进入 GitHub Pages 部署；PR 只做 validate / typecheck / build，不执行部署。
