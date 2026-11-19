import type sinsData from './sins.json';

export type SinSlug = (typeof sinsData)[number]['slug'];
export type SinMeta = (typeof sinsData)[number];

/** 测验维度的最小结构，七宗罪与七美德数据均满足该契约 */
export interface Dimension {
  slug: string;
  name: string;
  latin: string;
  color: string;
  description: string;
  /** 结果页"Read more"跳转地址（含锚点），由页面侧计算后传入，保证岛屿 props 可序列化 */
  href?: string;
}

export interface QuizOption {
  label: string;
  score: number;
}

export interface QuizQuestion {
  id: string;
  dimension: string;
  text: string;
  options: QuizOption[];
}

/**
 * 15 题分配：首个维度 3 题，其余六个维度各 2 题（3 + 6×2 = 15）。
 * 判分按"维度得分 / 维度满分"归一化为百分比，题量不等不会造成偏差。
 */
export const OPTIONS: QuizOption[] = [
  { label: 'Strongly disagree', score: 0 },
  { label: 'Disagree', score: 1 },
  { label: 'Agree', score: 2 },
  { label: 'Strongly agree', score: 3 },
];

export const QUESTIONS: QuizQuestion[] = [
  // Pride (3)
  {
    id: 'pride-1',
    dimension: 'pride',
    text: 'When someone criticizes my work in front of others, my first instinct is to defend my competence rather than consider the feedback.',
    options: OPTIONS,
  },
  {
    id: 'pride-2',
    dimension: 'pride',
    text: 'I find it genuinely difficult to say "I was wrong," even when the evidence is against me.',
    options: OPTIONS,
  },
  {
    id: 'pride-3',
    dimension: 'pride',
    text: 'I would rather struggle alone for a long time than ask for help, because asking feels like admitting weakness.',
    options: OPTIONS,
  },
  // Envy (2)
  {
    id: 'envy-1',
    dimension: 'envy',
    text: 'When a peer publicly celebrates an achievement, I sometimes feel resentful instead of genuinely happy for them.',
    options: OPTIONS,
  },
  {
    id: 'envy-2',
    dimension: 'envy',
    text: 'I often compare my career, relationships, or possessions to other people\u2019s and feel I am falling behind.',
    options: OPTIONS,
  },
  // Wrath (2)
  {
    id: 'wrath-1',
    dimension: 'wrath',
    text: 'Small frustrations, like slow traffic or a minor mistake by someone else, can ruin my mood for hours.',
    options: OPTIONS,
  },
  {
    id: 'wrath-2',
    dimension: 'wrath',
    text: 'When I feel wronged, I replay the incident in my head and imagine ways to get even.',
    options: OPTIONS,
  },
  // Sloth (2)
  {
    id: 'sloth-1',
    dimension: 'sloth',
    text: 'I regularly put off important duties until the last possible moment, even when I know the delay will hurt.',
    options: OPTIONS,
  },
  {
    id: 'sloth-2',
    dimension: 'sloth',
    text: 'Given a free afternoon, I usually choose passive scrolling or sleeping over something meaningful I have been meaning to do.',
    options: OPTIONS,
  },
  // Greed (2)
  {
    id: 'greed-1',
    dimension: 'greed',
    text: 'Accumulating more money or possessions feels more reassuring than spending on experiences or giving to others.',
    options: OPTIONS,
  },
  {
    id: 'greed-2',
    dimension: 'greed',
    text: 'I sometimes keep useful information, opportunities, or items to myself even when sharing would cost me nothing.',
    options: OPTIONS,
  },
  // Gluttony (2)
  {
    id: 'gluttony-1',
    dimension: 'gluttony',
    text: 'I often eat, drink, or consume entertainment past the point of satisfaction, simply because more is available.',
    options: OPTIONS,
  },
  {
    id: 'gluttony-2',
    dimension: 'gluttony',
    text: 'When I am stressed, my first coping move is to reach for comfort food, alcohol, or binge-watching.',
    options: OPTIONS,
  },
  // Lust (2)
  {
    id: 'lust-1',
    dimension: 'lust',
    text: 'I have pursued an attraction or intense pleasure even when I knew it could complicate my relationships or responsibilities.',
    options: OPTIONS,
  },
  {
    id: 'lust-2',
    dimension: 'lust',
    text: 'In the moment, physical or romantic excitement tends to override my longer-term judgment.',
    options: OPTIONS,
  },
];

export interface DimensionScore {
  slug: string;
  score: number;
  max: number;
  percent: number;
}

/**
 * 纯函数判分：answers 为与 questions 等长的选项分值数组（未答位置为 null）。
 * 题目集与维度集均由参数传入，七宗罪/七美德测验共用同一套计分逻辑。
 */
export function scoreAnswers<T extends Dimension>(
  answers: (number | null)[],
  dimensions: T[],
  questions: QuizQuestion[],
): { scores: DimensionScore[]; dominant: T } {
  const totals = new Map<string, { score: number; max: number }>();
  for (const dimension of dimensions) {
    totals.set(dimension.slug, { score: 0, max: 0 });
  }

  questions.forEach((question, index) => {
    const entry = totals.get(question.dimension);
    if (!entry) return;
    entry.max += 3;
    const value = answers[index];
    if (typeof value === 'number') entry.score += value;
  });

  const scores: DimensionScore[] = dimensions.map((dimension) => {
    const entry = totals.get(dimension.slug)!;
    const percent = entry.max === 0 ? 0 : Math.round((entry.score / entry.max) * 100);
    return { slug: dimension.slug, score: entry.score, max: entry.max, percent };
  });

  const top = scores.reduce((best, current) =>
    current.percent > best.percent ? current : best,
  );
  const dominant = dimensions.find((dimension) => dimension.slug === top.slug)!;
  return { scores, dominant };
}
