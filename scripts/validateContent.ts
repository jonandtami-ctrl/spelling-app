/**
 * Content-integrity check for src/data/spelling/*.
 *
 * This is not a style check — it exists to catch the mistakes that matter
 * most in a kids' spelling app: a lesson pointing at a word that doesn't
 * exist, a sentence that doesn't actually contain the target word, an
 * accepted-answer list that drifted from the word itself, or duplicate
 * words inside one grade. Run with `npm run validate-content`.
 */
import { GRADE_CONTENT } from "../src/data/spelling";

let errorCount = 0;

function fail(message: string): void {
  errorCount++;
  console.error(`✗ ${message}`);
}

function containsWholeWord(sentence: string, target: string): boolean {
  const pattern = new RegExp(`\\b${target.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
  return pattern.test(sentence);
}

for (const gradeKey of Object.keys(GRADE_CONTENT)) {
  const grade = Number(gradeKey);
  const content = GRADE_CONTENT[grade];
  if (content.words.length === 0) continue; // grade not built yet

  console.log(`Checking Grade ${grade}: ${content.units.length} unit(s), ${content.lessons.length} lesson(s), ${content.words.length} word(s)`);

  const wordIds = new Set<string>();
  const wordTextsInGrade = new Map<string, number>();

  for (const w of content.words) {
    if (wordIds.has(w.id)) fail(`Grade ${grade}: duplicate word id "${w.id}"`);
    wordIds.add(w.id);

    if (w.grade !== grade) fail(`Grade ${grade}: word "${w.word}" has grade=${w.grade}, expected ${grade}`);

    if (!/^[a-z]+$/i.test(w.word)) fail(`Grade ${grade}: word "${w.word}" contains unexpected characters`);

    const lower = w.word.toLowerCase();
    wordTextsInGrade.set(lower, (wordTextsInGrade.get(lower) ?? 0) + 1);

    const accepted = w.acceptedAnswers?.length ? w.acceptedAnswers : [w.word];
    if (!accepted.some((a) => a.toLowerCase() === lower)) {
      fail(`Grade ${grade}: word "${w.word}" acceptedAnswers ${JSON.stringify(w.acceptedAnswers)} does not include the word itself`);
    }

    if (!w.sentence || !containsWholeWord(w.sentence, w.word)) {
      fail(`Grade ${grade}: sentence for "${w.word}" does not contain the word as written: "${w.sentence}"`);
    }

    if (!w.definition || w.definition.trim().length < 5) {
      fail(`Grade ${grade}: word "${w.word}" is missing a real definition`);
    }

    const lesson = content.lessons.find((l) => l.id === w.lessonId);
    if (!lesson) fail(`Grade ${grade}: word "${w.word}" references missing lesson "${w.lessonId}"`);
    else if (!lesson.wordIds.includes(w.id)) fail(`Grade ${grade}: lesson "${w.lessonId}" does not list word "${w.id}" back in its wordIds`);

    const unit = content.units.find((u) => u.id === w.unitId);
    if (!unit) fail(`Grade ${grade}: word "${w.word}" references missing unit "${w.unitId}"`);
  }

  for (const [text, count] of wordTextsInGrade) {
    if (count > 1) fail(`Grade ${grade}: word "${text}" appears ${count} times`);
  }

  for (const lesson of content.lessons) {
    if (lesson.grade !== grade) fail(`Grade ${grade}: lesson "${lesson.id}" has grade=${lesson.grade}`);
    for (const wordId of lesson.wordIds) {
      if (!wordIds.has(wordId)) fail(`Grade ${grade}: lesson "${lesson.id}" references missing word "${wordId}"`);
    }
    const unit = content.units.find((u) => u.id === lesson.unitId);
    if (!unit) fail(`Grade ${grade}: lesson "${lesson.id}" references missing unit "${lesson.unitId}"`);
    else if (!unit.lessonIds.includes(lesson.id)) fail(`Grade ${grade}: unit "${lesson.unitId}" does not list lesson "${lesson.id}" back in its lessonIds`);
  }

  for (const unit of content.units) {
    if (unit.grade !== grade) fail(`Grade ${grade}: unit "${unit.id}" has grade=${unit.grade}`);
    for (const lessonId of unit.lessonIds) {
      if (!content.lessons.some((l) => l.id === lessonId)) fail(`Grade ${grade}: unit "${unit.id}" references missing lesson "${lessonId}"`);
    }
  }
}

if (errorCount > 0) {
  console.error(`\n${errorCount} content error(s) found.`);
  process.exit(1);
} else {
  console.log("\nAll spelling content passed integrity checks.");
}
