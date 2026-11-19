whichdeadlysins.com

| 页面 | 目标词（全球/美国月搜） | 内容要点 | 完成标准 | 阶段 |
|---|---|---|---|---|
| / 首页（20 题测验） | seven deadly sins test 3600/1000；quiz 2900/1300 | 3 段导语 + 20 题（7 维各 3 题）+ 七项百分比结果 + 800 词正文（七原罪各一句、计分说明、10 条 FAQ） | 服务端渲染、关 JS 见正文、手机 15 秒出结果、1200×630 分享卡 | 第一版 |
| /seven-deadly-sins/ 内容枢纽 | what are the seven deadly sins 135000/60500；seven deadly sins meaning 8100/3600 | 七节（定义、出处、现代例子、常见误解）+ 速查表 + meaning 段 + FAQ + 回链测验 | 2000 词以上、七节齐、canonical 自指、与首页双向内链 | 第一版 |
| /seven-deadly-sins-and-virtues/ | seven deadly sins and virtues 3600/1900（出价顶到 $20） | 七对七对照表 + 每对偶一段说明 + 回链枢纽页 | 表格 7 行、能直接回答哪个罪对应哪个德 | 第一版 |
| /result/{pride\|lust\|gluttony\|greed\|sloth\|wrath\|envy}/ ×7 | which deadly sin am i 140；各罪长尾 | 单罪深度解读 + 该罪的测验入口 + 其他六罪互链 | GSC 显示测验词落错页再决定是否开；七页一次性上或都不上 | 二期（有条件） |
| About / Privacy / Terms | 无 | 作者与方法说明、娱乐性质声明、不构成心理诊断、隐私（不存答题数据） | 三页各自可访问、About 有真实作者署名 | 第一版 |




| 功能 | 实现方式 | 要不要后端 |
|---|---|---|
| 首页 20 题 + 800 词正文 | 构建时直接输出成 HTML（SSG 预渲染） | 不要 |
| 判分：七个维度各 3 题算百分比 | 浏览器 JS 计算，纯前端 | 不要 |
| 7 个结果页 /result/{sin}/ | 静态生成 7 个 HTML，内容写进源码 | 不要 |
| 分享卡（每个原罪一张 1200×630） | 构建时预生成图片 | 不要 |
| 个性化分享图（显示你的百分比） | Cloudflare Worker / Vercel 边缘函数 + satori | 边缘函数，不是服务器 |
| 答题数据存储 | 不存（Privacy 已声明不保存答题数据） | 不要 |
| 访问统计 | GA4 或 Cloudflare Web Analytics | 不要 |
| 账号 / 排行榜 / 付费墙 / 跨用户对比 | 需要数据库与后端 | 需要 |