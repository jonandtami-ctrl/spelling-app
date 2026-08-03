import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "expo-router";
import { ResultCard } from "@/src/components/ResultCard";
import { AppCard } from "@/src/components/AppCard";
import { ProgressBar } from "@/src/components/ProgressBar";
import { useProfileStore } from "@/src/store/profileStore";
import { getAllLessonProgress, getAllWordProgress } from "@/src/services/progressService";
import { getGradeContent } from "@/src/services/spellingService";
import { colors, spacing, typography } from "@/src/constants/theme";

export default function ProgressScreen() {
  const profile = useProfileStore((s) => s.profile);
  const [wordsAttempted, setWordsAttempted] = useState(0);
  const [wordsMastered, setWordsMastered] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [lessonsCompleted, setLessonsCompleted] = useState(0);
  const [totalLessons, setTotalLessons] = useState(0);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const wordProgress = await getAllWordProgress();
        const values = Object.values(wordProgress);
        const totalCorrect = values.reduce((sum, w) => sum + w.correctAttempts, 0);
        const totalAttempts = values.reduce((sum, w) => sum + w.attempts, 0);

        setWordsAttempted(values.length);
        setWordsMastered(values.filter((w) => w.masteryLevel === "mastered").length);
        setAccuracy(totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0);

        const lessonProgress = await getAllLessonProgress();
        setLessonsCompleted(Object.values(lessonProgress).filter((l) => l.completed).length);

        if (profile) {
          setTotalLessons(getGradeContent(profile.grade).lessons.length);
        }
      })();
    }, [profile?.grade])
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Progress</Text>
      <Text style={styles.subtitle}>Here's how your spelling is growing.</Text>

      <View style={styles.row}>
        <ResultCard emoji="✅" value={String(wordsMastered)} label="Words Mastered" color={colors.success} />
        <ResultCard emoji="📝" value={String(wordsAttempted)} label="Words Practised" color={colors.primary} />
        <ResultCard emoji="🎯" value={`${accuracy}%`} label="Accuracy" color={colors.info} />
      </View>

      <AppCard>
        <Text style={styles.sectionTitle}>Grade {profile?.grade ?? 1} Lessons</Text>
        <Text style={styles.sectionValue}>
          {lessonsCompleted} / {totalLessons} completed
        </Text>
        <ProgressBar progress={totalLessons > 0 ? lessonsCompleted / totalLessons : 0} color={colors.secondary} />
      </AppCard>

      <AppCard>
        <Text style={styles.sectionTitle}>Streaks</Text>
        <View style={styles.streakRow}>
          <View>
            <Text style={styles.streakValue}>🔥 {profile?.currentStreak ?? 0}</Text>
            <Text style={styles.streakLabel}>Current Streak</Text>
          </View>
          <View>
            <Text style={styles.streakValue}>🏅 {profile?.longestStreak ?? 0}</Text>
            <Text style={styles.streakLabel}>Longest Streak</Text>
          </View>
        </View>
      </AppCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxxl,
  },
  title: {
    fontSize: typography.h1.fontSize,
    fontWeight: typography.h1.fontWeight,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: typography.body.fontSize,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.h3.fontWeight,
    color: colors.textPrimary,
  },
  sectionValue: {
    fontSize: typography.caption.fontSize,
    color: colors.textSecondary,
    marginTop: 2,
    marginBottom: spacing.sm,
  },
  streakRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  streakValue: {
    fontSize: typography.h2.fontSize,
    fontWeight: typography.h2.fontWeight,
    color: colors.textPrimary,
    textAlign: "center",
  },
  streakLabel: {
    fontSize: typography.caption.fontSize,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 2,
  },
});
