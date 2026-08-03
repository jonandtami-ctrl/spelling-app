import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppButton } from "@/src/components/AppButton";
import { ResultCard } from "@/src/components/ResultCard";
import { Mascot } from "@/src/components/Mascot";
import { Confetti } from "@/src/components/Confetti";
import { speakText } from "@/src/services/speechService";
import { colors, spacing, typography } from "@/src/constants/theme";

interface LessonResultsProps {
  correctWords: number;
  totalWords: number;
  xpEarned: number;
  coinsEarned: number;
  grade: number;
  onDone: () => void;
}

export function LessonResults({ correctWords, totalWords, xpEarned, coinsEarned, grade, onDone }: LessonResultsProps) {
  const percentage = totalWords > 0 ? Math.round((correctWords / totalWords) * 100) : 0;
  const celebratory = percentage === 100 ? "🎉" : percentage >= 70 ? "🌟" : "💪";
  const headline = percentage === 100 ? "Perfect Lesson!" : percentage >= 70 ? "Great job!" : "Nice try!";
  const doneWell = percentage >= 70;

  useEffect(() => {
    speakText(`${headline} You spelled ${correctWords} out of ${totalWords} words correctly.`, grade);
  }, []);

  return (
    <View style={styles.container}>
      {doneWell ? <Confetti pieceCount={22} /> : null}

      <Mascot mood={doneWell ? "celebrate" : "happy"} size={72} bounceKey={percentage} />
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
