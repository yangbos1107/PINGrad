# PIN Grad – The PIN Graduate Network

基于 Docusaurus (TypeScript) 的 PIN 项目文档站，默认中文，支持中英切换，包含梯度侧边栏导航、DataPoints 结构、申请跟踪流程、本地搜索与 GitHub 编辑入口。

## 技术栈

- Docusaurus classic (TypeScript)
- Node.js >= 18（推荐 20）
- i18n: `zh-Hans` (default) + `en`
- Local search: `@easyops-cn/docusaurus-search-local`

## 本地启动

```bash
cd pingrad
npm install
npm run start
```

默认地址：`http://localhost:3000`

## 目录结构（核心）

```text
pingrad/
  docusaurus.config.ts
  sidebars.ts
  src/
    css/custom.css
    pages/index.tsx
  docs/
  i18n/en/docusaurus-plugin-content-docs/current/
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
