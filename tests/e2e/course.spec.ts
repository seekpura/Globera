import { expect, test } from '@playwright/test'

const benchmarkRoutes = [
  ['M01-L02', '/#/course/t01/m01/l02', '先理解“商品怎样被发现”'],
  ['M02-L01', '/#/course/t01/m02/l01', '市场不是排名题'],
  ['M06-L01', '/#/course/t01/m06/l01', '商品机会不是雷达总分'],
  ['M09-L01', '/#/course/t01/m09/l01', '拖动时间'],
  ['M11-L02', '/#/course/t01/m11/l02', 'Tracking 不是一个单号'],
  ['M12-L04', '/#/course/t01/m12/l04', '问题很多'],
] as const

test('course home exposes the 12-world learning journey', async ({ page }) => {
  await page.goto('/#/course/t01')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('数字经营课程')
  await expect(page.locator('.module-world-card')).toHaveCount(12)
})

test('all 48 lesson deep links render a teaching scene', async ({ page }) => {
  const pageErrors: string[] = []
  page.on('pageerror', (error) => pageErrors.push(String(error)))

  for (let module = 1; module <= 12; module += 1) {
    for (let lesson = 1; lesson <= 4; lesson += 1) {
      const m = String(module).padStart(2, '0')
      const l = String(lesson).padStart(2, '0')
      await page.goto('/#/course/t01/m' + m + '/l' + l)
      await expect(page.locator('main h1').first()).toBeVisible()
      await expect(page.locator('.context-title')).toBeVisible()
    }
  }

  expect(pageErrors).toEqual([])
})

for (const [code, route, heading] of benchmarkRoutes) {
  test(code + ' benchmark renders its core teaching statement', async ({ page }) => {
    await page.goto(route)
    await expect(page.locator('main h1').first()).toContainText(heading)
  })
}

test('Platform Universe focuses a discovery mechanism without scoring platforms', async ({ page }) => {
  await page.goto('/#/course/t01/m01/l02')
  await page.getByRole('button', { name: 'Content｜内容发现' }).click()
  await expect(page.getByText('Mechanism Focus｜当前机制')).toBeVisible()
  await expect(page.getByText(/内容发现｜Content Discovery/)).toBeVisible()
  await expect(page.getByText(/不表示该平台对当前商品更优/)).toBeVisible()
})

test('Market Explorer reaches evidence depth through semantic zoom', async ({ page }) => {
  await page.goto('/#/course/t01/m02/l01')
  await page.getByRole('button', { name: 'L4 Evidence｜证据' }).click()
  await expect(page.getByText('Evidence Drill｜证据钻取')).toBeVisible()
  await expect(page.getByText('Research Sequence｜研究顺序')).toBeVisible()
})

test('Product Opportunity keeps hard gates separate from commercial evidence', async ({ page }) => {
  await page.goto('/#/course/t01/m06/l01')
  await page.getByRole('button', { name: 'L3 Gate & Economics｜闸门与经济' }).click()
  await expect(page.getByText('Hard Gates｜硬风险闸门')).toBeVisible()
  await expect(page.getByText(/任何 STOP 都独立阻断推进/)).toBeVisible()
})

test('Video Analyzer can remove and restore the proof track', async ({ page }) => {
  await page.goto('/#/course/t01/m09/l01')
  await page.getByRole('button', { name: 'Remove Proof｜移除证明' }).click()
  await expect(page.getByRole('button', { name: 'Restore Proof｜恢复证明' })).toBeVisible()
  await expect(page.getByText('REMOVED｜已移除')).toBeVisible()
})

test('Logistics Journey propagates customs delay through ETA and service', async ({ page }) => {
  await page.goto('/#/course/t01/m11/l02')
  await page.getByRole('button', { name: 'Customs Delay｜清关延误' }).click()
  await expect(page.getByText(/清关延误：ETA延长/)).toBeVisible()
  await expect(page.getByText('Customer Promise｜客户承诺')).toBeVisible()
})

test('Decision Room requires evidence before selecting Top 3', async ({ page }) => {
  await page.goto('/#/course/t01/m12/l04')
  const issue = page.getByRole('button', { name: /退款率上升/ })
  await expect(issue).toBeDisabled()
  await page.getByRole('button', { name: 'Inject Evidence｜注入经营证据' }).click()
  await expect(issue).toBeEnabled()
  await issue.click()
  await expect(page.getByText(/1\/3 · Top Priorities/)).toBeVisible()
})

test('Presenter Step advances with keyboard controls', async ({ page }) => {
  await page.goto('/#/course/t01/m01/l02')
  await page.getByRole('button', { name: '讲师模式' }).click()
  await expect(page.locator('.presenter-controller')).toBeVisible()
  await expect(page.getByText(/1\/5 · Scene｜场景/)).toBeVisible()
  await page.keyboard.press('ArrowRight')
  await expect(page.getByText(/2\/5 · Observe｜观察/)).toBeVisible()
})
