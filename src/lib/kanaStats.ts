import type { KanaScript } from "../data/kana";

export interface KanaStatEntry {
  attempts: number;
  correct: number;
}

type KanaStatsMap = Record<string, KanaStatEntry>;

const STORAGE_KEY = "kana-stats";

function statKey(script: KanaScript, id: string) {
  return `${script}:${id}`;
}

function loadStats(): KanaStatsMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as KanaStatsMap) : {};
  } catch {
    return {};
  }
}

function saveStats(stats: KanaStatsMap) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

export function getKanaStat(script: KanaScript, id: string): KanaStatEntry {
  const stats = loadStats();
  return stats[statKey(script, id)] ?? { attempts: 0, correct: 0 };
}

export function recordKanaAnswer(script: KanaScript, id: string, correct: boolean) {
  const stats = loadStats();
  const key = statKey(script, id);
  const current = stats[key] ?? { attempts: 0, correct: 0 };
  stats[key] = {
    attempts: current.attempts + 1,
    correct: current.correct + (correct ? 1 : 0),
  };
  saveStats(stats);
}
