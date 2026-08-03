import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppButton } from "@/src/components/AppButton";
import { AppCard } from "@/src/components/AppCard";
import { useOnboardingStore } from "@/src/store/onboardingStore";
import { useProfileStore } from "@/src/store/profileStore";
import { createDefaultProfile, saveProfile } from "@/src/services/profileService";
import { colors, spacing, typography } from "@/src/constants/theme";
import { APP_CONFIG } from "@/src/constants/config";

export default function OnboardingPlacement() {
  const { name, grade, avatarId, speechEnabled, reset } = useOnboardingStore();
  const refreshProfile = useProfileStore((s) => s.refresh);
  const [saving, setSaving] = useState(false);

  const finishOnboarding = async () => {
    setSaving(true);
    const profile = createDefaultProfile(name, grade, avatarId, speechEnabled);
    await saveProfile(profile);
    await refreshProfile();
    reset();
    router.replace("/(tabs)/home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🎯</Text>
        <Text style={styles.title}>Want a quick placement challenge?</Text>
        <Text style={styles.subtitle}>
          Try {APP_CONFIG.placementWordCount} words and we'll recommend a starting level. Totally optional!
        </Text>

        <AppCard style={styles.comingSoonCard}>
          <Text style={styles.comingSoonEmoji}>🚧</Text>
          <Text style={styles.comingSoonTitle}>Placement Challenge</Text>
          <Text style={styles.comingSoonBody}>Coming soon! For now every speller starts at their chosen grade.</Text>
        </AppCard>
      </View>

      <View style={styles.footer}>
        <AppButton
          label={`Start at Grade ${grade}`}
          onPress={finishOnboarding}
          loading={saving}
        />
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
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  emoji: {
    fontSize: 40,
    marginBottom: spacing.md,
    textAlign: "center",
  },
  title: {
    fontSize: typography.h1.fontSize,
    fontWeight: typography.h1.fontWeight,
    color: colors.textPrimary,
    textAlign: "center",
  },
  subtitle: {
    fontSize: typography.body.fontSize,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
    textAlign: "center",
  },
  comingSoonCard: {
    alignItems: "center",
  },
  comingSoonEmoji: {
    fontSize: 28,
    marginBottom: spacing.xs,
  },
  comingSoonTitle: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.h3.fontWeight,
    color: colors.textPrimary,
  },
  comingSoonBody: {
    fontSize: typography.caption.fontSize,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    textAlign: "center",
  },
  footer: {},
});
