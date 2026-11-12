const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {createRequire} = require('node:module');

// Reuse the HTML parser supplied by the pinned local-search plugin.
const searchRequire = createRequire(require.resolve('@easyops-cn/docusaurus-search-local'));
const {load} = searchRequire('cheerio');
const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const page = (route) => load(read(`build/${route.replace(/^\//, '')}/index.html`));
const normalizeText = (value) => value.replace(/\s+/g, ' ').trim();
const regions = ['us', 'uk', 'hk', 'sg', 'au', 'cn'];
const files = fs.readdirSync(path.join(root, 'docs/regions'), {recursive: true});
const programs = files.filter((file) => file.endsWith('.mdx') && path.basename(file) !== 'index.mdx')
  .map((file) => ({
    file,
    region: file.split(path.sep)[0],
    route: `/docs${read(`docs/regions/${file}`).match(/^slug:\s*(.+)$/m)[1].trim()}`
  }));

test('English interface uses English chrome and keeps navigation in /en/', () => {
  const home = page('/en');
  assert.equal(home('html').attr('lang'), 'en');
  assert.match(home('main').text(), /Find schools and programs/);
  assert.doesNotMatch(home('main').text(), /[\u3400-\u9fff]/);
  assert.match(home('.navbar').text(), /Admission Results/);
  assert.match(home('.footer').text(), /Contributing/);
  assert.equal(home('.pin-locale-button').text(), 'English');
  assert.ok(home('.pin-locale-button svg').length > 0);
  assert.equal(home('.pin-locale-button').attr('aria-label'), 'Change language');
  for (const element of home('a[href^="/"]:not([lang])').toArray()) {
    assert.ok(home(element).attr('href').startsWith('/en/'), home(element).attr('href'));
  }
  const chinese = page('/');
  assert.equal(chinese('html').attr('lang'), 'zh-CN');
  assert.equal(chinese('.pin-locale-button').text(), '简体中文');
  assert.match(chinese('.navbar').text(), /录取情况/);
  assert.doesNotMatch(chinese('.navbar, .footer, main').text(), /录取案例/);
});

test('Both locales list every project exactly once and retain the same article text', () => {
  for (const prefix of ['', '/en']) {
    for (const region of regions) {
      const directory = page(`${prefix}/docs/${region}`);
      const actual = directory('.pin-program-links a').toArray().map((a) => directory(a).attr('href')).sort();
      const expected = programs.filter((program) => program.region === region).map((program) => `${prefix}${program.route}`).sort();
      assert.deepEqual(actual, expected, `${prefix}/docs/${region}`);
      assert.equal(directory('h1').length, 1);
      if (prefix) assert.doesNotMatch(directory('h1').text(), /[\u3400-\u9fff]/);
    }
  }
  for (const program of programs) {
    const zh = page(program.route);
    const en = page(`/en${program.route}`);
    assert.equal(normalizeText(en('.theme-doc-markdown').text()), normalizeText(zh('.theme-doc-markdown').text()), program.route);
    assert.equal(en('.theme-doc-markdown').closest('[lang]').attr('lang'), 'zh-CN');
    const edit = en('a.theme-edit-this-page').attr('href');
    assert.ok(edit?.includes('/pingrad/docs/regions/'), edit);
    assert.ok(!edit.includes('/i18n/'), edit);
  }
});

test('About is a standalone page with shared original content and compatible old links', () => {
  const zh = page('/intro');
  const en = page('/en/intro');
  assert.equal(normalizeText(zh('article').text()), normalizeText(en('article').text()));
  for (const prefix of ['', '/en']) {
    const about = page(`${prefix}/intro`);
    assert.equal(about('h1').length, 1);
    assert.equal(about('aside, .theme-doc-sidebar-container, .table-of-contents').length, 0);
    assert.equal(about('article').attr('lang'), 'zh-CN');
    assert.equal(about('[id="如何贡献"]').length, 1);
    assert.ok(about(`a[href="${prefix}/submit-dp"]`).length > 0);
    const legacy = page(`${prefix}/docs/intro`);
    assert.equal(legacy('meta[name="robots"]').attr('content'), 'noindex');
    assert.ok(legacy(`a[href="${prefix}/intro"]`).length > 0);
  }
});

test('Renamed result pages and translated forms preserve submitted option values', () => {
  assert.equal(page('/datapoints')('h1').text(), '录取情况');
  assert.equal(page('/en/datapoints')('h1').text(), 'Admission Results');
  const zh = page('/submit-dp');
  const en = page('/en/submit-dp');
  const values = ($) => $('select').toArray().map((select) => $(select).find('option').toArray().map((option) => $(option).attr('value')));
  assert.deepEqual(values(zh), values(en));
  assert.deepEqual(values(en)[4], ['', 'MS', 'MEng', 'PhD', 'Other']);
  assert.deepEqual(values(en)[6], ['', 'Offer', 'Reject', 'Waitlist', 'Other']);
  assert.match(en('form').text(), /Applicant/);
  assert.doesNotMatch(en('form').text(), /[\u3400-\u9fff]/);
  assert.equal(en('button[type="submit"]').attr('disabled'), 'disabled');
});

test('Search indexes preserve the selected locale and exclude compatibility pages', () => {
  for (const prefix of ['', '/en']) {
    const groups = JSON.parse(read(`build${prefix}/search-index.json`));
    const documents = groups.flatMap((group) => group.documents);
    const urls = new Set(documents.map((document) => document.u));
    for (const program of programs) assert.ok(urls.has(`${prefix}${program.route}`), program.route);
    assert.ok(urls.has(`${prefix}/intro`));
    assert.ok(!urls.has(`${prefix}/docs/intro`));
    assert.ok(!urls.has(`${prefix}/tracker`));
    assert.ok(!urls.has(`${prefix}/docs/tracker`));
    if (prefix) for (const url of urls) assert.ok(url.startsWith('/en/'), url);
    assert.ok(documents.some((document) => /项目基本情况/.test(document.t)), 'Original Chinese content remains searchable');
  }
});

test('Generated HTML and search anchors contain no corrupt Unicode characters', () => {
  const htmlFiles = fs.readdirSync(path.join(root, 'build'), {recursive: true}).filter((file) => file.endsWith('.html'));
  for (const file of htmlFiles) assert.doesNotMatch(read(`build/${file}`), /[\0\ufffd]/, file);
  for (const prefix of ['', '/en']) {
    const documents = JSON.parse(read(`build${prefix}/search-index.json`)).flatMap((group) => group.documents);
    const anchorsByPage = new Map();
    for (const document of documents.filter((entry) => entry.h)) {
      if (!anchorsByPage.has(document.u)) {
        const $ = page(document.u);
        anchorsByPage.set(document.u, new Set($('[id]').toArray().map((element) => $(element).attr('id'))));
      }
      const anchor = decodeURIComponent(document.h.slice(1));
      assert.ok(anchorsByPage.get(document.u).has(anchor), `${document.u}${document.h}`);
    }
  }
});
