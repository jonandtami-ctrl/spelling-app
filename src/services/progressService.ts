import { STORAGE_KEYS, getItem, setItem } from "./storageService";
import { getLessonsForUnit, getUnitsForGrade } from "./spellingService";
import { LessonAttemptResult, MasteryLevel, WordProgress } from "@/src/types/spelling";
import { APP_CONFIG } from "@/src/constants/config";

type WordProgressMap = Record<string, WordProgress>;

interface LessonProgressRecord {
  lessonId: string;
  completed: boolean;
  bestScore: number;
  timesCompleted: number;
  lastCompletedAt?: string;
}

type LessonProgressMap = Record<string, LessonProgressRecord>;

function createNewWordProgress(wordId: string): WordProgress {
  return {
    wordId,
    attempts: 0,
    correctAttempts: 0,
    incorrectAttempts: 0,
    correctStreak: 0,
    masteryLevel: "new",
    commonMistakes: [],
    usedHintCount: 0,
    isDifficult: false,
  };
}

export async function getAllWordProgress(): Promise<WordProgressMap> {
  return getItem<WordProgressMap>(STORAGE_KEYS.wordProgress, {});
}

export async function getWordProgress(wordId: string): Promise<WordProgress> {
  const all = await getAllWordProgress();
  return all[wordId] ?? createNewWordProgress(wordId);
}

function nextMasteryLevel(current: MasteryLevel, correctStreak: number): MasteryLevel {
  if (correctStreak >= APP_CONFIG.masteryStreakToMaster + 2) return "mastered";
  if (correctStreak >= APP_CONFIG.masteryStreakToMaster) return "almost-mastered";
  if (correctStreak >= 2) return "improving";
  if (correctStreak >= 1) return "learning";
  return current === "mastered" || current === "almost-mastered" ? "improving" : "new";
}

export async function recordWordAttempt(
  wordId: string,
  wasCorrect: boolean,
  options?: { attemptedSpelling?: string; usedHint?: boolean; responseTimeMs?: number }
): Promise<WordProgress> {
  const all = await getAllWordProgress();
  const existing = all[wordId] ?? createNewWordProgress(wordId);

  const attempts = existing.attempts + 1;
  const correctAttempts = existing.correctAttempts + (wasCorrect ? 1 : 0);
  const incorrectAttempts = existing.incorrectAttempts + (wasCorrect ? 0 : 1);
  const correctStreak = wasCorrect ? existing.correctStreak + 1 : 0;

  const commonMistakes =
    !wasCorrect && options?.attemptedSpelling
      ? Array.from(new Set([...existing.commonMistakes, options.attemptedSpelling])).slice(-5)
      : existing.commonMistakes;

  const averageResponseTime =
    options?.responseTimeMs != null
      ? existing.averageResponseTime != null
        ? Math.round((existing.averageResponseTime * (attempts - 1) + options.responseTimeMs) / attempts)
        : options.responseTimeMs
      : existing.averageResponseTime;

  const updated: WordProgress = {
    ...existing,
    attempts,
    correctAttempts,
    incorrectAttempts,
    correctStreak,
    masteryLevel: nextMasteryLevel(existing.masteryLevel, correctStreak),
    lastPractisedAt: new Date().toISOString(),
    averageResponseTime,
    commonMistakes,
    usedHintCount: existing.usedHintCount + (options?.usedHint ? 1 : 0),
    isDifficult: incorrectAttempts >= 3 && correctStreak === 0,
  };

  all[wordId] = updated;
  await setItem(STORAGE_KEYS.wordProgress, all);
  return updated;
}

export async function getDifficultWords(): Promise<WordProgress[]> {
  const all = await getAllWordProgress();
  return Object.values(all).filter((w) => w.isDifficult);
}

export async function getMasteredWordIds(): Promise<string[]> {
  const all = await getAllWordProgress();
  return Object.values(all)
    .filter((w) => w.masteryLevel === "mastered")
    .map((w) => w.wordId);
}

export async function getAllLessonProgress(): Promise<LessonProgressMap> {
  return getItem<LessonProgressMap>(STORAGE_KEYS.lessonProgress, {});
}

export async function saveLessonResult(result: LessonAttemptResult): Promise<LessonProgressRecord> {
  const all = await getAllLessonProgress();
  const existing = all[result.lessonId];
  const score = Math.round((result.correctWords / Math.max(result.totalWords, 1)) * 100);

  const updated: LessonProgressRecord = {
    lessonId: result.lessonId,
    completed: true,
    bestScore: Math.max(existing?.bestScore ?? 0, score),
    timesCompleted: (existing?.timesCompleted ?? 0) + 1,
    lastCompletedAt: result.completedAt,
  };

  all[result.lessonId] = updated;
  await setItem(STORAGE_KEYS.lessonProgress, all);
  return updated;
}

export async function isLessonCompleted(lessonId: string): Promise<boolean> {
  const all = await getAllLessonProgress();
  return all[lessonId]?.completed ?? false;
}

export async function getUnitCompletionRatio(grade: number, unitId: string): Promise<number> {
  const lessons = getLessonsForUnit(grade, unitId);
  if (lessons.length === 0) return 0;
  const allProgress = await getAllLessonProgress();
  const completed = lessons.filter((l) => allProgress[l.id]?.completed).length;
  return completed / lessons.length;
}

export async function getNextLessonId(grade: number): Promise<string | undefined> {
  const allProgress = await getAllLessonProgress();
  const units = getUnitsForGrade(grade);

  for (const unit of units) {
    const lessons = getLessonsForUnit(grade, unit.id);
    const nextLesson = lessons.find((l) => !allProgress[l.id]?.completed);
    if (nextLesson) return nextLesson.id;
  }

  return units[0] ? getLessonsForUnit(grade, units[0].id)[0]?.id : undefined;
}
