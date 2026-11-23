import { pridePage } from './pride';
import { envyPage } from './envy';
import { wrathPage } from './wrath';
import { slothPage } from './sloth';
import { greedPage } from './greed';
import { gluttonyPage } from './gluttony';
import { lustPage } from './lust';
import type { SinPageContent } from './types';

export type { SinPageContent } from './types';

/** 七个单罪页的长文内容，顺序与 sins.json 一致 */
export const SIN_PAGES: SinPageContent[] = [
  pridePage,
  envyPage,
  wrathPage,
  slothPage,
  greedPage,
  gluttonyPage,
  lustPage,
];
