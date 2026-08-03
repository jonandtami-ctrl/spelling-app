import React from "react";
import { StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { EmptyState } from "@/src/components/EmptyState";
import { AppButton } from "@/src/components/AppButton";
import { colors, spacing } from "@/src/constants/theme";

export default function RewardsScreen() {
  return (
    <View style={styles.container}>
      <EmptyState
        emoji="🏆"
        title="Rewards are coming soon"
        message="Soon you'll earn badges, unlock avatar items, and spend coins in the reward shop."
      />
      <AppButton label="Back to Home" variant="outline" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    padding: spacing.xl,
    gap: spacing.lg,
  },
});
