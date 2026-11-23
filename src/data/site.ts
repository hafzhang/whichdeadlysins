export const SITE = {
  url: 'https://www.whichdeadlysins.com',
  name: 'Which Deadly Sin Are You?',
  shortName: 'Deadly Sin Quiz',
  // TODO: 上线前替换为真实作者署名（product.md 要求 About 页有真实作者）
  author: {
    name: 'Your Name',
    bio: 'Writer and editor focused on cultural history and practical ethics.',
  },
  contactEmail: 'hello@whichdeadlysins.com',
  quizLength: 15,
  ogSize: { width: 1200, height: 630 },
} as const;

export const NAV_LINKS = [
  { name: 'Sins Quiz', path: '/' },
  { name: 'Virtues Quiz', path: '/seven-virtues-quiz/' },
  { name: 'Seven Deadly Sins', path: '/seven-deadly-sins/' },
  { name: 'Sins List', path: '/seven-deadly-sins-list/' },
  { name: 'Seven Virtues', path: '/seven-heavenly-virtues/' },
  { name: 'Sins & Virtues', path: '/seven-deadly-sins-and-virtues/' },
  { name: 'About', path: '/about/' },
] as const;
