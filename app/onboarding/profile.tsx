import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { AppButton } from "@/src/components/AppButton";
import { useOnboardingStore } from "@/src/store/onboardingStore";
import { colors, radii, spacing, typography } from "@/src/constants/theme";

export default function OnboardingProfile() {
  const name = useOnboardingStore((s) => s.name);
  const setName = useOnboardingStore((s) => s.setName);
  const [localName, setLocalName] = useState(name);

  const canContinue = localName.trim().length > 0;

  const handleContinue = () => {
    setName(localName.trim());
    router.push("/onboarding/grade");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.content}>
        <Text style={styles.emoji}>👋</Text>
        <Text style={styles.title}>What's your first name?</Text>
        <Text style={styles.subtitle}>We'll use it to cheer you on!</Text>

        <TextInput
          value={localName}
          onChangeText={setLocalName}
          placeholder="Type your name"
          placeholderTextColor={colors.textSecondary}
          style={styles.input}
          autoFocus
          maxLength={20}
          returnKeyType="done"
          onSubmitEditing={canContinue ? handleContinue : undefined}
        />
      </View>

      <View style={styles.footer}>
        <AppButton label="Continue" onPress={handleContinue} disabled={!canContinue} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxxl,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  emoji: {
    fontSize: 40,
    marginBottom: spacing.md,
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
    marginBottom: spacing.xl,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 2,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: typography.h3.fontSize,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  footer: {},
});
