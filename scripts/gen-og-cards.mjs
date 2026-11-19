/**
 * 构建期预生成 OG 分享卡（1200×630 PNG）：
 *   public/og/default.png + public/og/{slug}.png ×7
 * 由 package.json 的 prebuild 钩子在 `astro build` 前自动执行。
 * 依赖：satori（SVG 排版）+ @resvg/resvg-js（光栅化）+ react（satori 元素工厂）
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createElement } from 'react';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'og');

const FONT_REGULAR =
  'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/lato/Lato-Regular.ttf';
const FONT_BOLD =
  'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/lato/Lato-Bold.ttf';

const h = (tag, style, ...children) =>
  createElement(tag, { style }, ...children.flat().filter(Boolean));

async function loadFont(url, weight) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `OG card font download failed (${res.status} ${res.statusText}): ${url}`,
    );
  }
  return { name: 'Lato', data: Buffer.from(await res.arrayBuffer()), weight, style: 'normal' };
}

function cardTemplate({ accent, headline, subline, footer }) {
  return h(
    'div',
    {
      width: '1200px',
      height: '630px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: '#14121f',
      padding: '72px 80px',
      color: '#f5f1ea',
      fontFamily: 'Lato',
    },
    h(
      'div',
      { display: 'flex', flexDirection: 'column' },
      h(
        'div',
        {
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          fontSize: 26,
          letterSpacing: 4,
          color: '#b9b0cc',
          fontWeight: 700,
          textTransform: 'uppercase',
        },
        h('div', {
          width: 18,
          height: 18,
          borderRadius: 9,
          backgroundColor: accent,
          display: 'flex',
        }),
        'whichdeadlysins.com',
      ),
      h(
        'div',
        { marginTop: 56, fontSize: 40, color: '#cfc7e0', fontWeight: 400 },
        'Which Deadly Sin Are You?',
      ),
      h('div', { marginTop: 10, fontSize: 84, fontWeight: 700, color: accent }, headline),
      subline
        ? h('div', { marginTop: 12, fontSize: 34, color: '#b9b0cc', fontStyle: 'italic' }, subline)
        : null,
    ),
    h(
      'div',
      {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '2px solid #2d2742',
        paddingTop: 28,
        fontSize: 28,
        color: '#9d94b5',
      },
      footer,
      'Free 15-question quiz',
    ),
  );
}

async function renderPng(node, fonts) {
  const svg = await satori(node, { width: 1200, height: 630, fonts });
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
  return resvg.render().asPng();
}

async function main() {
  const sins = JSON.parse(await readFile(join(root, 'src', 'data', 'sins.json'), 'utf8'));
  const fonts = await Promise.all([
    loadFont(FONT_REGULAR, 400),
    loadFont(FONT_BOLD, 700),
  ]);

  await mkdir(outDir, { recursive: true });

  const cards = [
    {
      file: 'default.png',
      accent: '#c9a227',
      headline: 'Take the Seven Deadly Sins Test',
      subline: '15 questions · seven percentage scores · instant results',
      footer: 'No account. No stored answers.',
    },
    {
      file: 'virtues.png',
      accent: '#6a994e',
      headline: 'Seven Heavenly Virtues Quiz',
      subline: 'Humility · Kindness · Patience · Diligence · Charity · Temperance · Chastity',
      footer: '15 questions · find your strongest virtue',
    },
    ...sins.map((sin) => ({
      file: `${sin.slug}.png`,
      accent: sin.color,
      headline: sin.name,
      subline: `${sin.latin} · opposed by ${sin.virtue}`,
      footer: sin.tagline,
    })),
  ];

  for (const card of cards) {
    const png = await renderPng(
      cardTemplate({
        accent: card.accent,
        headline: card.headline,
        subline: card.subline,
        footer: card.footer,
      }),
      fonts,
    );
    await writeFile(join(outDir, card.file), png);
    console.log(`[og] generated public/og/${card.file}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
