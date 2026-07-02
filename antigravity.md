# Antigravity CLI 中文摘要

Antigravity CLI 可以理解你的代码库，在获得许可后进行编辑，并直接从终端执行命令。

- **官方文档**：<https://antigravity.google/docs/cli-overview>
- **官方网站**：<https://antigravity.google/product/antigravity-cli>
- **官方 GitHub**：<https://github.com/google-antigravity/antigravity-cli>

---

## 产品定位

Antigravity CLI 将 Antigravity 2.0 的核心能力带到终端，包括多步骤推理、多文件编辑、工具调用和持久历史。它针对键盘驱动工作流、远程 SSH 会话和低资源开销进行了优化。

---

## 特性概览

| 维度 | Antigravity CLI | Antigravity 2.0 |
| :--- | :--- | :--- |
| 主要关注点 | 速度、键盘效率、低开销 | 全面性、可视化编排、项目管理 |
| 界面 | 终端用户界面（TUI） | 完整富 GUI 应用 |
| 工作流 | SSH/远程会话、键盘优先 | 本地工作区、重度编排 |
| 代理引擎 | 共享核心代理引擎 | 共享核心代理引擎 |

---

## 集成

- **共享代理引擎**：CLI 与 GUI 运行在同一个核心代理引擎上，改进会自动应用到两端。
- **共享设置**：偏好设置和权限可以双向同步。
- **会话导出**：可将终端会话导出到 Antigravity 2.0 GUI 中继续工作。

---

## 安装

### macOS / Linux

```bash
curl -fsSL https://antigravity.google/cli/install.sh | bash
```

### Windows PowerShell

```powershell
irm https://antigravity.google/cli/install.ps1 | iex
```

### Windows CMD

```cmd
curl -fsSL https://antigravity.google/cli/install.cmd -o install.cmd && install.cmd && del install.cmd
```

---

## 认证

CLI 优先通过系统密钥环认证；如果没有活动会话，则回退到 Google Sign-In。

- **本地**：自动打开默认浏览器。
- **远程 / SSH**：检测 SSH 会话并打印授权 URL，便于在本地完成登录。
- **注销**：运行 `/logout` 清除保存的凭据。

> [!NOTE]
> 企业访问需要在引导流程中连接 GCP 项目。更多信息请参考企业页面。

---

## 服务条款与数据使用

> [!WARNING]
> AI 编码代理存在自主代码执行、数据泄露、提示词注入和供应链等安全风险。请监控并验证代理采取的所有操作。

使用 Antigravity CLI 即表示你同意根据 Google 服务条款和 Google 隐私政策，允许 Google 收集和使用交互数据以改进产品。你可以随时通过设置选择退出。

### 法律与隐私链接

- **服务条款**：<https://antigravity.google/terms>
- **隐私政策**：<https://policies.google.com/privacy>
