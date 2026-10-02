# T01 React 2.8 QA

## 本轮新增验证

- W01–W11 完成结果 → K01–K15 工具工作区自动同步映射：PASS
- W03 主测 SKU → W04 / W05 / W08 / W09 上游自动带入：PASS
- W05 成片位置 → W06 发布测试上游带入：PASS
- W11 可直接查看 SKU / 内容 / 达人 / 广告 / 履约上游经营快照：PASS
- P01–P05 当前状态与证据 → R01–R10 经营档案系统快照：PASS
- 工具工作区统一进入 AppState / Repository 持久化：PASS

## 全量静态 Gate

- 9 个经营阶段：PASS
- 28 门核心课：PASS
- 11 个工作坊：PASS
- 5 个陪跑案件：PASS
- 15 个核心工具：PASS
- 39 个课程/工作坊场景：PASS
- 17 个高保真课程工作台绑定：PASS
- 工作坊 transition 引用：PASS
- 陪跑 transition 引用：PASS
- 44 个 TS/TSX 文件离线语法转译：PASS
- 相对 import 解析：PASS
- 运行源码旧 2.2–2.7 版本残留：0

## 本地构建边界

当前执行容器访问 `registry.npmjs.org` 时返回 `EAI_AGAIN`，因此无法下载 pnpm / npm 依赖。本地 `pnpm install → tsc -b → vite build → Playwright` 未物理执行，不标记为通过。

仓库已加入 GitHub Actions：Node 22 + pnpm 10，在 GitHub 网络环境执行静态契约、单元测试和 production build。CI 结果以 GitHub 实际运行状态为准。
