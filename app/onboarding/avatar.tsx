import React from "react";
import { FlatList, Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { router } from "expo-router";
import { AppButton } from "@/src/components/AppButton";
import { useOnboardingStore } from "@/src/store/onboardingStore";
import { AVATAR_OPTIONS } from "@/src/constants/avatars";
import { colors, radii, spacing, typography } from "@/src/constants/theme";

export default function OnboardingAvatar() {
  const avatarId = useOnboardingStore((s) => s.avatarId);
  const setAvatarId = useOnboardingStore((s) => s.setAvatarId);
  const speechEnabled = useOnboardingStore((s) => s.speechEnabled);
  const setSpeechEnabled = useOnboardingStore((s) => s.setSpeechEnabled);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick your avatar</Text>
      <Text style={styles.subtitle}>You can customize it more later with coins!</Text>

      <FlatList
        data={AVATAR_OPTIONS}
        keyExtractor={(a) => a.id}
        numColumns={5}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const selected = avatarId === item.id;
          return (
            <Pressable
              onPress={() => setAvatarId(item.id)}
              accessibilityRole="button"
              accessibilityLabel={item.label}
              style={[
                styles.avatarCell,
                { borderColor: selected ? colors.primary : "transparent", backgroundColor: selected ? colors.surfaceMuted : "transparent" },
              ]}
            >
              <Text style={styles.avatarEmoji}>{item.emoji}</Text>
            </Pressable>
          );
        }}
      />

      <View style={styles.speechRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.speechTitle}>Spoken instructions</Text>
          <Text style={styles.speechSubtitle}>Words and sentences are read aloud.</Text>
        </View>
        <Switch
          value={speechEnabled}
          onValueChange={setSpeechEnabled}
          trackColor={{ true: colors.primary, false: colors.border }}
        />
      </View>

      <View style={styles.footer}>
        <AppButton label="Continue" onPress={() => router.push("/onboarding/placement")} />
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
    paddingVertical: spacing.md,
  },
  avatarCell: {
    width: 56,
    height: 56,
    borderRadius: radii.pill,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    margin: spacing.xs,
  },
  avatarEmoji: {
    fontSize: 26,
  },
  speechRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.lg,
    marginTop: spacing.md,
  },
  speechTitle: {
    fontSize: typography.body.fontSize,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  speechSubtitle: {
    fontSize: typography.caption.fontSize,
    color: colors.textSecondary,
    marginTop: 2,
  },
  footer: {
    marginTop: spacing.lg,
  },
});
