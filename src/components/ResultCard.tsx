import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppCard } from "./AppCard";
import { colors, spacing, typography } from "@/src/constants/theme";

interface ResultCardProps {
  emoji: string;
  value: string;
  label: string;
  color?: string;
}

export function ResultCard({ emoji, value, label, color = colors.primary }: ResultCardProps) {
  return (
    <AppCard style={styles.card}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={[styles.value, { color }]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    flex: 1,
    gap: spacing.xs,
  },
  emoji: {
    fontSize: 26,
  },
  value: {
    fontSize: typography.h1.fontSize,
    fontWeight: typography.h1.fontWeight,
  },
  label: {
    fontSize: typography.caption.fontSize,
    color: colors.textSecondary,
    textAlign: "center",
  },
});
