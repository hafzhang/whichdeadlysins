import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import type { Dimension, QuizQuestion } from '../data/quiz';
import { scoreAnswers } from '../data/quiz';

interface QuizProps {
  questions: QuizQuestion[];
  /** 七维元数据（七宗罪或七美德），需包含结果解读与颜色 */
  dimensions: Dimension[];
  /** 结果文案中的名词：'sin' 或 'virtue' */
  resultNoun: 'sin' | 'virtue';
  /** 无障碍标题（sr-only），描述当前测验 */
  quizLabel: string;
  /** 分享卡片标题 */
  shareTitle: string;
  /** 分享文案中的名词短语，如 "deadly sin" 或 "heavenly virtue" */
  shareNoun: string;
  /** 分享链接路径，默认首页 */
  sharePath?: string;
}

/** 选中后停留时长：让用户看到勾选反馈再自动推进，兼顾触屏节奏与可访问性 */
const ADVANCE_DELAY_MS = 500;

export default function Quiz({
  questions,
  dimensions,
  resultNoun,
  quizLabel,
  shareTitle,
  shareNoun,
  sharePath = '/',
}: QuizProps) {
  const total = questions.length;
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => Array.from({ length: total }, () => null),
  );
  const [current, setCurrent] = useState(0);
  const [finished, setFinished] = useState(false);
  const [shareStatus, setShareStatus] = useState('');
  // 自动推进定时器：同一时刻只允许存在一个，防止快速连点导致连跳两题
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearAdvanceTimer() {
    if (advanceTimer.current !== null) {
      clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
  }

  // 组件卸载时清理定时器，避免在已销毁组件上触发状态更新
  useEffect(() => clearAdvanceTimer, []);

  const question = questions[current];
  const answeredCount = answers.filter((value) => value !== null).length;
  const progress = Math.round((answeredCount / total) * 100);

  const result = useMemo(
    () => (finished ? scoreAnswers(answers, dimensions, questions) : null),
    [finished, answers, dimensions, questions],
  );

  function selectOption(score: number) {
    // 先清旧定时器：同题改选时以最后一次选择为准，杜绝多个定时器累积连跳
    clearAdvanceTimer();
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = score;
      return next;
    });
    // 选中后短暂展示勾选状态，再走与手动按钮完全相同的推进逻辑；最后一题自动出结果
    advanceTimer.current = setTimeout(() => {
      advanceTimer.current = null;
      goNext();
    }, ADVANCE_DELAY_MS);
  }

  function goNext() {
    // 手动点击与自动推进共用同一入口：先清定时器，保证只推进一次
    clearAdvanceTimer();
    if (current < total - 1) setCurrent((index) => index + 1);
    else setFinished(true);
  }

  function goBack() {
    // 用户主动回退时取消尚未触发的自动推进
    clearAdvanceTimer();
    if (current > 0) setCurrent((index) => index - 1);
  }

  function restart() {
    clearAdvanceTimer();
    setAnswers(Array.from({ length: total }, () => null));
    setCurrent(0);
    setFinished(false);
    setShareStatus('');
  }

  async function shareResult() {
    if (!result) return;
    const shareData = {
      title: shareTitle,
      text: `My dominant ${shareNoun} is ${result.dominant.name} (${result.dominant.latin}). Take the free 15-question quiz:`,
      url: window.location.origin + sharePath,
    };
    try {
      if (typeof navigator.share === 'function') {
        await navigator.share(shareData);
        return;
      }
      await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      setShareStatus('Link copied to clipboard.');
    } catch {
      setShareStatus('Copy this link from the address bar to share your result.');
    }
  }

  if (finished && result) {
    return (
      <section class="bg-white rounded-2xl border border-[var(--color-line)] shadow-sm p-6 md:p-8" aria-labelledby="result-heading">
        <p class="text-sm uppercase tracking-wide text-[var(--color-muted)] m-0">Your result</p>
        <h2 id="result-heading" class="text-3xl md:text-4xl mt-1 mb-2">
          Your dominant {resultNoun} is{' '}
          <span style={{ color: result.dominant.color }}>{result.dominant.name}</span>
        </h2>
        <p class="text-sm text-[var(--color-muted)] italic m-0">{result.dominant.latin}</p>
        <p class="mt-4">{result.dominant.description}</p>

        <h3 class="text-xl mt-8 mb-3">Your seven dimensions</h3>
        <ul class="list-none p-0 m-0 flex flex-col gap-3">
          {result.scores.map((score) => {
            const dimension = dimensions.find((item) => item.slug === score.slug)!;
            const isTop = score.slug === result.dominant.slug;
            return (
              <li>
                <div class="flex justify-between items-baseline gap-3">
                  <span class={isTop ? 'font-bold' : ''}>
                    {dimension.name}
                    <span class="text-[var(--color-muted)] text-sm"> · {dimension.latin}</span>
                  </span>
                  <span class="font-semibold tabular-nums">{score.percent}%</span>
                </div>
                <div
                  class="h-3 rounded-full bg-[var(--color-line)] overflow-hidden mt-1"
                  role="progressbar"
                  aria-valuenow={score.percent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${dimension.name} score`}
                >
                  <div
                    class="h-full rounded-full transition-all duration-500"
                    style={{ width: `${score.percent}%`, backgroundColor: dimension.color }}
                  />
                </div>
              </li>
            );
          })}
        </ul>

        <div class="flex flex-wrap gap-3 mt-8">
          <button
            type="button"
            onClick={shareResult}
            class="rounded-full bg-[var(--color-ink)] text-white px-6 py-3 font-semibold hover:opacity-90 cursor-pointer"
          >
            Share my result
          </button>
          <button
            type="button"
            onClick={restart}
            class="rounded-full border-2 border-[var(--color-ink)] px-6 py-3 font-semibold hover:bg-[var(--color-ink)] hover:text-white cursor-pointer"
          >
            Retake the quiz
          </button>
          {result.dominant.href && (
            <a
              href={result.dominant.href}
              class="rounded-full px-6 py-3 font-semibold underline"
            >
              Read more about {result.dominant.name}
            </a>
          )}
        </div>
        {shareStatus && <p class="mt-3 text-sm text-[var(--color-muted)]">{shareStatus}</p>}
      </section>
    );
  }

  return (
    <section class="bg-white rounded-2xl border border-[var(--color-line)] shadow-sm p-6 md:p-8" aria-labelledby="quiz-heading">
      <h2 id="quiz-heading" class="sr-only">{quizLabel}</h2>

      <div class="flex justify-between text-sm text-[var(--color-muted)] mb-2">
        <span aria-live="polite">
          Question {current + 1} of {total}
        </span>
        <span>{progress}% answered</span>
      </div>
      <div
        class="h-2 rounded-full bg-[var(--color-line)] overflow-hidden"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Quiz progress"
      >
        <div class="h-full bg-[var(--color-accent)] transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <fieldset class="border-0 p-0 m-0 mt-6">
        <legend class="text-xl md:text-2xl font-bold mb-5">{question.text}</legend>
        <div class="flex flex-col gap-3">
          {question.options.map((option) => {
            const inputId = `${question.id}-${option.score}`;
            const checked = answers[current] === option.score;
            return (
              <label
                for={inputId}
                class={`flex items-center gap-3 border-2 rounded-xl px-4 py-3 cursor-pointer transition-colors ${
                  checked
                    ? 'border-[var(--color-accent)] bg-[#f1ecfa]'
                    : 'border-[var(--color-line)] hover:border-[var(--color-accent)]'
                }`}
              >
                <input
                  id={inputId}
                  type="radio"
                  name={question.id}
                  value={option.score}
                  checked={checked}
                  onChange={() => selectOption(option.score)}
                  class="w-4 h-4 accent-[var(--color-accent)]"
                />
                <span>{option.label}</span>
              </label>
            );
          })}
        </div>
        <p class="mt-3 text-sm text-[var(--color-muted)]">
          Selecting an answer moves you to the next question automatically. Use Back to change a
          previous answer.
        </p>
      </fieldset>

      <div class="flex justify-between mt-7">
        <button
          type="button"
          onClick={goBack}
          disabled={current === 0}
          class="rounded-full border-2 border-[var(--color-line)] px-6 py-3 font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:border-[var(--color-ink)] cursor-pointer"
        >
          Back
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={answers[current] === null}
          class="rounded-full bg-[var(--color-ink)] text-white px-6 py-3 font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 cursor-pointer"
        >
          {current === total - 1 ? 'See my results' : 'Next'}
        </button>
      </div>
    </section>
  );
}
