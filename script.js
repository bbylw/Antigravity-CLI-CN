/* ============================================================
   Antigravity CLI 中文官网 - 交互脚本
   编辑精密风（Editorial Precision）
   - 终端打字机（产品核心特性相关，保留）
   - 代码块一键复制
   - 滚动渐显（克制）
   - 顶部进度细线
   - 核心特性列表动态渲染（细线分隔，非等宽卡片）
   - 平台对比表动态渲染
   - 安装命令块动态渲染
   ============================================================ */

(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 集中管理链接（便于增删） ---------- */
  const LINKS = {
    docs: {
      overview: 'https://antigravity.google/docs/cli/overview',
      install: 'https://antigravity.google/docs/cli/install',
      gettingStarted: 'https://antigravity.google/docs/cli/getting-started',
      tutorial: 'https://antigravity.google/docs/cli/tutorial',
      prompting: 'https://antigravity.google/docs/cli/prompting',
      artifacts: 'https://antigravity.google/docs/cli/artifacts',
      credits: 'https://antigravity.google/docs/cli/credits',
      plugins: 'https://antigravity.google/docs/cli/plugins',
      bestPractices: 'https://antigravity.google/docs/cli/best-practices',
      migration: 'https://antigravity.google/docs/cli/gcli-migration',
    },
    product: 'https://antigravity.google/product/antigravity-cli',
    terms: 'https://antigravity.google/terms',
    privacy: 'https://policies.google.com/privacy',
    googleTerms: 'https://policies.google.com/terms',
  };

  /* ---------- 1. 核心特性数据 ---------- */
  const FEATURES = [
    {
      title: '自然语言交互',
      desc: '用自然语言编辑、编排与构建。告诉智能体你的需求，它就会着手完成。',
      icon: '<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke-linecap="round" stroke-linejoin="round"/>',
    },
    {
      title: '子智能体并行',
      desc: '多个智能体并行工作，大型任务处理更快。输入 /agents 打开面板监控状态，ctrl+k 即时审批工具。',
      icon: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 11-8 0 4 4 0 018 0zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke-linecap="round" stroke-linejoin="round"/>',
    },
    {
      title: '极致轻量',
      desc: '最小资源占用，专为速度设计。调用、监控与交互智能体的最轻量方式。',
      icon: '<path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" stroke-linecap="round" stroke-linejoin="round"/>',
    },
    {
      title: '高度可配置',
      desc: '通过 /config 调整权限、主题与偏好，输入 /keybindings 自定义每一个快捷键。',
      icon: '<circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 10v6M4.22 4.22l4.24 4.24m7.07 7.07l4.25 4.25M1 12h6m10 0h6M4.22 19.78l4.24-4.24m7.07-7.07l4.25-4.25" stroke-linecap="round"/>',
    },
    {
      title: '斜杠命令',
      desc: '通过斜杠命令即时访问插件、MCP、技能与钩子配置，快速增强你的工作流。',
      icon: '<path d="M4 7V4h16v3M9 20h6M12 4v16" stroke-linecap="round" stroke-linejoin="round"/>',
    },
    {
      title: '终端原生',
      desc: '为终端重度用户打造。完美适配 SSH、tmux 与终端多路复用器的远程工作流。',
      icon: '<path d="M4 17l6-6-6-6M12 19h8" stroke-linecap="round" stroke-linejoin="round"/>',
    },
  ];

  function renderFeatures() {
    const list = document.getElementById('feature-list');
    if (!list) return;
    list.innerHTML = FEATURES.map((f, i) => {
      const n = String(i + 1).padStart(2, '0');
      return `
      <div class="reveal feat-row grid grid-cols-12 gap-4 border-b border-line py-7 px-2 -mx-2" style="transition-delay:${i * 50}ms">
        <div class="col-span-2 sm:col-span-1">
          <div class="feat-num font-mono text-[12px] text-subtle transition-colors">${n}</div>
        </div>
        <div class="col-span-10 sm:col-span-3">
          <div class="flex items-center gap-2.5">
            <svg viewBox="0 0 24 24" class="h-4 w-4 text-accent shrink-0" fill="none" stroke="currentColor" stroke-width="1.6">${f.icon}</svg>
            <h3 class="display text-lg text-paper">${f.title}</h3>
          </div>
        </div>
        <div class="col-span-12 sm:col-span-7 sm:col-start-6">
          <p class="text-[14px] text-mid leading-[1.7] max-w-[58ch]">${f.desc}</p>
        </div>
        <div class="hidden sm:flex col-span-1 items-center justify-end">
          <svg class="feat-arrow h-4 w-4 text-subtle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
      </div>`;
    }).join('');
  }

  /* ---------- 2. 平台对比数据 ---------- */
  const COMPARE = [
    { dim: '主要界面',   cli: '键盘驱动 TUI',                v2: '可视化桌面编辑器 / IDE' },
    { dim: '性能开销',   cli: '近零，极轻量',                v2: '标准桌面 IDE 占用' },
    { dim: '工作流焦点', cli: '快速本地迭代、SSH、headless',  v2: '完整项目管理、可视化工作区' },
    { dim: '导航方式',   cli: '通用键盘快捷键',              v2: '鼠标 + 多面板布局' },
    { dim: '远程可用性', cli: '原生 SSH / tmux / 多路复用',  v2: '本地工作区 / 远程开发容器' },
  ];

  function renderCompare() {
    const rows = document.getElementById('compare-rows');
    if (!rows) return;
    rows.innerHTML = COMPARE.map((r, i) => `
      <div class="cmp-row reveal grid grid-cols-3 border-b border-line" style="transition-delay:${i * 40}ms">
        <div class="py-4 text-[12px] font-mono uppercase tracking-wider text-subtle">${r.dim}</div>
        <div class="py-4 text-[14px] text-paper">${r.cli}</div>
        <div class="py-4 text-[14px] text-mid">${r.v2}</div>
      </div>
    `).join('');
  }

  /* ---------- 3. 安装命令数据 ---------- */
  const INSTALLS = [
    { os: 'macOS / Linux',      badge: 'bash', cmd: 'curl -fsSL https://antigravity.google/cli/install.sh | bash' },
    { os: 'Windows PowerShell', badge: 'pwsh', cmd: 'irm https://antigravity.google/cli/install.ps1 | iex' },
    { os: 'Windows CMD',        badge: 'cmd',  cmd: 'curl -fsSL https://antigravity.google/cli/install.cmd -o install.cmd && install.cmd && del install.cmd' },
  ];

  function renderInstalls() {
    const grid = document.getElementById('install-grid');
    if (!grid) return;
    grid.innerHTML = INSTALLS.map((it, i) => `
      <div class="reveal bg-ink p-7 flex flex-col" style="transition-delay:${i * 60}ms">
        <div class="flex items-center justify-between">
          <span class="text-[13px] text-paper">${it.os}</span>
          <span class="font-mono text-[10px] px-1.5 py-0.5 rounded-sm border border-line2 text-subtle">${it.badge}</span>
        </div>
        <pre class="mt-5 font-mono text-[12px] text-mid break-all whitespace-pre-wrap leading-[1.7] flex-1"><span class="text-accent">$ </span><code data-cmd="${it.cmd.replace(/"/g, '&quot;')}">${escapeHtml(it.cmd)}</code></pre>
        <button class="copy-btn mt-5 inline-flex items-center justify-center gap-2 rounded-md border border-line2 bg-transparent px-3.5 py-2 text-[12px] text-mid hover:border-accent hover:text-accent transition">
          <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span class="copy-label">复制命令</span>
        </button>
      </div>
    `).join('');
  }

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ---------- 4. 复制到剪贴板 ---------- */
  function initCopy() {
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('.copy-btn');
      if (!btn) return;
      const block = btn.closest('.bg-ink');
      const codeEl = block && block.querySelector('code[data-cmd]');
      const text = codeEl ? codeEl.getAttribute('data-cmd') : '';
      const label = btn.querySelector('.copy-label');

      const done = () => {
        if (!label) return;
        const old = label.textContent;
        btn.classList.add('copied');
        label.textContent = '已复制';
        setTimeout(() => {
          btn.classList.remove('copied');
          label.textContent = old;
        }, 1600);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
      } else {
        fallbackCopy(text, done);
      }
    });
  }

  function fallbackCopy(text, done) {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      done && done();
    } catch (e) { /* noop */ }
  }

  /* ---------- 5. 滚动渐显 ---------- */
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
  }

  /* ---------- 6. 终端打字机 ---------- */
  function initTypewriter() {
    const el = document.getElementById('typed');
    if (!el) return;
    const phrases = [
      'agy "为 session.ts 补充边界测试"',
      'agy /agents status',
      'agy "把 README 翻译成中文"',
      'agy /skills install jest-runner',
    ];
    let pi = 0, ci = 0, deleting = false;

    function tick() {
      const cur = phrases[pi];
      if (!deleting) {
        ci++;
        el.textContent = cur.slice(0, ci);
        if (ci === cur.length) {
          deleting = true;
          setTimeout(tick, 2200);
          return;
        }
        setTimeout(tick, 55 + Math.random() * 60);
      } else {
        ci--;
        el.textContent = cur.slice(0, ci);
        if (ci === 0) {
          deleting = false;
          pi = (pi + 1) % phrases.length;
          setTimeout(tick, 380);
          return;
        }
        setTimeout(tick, 28);
      }
    }
    if (!reduceMotion) tick();
    else el.textContent = phrases[0];
  }

  /* ---------- 7. 顶部滚动进度细线 ---------- */
  function initScrollProgress() {
    const bar = document.getElementById('top-rule');
    if (!bar) return;
    let ticking = false;
    function update() {
      const h = document.documentElement;
      const scrollable = h.scrollHeight - h.clientHeight;
      const p = scrollable > 0 ? (h.scrollTop / scrollable) * 100 : 0;
      bar.style.setProperty('--p', p + '%');
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
  }

  /* ---------- 初始化 ---------- */
  function init() {
    renderFeatures();
    renderCompare();
    renderInstalls();
    initReveal();
    initCopy();
    initTypewriter();
    initScrollProgress();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
