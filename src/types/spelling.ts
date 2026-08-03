export interface SpellingWord {
  id: string;
  word: string;
  grade: number;
  unitId: string;
  lessonId: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  definition: string;
  sentence: string;
  syllables?: string[];
  phoneticHint?: string;
  spellingPattern?: string;
  category?: string;
  partOfSpeech?: string;
  audioText?: string;
  acceptedAnswers?: string[];
}

export type MasteryLevel =
  | "new"
  | "learning"
  | "improving"
  | "almost-mastered"
  | "mastered";

export interface WordProgress {
  wordId: string;
  attempts: number;
  correctAttempts: number;
  incorrectAttempts: number;
  correctStreak: number;
  masteryLevel: MasteryLevel;
  lastPractisedAt?: string;
  nextReviewAt?: string;
  averageResponseTime?: number;
  commonMistakes: string[];
  usedHintCount: number;
  isDifficult: boolean;
}

export interface Lesson {
  id: string;
  unitId: string;
  grade: number;
  title: string;
  order: number;
  wordIds: string[];
}

export interface Unit {
  id: string;
  grade: number;
  title: string;
  description: string;
  order: number;
  lessonIds: string[];
}

export interface GradeContent {
  grade: number;
  units: Unit[];
  lessons: Lesson[];
  words: SpellingWord[];
}

export interface LessonAttemptResult {
  lessonId: string;
  completedAt: string;
  totalWords: number;
  correctWords: number;
  xpEarned: number;
  wordResults: {
    wordId: string;
    correct: boolean;
    attempts: number;
  }[];
}
