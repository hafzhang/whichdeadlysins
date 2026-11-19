import { OPTIONS } from './quiz';
import type { Dimension, QuizQuestion } from './quiz';

export interface VirtueMeta extends Dimension {
  /** 对应的七宗罪 slug，用于与罪德页锚点和罪测验结果互链 */
  pairedSin: string;
  summary: string;
}

/**
 * 七美德（七宗罪的对治德性）。颜色与所对治的罪保持一致，
 * 便于两个测验的结果图在视觉上形成对应关系。
 */
export const VIRTUES: VirtueMeta[] = [
  {
    slug: 'humility',
    name: 'Humility',
    latin: 'Humilitas',
    color: '#8e7cc3',
    pairedSin: 'pride',
    summary: 'An honest view of your own limits and a willingness to share credit.',
    description:
      'Your strongest virtue is Humility (Humilitas), the contrary of pride. Humility is not self-deprecation; it is an accurate view of yourself that leaves room for other people\u2019s contributions. You can admit mistakes, ask for help without shame, and celebrate wins without needing every eye on you. Because your self-worth does not depend on ranking above others, criticism becomes information rather than an attack.',
    href: '/seven-deadly-sins-and-virtues/#pride',
  },
  {
    slug: 'kindness',
    name: 'Kindness',
    latin: 'Benignitas',
    color: '#2e7d32',
    pairedSin: 'envy',
    summary: 'Willing good for others, including people whose advantages sting.',
    description:
      'Your strongest virtue is Kindness (Benignitas), the contrary of envy. You can feel genuine pleasure at another person\u2019s good fortune even when it highlights something you lack. Instead of comparing and resenting, you congratulate, encourage, and speak well of people behind their backs. Repeated often, this habit dissolves envy because the same person cannot remain a rival while being a beneficiary of your goodwill.',
    href: '/seven-deadly-sins-and-virtues/#envy',
  },
  {
    slug: 'patience',
    name: 'Patience',
    latin: 'Patientia',
    color: '#c62828',
    pairedSin: 'wrath',
    summary: 'The capacity to hold the space between a trigger and a response.',
    description:
      'Your strongest virtue is Patience (Patientia), the contrary of wrath. You have trained the gap between stimulus and response: delays, small mistakes, and minor insults rarely hijack your behavior. Patience does not mean suppressing anger or accepting injustice; it means deciding what to do while calm, so your actions remain proportionate and constructive instead of becoming another problem to repair.',
    href: '/seven-deadly-sins-and-virtues/#wrath',
  },
  {
    slug: 'diligence',
    name: 'Diligence',
    latin: 'Diligentia',
    color: '#7986cb',
    pairedSin: 'sloth',
    summary: 'Steady, modest effort applied before motivation arrives.',
    description:
      'Your strongest virtue is Diligence (Diligentia), the contrary of sloth. You start before you feel ready and trust small beginnings: a ten-minute session, one paragraph, a single email. Because you work steadily instead of waiting for deadline panic, obligations rarely become emergencies. Diligence coexists with genuine rest; what it refuses is the passive avoidance of duties you actually care about.',
    href: '/seven-deadly-sins-and-virtues/#sloth',
  },
  {
    slug: 'charity',
    name: 'Charity',
    latin: 'Caritas',
    color: '#b8860b',
    pairedSin: 'greed',
    summary: 'Deliberate release of money, time, credit, and information.',
    description:
      'Your strongest virtue is Charity (Caritas), the contrary of greed. You give on purpose and before you feel you can spare it: money, time, attention, useful knowledge, and public credit. Each act of unforced giving is evidence that enough exists, which loosens the hoarding instinct. In the older vocabulary this virtue is also called generosity of spirit, and it covers how you treat people who can never repay you.',
    href: '/seven-deadly-sins-and-virtues/#greed',
  },
  {
    slug: 'temperance',
    name: 'Temperance',
    latin: 'Temperantia',
    color: '#ef6c00',
    pairedSin: 'gluttony',
    summary: 'Deliberate consumption and the ability to stop at enough.',
    description:
      'Your strongest virtue is Temperance (Temperantia), the contrary of gluttony. You decide in advance how much is enough and notice the difference between genuine need and comfort-seeking, whether the appetite is food, alcohol, streaming, or the reflexive reach for a phone. Temperance is not abstinence; it is the freedom to choose an appetite instead of being commanded by it.',
    href: '/seven-deadly-sins-and-virtues/#gluttony',
  },
  {
    slug: 'chastity',
    name: 'Chastity',
    latin: 'Castitas',
    color: '#d81b60',
    pairedSin: 'lust',
    summary: 'Desire integrated with your commitments and respect for others.',
    description:
      'Your strongest virtue is Chastity (Castitas), the contrary of lust and the most misunderstood of the seven virtues. It does not mean the absence of attraction; it means desire is integrated with your commitments, boundaries, and respect for other people. You can feel intense longing without treating it as a command, which keeps romantic and physical choices consistent with the rest of your values.',
    href: '/seven-deadly-sins-and-virtues/#lust',
  },
];

