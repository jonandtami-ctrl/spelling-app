import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
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
    return <EmptyState emoji="🔍" title="Unit not found" message="This unit isn't available yet." />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
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
});
