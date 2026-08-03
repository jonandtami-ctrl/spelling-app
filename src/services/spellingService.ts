import { GRADE_CONTENT } from "@/src/data/spelling";
import { GradeContent, Lesson, SpellingWord, Unit } from "@/src/types/spelling";
import { APP_CONFIG } from "@/src/constants/config";

export function getGradeContent(grade: number): GradeContent {
  const clampedGrade = Math.min(Math.max(grade, APP_CONFIG.minGrade), APP_CONFIG.maxGrade);
  return GRADE_CONTENT[clampedGrade] ?? GRADE_CONTENT[APP_CONFIG.minGrade];
}

export function getUnitsForGrade(grade: number): Unit[] {
  return [...getGradeContent(grade).units].sort((a, b) => a.order - b.order);
}

export function getUnit(grade: number, unitId: string): Unit | undefined {
  return getGradeContent(grade).units.find((u) => u.id === unitId);
}

export function getLessonsForUnit(grade: number, unitId: string): Lesson[] {
  return getGradeContent(grade)
    .lessons.filter((l) => l.unitId === unitId)
    .sort((a, b) => a.order - b.order);
}

export function getLesson(grade: number, lessonId: string): Lesson | undefined {
  return getGradeContent(grade).lessons.find((l) => l.id === lessonId);
}

export function findLessonById(lessonId: string): { lesson: Lesson; grade: number } | undefined {
  for (let grade = APP_CONFIG.minGrade; grade <= APP_CONFIG.maxGrade; grade++) {
    const lesson = getGradeContent(grade).lessons.find((l) => l.id === lessonId);
    if (lesson) return { lesson, grade };
  }
  return undefined;
}

export function getWordsForLesson(grade: number, lessonId: string): SpellingWord[] {
  const lesson = getLesson(grade, lessonId);
  if (!lesson) return [];
  const words = getGradeContent(grade).words;
  return lesson.wordIds
    .map((id) => words.find((w) => w.id === id))
    .filter((w): w is SpellingWord => w != null);
}

export function isCorrectSpelling(attempt: string, correctWord: SpellingWord): boolean {
  const normalized = attempt.trim().toLowerCase();
  const accepted = correctWord.acceptedAnswers?.length ? correctWord.acceptedAnswers : [correctWord.word];
  return accepted.some((answer) => answer.trim().toLowerCase() === normalized);
}