/**
 * 七美德 15 题：humility 3 题，其余六维各 2 题。
 * 题目为正向表述，同意程度越高代表该美德越强，与罪测验共用 0–3 分选项与归一化判分。
 */
export const VIRTUE_QUESTIONS: QuizQuestion[] = [
  // Humility (3)
  {
    id: 'humility-1',
    dimension: 'humility',
    text: 'I can openly admit a mistake without turning the moment into a defense of my own competence.',
    options: OPTIONS,
  },
  {
    id: 'humility-2',
    dimension: 'humility',
    text: 'When something goes well, I make a point of naming the other people whose work made it possible.',
    options: OPTIONS,
  },
  {
    id: 'humility-3',
    dimension: 'humility',
    text: 'Asking for help when I am stuck feels normal to me rather than humiliating.',
    options: OPTIONS,
  },
  // Kindness (2)
  {
    id: 'kindness-1',
    dimension: 'kindness',
    text: 'When someone close to me succeeds, I feel genuine pleasure and tell them so, even if I wanted the same outcome for myself.',
    options: OPTIONS,
  },
  {
    id: 'kindness-2',
    dimension: 'kindness',
    text: 'I regularly say supportive or encouraging things to people even when I gain nothing from doing so.',
    options: OPTIONS,
  },
  // Patience (2)
  {
    id: 'patience-1',
    dimension: 'patience',
    text: 'When plans get delayed or people make small mistakes, I stay calm instead of snapping at them.',
    options: OPTIONS,
  },
  {
    id: 'patience-2',
    dimension: 'patience',
    text: 'When something makes me angry, I deliberately cool down before I respond.',
    options: OPTIONS,
  },
  // Diligence (2)
  {
    id: 'diligence-1',
    dimension: 'diligence',
    text: 'I start important tasks early and work on them steadily instead of waiting for a deadline crisis.',
    options: OPTIONS,
  },
  {
    id: 'diligence-2',
    dimension: 'diligence',
    text: 'I follow through on small commitments and promises even when nobody is checking on me.',
    options: OPTIONS,
  },
  // Charity (2)
  {
    id: 'charity-1',
    dimension: 'charity',
    text: 'I give money, time, or useful information away freely without calculating what I will get back.',
    options: OPTIONS,
  },
  {
    id: 'charity-2',
    dimension: 'charity',
    text: 'I actively look for ways to help people who are not in a position to repay me.',
    options: OPTIONS,
  },
  // Temperance (2)
  {
    id: 'temperance-1',
    dimension: 'temperance',
    text: 'I decide in advance how much is enough with food, drink, or screen time, and I usually stop there.',
    options: OPTIONS,
  },
  {
    id: 'temperance-2',
    dimension: 'temperance',
    text: 'When I am stressed, I reach for deliberate activities like exercise or conversation rather than comfort consumption.',
    options: OPTIONS,
  },
  // Chastity (2)
  {
    id: 'chastity-1',
    dimension: 'chastity',
    text: 'My romantic or physical choices stay consistent with the commitments and boundaries I have set.',
    options: OPTIONS,
  },
  {
    id: 'chastity-2',
    dimension: 'chastity',
    text: 'I can feel strong attraction without automatically acting on it.',
    options: OPTIONS,
  },
];
