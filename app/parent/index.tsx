import React, { useCallback, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { ParentGate } from "@/src/components/ParentGate";
import { AppCard } from "@/src/components/AppCard";
import { AppButton } from "@/src/components/AppButton";
import { useProfileStore } from "@/src/store/profileStore";
import { getAllWordProgress, getDifficultWords } from "@/src/services/progressService";
import { STORAGE_KEYS, setItem } from "@/src/services/storageService";
import { GRADE_THEMES } from "@/src/constants/gradeThemes";
import { APP_CONFIG } from "@/src/constants/config";
import { colors, radii, spacing, typography } from "@/src/constants/theme";

const ALL_GRADES = Array.from(
  { length: APP_CONFIG.maxGrade - APP_CONFIG.minGrade + 1 },
  (_, i) => APP_CONFIG.minGrade + i
);

export default function ParentAreaScreen() {
  const [unlocked, setUnlocked] = useState(false);
  const profile = useProfileStore((s) => s.profile);
  const refreshProfile = useProfileStore((s) => s.refresh);
  const setGrade = useProfileStore((s) => s.setGrade);
  const [accuracy, setAccuracy] = useState(0);
  const [mastered, setMastered] = useState(0);
  const [difficultCount, setDifficultCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const all = Object.values(await getAllWordProgress());
        const totalCorrect = all.reduce((sum, w) => sum + w.correctAttempts, 0);
        const totalAttempts = all.reduce((sum, w) => sum + w.attempts, 0);
        setAccuracy(totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0);
        setMastered(all.filter((w) => w.masteryLevel === "mastered").length);
        setDifficultCount((await getDifficultWords()).length);
      })();
    }, [])
  );

  if (!unlocked) {
    return (
      <View style={styles.gateContainer}>
        <ParentGate onUnlock={() => setUnlocked(true)} />
        <AppButton label="Cancel" variant="ghost" onPress={() => router.back()} />
      </View>
    );
  }

  const handleResetProgress = () => {
    Alert.alert(
      "Reset all progress?",
      "This clears word mastery, lesson history, and XP. This can't be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            await setItem(STORAGE_KEYS.wordProgress, {});
            await setItem(STORAGE_KEYS.lessonProgress, {});
            if (profile) {
              await setItem(STORAGE_KEYS.profile, { ...profile, xp: 0, coins: 0, level: 1, currentStreak: 0 });
            }
            await refreshProfile();
            Alert.alert("Progress reset", "All spelling progress has been cleared.");
          },
        },
      ]
    );
  };

  const currentGradeTheme = profile ? GRADE_THEMES[profile.grade] : undefined;

  const handleChangeGrade = (grade: number) => {
    if (grade === profile?.grade) return;
    const theme = GRADE_THEMES[grade];
    Alert.alert(
      `Move to Grade ${grade}?`,
      `${profile?.name ?? "Your speller"} will start seeing Grade ${grade} (${theme.ageRange}) word lists: ${theme.focus}.`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Change Grade", onPress: () => setGrade(grade) },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Parent Area</Text>

      <AppCard>
        <Text style={styles.sectionTitle}>{profile?.name}'s Overview</Text>
        <View style={styles.statsRow}>
          <Stat label="Grade" value={String(profile?.grade ?? "-")} />
          <Stat label="Accuracy" value={`${accuracy}%`} />
          <Stat label="Mastered" value={String(mastered)} />
        </View>
        <View style={styles.statsRow}>
          <Stat label="Difficult Words" value={String(difficultCount)} />
          <Stat label="Streak" value={String(profile?.currentStreak ?? 0)} />
          <Stat label="Longest Streak" value={String(profile?.longestStreak ?? 0)} />
        </View>
      </AppCard>

      <AppCard>
        <Text style={styles.sectionTitle}>Change Grade</Text>
        {currentGradeTheme ? (
          <Text style={styles.currentGradeText}>
            Currently on Grade {profile?.grade} ({currentGradeTheme.ageRange}) · {currentGradeTheme.focus}
          </Text>
        ) : null}
        <View style={styles.gradeGrid}>
          {ALL_GRADES.map((g) => {
            const theme = GRADE_THEMES[g];
            const isCurrent = g === profile?.grade;
            return (
              <Pressable
                key={g}
                onPress={() => handleChangeGrade(g)}
                accessibilityRole="button"
                accessibilityLabel={`Set grade to ${g}, ${theme.ageRange}`}
                accessibilityState={{ selected: isCurrent }}
                style={[
                  styles.gradeChip,
                  { borderColor: isCurrent ? theme.accent : colors.border, backgroundColor: isCurrent ? theme.soft : colors.surface },
                ]}
              >
                <Text style={styles.gradeChipEmoji}>{theme.emoji}</Text>
                <Text style={[styles.gradeChipLabel, isCurrent && { color: theme.accentDark }]}>Grade {g}</Text>
                <Text style={styles.gradeChipAge}>{theme.ageRange}</Text>
              </Pressable>
            );
          })}
        </View>
      </AppCard>

      <AppCard>
        <Text style={styles.sectionTitle}>Settings</Text>
        <Text style={styles.comingSoon}>
          Sound, music, dyslexia-friendly font, daily goals, and other settings are coming soon.
        </Text>
      </AppCard>

      <AppButton label="Reset All Progress" variant="outline" onPress={handleResetProgress} />
      <AppButton label="Back to Home" variant="ghost" onPress={() => router.replace("/(tabs)/home")} />
    </ScrollView>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
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
  gateContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    padding: spacing.xl,
    gap: spacing.xl,
  },
  title: {
    fontSize: typography.h1.fontSize,
    fontWeight: typography.h1.fontWeight,
    color: colors.textPrimary,
  },
  sectionTitle: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.h3.fontWeight,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  stat: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.h3.fontWeight,
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: typography.caption.fontSize,
    color: colors.textSecondary,
    textAlign: "center",
  },
  comingSoon: {
    fontSize: typography.caption.fontSize,
    color: colors.textSecondary,
  },
  currentGradeText: {
    fontSize: typography.caption.fontSize,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  gradeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  gradeChip: {
    width: "22%",
    borderWidth: 2,
    borderRadius: radii.md,
    paddingVertical: spacing.sm,
    alignItems: "center",
  },
  gradeChipEmoji: {
    fontSize: 20,
  },
  gradeChipLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.textPrimary,
    marginTop: 2,
  },
  gradeChipAge: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 1,
  },
});
