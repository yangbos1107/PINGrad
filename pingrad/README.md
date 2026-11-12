# PIN Grad – The PIN Graduate Network

基于 Docusaurus (TypeScript) 的 PIN 项目文档站，提供中文、英文界面，包含按地区与校名组织的项目导航、录取情况、申请结果分享、本地搜索与 GitHub 编辑入口。正文保持原语言。

## 技术栈

- Docusaurus classic 3.10.2 (TypeScript)，React 18.3.1
- Node.js >= 20
- i18n: `zh-Hans` (default)、`en`；英文路径以 `/en/` 开头
- Local search: `@easyops-cn/docusaurus-search-local`
- 构建加速：`@docusaurus/faster`

## 本地启动

```bash
cd pingrad
npm ci
npm run start
```

默认地址：`http://localhost:3000`

开发模式一次启动一种语言；英文使用 `npm run start -- --locale en`。需要验证语言切换时，先完整构建，再启动静态预览：

```bash
npm run build
npm run serve -- --host 127.0.0.1 --no-open
```

中文首页 `/`，英文首页 `/en/`，关于页 `/intro` 和 `/en/intro`。桌面导航右侧依次为搜索框、GitHub、语言切换和主题按钮。语言入口显示图标、当前语言和下拉箭头；手机端位于菜单顶部。

## 界面翻译与原文

- UI 使用 Docusaurus `Translate` / `translate`。英文文案在 `i18n/en/code.json`，导航、页脚和地区侧栏在同目录下的原生插件 JSON 中。
- 中文是代码默认文案；`i18n/zh-Hans/code.json` 仅补充框架尚未翻译的提示。
- 学校文档继续共用 `docs/` 下的一份源文件；不要复制到 `i18n/en/docusaurus-plugin-content-docs/current/`。关于正文共用 `src/content/intro.mdx`。
- 语言切换使用 Docusaurus 原生 locale 路由和当前页面 URL 解析，保留查询参数与锚点。学校名、项目名、经验正文与用户填写的数据不翻译。
- 表单选项只翻译显示标签，提交字段名与枚举值保持不变；Turnstile 设置随界面语言切换。Teable 嵌入表格内部界面、后端返回的原始错误详情仍由外部服务控制。
- 更新文案后可执行 `npm run write-translations -- --locale en` 提取消息；检查新增项，并避免提交不需要覆盖的框架默认文案。

## 构建与回归检查

```bash
npx tsc --noEmit
npm run build
npm run test:site
```

产物测试覆盖双语链接、全部项目与正文一致性、独立关于页、表单选项协议、搜索索引和中文锚点；HTML 解析复用已安装搜索插件提供的 Cheerio，不新增测试框架。

Faster 启用 SWC、Rspack、LightningCSS、缓存和 Git 历史批量读取；暂不启用需要 v4 行为的 SSG worker threads。React 18 流式 SSR 存在插入 NUL 字符的上游缺陷，配置在 HTML 压缩前清理这些异常字符，回归测试会检查所有 HTML 及搜索锚点。以后升级 React 或 Docusaurus 时需复核这段兼容处理。

## Submit DP Form

- 页面地址：`/submit-dp`
- 提交接口：`POST https://api.pingrad.app/submit-dp`
- 该页面只会调用 Worker API，不会在前端存储任何 Teable token。

Turnstile site key 当前通过 `docusaurus.config.ts` 的 `customFields.turnstileSiteKey` 提供（仓库里是固定值）：

```ts
customFields: {
  turnstileSiteKey: '0x4AAAAAACg_m2RmfRjOjQBX'
}
```

如果你希望改成环境变量驱动，可将其改为：

```ts
customFields: {
  turnstileSiteKey: process.env.TURNSTILE_SITE_KEY ?? ''
}
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

## 项目导航维护

- 首页 `/` 提供地区索引和录取情况入口，`/intro` 为独立的项目介绍与贡献页。旧 `/docs/intro` 保留跳转。
- 学校文档继续在 `docs/regions/` 维护。目录和侧栏由文档元数据自动生成；`title` 为校名，`sidebar_label` 为可区分项目的名称，`slug` 为稳定链接。
- 地区内按校名排列，同校不同项目在地区页合并显示；不再按录取难度分级。旧目录中的 `zone-*` 仅用于保留文档路径及分享链接，不作为评级展示。
- 旧 Zone 总览链接跳转到对应地区；原申请跟踪的两个入口仅保留返回首页的兼容跳转，不进入搜索索引。
- 首页与导航验收见 `../docs/changes/2026-11-navigation.md`；版本升级、中英界面和关于页验收见 `../docs/changes/2026-11-interface-i18n.md`。
