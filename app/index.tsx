import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Redirect } from "expo-router";
import { hasCompletedOnboarding } from "@/src/services/profileService";
import { colors, spacing, typography } from "@/src/constants/theme";
import { APP_CONFIG } from "@/src/constants/config";

export default function AppEntry() {
  const [checking, setChecking] = useState(true);
  const [onboarded, setOnboarded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    hasCompletedOnboarding().then((result) => {
      if (!isMounted) return;
      setOnboarded(result);
      setChecking(false);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  if (checking) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{APP_CONFIG.appName}</Text>
        <ActivityIndicator color={colors.primary} style={{ marginTop: spacing.lg }} />
      </View>
    );
  }

  return <Redirect href={onboarded ? "/(tabs)/home" : "/onboarding"} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  title: {
    fontSize: typography.display.fontSize,
    fontWeight: typography.display.fontWeight,
    color: colors.primary,
  },
});
