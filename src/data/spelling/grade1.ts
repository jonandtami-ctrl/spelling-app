import { GradeContent, Lesson, SpellingWord, Unit } from "@/src/types/spelling";

// Grade 1 (ages 6-7) scope: short-vowel CVC words are the standard starting
// point in structured-literacy phonics progressions (e.g. Orton-Gillingham,
// Reading Rockets K-1 phonics scope and sequence) — students blend and
// segment three-letter words before moving to blends, digraphs, and long
// vowel patterns in Grade 2. Every word below is single-syllable, uses only
// letter-sounds a Grade 1 reader has been taught, and every spelling has
// been hand-checked against a standard dictionary.
const GRADE = 1;
const UNIT_ID = "g1-u1-short-a";
const LESSON_1 = `${UNIT_ID}-l1`;
const LESSON_2 = `${UNIT_ID}-l2`;
const LESSON_3 = `${UNIT_ID}-l3`;

function word(
  id: string,
  lessonId: string,
  text: string,
  pattern: string,
  partOfSpeech: string,
  definition: string,
  sentence: string
): SpellingWord {
  return {
    id: `${UNIT_ID}-${id}`,
    word: text,
    grade: GRADE,
    unitId: UNIT_ID,
    lessonId,
    difficulty: 1,
    definition,
    sentence,
    syllables: [text],
    phoneticHint: text,
    spellingPattern: pattern,
    category: "CVC words",
    partOfSpeech,
    audioText: text,
    acceptedAnswers: [text],
  };
}

const words: SpellingWord[] = [
  // Lesson 1: -at and -an family
  word("cat", LESSON_1, "cat", "short a: _at", "noun", "A furry pet that says meow.", "The cat slept on the soft rug."),
  word("hat", LESSON_1, "hat", "short a: _at", "noun", "Something you wear on your head.", "Dad put on his red hat."),
  word("bat", LESSON_1, "bat", "short a: _at", "noun", "A flying animal that comes out at night.", "A bat flew over the dark yard."),
  word("mat", LESSON_1, "mat", "short a: _at", "noun", "A small rug by the door.", "Wipe your feet on the mat."),
  word("sat", LESSON_1, "sat", "short a: _at", "verb", "To have sat down in a seat.", "She sat next to her best friend."),
  word("rat", LESSON_1, "rat", "short a: _at", "noun", "A small animal with a long tail.", "The rat hid behind the boxes."),
  word("fan", LESSON_1, "fan", "short a: _an", "noun", "Something that blows air to keep you cool.", "Turn on the fan, it is hot."),
  word("man", LESSON_1, "man", "short a: _an", "noun", "A grown-up boy.", "The man waved from across the street."),
  word("can", LESSON_1, "can", "short a: _an", "noun", "A metal container for food or drinks.", "Please open the can of beans."),
  word("pan", LESSON_1, "pan", "short a: _an", "noun", "A pot used for cooking.", "Mom cooked eggs in the pan."),

  // Lesson 2: -ag and -ap family
  word("bag", LESSON_2, "bag", "short a: _ag", "noun", "Something you carry things in.", "I packed my lunch in a bag."),
  word("tag", LESSON_2, "tag", "short a: _ag", "noun", "A fun game of chasing and touching.", "We played tag at recess."),
  word("rag", LESSON_2, "rag", "short a: _ag", "noun", "An old piece of cloth used for cleaning.", "He wiped the table with a rag."),
  word("wag", LESSON_2, "wag", "short a: _ag", "verb", "To move quickly back and forth, like a tail.", "The puppy started to wag its tail."),
  word("tap", LESSON_2, "tap", "short a: _ap", "verb", "To hit something gently.", "She gave a tap on the door."),
  word("map", LESSON_2, "map", "short a: _ap", "noun", "A drawing that shows where places are.", "We used a map to find the park."),
  word("cap", LESSON_2, "cap", "short a: _ap", "noun", "A soft hat with a brim.", "He wore a blue cap to the game."),
  word("nap", LESSON_2, "nap", "short a: _ap", "noun", "A short sleep.", "The baby took a nap after lunch."),
  word("lap", LESSON_2, "lap", "short a: _ap", "noun", "The flat part of your legs when sitting.", "The cat curled up on my lap."),
  word("gap", LESSON_2, "gap", "short a: _ap", "noun", "A small space between two things.", "There was a gap between the fence posts."),

  // Lesson 3: -ad and -am family
  word("dad", LESSON_3, "dad", "short a: _ad", "noun", "A word for father.", "My dad reads to me every night."),
  word("sad", LESSON_3, "sad", "short a: _ad", "adjective", "Feeling unhappy.", "She felt sad when the rain ruined the picnic."),
  word("bad", LESSON_3, "bad", "short a: _ad", "adjective", "Not good.", "It was a bad day for a picnic."),
  word("had", LESSON_3, "had", "short a: _ad", "verb", "Owned or held something before now.", "We had so much fun at the fair."),
  word("mad", LESSON_3, "mad", "short a: _ad", "adjective", "Feeling angry.", "He was mad when he lost his toy."),
  word("ham", LESSON_3, "ham", "short a: _am", "noun", "A type of meat from a pig.", "We had a ham sandwich for lunch."),
  word("jam", LESSON_3, "jam", "short a: _am", "noun", "A sweet fruit spread for toast.", "I put strawberry jam on my toast."),
  word("ram", LESSON_3, "ram", "short a: _am", "noun", "A male sheep.", "The ram had big curly horns."),
  word("dam", LESSON_3, "dam", "short a: _am", "noun", "A wall built to hold back water.", "Beavers built a dam across the stream."),
  word("yam", LESSON_3, "yam", "short a: _am", "noun", "A sweet orange vegetable.", "We ate a baked yam for dinner."),
];

const lessons: Lesson[] = [
  { id: LESSON_1, unitId: UNIT_ID, grade: GRADE, title: "Cat & Fan Words", order: 1, wordIds: words.filter((w) => w.lessonId === LESSON_1).map((w) => w.id) },
  { id: LESSON_2, unitId: UNIT_ID, grade: GRADE, title: "Bag & Cap Words", order: 2, wordIds: words.filter((w) => w.lessonId === LESSON_2).map((w) => w.id) },
  { id: LESSON_3, unitId: UNIT_ID, grade: GRADE, title: "Dad & Jam Words", order: 3, wordIds: words.filter((w) => w.lessonId === LESSON_3).map((w) => w.id) },
];

const units: Unit[] = [
  {
    id: UNIT_ID,
    grade: GRADE,
    title: "Short A Words",
    description: "Learn to spell words with the short a sound.",
    order: 1,
    lessonIds: lessons.map((l) => l.id),
  },
];

export const grade1Content: GradeContent = {
  grade: GRADE,
  units,
  lessons,
  words,
};
