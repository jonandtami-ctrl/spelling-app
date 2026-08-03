# Epic Spelling

_Spell. Play. Master._

A mobile-first, game-like spelling app for Grades 1-8, built with Expo, Expo Router, and TypeScript. Teaches spelling rules and word patterns through guided lessons and games, tracks word mastery, and works fully offline.

## Status: Phase 1 — Foundation

This is the first build: app shell, navigation, design system, onboarding, local storage, the home screen, sample Grade 1 content, and a full lesson flow (word introduction → Spell It game → results) with progress saved locally.

## Getting started

```bash
npm install
npm run start   # then press w for web, i for iOS, a for Android
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

**Phase 2: Core Learning** — build out the Unit/Lesson experience further (Missing Letter game, richer guided practice) and grade 2-8 content.
