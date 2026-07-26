import { useEffect, useMemo, useState } from "react";
import KanaCard from "../../components/KanaCard";
import KanaSelectToggle from "../../components/KanaSelectToggle";
import { groupByRow, kanaTable, type KanaItem, type KanaScript } from "../../data/kana";
import { recordKanaAnswer } from "../../lib/kanaStats";
import { sample, shuffle } from "../../lib/random";
import { speakJapanese } from "../../lib/speech";

const MIN_QUESTIONS = 1;
const MAX_QUESTIONS = 200;

interface KanaTestProps {
  script: KanaScript;
}

interface Question {
  item: KanaItem;
  choices: string[];
}

interface Answer {
  correct: boolean;
}

const QUESTION_COUNT_OPTIONS = [10, 20, kanaTable.length];
const rowGroups = groupByRow(kanaTable);

function buildQuestions(pool: KanaItem[], count: number): Question[] {
  return Array.from({ length: count }, () => {
    const item = pool[Math.floor(Math.random() * pool.length)];
    const distractors = sample(
      kanaTable.filter((candidate) => candidate.id !== item.id),
      3,
    ).map((candidate) => candidate.romaji);
    return { item, choices: shuffle([item.romaji, ...distractors]) };
  });
}

function scriptLabel(script: KanaScript) {
  return script === "hiragana" ? "平假名" : "片假名";
}

function characterFor(item: KanaItem, script: KanaScript) {
  return script === "hiragana" ? item.hiragana : item.katakana;
}

export default function KanaTest({ script }: KanaTestProps) {
  const [phase, setPhase] = useState<"setup" | "testing" | "result">("setup");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set(kanaTable.map((item) => item.id)));
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

  useEffect(() => {
    if (phase === "testing" && currentQuestion) {
      speakJapanese(characterFor(currentQuestion.item, script));
    }
  }, [phase, currentQuestion, script]);

  function toggleItem(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleRow(row: string) {
    const rowItems = kanaTable.filter((item) => item.row === row);
    const allSelected = rowItems.every((item) => selectedIds.has(item.id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      rowItems.forEach((item) => {
        if (allSelected) next.delete(item.id);
        else next.add(item.id);
      });
      return next;
    });
  }

  function selectAll() {
    setSelectedIds(new Set(kanaTable.map((item) => item.id)));
  }

  function clearAll() {
    setSelectedIds(new Set());
  }

  function startTest() {
    const pool = kanaTable.filter((item) => selectedIds.has(item.id));
    if (pool.length === 0 || !isCountValid) return;
    const built = buildQuestions(pool, parsedCount);
    setQuestions(built);
    setAnswers(new Array(built.length).fill(undefined));
    setCurrentIndex(0);
    setSelectedChoice(null);
    setPhase("testing");
  }

  function selectChoice(choice: string) {
    if (answeredCurrent || !currentQuestion) return;
    const correct = choice === currentQuestion.item.romaji;
    setSelectedChoice(choice);
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = { correct };
      return next;
    });
    recordKanaAnswer(script, currentQuestion.item.id, correct);
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

  const usedQuestionMemo = useMemo(() => questions, [questions]);

  if (phase === "setup") {
    return (
      <div>
        <h2 className="text-lg font-medium text-slate-900">{scriptLabel(script)}测试</h2>
        <p className="mt-1 text-sm text-slate-500">先选择要考的假名，再选择题目数量。</p>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">选择要考的假名（已选 {selectedIds.size} 个）</p>
            <div className="flex gap-3">
              <button type="button" onClick={selectAll} className="text-xs font-medium text-rose-600 hover:underline">
                全选
              </button>
              <button type="button" onClick={clearAll} className="text-xs font-medium text-slate-400 hover:underline">
                全不选
              </button>
            </div>
          </div>

          <div className="mt-3 space-y-2">
            {rowGroups.map((group) => (
              <div key={group.row} className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleRow(group.row)}
                  className="w-12 shrink-0 text-xs text-slate-400 hover:text-rose-600"
                >
                  整行
                </button>
                {group.items.map((item) => (
                  <KanaSelectToggle
                    key={item.id}
                    character={characterFor(item, script)}
                    romaji={item.romaji}
                    selected={selectedIds.has(item.id)}
                    onToggle={() => toggleItem(item.id)}
                  />
                ))}
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
          <p className="text-xs text-slate-400">
            题目从已选的假名中随机抽取，题数越多，同一个音被重复考到的次数也会越多。
          </p>
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
          <KanaCard
            character={characterFor(currentQuestion.item, script)}
            romaji=""
            size="lg"
          />
          <p className="mt-2 text-xs text-slate-400">点击上方卡片可以再听一次发音</p>

          <div className="mt-6 grid w-full max-w-sm grid-cols-2 gap-3">
            {currentQuestion.choices.map((choice) => {
              const isCorrectChoice = choice === currentQuestion.item.romaji;
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
                  className={`rounded-lg border px-4 py-3 text-base font-medium transition-colors ${stateClass}`}
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
        共 {usedQuestionMemo.length} 题，答对 {correctCount} 题，正确率 {accuracy}%
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {usedQuestionMemo.map((question, index) => {
          const answer = answers[index];
          const character = characterFor(question.item, script);
          return (
            <div
              key={`${question.item.id}-${index}`}
              onClick={() => speakJapanese(character)}
              className={[
                "flex h-16 w-16 cursor-pointer flex-col items-center justify-center rounded-xl border shadow-sm",
                answer?.correct ? "border-emerald-300 bg-emerald-50" : "border-red-300 bg-red-50",
              ].join(" ")}
            >
              <span className="text-2xl">{character}</span>
              <span className="mt-1 text-xs text-slate-500">{question.item.romaji}</span>
            </div>
          );
        })}
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
