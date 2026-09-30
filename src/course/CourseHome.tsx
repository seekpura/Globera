import { Link } from 'react-router-dom'
import { modules, moduleLessons } from '../lib/course'

const worldNames: Record<string, string> = {
  'commerce-network': '经营网络', 'market-atlas': '世界市场地图', 'seller-structure': '卖家结构', 'tiktok-ecosystem': 'TikTok 商业生态',
  'launch-readiness': '经营启动系统', 'product-opportunity': '商品机会空间', 'supply-economics': '供应与经济实验台', 'product-workbench': '商品数字工作台',
  'content-studio': '内容成交实验室', 'growth-network': '增长网络', 'order-journey': '全球订单旅程', 'decision-room': '经营决策室'
}

export function CourseHome() {
  return (
    <section className="course-home">
      <div className="home-hero">
        <div>
          <div className="eyebrow">T01 · TikTok 跨境电商 0–1</div>
          <h1>一门可以观察、比较、操作、试错与复盘的数字经营课程。</h1>
          <p>12 个模块 · 48 节正式课程 · 统一知识对象 · 交互实验 · 讲师演示控制。课程不是把教材搬进浏览器，而是把经营关系、因果与过程变成可见、可操作的教学空间。</p>
        </div>
        <div className="home-metrics">
          <article><strong>12</strong><span>经营世界</span></article>
          <article><strong>48</strong><span>正式课程</span></article>
          <article><strong>24</strong><span>核心工具</span></article>
          <article><strong>0</strong><span>业务后端</span></article>
        </div>
      </div>
      <div className="journey-map">
        {modules.map((module, index) => {
          const first = moduleLessons(module.id)[0]
          return (
            <Link className="module-world-card" to={`/course/t01/${module.id}/${first.lesson}`} key={module.id}>
              <span className="module-index">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <div className="module-world">{worldNames[module.world] ?? module.world}</div>
                <h2>{module.code}｜{module.titleZh}</h2>
                <p>{module.missionZh}</p>
              </div>
              <b>4 节 →</b>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
