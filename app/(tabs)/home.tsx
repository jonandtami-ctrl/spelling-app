import React, { useCallback, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { StudentAvatar } from "@/src/components/StudentAvatar";
import { XPBar } from "@/src/components/XPBar";
import { AppCard } from "@/src/components/AppCard";
import { AppButton } from "@/src/components/AppButton";
import { useProfileStore } from "@/src/store/profileStore";
import { getGradeTheme } from "@/src/constants/gradeThemes";
import { getNextLessonId } from "@/src/services/progressService";
import { colors, radii, spacing, typography } from "@/src/constants/theme";

interface QuickAction {
  key: string;
  label: string;
  emoji: string;
  onPress: () => void;
}

export default function HomeScreen() {
  const profile = useProfileStore((s) => s.profile);
  const refresh = useProfileStore((s) => s.refresh);
  const recordActivityToday = useProfileStore((s) => s.recordActivityToday);
  const [nextLessonId, setNextLessonId] = useState<string | undefined>();

  useFocusEffect(
    useCallback(() => {
      refresh();
      recordActivityToday();
    }, [refresh, recordActivityToday])
  );

  useFocusEffect(
    useCallback(() => {
      if (!profile) return;
      getGradeContentSafe(profile.grade);
    }, [profile?.grade])
  );

  async function getGradeContentSafe(grade: number) {
    const lessonId = await getNextLessonId(grade);
    setNextLessonId(lessonId);
  }

  if (!profile) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Loading your profile…</Text>
      </View>
    );
  }

  const gradeTheme = getGradeTheme(profile.grade);

  const quickActions: QuickAction[] = [
    {
      key: "continue",
      label: "Continue Learning",
      emoji: "📖",
      onPress: () => (nextLessonId ? router.push(`/lesson/${nextLessonId}`) : router.push("/(tabs)/learn")),
    },
    { key: "practice", label: "Practice My Words", emoji: "⭐", onPress: () => router.push("/(tabs)/my-words") },
    { key: "games", label: "Games", emoji: "🎮", onPress: () => router.push("/(tabs)/games") },
    { key: "progress", label: "Progress", emoji: "📈", onPress: () => router.push("/(tabs)/progress") },
    { key: "rewards", label: "Rewards", emoji: "🏆", onPress: () => router.push("/rewards") },
    { key: "parent", label: "Parent Area", emoji: "🔒", onPress: () => router.push("/parent") },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <StudentAvatar avatarId={profile.avatarId} size={64} ringColor={gradeTheme.accent} />
        <View style={styles.headerText}>
          <Text style={styles.greeting}>Hi, {profile.name}! {gradeTheme.emoji}</Text>
          <View style={[styles.gradePill, { backgroundColor: gradeTheme.soft }]}>
            <Text style={[styles.gradePillText, { color: gradeTheme.accentDark }]}>
              Grade {profile.grade} · {gradeTheme.ageRange} · {gradeTheme.name}
            </Text>
          </View>
        </View>
      </View>

      <AppCard>
        <XPBar xp={profile.xp} />
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statEmoji}>🔥</Text>
            <Text style={styles.statValue}>{profile.currentStreak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statEmoji}>🪙</Text>
            <Text style={styles.statValue}>{profile.coins}</Text>
            <Text style={styles.statLabel}>Coins</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statEmoji}>⭐</Text>
            <Text style={styles.statValue}>{Math.floor(profile.xp / 10)}</Text>
            <Text style={styles.statLabel}>Stars</Text>
          </View>
        </View>
      </AppCard>

      <AppCard accentColor={gradeTheme.accent} style={styles.missionCard}>
        <Text style={styles.missionEyebrow}>TODAY'S MISSION</Text>
        <Text style={styles.missionTitle}>Complete a lesson to keep your streak going!</Text>
        <AppButton
          label="Start Mission"
          size="md"
          onPress={() => (nextLessonId ? router.push(`/lesson/${nextLessonId}`) : router.push("/(tabs)/learn"))}
        />
      </AppCard>

      <View style={styles.grid}>
        {quickActions.map((action) => (
          <Pressable key={action.key} onPress={action.onPress} style={styles.gridItem} accessibilityRole="button" accessibilityLabel={action.label}>
            <View style={[styles.gridIconWrap, { backgroundColor: gradeTheme.soft }]}>
              <Text style={styles.gridEmoji}>{action.emoji}</Text>
            </View>
            <Text style={styles.gridLabel}>{action.label}</Text>
          </Pressable>
        ))}
      </View>
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
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  loadingText: {
    color: colors.textSecondary,
    fontSize: typography.body.fontSize,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.xs,
  },
  headerText: {
    flex: 1,
  },
  greeting: {
    fontSize: typography.h1.fontSize,
    fontWeight: typography.h1.fontWeight,
    color: colors.textPrimary,
  },
  gradePill: {
    alignSelf: "flex-start",
    borderRadius: radii.pill,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    marginTop: spacing.xs,
  },
  gradePillText: {
    fontSize: typography.caption.fontSize,
    fontWeight: "700",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.lg,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statEmoji: {
    fontSize: 22,
  },
  statValue: {
    fontSize: typography.h2.fontSize,
    fontWeight: typography.h2.fontWeight,
    color: colors.textPrimary,
    marginTop: 2,
  },
  statLabel: {
    fontSize: typography.caption.fontSize,
    color: colors.textSecondary,
  },
  missionCard: {
    gap: spacing.sm,
  },
  missionEyebrow: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },
  missionTitle: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.h3.fontWeight,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  gridItem: {
    width: "30%",
    alignItems: "center",
    gap: spacing.xs,
  },
  gridIconWrap: {
    width: 56,
    height: 56,
    borderRadius: radii.md,
    alignItems: "center",
    justifyContent: "center",
  },
  gridEmoji: {
    fontSize: 26,
  },
  gridLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textPrimary,
    textAlign: "center",
  },
});
