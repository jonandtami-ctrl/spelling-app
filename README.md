# Epic Spelling

_Spell. Play. Master._

A mobile-first, game-like spelling app for Grades 1-8, built with Expo, Expo Router, and TypeScript. Teaches spelling rules and word patterns through guided lessons and games, tracks word mastery, and works fully offline.

## Status: Phase 1 — Foundation

This is the first build: app shell, navigation, design system, onboarding, local storage, the home screen, and a full lesson flow (word introduction → guided practice → Spell It game → results) with progress saved locally.

**Grade content so far:**
- **Grade 1** (ages 6-7): short-vowel CVC words (`Short A Words`)
- **Grade 2** (ages 7-8): long-vowel silent-e / "magic e" words (`Magic E Words`)

Each grade's word list follows a standard structured-literacy phonics scope and sequence (short vowels → silent e → vowel teams/r-controlled → prefixes/suffixes/homophones → Greek & Latin roots), documented in a header comment at the top of each `src/data/spelling/gradeN.ts` file. Grades 3-8 aren't built yet.

## Getting started

```bash
npm install
npm run start            # then press w for web, i for iOS, a for Android
npm run typecheck        # TypeScript strict check
npm run validate-content # verifies every word/lesson/unit cross-reference, every sentence
                          # actually contains its target word, and accepted answers match
```

## Project structure

```
app/                  Expo Router screens (onboarding, tabs, lesson, unit, rewards, parent)
src/components/       Shared design-system components (AppButton, AppCard, ProgressBar, ...)
src/components/lesson/  Lesson-flow pieces (word intro, Spell It game, results)
src/constants/        Theme, grade themes, avatars, app config
src/data/spelling/    Grade content (words, units, lessons) — one file per grade
src/services/         Storage, profile, progress, spelling content, and speech services
src/store/            Zustand stores for onboarding and profile state
src/types/            Shared TypeScript interfaces
```

## Next recommended phase

Continue building grade content one grade at a time (Grade 3: vowel teams, silent letters), each grounded in a real phonics scope and sequence and checked with `npm run validate-content` before merging. Then round out the remaining games (Word Scramble, Spelling Choice, Word Builder) using the same `src/services/gameEngine.ts` helpers.
