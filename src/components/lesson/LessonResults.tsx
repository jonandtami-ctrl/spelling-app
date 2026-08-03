import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppButton } from "@/src/components/AppButton";
import { ResultCard } from "@/src/components/ResultCard";
import { colors, spacing, typography } from "@/src/constants/theme";

interface LessonResultsProps {
  correctWords: number;
  totalWords: number;
  xpEarned: number;
  coinsEarned: number;
  onDone: () => void;
}

export function LessonResults({ correctWords, totalWords, xpEarned, coinsEarned, onDone }: LessonResultsProps) {
  const percentage = totalWords > 0 ? Math.round((correctWords / totalWords) * 100) : 0;
  const celebratory = percentage === 100 ? "🎉" : percentage >= 70 ? "🌟" : "💪";
  const headline = percentage === 100 ? "Perfect Lesson!" : percentage >= 70 ? "Great job!" : "Nice try!";

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{celebratory}</Text>
      <Text style={styles.headline}>{headline}</Text>
      <Text style={styles.subtitle}>
        You spelled {correctWords} out of {totalWords} words correctly.
      </Text>

      <View style={styles.row}>
        <ResultCard emoji="🎯" value={`${percentage}%`} label="Score" color={colors.info} />
        <ResultCard emoji="✨" value={`+${xpEarned}`} label="XP Earned" color={colors.xp} />
        <ResultCard emoji="🪙" value={`+${coinsEarned}`} label="Coins" color={colors.coin} />
      </View>

      <AppButton label="Back to Learn" onPress={onDone} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: spacing.lg,
  },
  emoji: {
    fontSize: 56,
    textAlign: "center",
  },
  headline: {
    fontSize: typography.display.fontSize,
    fontWeight: typography.display.fontWeight,
    color: colors.textPrimary,
    textAlign: "center",
  },
  subtitle: {
    fontSize: typography.body.fontSize,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: "row",
    gap: spacing.sm,
  },
});
