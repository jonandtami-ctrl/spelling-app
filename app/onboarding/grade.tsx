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
  const selectedTheme = GRADE_THEMES[grade];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your grade</Text>
      <Text style={styles.subtitle}>This sets the word lists and difficulty. A parent can change it later in the Parent Area.</Text>

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
              accessibilityLabel={`Grade ${item}, ${theme.ageRange}, ${theme.name}`}
              accessibilityState={{ selected }}
              style={[
                styles.card,
                { borderColor: selected ? theme.accent : colors.border, backgroundColor: selected ? theme.soft : colors.surface },
              ]}
            >
              {selected ? (
                <View style={[styles.checkBadge, { backgroundColor: theme.accent }]}>
                  <Text style={styles.checkBadgeText}>✓</Text>
                </View>
              ) : null}
              <Text style={styles.cardEmoji}>{theme.emoji}</Text>
              <Text style={styles.cardGrade}>Grade {item}</Text>
              <Text style={[styles.cardAge, selected && { color: theme.accentDark }]}>{theme.ageRange}</Text>
              <Text style={styles.cardTheme}>{theme.name}</Text>
              <Text style={styles.cardFocus}>{theme.focus}</Text>
            </Pressable>
          );
        }}
      />

      <View style={[styles.selectionBanner, { backgroundColor: selectedTheme.soft, borderColor: selectedTheme.accent }]}>
        <Text style={[styles.selectionBannerText, { color: selectedTheme.accentDark }]}>
          {selectedTheme.emoji} You picked Grade {grade} · {selectedTheme.ageRange}
        </Text>
      </View>

      <View style={styles.footer}>
        <AppButton label={`Continue with Grade ${grade}`} onPress={() => router.push("/onboarding/avatar")} />
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
    position: "relative",
  },
  checkBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 22,
    height: 22,
    borderRadius: radii.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  checkBadgeText: {
    color: colors.textInverse,
    fontSize: 13,
    fontWeight: "800",
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
  cardAge: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textSecondary,
    marginTop: 2,
  },
  cardTheme: {
    fontSize: typography.caption.fontSize,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  cardFocus: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 2,
    paddingHorizontal: spacing.sm,
  },
  selectionBanner: {
    borderWidth: 2,
    borderRadius: radii.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignItems: "center",
  },
  selectionBannerText: {
    fontSize: typography.body.fontSize,
    fontWeight: "700",
  },
  footer: {
    marginTop: spacing.sm,
  },
});
