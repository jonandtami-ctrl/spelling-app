import React, { useCallback, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LessonCard } from "@/src/components/LessonCard";
import { EmptyState } from "@/src/components/EmptyState";
import { useProfileStore } from "@/src/store/profileStore";
import { getLessonsForUnit, getUnit } from "@/src/services/spellingService";
import { getAllLessonProgress } from "@/src/services/progressService";
import { getGradeTheme } from "@/src/constants/gradeThemes";
import { colors, spacing, typography } from "@/src/constants/theme";

export default function UnitScreen() {
  const { unitId } = useLocalSearchParams<{ unitId: string }>();
  const profile = useProfileStore((s) => s.profile);
  const grade = profile?.grade ?? 1;
  const gradeTheme = getGradeTheme(grade);
  const unit = getUnit(grade, unitId);
  const lessons = unit ? getLessonsForUnit(grade, unit.id) : [];
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  useFocusEffect(
    useCallback(() => {
      getAllLessonProgress().then((all) => {
        setCompletedIds(new Set(Object.keys(all).filter((id) => all[id].completed)));
      });
    }, [unitId])
  );

  if (!unit) {
    return (
      <SafeAreaView style={styles.container}>
        <BackBar onBack={() => router.back()} />
        <EmptyState emoji="🔍" title="Unit not found" message="This unit isn't available yet." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <BackBar onBack={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{unit.title}</Text>
        <Text style={styles.subtitle}>{unit.description}</Text>

        {lessons.map((lesson, index) => {
          const previousCompleted = index === 0 || completedIds.has(lessons[index - 1].id);
          return (
            <LessonCard
              key={lesson.id}
              title={lesson.title}
              wordCount={lesson.wordIds.length}
              order={lesson.order}
              accentColor={gradeTheme.accent}
              completed={completedIds.has(lesson.id)}
              locked={!previousCompleted}
              onPress={() => router.push(`/lesson/${lesson.id}`)}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

function BackBar({ onBack }: { onBack: () => void }) {
  return (
    <View style={styles.backBar}>
      <Pressable onPress={onBack} accessibilityRole="button" accessibilityLabel="Back to Learn" hitSlop={8}>
        <Text style={styles.backIcon}>‹ Learn</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backBar: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
  },
  backIcon: {
    fontSize: typography.body.fontSize,
    fontWeight: "700",
    color: colors.primary,
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
});
