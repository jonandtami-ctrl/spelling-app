import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { UnitCard } from "@/src/components/UnitCard";
import { EmptyState } from "@/src/components/EmptyState";
import { useProfileStore } from "@/src/store/profileStore";
import { getUnitsForGrade } from "@/src/services/spellingService";
import { getUnitCompletionRatio } from "@/src/services/progressService";
import { getGradeTheme } from "@/src/constants/gradeThemes";
import { Unit } from "@/src/types/spelling";
import { colors, spacing, typography } from "@/src/constants/theme";

export default function LearnScreen() {
  const profile = useProfileStore((s) => s.profile);
  const grade = profile?.grade ?? 1;
  const gradeTheme = getGradeTheme(grade);
  const units = getUnitsForGrade(grade);
  const [progressByUnit, setProgressByUnit] = useState<Record<string, number>>({});

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const entries = await Promise.all(
          units.map(async (unit) => [unit.id, await getUnitCompletionRatio(grade, unit.id)] as const)
        );
        setProgressByUnit(Object.fromEntries(entries));
      })();
    }, [grade, units.length])
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Learn</Text>
      <Text style={styles.subtitle}>
        Grade {grade} · {gradeTheme.name} {gradeTheme.emoji}
      </Text>

      {units.length === 0 ? (
        <EmptyState
          emoji="🛠️"
          title="More units coming soon"
          message={`Grade ${grade} lessons are still being built. Try Grade 1 for now!`}
        />
      ) : (
        units.map((unit: Unit) => (
          <UnitCard
            key={unit.id}
            title={unit.title}
            description={unit.description}
            emoji={gradeTheme.emoji}
            accentColor={gradeTheme.accent}
            progress={progressByUnit[unit.id] ?? 0}
            onPress={() => router.push(`/unit/${unit.id}`)}
          />
        ))
      )}
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
