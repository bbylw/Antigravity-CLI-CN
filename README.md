# Antigravity CLI 中文指南

这是一个基于 [`google-antigravity/antigravity-cli` 官方 README](https://github.com/google-antigravity/antigravity-cli/blob/main/README.md) 重构的中文静态网站。项目不再定位为泛化“终极教程”，而是聚焦官方 README 中实际公开的信息：产品定位、CLI 与 Antigravity 2.0 的差异、生态集成、安装方式、认证流程，以及安全与隐私提示。

## 重构重点

- **内容对齐官方 README**：所有核心段落、表格、安装命令和安全提示均按官方 README 重新组织为中文页面。
- **页面结构重做**：使用单页落地页结构，包括 Hero、官方资源入口、能力概览、对比表、集成、安装、认证、安全与隐私等区块。
- **视觉系统更新**：改为深色玻璃拟态界面，突出终端产品属性，并保留移动端响应式导航。
- **脚本精简**：删除旧版重复初始化、无对应 DOM 的 FAQ/粒子逻辑和调试输出，仅保留导航、复制命令、当前章节高亮。
- **文档同步**：`antigravity.md` 提供与页面一致的中文 Markdown 摘要，便于独立阅读和维护。

## 项目结构

```text
.
├── index.html       # 中文静态页面
├── styles.css       # 页面样式
├── script.js        # 轻量交互脚本
├── antigravity.md   # 官方 README 中文摘要
├── CNAME            # GitHub Pages 自定义域名配置
└── README.md        # 项目说明
```

## 本地预览

项目是纯静态站点，可直接打开 `index.html`，也可以启动本地 HTTP 服务：

```bash
python3 -m http.server 8000
```

然后访问：

```text
http://localhost:8000
```

## 部署

将仓库根目录发布到 GitHub Pages、Cloudflare Pages、Netlify 或任意静态托管服务即可。

## 官方资源

- 官方文档：<https://antigravity.google/docs/cli-overview>
- 官方网站：<https://antigravity.google/product/antigravity-cli>
- 官方 GitHub：<https://github.com/google-antigravity/antigravity-cli>

## 许可证

本项目沿用仓库现有许可证。
