const VOWELS = ["a", "e", "i", "o", "u"];
const CONSONANTS = "bcdfghjklmnpqrstvwxyz".split("");

export function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function randomFrom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

/**
 * Picks a letter index to blank out for the Missing Letter step. Prefers the
 * vowel in short words (grade 1-2 CVC words) since that's the sound pattern
 * those lessons are teaching; otherwise picks an interior letter so the
 * first and last letters stay visible as anchors.
 */
export function pickBlankIndex(word: string): number {
  const lower = word.toLowerCase();
  if (lower.length <= 3) return 1;

  const interiorVowelIndex = lower
    .split("")
    .findIndex((letter, i) => i > 0 && i < lower.length - 1 && VOWELS.includes(letter));
  if (interiorVowelIndex !== -1) return interiorVowelIndex;

  return 1 + Math.floor(Math.random() * (lower.length - 2));
}

/**
 * Builds a shuffled set of letter choices for a Missing Letter blank: the
 * correct letter plus distractors of the same type (vowel vs. consonant) so
 * the choice is meaningful practice rather than an obvious mismatch.
 */
export function buildLetterChoices(correctLetter: string, optionCount = 4): string[] {
  const lower = correctLetter.toLowerCase();
  const pool = (VOWELS.includes(lower) ? VOWELS : CONSONANTS).filter((l) => l !== lower);
  const distractors = shuffleArray(pool).slice(0, optionCount - 1);
  return shuffleArray([correctLetter, ...distractors]);
}

/** Scrambles a word's letters for a Word Scramble-style activity, guaranteeing the result differs from the original. */
export function scrambleWord(word: string): string[] {
  const letters = word.split("");
  if (letters.length < 2) return letters;
  let scrambled = shuffleArray(letters);
  let attempts = 0;
  while (scrambled.join("") === word && attempts < 5) {
    scrambled = shuffleArray(letters);
    attempts++;
  }
  return scrambled;
}

const CORRECT_MESSAGES = [
  "Great spelling!",
  "You got it!",
  "Word wizard!",
  "Excellent work!",
  "Amazing!",
  "Perfect!",
  "Nailed it!",
  "Spelling star!",
  "You're on fire!",
  "Fantastic!",
];

const GENTLE_RETRY_MESSAGES = [
  "You were close. Let's look at the word again.",
  "Nice try! Here's the tricky part.",
  "Almost there — let's take another look.",
  "Good effort! This word takes practice.",
];

export function getRandomEncouragement(): string {
  return randomFrom(CORRECT_MESSAGES);
}

export function getRandomGentleRetry(): string {
  return randomFrom(GENTLE_RETRY_MESSAGES);
}

export interface LetterDiffEntry {
  letter: string;
  match: boolean;
}

/**
 * Position-by-position comparison between what the student typed and the
 * correct word, padded to equal length so both rows line up visually. Used
 * to highlight exactly which letters were wrong instead of just saying
 * "incorrect."
 */
export function diffWord(attempt: string, correct: string): { attempt: LetterDiffEntry[]; correct: LetterDiffEntry[] } {
  const a = attempt.trim().toLowerCase();
  const c = correct.trim().toLowerCase();
  const length = Math.max(a.length, c.length);

  const attemptDiff: LetterDiffEntry[] = [];
  const correctDiff: LetterDiffEntry[] = [];

  for (let i = 0; i < length; i++) {
    const aChar = a[i];
    const cChar = c[i];
    const match = aChar != null && aChar === cChar;
    if (aChar != null) attemptDiff.push({ letter: aChar, match });
    correctDiff.push({ letter: cChar ?? "", match });
  }

  return { attempt: attemptDiff, correct: correctDiff };
}

const POSITION_HINTS = ["the beginning", "the middle", "the end"];

/**
 * A plain-language explanation of what went wrong: where in the word the
 * mistake happened, plus the spelling pattern being taught (when known), so
 * "wrong" always comes with a reason a child can act on next time.
 */
export function explainMistake(attempt: string, correctWord: string, spellingPattern?: string): string {
  const a = attempt.trim().toLowerCase();
  const c = correctWord.trim().toLowerCase();

  let locationHint: string;
  if (a.length < c.length) {
    locationHint = `"${correctWord}" has ${c.length} letters — you're missing one.`;
  } else if (a.length > c.length) {
    locationHint = `"${correctWord}" has only ${c.length} letters — you added an extra one.`;
  } else {
    const mismatchIndex = c.split("").findIndex((char, i) => char !== a[i]);
    const positionThird = mismatchIndex === -1 ? 1 : Math.min(2, Math.floor((mismatchIndex / c.length) * 3));
    locationHint = `Look closely at ${POSITION_HINTS[positionThird]} of the word.`;
  }

  const patternHint = spellingPattern ? ` This word follows the ${spellingPattern} pattern.` : "";
  return `${locationHint}${patternHint}`;
}
