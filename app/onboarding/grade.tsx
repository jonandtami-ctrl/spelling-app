import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppButton } from "@/src/components/AppButton";
import { useOnboardingStore } from "@/src/store/onboardingStore";
import { GRADE_THEMES } from "@/src/constants/gradeThemes";
import { APP_CONFIG } from "@/src/constants/config";
import { colors, radii, spacing, typography } from "@/src/constants/theme";

const GRADES = Array.from(
  { length: APP_CONFIG.maxGrade - APP_CONFIG.minGrade + 1 },
  (_, i) => APP_CONFIG.minGrade + i
);

export default function OnboardingGrade() {
  const grade = useOnboardingStore((s) => s.grade);
  const setGrade = useOnboardingStore((s) => s.setGrade);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your grade</Text>
      <Text style={styles.subtitle}>You can always change this later.</Text>

      <FlatList
        data={GRADES}
        keyExtractor={(g) => String(g)}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const theme = GRADE_THEMES[item];
          const selected = grade === item;
          return (
            <Pressable
              onPress={() => setGrade(item)}
              accessibilityRole="button"
              accessibilityLabel={`Grade ${item}, ${theme.name}`}
              style={[
                styles.card,
                { borderColor: selected ? theme.accent : colors.border, backgroundColor: selected ? theme.soft : colors.surface },
              ]}
            >
              <Text style={styles.cardEmoji}>{theme.emoji}</Text>
              <Text style={styles.cardGrade}>Grade {item}</Text>
              <Text style={styles.cardTheme}>{theme.name}</Text>
            </Pressable>
          );
        }}
      />

      <View style={styles.footer}>
        <AppButton label="Continue" onPress={() => router.push("/onboarding/avatar")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.xl,
  },
  title: {
    fontSize: typography.h1.fontSize,
    fontWeight: typography.h1.fontWeight,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: typography.body.fontSize,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  list: {
    paddingBottom: spacing.lg,
  },
  row: {
    gap: spacing.md,
  },
  card: {
    flex: 1,
    borderWidth: 2,
    borderRadius: radii.lg,
    paddingVertical: spacing.lg,
    alignItems: "center",
    marginBottom: spacing.md,
  },
  cardEmoji: {
    fontSize: 30,
    marginBottom: spacing.xs,
  },
  cardGrade: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.h3.fontWeight,
    color: colors.textPrimary,
  },
  cardTheme: {
    fontSize: typography.caption.fontSize,
    color: colors.textSecondary,
    marginTop: 2,
  },
  footer: {
    marginTop: spacing.sm,
  },
});
