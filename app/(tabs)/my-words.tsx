import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "expo-router";
import { EmptyState } from "@/src/components/EmptyState";
import { AppCard } from "@/src/components/AppCard";
import { getDifficultWords } from "@/src/services/progressService";
import { WordProgress } from "@/src/types/spelling";
import { colors, radii, spacing, typography } from "@/src/constants/theme";

export default function MyWordsScreen() {
  const [difficultWords, setDifficultWords] = useState<WordProgress[]>([]);

  useFocusEffect(
    useCallback(() => {
      getDifficultWords().then(setDifficultWords);
    }, [])
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>My Spelling Words</Text>
      <Text style={styles.subtitle}>Custom lists and weekly tests are coming soon.</Text>

      <AppCard>
        <Text style={styles.sectionTitle}>Difficult Words</Text>
        {difficultWords.length === 0 ? (
          <EmptyState emoji="🌟" title="No tricky words yet" message="Words you find tricky will show up here so you can practise them again." />
        ) : (
          <View style={styles.chipWrap}>
            {difficultWords.map((w) => (
              <View key={w.wordId} style={styles.chip}>
                <Text style={styles.chipText}>{w.wordId.split("-").pop()}</Text>
              </View>
            ))}
          </View>
        )}
      </AppCard>

      <AppCard style={styles.comingSoonCard}>
        <Text style={styles.comingSoonEmoji}>🚧</Text>
        <Text style={styles.sectionTitle}>Create Your Own List</Text>
        <Text style={styles.comingSoonBody}>Coming soon: build custom spelling lists, set test dates, and take practice tests.</Text>
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
  sectionTitle: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.h3.fontWeight,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  chipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  chip: {
    backgroundColor: colors.warning + "26",
    borderRadius: radii.pill,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  chipText: {
    color: colors.warningDark,
    fontWeight: "700",
    fontSize: typography.caption.fontSize,
  },
  comingSoonCard: {
    alignItems: "center",
    gap: spacing.xs,
  },
  comingSoonEmoji: {
    fontSize: 26,
  },
  comingSoonBody: {
    fontSize: typography.caption.fontSize,
    color: colors.textSecondary,
    textAlign: "center",
  },
});
