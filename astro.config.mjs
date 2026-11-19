// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// 全站 SSG：构建期输出纯静态 HTML，Vercel 自动识别 Astro 项目并托管静态产物
export default defineConfig({
  site: 'https://whichdeadlysins.com',
  output: 'static',
  build: {
    // 统一尾斜杠目录形式：/seven-deadly-sins/ -> /seven-deadly-sins/index.html
    format: 'directory',
  },
  integrations: [preact({ compat: true }), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
