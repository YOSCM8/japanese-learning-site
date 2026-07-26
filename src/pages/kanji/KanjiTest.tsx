import { useState, type ReactNode } from "react";
import KanjiCard from "../../components/KanjiCard";
import KanjiSelectToggle from "../../components/KanjiSelectToggle";
import { groupKanjiByCategory, kanjiTable, type KanjiItem } from "../../data/kanji";
import { sample, shuffle } from "../../lib/random";

export type KanjiTestMode = "reading" | "character" | "compound";

interface KanjiTestProps {
  mode: KanjiTestMode;
}

interface Question {
  item: KanjiItem;
  correctAnswer: string;
  choices: string[];
}

interface Answer {
  correct: boolean;
}

const MIN_QUESTIONS = 1;
const MAX_QUESTIONS = 100;
const QUESTION_COUNT_OPTIONS = [10, 20, 50];
const categoryGroups = groupKanjiByCategory(kanjiTable);

function pickUniqueDistractors(candidates: string[], count: number, exclude: string): string[] {
  const uniqueCandidates = Array.from(new Set(candidates.filter((value) => value !== exclude)));
  return sample(uniqueCandidates, count);
}

function buildReadingQuestions(pool: KanjiItem[], count: number): Question[] {
  const validPool = pool.filter((item) => item.primaryReading);
  return Array.from({ length: count }, () => {
    const item = validPool[Math.floor(Math.random() * validPool.length)];
    const distractorPool = kanjiTable.filter((candidate) => candidate.primaryReading);
    const distractors = pickUniqueDistractors(
      distractorPool.map((candidate) => candidate.primaryReading),
      3,
      item.primaryReading,
    );
    return { item, correctAnswer: item.primaryReading, choices: shuffle([item.primaryReading, ...distractors]) };
  });
}

function buildCharacterQuestions(pool: KanjiItem[], count: number): Question[] {
  const validPool = pool.filter((item) => item.primaryReading);
  return Array.from({ length: count }, () => {
    const item = validPool[Math.floor(Math.random() * validPool.length)];
    const distractorPool = kanjiTable.filter(
      (candidate) => candidate.id !== item.id && candidate.primaryReading !== item.primaryReading,
    );
    const distractors = pickUniqueDistractors(
      distractorPool.map((candidate) => candidate.character),
      3,
      item.character,
    );
    return { item, correctAnswer: item.character, choices: shuffle([item.character, ...distractors]) };
  });
}

function buildCompoundQuestions(pool: KanjiItem[], count: number): Question[] {
  const validPool = pool.filter((item) => item.compounds.length > 0);
  const allCompoundWords = kanjiTable.flatMap((item) => item.compounds.map((compound) => compound.word));
  return Array.from({ length: count }, () => {
    const item = validPool[Math.floor(Math.random() * validPool.length)];
    const correctCompound = item.compounds[Math.floor(Math.random() * item.compounds.length)];
    const distractorPool = allCompoundWords.filter(
      (word) => !item.compounds.some((compound) => compound.word === word),
    );
    const distractors = pickUniqueDistractors(distractorPool, 3, correctCompound.word);
    return {
      item,
      correctAnswer: correctCompound.word,
      choices: shuffle([correctCompound.word, ...distractors]),
    };
  });
}

const MODE_CONFIG: Record<
  KanjiTestMode,
  {
    title: string;
    instruction: string;
    build: (pool: KanjiItem[], count: number) => Question[];
    renderPrompt: (item: KanjiItem) => ReactNode;
    choiceTextClass: string;
  }
