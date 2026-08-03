import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppCard } from "./AppCard";
import { colors, radii, spacing, typography } from "@/src/constants/theme";

interface LessonCardProps {
  title: string;
  wordCount: number;
  order: number;
  accentColor: string;
  completed: boolean;
  locked?: boolean;
  onPress: () => void;
}

export function LessonCard({ title, wordCount, order, accentColor, completed, locked, onPress }: LessonCardProps) {
  return (
    <Pressable onPress={onPress} disabled={locked} accessibilityRole="button" accessibilityLabel={title}>
      <AppCard style={[styles.card, locked && styles.locked]}>
        <View
          style={[
            styles.badge,
            { backgroundColor: completed ? colors.success : accentColor },
          ]}
        >
          <Text style={styles.badgeText}>{completed ? "✓" : order}</Text>
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{wordCount} words {locked ? "· Locked" : completed ? "· Completed" : ""}</Text>
        </View>
        <Text style={styles.chevron}>{locked ? "🔒" : "›"}</Text>
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
  locked: {
    opacity: 0.55,
  },
  badge: {
    width: 40,
    height: 40,
    borderRadius: radii.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: colors.textInverse,
    fontWeight: "800",
    fontSize: 16,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: typography.body.fontSize,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: typography.caption.fontSize,
    color: colors.textSecondary,
    marginTop: 2,
  },
  chevron: {
    fontSize: 20,
    color: colors.textSecondary,
  },
});
