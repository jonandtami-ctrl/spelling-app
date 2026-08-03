import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { AppButton } from "@/src/components/AppButton";
import { colors, spacing, typography } from "@/src/constants/theme";
import { APP_CONFIG } from "@/src/constants/config";

export default function OnboardingWelcome() {
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.emoji}>🪄📖✨</Text>
        <Text style={styles.title}>{APP_CONFIG.appName}</Text>
        <Text style={styles.subtitle}>{APP_CONFIG.subtitle}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.tagline}>Let's set up your speller in under a minute!</Text>
        <AppButton label="Get Started" onPress={() => router.push("/onboarding/profile")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxxl,
  },
  hero: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 40,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.display.fontSize,
    fontWeight: typography.display.fontWeight,
    color: colors.textInverse,
    textAlign: "center",
  },
  subtitle: {
    fontSize: typography.bodyLarge.fontSize,
    fontWeight: "600",
    color: colors.primaryLight,
    marginTop: spacing.sm,
    textAlign: "center",
  },
  footer: {
    gap: spacing.lg,
  },
  tagline: {
    color: colors.textInverse,
    textAlign: "center",
    fontSize: typography.body.fontSize,
    opacity: 0.9,
  },
});
