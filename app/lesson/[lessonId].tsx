import React, { useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { WordIntroStep } from "@/src/components/lesson/WordIntroStep";
import { MissingLetterStep } from "@/src/components/lesson/MissingLetterStep";
import { SpellItGame } from "@/src/components/lesson/SpellItGame";
import { LessonResults } from "@/src/components/lesson/LessonResults";
import { EmptyState } from "@/src/components/EmptyState";
import { findLessonById, getWordsForLesson } from "@/src/services/spellingService";
import { recordWordAttempt, saveLessonResult } from "@/src/services/progressService";
import { useProfileStore } from "@/src/store/profileStore";
import { getGradeTheme } from "@/src/constants/gradeThemes";
import { colors, radii, spacing, typography } from "@/src/constants/theme";

type Phase = "intro" | "guided" | "independent" | "results";

const PHASE_STEPS: { phase: Phase; label: string }[] = [
  { phase: "intro", label: "Learn" },
  { phase: "guided", label: "Practise" },
  { phase: "independent", label: "Spell It" },
];

interface WordResult {
  wordId: string;
  correct: boolean;
}

const XP_PER_CORRECT_WORD = 10;
const COINS_PER_CORRECT_WORD = 2;

export default function LessonScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const addXp = useProfileStore((s) => s.addXp);
  const addCoins = useProfileStore((s) => s.addCoins);

  const found = findLessonById(lessonId);
  const words = found ? getWordsForLesson(found.grade, found.lesson.id) : [];
  const gradeTheme = getGradeTheme(found?.grade ?? 1);

  const [phase, setPhase] = useState<Phase>("intro");
  const [wordIndex, setWordIndex] = useState(0);
  const [results, setResults] = useState<WordResult[]>([]);
  const hasSavedResults = useRef(false);

  useEffect(() => {
    if (phase !== "results" || hasSavedResults.current || !found) return;
    hasSavedResults.current = true;

    const correctWords = results.filter((r) => r.correct).length;
    const xpEarned = correctWords * XP_PER_CORRECT_WORD;
    const coinsEarned = correctWords * COINS_PER_CORRECT_WORD;

    saveLessonResult({
      lessonId: found.lesson.id,
      completedAt: new Date().toISOString(),
      totalWords: words.length,
      correctWords,
      xpEarned,
      wordResults: results.map((r) => ({ wordId: r.wordId, correct: r.correct, attempts: 1 })),
    });
    addXp(xpEarned);
    addCoins(coinsEarned);
  }, [phase]);

  if (!found || words.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <EmptyState emoji="🔍" title="Lesson not found" message="This lesson isn't available yet." />
      </SafeAreaView>
    );
  }

  const currentWord = words[wordIndex];

  const handleIntroNext = () => {
    if (wordIndex < words.length - 1) {
      setWordIndex(wordIndex + 1);
    } else {
      setWordIndex(0);
      setPhase("guided");
    }
  };

  const handleGuidedResult = () => {
    // Guided practice is scaffolded (word mostly visible) so it's a
    // confidence-building warm-up, not scored toward mastery.
    if (wordIndex < words.length - 1) {
      setWordIndex(wordIndex + 1);
    } else {
      setWordIndex(0);
      setPhase("independent");
    }
  };

  const handleIndependentResult = (correct: boolean, attemptedSpelling: string) => {
    recordWordAttempt(currentWord.id, correct, { attemptedSpelling });
    setResults((prev) => [...prev, { wordId: currentWord.id, correct }]);

    if (wordIndex < words.length - 1) {
      setWordIndex(wordIndex + 1);
    } else {
      setPhase("results");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      {phase !== "results" ? (
        <>
          <View style={styles.topBar}>
            <Pressable onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="Close lesson">
              <Text style={styles.closeIcon}>✕</Text>
            </Pressable>
            <Text style={styles.lessonTitle}>{found.lesson.title}</Text>
            <View style={{ width: 24 }} />
          </View>
          <View style={styles.stepIndicator}>
            {PHASE_STEPS.map((step, i) => {
              const isActive = step.phase === phase;
              const isPast = PHASE_STEPS.findIndex((s) => s.phase === phase) > i;
              return (
                <View key={step.phase} style={styles.stepItem}>
                  <View
                    style={[
                      styles.stepDot,
                      { backgroundColor: isActive || isPast ? gradeTheme.accent : colors.surfaceMuted },
                    ]}
                  />
                  <Text style={[styles.stepLabel, isActive && { color: gradeTheme.accentDark, fontWeight: "800" }]}>
                    {step.label}
                  </Text>
                  {i < PHASE_STEPS.length - 1 ? <View style={styles.stepLine} /> : null}
                </View>
              );
            })}
          </View>
        </>
      ) : null}

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {phase === "intro" && (
          <WordIntroStep
            key={`intro-${currentWord.id}`}
            word={currentWord}
            grade={found.grade}
            index={wordIndex}
            total={words.length}
            accentColor={gradeTheme.accent}
            onNext={handleIntroNext}
          />
        )}
        {phase === "guided" && (
          <MissingLetterStep
            key={`guided-${currentWord.id}`}
            word={currentWord}
            grade={found.grade}
            index={wordIndex}
            total={words.length}
            accentColor={gradeTheme.accent}
            onResult={handleGuidedResult}
          />
        )}
        {phase === "independent" && (
          <SpellItGame
            key={`independent-${currentWord.id}`}
            word={currentWord}
            grade={found.grade}
            index={wordIndex}
            total={words.length}
            accentColor={gradeTheme.accent}
            onResult={handleIndependentResult}
          />
        )}
        {phase === "results" && (
          <LessonResults
            correctWords={results.filter((r) => r.correct).length}
            totalWords={words.length}
            xpEarned={results.filter((r) => r.correct).length * XP_PER_CORRECT_WORD}
            coinsEarned={results.filter((r) => r.correct).length * COINS_PER_CORRECT_WORD}
            grade={found.grade}
            onDone={() => router.replace(`/unit/${found.lesson.unitId}`)}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  closeIcon: {
    fontSize: 20,
    color: colors.textSecondary,
    width: 24,
  },
  lessonTitle: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.h3.fontWeight,
    color: colors.textPrimary,
  },
  stepIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: radii.pill,
    marginRight: spacing.xs,
  },
  stepLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: "600",
  },
  stepLine: {
    width: 20,
    height: 2,
    backgroundColor: colors.surfaceMuted,
    marginHorizontal: spacing.sm,
  },
  content: {
    padding: spacing.lg,
    flexGrow: 1,
  },
});
