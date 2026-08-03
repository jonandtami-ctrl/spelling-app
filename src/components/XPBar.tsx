import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ProgressBar } from "./ProgressBar";
import { colors, spacing, typography } from "@/src/constants/theme";
import { xpIntoLevel } from "@/src/services/profileService";

interface XPBarProps {
  xp: number;
}

export function XPBar({ xp }: XPBarProps) {
  const { level, xpIntoLevel: current, xpForNextLevel } = xpIntoLevel(xp);

  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.level}>Level {level}</Text>
        <Text style={styles.xpLabel}>
          {current} / {xpForNextLevel} XP
        </Text>
      </View>
      <ProgressBar progress={current / xpForNextLevel} color={colors.xp} trackColor={colors.surfaceMuted} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.xs,
  },
  level: {
    fontSize: typography.caption.fontSize,
    fontWeight: typography.h3.fontWeight,
    color: colors.textPrimary,
  },
  xpLabel: {
    fontSize: typography.caption.fontSize,
    fontWeight: typography.caption.fontWeight,
    color: colors.textSecondary,
  },
});
