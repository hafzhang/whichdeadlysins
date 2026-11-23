PowerShell运行

`# 换端口（4321 被占用时）
npm run dev -- --port 4000

# 手机/局域网访问（同 WiFi 下用电脑 IP 打开）
npm run dev -- --host

# 预览生产构建产物（更接近线上，能验证 dist 里的 canonical/sitemap）
npx astro build
npm run preview`