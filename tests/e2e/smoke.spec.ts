import {test,expect} from '@playwright/test';
test('home, dedicated lesson lab and tool workspace',async({page})=>{
  await page.goto('/#/t01');
  await expect(page.getByText('把第一个 TikTok Shop 经营闭环跑出来。')).toBeVisible();
  await page.goto('/#/t01/course/t01-c06');
  await expect(page.getByText('TikTok商品六维适配实验台')).toBeVisible();
  await page.goto('/#/t01/course/t01-c22');
  await expect(page.getByText('归因实验台')).toBeVisible();
  await page.goto('/#/t01/tools/t01-k04');
  await expect(page.getByText('SKU利润快速核算工具')).toBeVisible();
  await expect(page.getByText('导出CSV')).toBeVisible();
});
test('workshop requires task evidence and quality gates',async({page})=>{
  await page.goto('/#/t01/workshop/t01-w07');
  await expect(page.getByText('MISSION WORKBENCH｜实操任务台')).toBeVisible();
  await expect(page.getByText('证据台账')).toBeVisible();
  await expect(page.getByText('质量闸门')).toBeVisible();
});
test('coaching opens real-world case center',async({page})=>{
  await page.goto('/#/t01/coaching/t01-p04');
  await expect(page.getByText('CASE CENTER｜真实经营案件中心')).toBeVisible();
  await expect(page.getByText('证据收件箱')).toBeVisible();
  await expect(page.getByText('案件时间线')).toBeVisible();
  await expect(page.getByText('暂停 / 阻断')).toBeVisible();
});
