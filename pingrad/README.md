# PIN Grad – The PIN Graduate Network

基于 Docusaurus (TypeScript) 的 PIN 项目文档站，默认中文，包含梯度侧边栏导航、DataPoints 入口、申请跟踪入口、本地搜索与 GitHub 编辑入口。

## 技术栈

- Docusaurus classic (TypeScript)
- Node.js >= 18（推荐 20）
- i18n: `zh-Hans` (default)
- Local search: `@easyops-cn/docusaurus-search-local`

## 本地启动

```bash
cd pingrad
npm install
npm run start
```

默认地址：`http://localhost:3000`

## Submit DP Form

- 页面地址：`/submit-dp`
- 提交接口：`POST https://api.pingrad.app/submit-dp`
- 该页面只会调用 Worker API，不会在前端存储任何 Teable token。

Turnstile site key 通过 `docusaurus.config.ts` 的 `customFields.turnstileSiteKey` 提供。你可以使用环境变量或直接替换占位值：

```ts
// TODO: set TURNSTILE_SITE_KEY
const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY ?? 'YOUR_TURNSTILE_SITE_KEY';
```

Worker 对 CORS 的 `Origin` 有校验，生产环境请确保站点域名是：

- `https://pingrad.app`
- `https://www.pingrad.app`

## 目录结构（核心）

```text
pingrad/
  docusaurus.config.ts
  sidebars.ts
  src/
    css/custom.css
    pages/index.tsx
  docs/
  .github/workflows/deploy.yml
```

## GitHub Edit this page

已在 `docusaurus.config.ts` 中配置：

- `editUrl`: `https://github.com/yangbos1107/PINGrad/edit/main/pingrad/`

当前默认仓库地址已指向官方仓库 `yangbos1107/PINGrad`。

## GitHub Pages 部署

1. 推送本仓库到 GitHub（默认分支 `main`）。
2. 在仓库 `Settings -> Pages` 中将 Source 设为 `GitHub Actions`。
3. 修改 `docusaurus.config.ts` 中以下字段：
   - `organizationName`
   - `url`（例如 `https://yourname.github.io`）
4. 推送到 `main` 后，`.github/workflows/deploy.yml` 会自动构建并发布。

## 可选：Vercel 部署

1. 在 Vercel 导入仓库。
2. Build Command: `npm run build`
3. Output Directory: `build`
4. 安装命令保持 `npm install`。

## 常用命令

```bash
npm run build
npm run serve
npm run write-translations
```