> = {
  reading: {
    title: "看字选音测试",
    instruction: "看汉字，选出正确的读音",
    build: buildReadingQuestions,
    renderPrompt: (item) => <span className="text-7xl leading-none text-slate-900">{item.character}</span>,
    choiceTextClass: "text-base",
  },
  character: {
    title: "听音选字测试",
    instruction: "根据读音，选出对应的汉字",
    build: buildCharacterQuestions,
    renderPrompt: (item) => <span className="text-4xl text-slate-700">{item.primaryReading}</span>,
    choiceTextClass: "text-2xl",
  },
  compound: {
    title: "组词测试",
    instruction: "选出包含这个汉字的正确组词",
    build: buildCompoundQuestions,
    renderPrompt: (item) => (
      <div className="flex flex-col items-center">
        <span className="text-7xl leading-none text-slate-900">{item.character}</span>
        <p className="mt-2 text-sm text-slate-500">{item.meaning}</p>
      </div>
    ),
    choiceTextClass: "text-lg",
  },
};

export default function KanjiTest({ mode }: KanjiTestProps) {
  const config = MODE_CONFIG[mode];

  const [phase, setPhase] = useState<"setup" | "testing" | "result">("setup");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set(kanjiTable.map((item) => item.id)));
  const [questionCountInput, setQuestionCountInput] = useState("10");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(Answer | undefined)[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const answeredCount = answers.filter(Boolean).length;
  const correctCount = answers.filter((answer) => answer?.correct).length;
  const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  const currentQuestion = questions[currentIndex];
  const answeredCurrent = answers[currentIndex] !== undefined;

  const parsedCount = Number(questionCountInput);
  const isCountValid =
    Number.isInteger(parsedCount) && parsedCount >= MIN_QUESTIONS && parsedCount <= MAX_QUESTIONS;

  function toggleItem(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleCategory(categoryKey: string) {
    const categoryItems = kanjiTable.filter((item) => item.category === categoryKey);
    const allSelected = categoryItems.every((item) => selectedIds.has(item.id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      categoryItems.forEach((item) => {
        if (allSelected) next.delete(item.id);
        else next.add(item.id);
      });
      return next;
    });
  }

  function selectAll() {
    setSelectedIds(new Set(kanjiTable.map((item) => item.id)));
  }

  function clearAll() {
    setSelectedIds(new Set());
  }

  function startTest() {
    const pool = kanjiTable.filter((item) => selectedIds.has(item.id));
    if (pool.length === 0 || !isCountValid) return;
    const built = config.build(pool, parsedCount);
    if (built.length === 0) return;
    setQuestions(built);
    setAnswers(new Array(built.length).fill(undefined));
    setCurrentIndex(0);
    setSelectedChoice(null);
    setPhase("testing");
  }

  function selectChoice(choice: string) {
    if (answeredCurrent || !currentQuestion) return;
    const correct = choice === currentQuestion.correctAnswer;
    setSelectedChoice(choice);
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = { correct };
      return next;
    });
  }

  function goToNext() {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((index) => index + 1);
      setSelectedChoice(null);
    } else {
      setPhase("result");
    }
  }

  function resetToSetup() {
    setPhase("setup");
    setQuestions([]);
    setAnswers([]);
    setCurrentIndex(0);
    setSelectedChoice(null);
  }

  if (phase === "setup") {
    return (
      <div>
        <h2 className="text-lg font-medium text-slate-900">{config.title}</h2>
        <p className="mt-1 text-sm text-slate-500">{config.instruction}，先选择要考的汉字范围，再选择题目数量。</p>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">选择要考的汉字（已选 {selectedIds.size} 个）</p>
            <div className="flex gap-3">
              <button type="button" onClick={selectAll} className="text-xs font-medium text-rose-600 hover:underline">
                全选
              </button>
              <button type="button" onClick={clearAll} className="text-xs font-medium text-slate-400 hover:underline">
                全不选
              </button>
            </div>
          </div>

          <div className="mt-3 max-h-96 space-y-4 overflow-y-auto rounded-lg border border-slate-100 p-3">
            {categoryGroups.map((group) => (
              <div key={group.category.key}>
                <button
                  type="button"
                  onClick={() => toggleCategory(group.category.key)}
                  className="text-xs font-medium text-slate-400 hover:text-rose-600"
                >
                  {group.category.label}（整类切换）
                </button>
                <div className="mt-2 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <KanjiSelectToggle
                      key={item.id}
                      item={item}
                      selected={selectedIds.has(item.id)}
                      onToggle={() => toggleItem(item.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {QUESTION_COUNT_OPTIONS.map((count) => (
            <button
              key={count}
              type="button"
              onClick={() => setQuestionCountInput(String(count))}
              className={[
                "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                parsedCount === count
                  ? "border-rose-600 bg-rose-600 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-rose-300",
              ].join(" ")}
            >
              {count} 题
            </button>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <label htmlFor="custom-count" className="text-sm text-slate-500">
            自定义题数：
          </label>
          <input
            id="custom-count"
            type="number"
            min={MIN_QUESTIONS}
            max={MAX_QUESTIONS}
            value={questionCountInput}
            onChange={(event) => setQuestionCountInput(event.target.value)}
            className="w-20 rounded-lg border border-slate-200 px-2 py-1 text-sm"
          />
        </div>
        {!isCountValid && (
          <p className="mt-1 text-xs text-red-500">请输入 {MIN_QUESTIONS}-{MAX_QUESTIONS} 之间的整数题数。</p>
        )}

        <button
          type="button"
          onClick={startTest}
          disabled={selectedIds.size === 0 || !isCountValid}
          className="mt-6 rounded-lg bg-rose-600 px-5 py-2 text-sm font-medium text-white hover:bg-rose-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          开始测试
        </button>
      </div>
    );
  }

  if (phase === "testing" && currentQuestion) {
    return (
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-white p-4 text-sm text-slate-600 shadow-sm">
          <span>
            第 {currentIndex + 1} / {questions.length} 题
          </span>
          <span>
            已完成 {answeredCount} 题，答对 {correctCount} 题，正确率 {accuracy}%
          </span>
        </div>

        <div className="mt-8 flex flex-col items-center">
          {config.renderPrompt(currentQuestion.item)}

          <div className="mt-6 grid w-full max-w-sm grid-cols-2 gap-3">
            {currentQuestion.choices.map((choice) => {
              const isCorrectChoice = choice === currentQuestion.correctAnswer;
              const isSelected = choice === selectedChoice;
              let stateClass = "border-slate-200 bg-white hover:border-rose-300";
              if (answeredCurrent && isCorrectChoice) {
                stateClass = "border-emerald-400 bg-emerald-50 text-emerald-700";
              } else if (answeredCurrent && isSelected) {
                stateClass = "border-red-400 bg-red-50 text-red-700";
              }

              return (
                <button
                  key={choice}
                  type="button"
                  disabled={answeredCurrent}
                  onClick={() => selectChoice(choice)}
                  className={`rounded-lg border px-4 py-3 font-medium transition-colors ${config.choiceTextClass} ${stateClass}`}
                >
                  {choice}
                </button>
              );
            })}
          </div>

          {answeredCurrent && (
            <button
              type="button"
              onClick={goToNext}
              className="mt-6 rounded-lg bg-rose-600 px-5 py-2 text-sm font-medium text-white hover:bg-rose-700"
            >
              {currentIndex + 1 < questions.length ? "下一题" : "查看结果"}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-medium text-slate-900">测试结果</h2>
      <p className="mt-1 text-slate-600">
        共 {questions.length} 题，答对 {correctCount} 题，正确率 {accuracy}%
      </p>
      <p className="mt-1 text-xs text-slate-400">点击下面的卡片可以查看该汉字的读音和组词</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {questions.map((question, index) => (
          <KanjiCard
            key={`${question.item.id}-${index}`}
            item={question.item}
            status={answers[index]?.correct ? "correct" : "incorrect"}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={resetToSetup}
        className="mt-6 rounded-lg bg-rose-600 px-5 py-2 text-sm font-medium text-white hover:bg-rose-700"
      >
        再测一次
      </button>
    </div>
  );
}
