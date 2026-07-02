# Antigravity CLI

Antigravity CLI 理解你的代码库，在获得你的授权后进行编辑，并执行命令 —— 全部在你的终端中完成。

- **官方文档**：[antigravity.google/docs/cli-overview](https://antigravity.google/docs/cli-overview)
- **官方网站**：[antigravity.google/product/antigravity-cli](https://antigravity.google/product/antigravity-cli)

![Antigravity CLI 演示](agy-cli-demo.gif)

---

Antigravity CLI 将 Antigravity 2.0 的核心能力（多步推理、多文件编辑、工具调用、持久化历史记录）直接带到你的终端。它针对键盘驱动的工作流和远程 SSH 会话进行了优化，资源开销极低。

---

## 功能一览

| 功能           | Antigravity CLI          | Antigravity 2.0              |
| :------------- | :----------------------- | :--------------------------- |
| **主要定位**   | 速度、键盘效率、低开销   | 全面性、可视化编排、项目管理 |
| **界面**       | 终端用户界面（TUI）      | 完整的富 GUI 应用            |
| **工作流**     | SSH / 远程会话、键盘优先 | 本地工作区、重度编排         |
| **智能体引擎** | 共享核心智能体引擎       | 共享核心智能体引擎           |

---

## 集成

- **共享智能体引擎**：两种界面运行在同一个核心智能体引擎之上，改进会自动同步到双方。
- **共享设置**：偏好和权限双向同步。
- **会话导出**：将终端会话导出到 Antigravity 2.0 GUI 以继续工作。

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

## 身份验证

CLI 通过系统钥匙串进行身份验证，如果没有活动会话，则回退到 Google 登录。

- **本地**：自动打开你的默认浏览器。
- **远程 / SSH**：检测 SSH 会话并打印授权 URL，以在本地完成登录。
- **退出登录**：运行 `/logout` 清除已保存的凭据。

> [!NOTE]
> 如需企业访问权限，请在入门流程中连接你的 GCP 项目。详见 Enterprise 页面。

---

## 服务条款与数据使用

> [!WARNING]
> AI 编程智能体已知存在某些安全风险，包括自主代码执行、数据外泄、提示注入和供应链风险。请务必监控并验证智能体执行的所有操作。

使用 Antigravity CLI 即表示你同意通过允许 Google 收集和使用你的交互数据来帮助改进产品，并遵守 [Google 服务条款](https://policies.google.com/terms)和 [Google 隐私政策](https://policies.google.com/privacy)。你可以随时在设置中选择退出。

### 法律与隐私链接

- **服务条款**：[antigravity.google/terms](https://antigravity.google/terms)
- **隐私政策**：[policies.google.com/privacy](https://policies.google.com/privacy)
