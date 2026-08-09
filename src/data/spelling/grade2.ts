import { GradeContent, Lesson, SpellingWord, Unit } from "@/src/types/spelling";

// Grade 2 (ages 7-8) scope: after mastering short vowels in Grade 1,
// standard phonics scope-and-sequence progressions (Reading Rockets K-6
// scope and sequence; structured-literacy VCe / "magic e" stage) move
// students to long-vowel silent-e (VCe) words next, before vowel teams and
// r-controlled vowels later in the year. This unit covers a_e, i_e, o_e,
// and u_e — every word is a common, single-syllable dictionary word and
// every spelling has been hand-checked.
const GRADE = 2;
const UNIT_ID = "g2-u1-magic-e";
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
    difficulty: 2,
    definition,
    sentence,
    syllables: [text],
    phoneticHint: text,
    spellingPattern: pattern,
    category: "Long vowel (silent e)",
    partOfSpeech,
    audioText: text,
    acceptedAnswers: [text],
  };
}

const words: SpellingWord[] = [
  // Lesson 1: a_e (long a)
  word("cake", LESSON_1, "cake", "silent e: a_e", "noun", "A sweet baked dessert, often made for birthdays.", "We had chocolate cake at the party."),
  word("gate", LESSON_1, "gate", "silent e: a_e", "noun", "A door built into a fence or wall.", "Please shut the gate so the dog stays in the yard."),
  word("tape", LESSON_1, "tape", "silent e: a_e", "noun", "A sticky strip used to join or fix things.", "He used tape to fix the torn poster."),
  word("cave", LESSON_1, "cave", "silent e: a_e", "noun", "A large hollow space in a hill, cliff, or underground.", "The bats slept inside the dark cave."),
  word("wave", LESSON_1, "wave", "silent e: a_e", "verb", "To move your hand side to side as a greeting.", "She began to wave when she saw her grandma."),
  word("cape", LESSON_1, "cape", "silent e: a_e", "noun", "A piece of clothing that hangs from the shoulders, like a superhero wears.", "The superhero's cape flapped behind her."),
  word("lake", LESSON_1, "lake", "silent e: a_e", "noun", "A large body of water surrounded by land.", "We paddled a canoe across the lake."),
  word("name", LESSON_1, "name", "silent e: a_e", "noun", "The word people use to call a person or thing.", "She wrote her name at the top of the page."),
  word("game", LESSON_1, "game", "silent e: a_e", "noun", "An activity with rules that you play for fun.", "We played a board game after dinner."),
  word("plate", LESSON_1, "plate", "silent e: a_e", "noun", "A flat dish that food is served on.", "He set a clean plate at each seat."),

  // Lesson 2: i_e (long i)
  word("bike", LESSON_2, "bike", "silent e: i_e", "noun", "A two-wheeled vehicle you ride by pedaling.", "I rode my bike all the way to school."),
  word("time", LESSON_2, "time", "silent e: i_e", "noun", "The passing of minutes, hours, and days.", "What time does the bus arrive?"),
  word("five", LESSON_2, "five", "silent e: i_e", "number", "The number that comes after four.", "She counted five shells on the beach."),
  word("line", LESSON_2, "line", "silent e: i_e", "noun", "A long, thin mark, or a row of people waiting.", "We waited in line for the roller coaster."),
  word("dive", LESSON_2, "dive", "silent e: i_e", "verb", "To jump into water headfirst.", "He learned to dive off the low board."),
  word("kite", LESSON_2, "kite", "silent e: i_e", "noun", "A light toy that flies in the wind on a string.", "Our kite soared high above the beach."),
  word("ride", LESSON_2, "ride", "silent e: i_e", "verb", "To travel by sitting on or in something that moves.", "Can I ride my scooter after homework?"),
  word("side", LESSON_2, "side", "silent e: i_e", "noun", "A part of something away from the middle, or next to it.", "The cat curled up by my side."),
  word("wide", LESSON_2, "wide", "silent e: i_e", "adjective", "Measuring a large amount from one edge to the other.", "The river was too wide to swim across."),
  word("smile", LESSON_2, "smile", "silent e: i_e", "verb", "To turn up the corners of your mouth when happy.", "She gave a big smile when she saw the puppy."),

  // Lesson 3: o_e and u_e (long o, long u)
  word("home", LESSON_3, "home", "silent e: o_e", "noun", "The place where a person or family lives.", "We walked home after the movie."),
  word("bone", LESSON_3, "bone", "silent e: o_e", "noun", "One of the hard parts that make up a skeleton.", "The dog buried its bone in the garden."),
  word("nose", LESSON_3, "nose", "silent e: o_e", "noun", "The part of the face used for smelling and breathing.", "She wrinkled her nose at the strong smell."),
  word("rope", LESSON_3, "rope", "silent e: o_e", "noun", "A thick, strong cord used for pulling, tying, or climbing.", "They pulled the boat to shore with a rope."),
  word("hope", LESSON_3, "hope", "silent e: o_e", "verb", "To wish that something good will happen.", "I hope our team wins the game."),
  word("joke", LESSON_3, "joke", "silent e: o_e", "noun", "Something said or done to make people laugh.", "Dad told a silly joke at breakfast."),
  word("cute", LESSON_3, "cute", "silent e: u_e", "adjective", "Pleasant and pretty in a charming way.", "Everyone said the kitten was cute."),
  word("tube", LESSON_3, "tube", "silent e: u_e", "noun", "A long, hollow pipe or container.", "She squeezed the last of the toothpaste from the tube."),
  word("mule", LESSON_3, "mule", "silent e: u_e", "noun", "An animal that is a mix of a horse and a donkey.", "The mule carried supplies up the rocky trail."),
  word("use", LESSON_3, "use", "silent e: u_e", "verb", "To do something with an object for a purpose.", "You may use my pencil if you need one."),
];

const lessons: Lesson[] = [
  { id: LESSON_1, unitId: UNIT_ID, grade: GRADE, title: "Cake & Plate Words", order: 1, wordIds: words.filter((w) => w.lessonId === LESSON_1).map((w) => w.id) },
  { id: LESSON_2, unitId: UNIT_ID, grade: GRADE, title: "Bike & Kite Words", order: 2, wordIds: words.filter((w) => w.lessonId === LESSON_2).map((w) => w.id) },
  { id: LESSON_3, unitId: UNIT_ID, grade: GRADE, title: "Home & Cute Words", order: 3, wordIds: words.filter((w) => w.lessonId === LESSON_3).map((w) => w.id) },
];

const units: Unit[] = [
  {
    id: UNIT_ID,
    grade: GRADE,
    title: "Magic E Words",
    description: "Discover how a silent e at the end of a word makes the vowel say its own name.",
    order: 1,
    lessonIds: lessons.map((l) => l.id),
  },
];

export const grade2Content: GradeContent = {
  grade: GRADE,
  units,
  lessons,
  words,
};
