# Antigravity CLI 终极教程网站

一个现代、美观的静态网站，展示 Antigravity CLI 的完整使用教程，从入门到精通。

## 特性

- 🎨 现代美观的UI设计
- 📱 完全响应式布局
- 🔍 内置搜索功能
- 📚 完整的教程内容
- 🚀 纯静态，易于部署
- ♿ 良好的可访问性

## 技术栈

- **HTML5** - 语义化结构
- **CSS3** - 现代样式和动画
- **Vanilla JavaScript** - 交互功能
- **Google Fonts** - 美观字体

## 项目结构

```
ge/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # 交互脚本
├── antigravity.md          # 原始教程文档
└── README.md          # 项目说明
```

## 本地运行

由于是纯静态网站，可以直接在浏览器中打开 `index.html` 文件，或者使用简单的HTTP服务器：

```bash
# 使用Python
python -m http.server 8000

# 使用Node.js
npx serve .

# 使用Live Server (VS Code扩展)
# 右键 index.html -> Open with Live Server
```

## 部署到GitHub Pages

### 方法一：通过GitHub网页操作

1. 创建新的GitHub仓库
2. 上传所有文件到仓库
3. 进入仓库设置 Settings
4. 滚动到 "Pages" 部分
5. 选择 Source 为 "Deploy from a branch"
6. 选择 branch 为 "main" 或 "master"
7. 选择 folder 为 "/ (root)"
8. 点击 Save

### 方法二：使用Git命令行

```bash
# 初始化仓库
git init
git add .
git commit -m "Initial commit: Antigravity CLI tutorial website"

# 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/yourusername/antigravity-cli-tutorial.git

# 推送到GitHub
git branch -M main
git push -u origin main

# 在GitHub仓库设置中启用Pages
```

### 方法三：使用GitHub Actions（推荐）

创建 `.github/workflows/deploy.yml` 文件：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

## 自定义配置

### 修改网站标题和描述

在 `index.html` 中修改：

```html
<title>你的网站标题</title>
<meta name="description" content="你的网站描述">
```

### 修改颜色主题

在 `styles.css` 的 `:root` 选择器中修改CSS变量：

```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    /* 其他颜色变量 */
}
```

### 添加Google Analytics

在 `</head>` 标签前添加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 浏览器支持

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 许可证

MIT License

## 贡献

欢迎提交 Issues 和 Pull Requests 来改进这个项目。

## 联系方式

如有问题，请通过以下方式联系：

- GitHub Issues: [项目Issues页面]
- Email: [你的邮箱]

---

Made with ❤️ for the Antigravity CLI community