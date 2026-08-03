import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppCard } from "./AppCard";
import { ProgressBar } from "./ProgressBar";
import { colors, radii, spacing, typography } from "@/src/constants/theme";

interface UnitCardProps {
  title: string;
  description: string;
  emoji: string;
  accentColor: string;
  progress: number;
  onPress: () => void;
}

export function UnitCard({ title, description, emoji, accentColor, progress, onPress }: UnitCardProps) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={title}>
      <AppCard style={styles.card}>
        <View style={[styles.iconWrap, { backgroundColor: accentColor + "26" }]}>
          <Text style={styles.icon}>{emoji}</Text>
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.progressRow}>
            <ProgressBar progress={progress} color={accentColor} height={8} />
          </View>
        </View>
      </AppCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: radii.md,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 28,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.h3.fontWeight,
    color: colors.textPrimary,
  },
  description: {
    fontSize: typography.caption.fontSize,
    color: colors.textSecondary,
    marginTop: 2,
    marginBottom: spacing.sm,
  },
  progressRow: {
    marginTop: spacing.xs,
  },
});
