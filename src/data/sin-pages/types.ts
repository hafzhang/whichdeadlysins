/** 单罪页长文内容的数据结构（每个罪一份数据，路由模板共用一套版式） */
export interface SinFaq {
  q: string;
  a: string;
}

export interface SinMisconception {
  heading: string;
  text: string;
}

export interface SinPageContent {
  slug: string;
  name: string;
  latin: string;
  virtue: string;
  /** 页面 <title> 与 og:title */
  title: string;
  /** 页面 meta description 与 og:description */
  description: string;
  /** 开篇定义（2–3 段） */
  definition: string[];
  /** 拉丁名与历史出处（2 段） */
  origin: string[];
  /** 现代例子：引言段 + 条目列表 */
  modern: { intro: string; examples: string[] };
  /** 对立美德（2 段） */
  opposing: string[];
  /** 常见误解（3 条） */
  misconceptions: SinMisconception[];
  /** 页面 FAQ（4 条），同时输出 FAQPage 结构化数据 */
  faqs: SinFaq[];
}
