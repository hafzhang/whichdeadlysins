// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// 各页真实更新日期，供 sitemap 输出 <lastmod>；未列出的路径不加
const LASTMOD = {
  '/': '2026-11-19',
  '/seven-deadly-sins/': '2026-11-23',
  '/seven-deadly-sins/list/': '2026-11-23',
  '/seven-heavenly-virtues/': '2026-11-23',
  '/seven-deadly-sins-and-virtues/': '2026-11-23',
  '/seven-virtues-quiz/': '2026-11-19',
  '/seven-deadly-sins/pride/': '2026-11-23',
  '/seven-deadly-sins/envy/': '2026-11-23',
  '/seven-deadly-sins/wrath/': '2026-11-23',
  '/seven-deadly-sins/sloth/': '2026-11-23',
  '/seven-deadly-sins/greed/': '2026-11-23',
  '/seven-deadly-sins/gluttony/': '2026-11-23',
  '/seven-deadly-sins/lust/': '2026-11-23',
  '/about/': '2026-11-19',
  '/privacy/': '2026-11-19',
  '/terms/': '2026-11-19',
};

// 全站 SSG：构建期输出纯静态 HTML，Vercel 自动识别 Astro 项目并托管静态产物
export default defineConfig({
  // 首选域为 www：sitemap、页面内绝对 URL 均以此为准，裸域由 vercel.json 301 到 www
  site: 'https://www.whichdeadlysins.com',
  output: 'static',
  build: {
    // 统一尾斜杠目录形式：/seven-deadly-sins/ -> /seven-deadly-sins/index.html
    format: 'directory',
  },
  integrations: [
    preact({ compat: true }),
    sitemap({
      // 给每页写入真实 <lastmod>，便于 Google 判断哪一页发生了更新
      serialize(item) {
        const date = LASTMOD[new URL(item.url).pathname];
        if (date) item.lastmod = new Date(date).toISOString();
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
