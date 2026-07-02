// Antigravity CLI 中文官网 - Playwright 验证脚本（编辑精密风重构后）
// 使用 chromium (Chrome) 进行桌面 + 移动端截图与控制台错误检查
const { chromium } = require('playwright');
const fs = require('fs');

const URL = 'http://localhost:4321/index.html';
const OUT = 'screenshots';

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile',  width: 390,  height: 844 },
];

(async () => {
  // 清理旧截图
  if (fs.existsSync(OUT)) fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  const browser = await chromium.launch();
  let failures = 0;

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    const consoleErrors = [];
    const pageErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => pageErrors.push(err.message));

    await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });

    // 等待 hero 终端窗口与特性列表渲染
    await page.waitForSelector('.term', { timeout: 10000 });
    await page.waitForSelector('#feature-list .feat-row', { timeout: 10000 });
    await page.waitForTimeout(1200);

    // Hero 截图
    await page.screenshot({ path: `${OUT}/${vp.name}-hero.png` });

    // 滚动到核心特性
    await page.evaluate(() => document.getElementById('features')?.scrollIntoView({ behavior: 'instant', block: 'start' }));
    await page.waitForTimeout(700);
    await page.screenshot({ path: `${OUT}/${vp.name}-features.png` });

    // 滚动到平台对比
    await page.evaluate(() => document.getElementById('compare')?.scrollIntoView({ behavior: 'instant', block: 'start' }));
    await page.waitForTimeout(700);
    await page.screenshot({ path: `${OUT}/${vp.name}-compare.png` });

    // 滚动到安装
    await page.evaluate(() => document.getElementById('install')?.scrollIntoView({ behavior: 'instant', block: 'start' }));
    await page.waitForTimeout(700);
    await page.screenshot({ path: `${OUT}/${vp.name}-install.png` });

    // 全页截图
    await page.screenshot({ path: `${OUT}/${vp.name}-full.png`, fullPage: true });

    // 验证关键元素存在
    const checks = await page.evaluate(() => ({
      heroTitle: !!document.querySelector('h1.display'),
      featureRows: document.querySelectorAll('#feature-list .feat-row').length,
      compareRows: document.querySelectorAll('#compare-rows .cmp-row').length,
      installBlocks: document.querySelectorAll('#install-grid > div').length,
      typedEl: document.getElementById('typed') !== null,
      copyBtns: document.querySelectorAll('.copy-btn').length,
      footer: document.querySelector('footer') !== null,
      topRule: document.getElementById('top-rule') !== null,
      // AI slop 禁止项检查：不应存在粒子 canvas / glitch / 渐变文字
      noParticles: document.getElementById('particles') === null,
      noGlitch: document.querySelector('.glitch') === null,
      noGradText: document.querySelector('.grad-text') === null,
      noNeonGlow: document.querySelector('.glow-btn') === null,
    }));

    console.log(`\n[${vp.name}] viewport ${vp.width}x${vp.height}`);
    console.log('  关键元素:', JSON.stringify(checks));
    console.log(`  控制台错误: ${consoleErrors.length}`);
    consoleErrors.forEach((e) => console.log('    ✗', e));
    console.log(`  页面异常: ${pageErrors.length}`);
    pageErrors.forEach((e) => console.log('    ✗', e));

    const ok =
      checks.heroTitle && checks.featureRows === 6 && checks.compareRows === 5 &&
      checks.installBlocks === 3 && checks.copyBtns === 3 && checks.footer &&
      checks.topRule && checks.typedEl &&
      checks.noParticles && checks.noGlitch && checks.noGradText && checks.noNeonGlow &&
      consoleErrors.length === 0 && pageErrors.length === 0;

    if (ok) console.log('  ✓ 全部通过（含 AI slop 禁止项检查）');
    else { console.log('  ✗ 存在问题'); failures++; }

    await context.close();
  }

  await browser.close();
  console.log(`\n==== 结果: ${failures === 0 ? 'PASS ✓' : `FAIL ✗ (${failures} 项)`} ====`);
  process.exit(failures === 0 ? 0 : 1);
})().catch((err) => {
  console.error('脚本执行失败:', err);
  process.exit(1);
});
