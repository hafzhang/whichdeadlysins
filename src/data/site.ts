export const SITE = {
  url: 'https://www.whichdeadlysins.com',
  name: 'Which Deadly Sin Are You?',
  shortName: 'Deadly Sin Quiz',
  author: {
    name: 'the Which Deadly Sin editorial team',
    bio: 'a small editorial group focused on cultural history, practical ethics, and the pre-modern sources behind the seven deadly sins.',
  },
  contactEmail: 'hello@whichdeadlysins.com',
  quizLength: 15,
  ogSize: { width: 1200, height: 630 },
} as const;

/** 文章页结构化数据的作者：站点品牌 Organization（带 url），不使用个人占位署名 */
export const ARTICLE_AUTHOR = {
  '@type': 'Organization',
  name: SITE.name,
  url: SITE.url + '/',
} as const;

export const NAV_LINKS = [
  { name: 'Sins Quiz', path: '/' },
  { name: 'Virtues Quiz', path: '/seven-virtues-quiz/' },
  { name: 'Seven Deadly Sins', path: '/seven-deadly-sins/' },
  { name: 'Sins List', path: '/seven-deadly-sins/list/' },
  { name: 'Seven Virtues', path: '/seven-heavenly-virtues/' },
  { name: 'Sins & Virtues', path: '/seven-deadly-sins-and-virtues/' },
  { name: 'About', path: '/about/' },
] as const;
