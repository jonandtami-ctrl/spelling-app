import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppCard } from "@/src/components/AppCard";
import { AppButton } from "@/src/components/AppButton";
import { WordAudioButton } from "@/src/components/WordAudioButton";
import { ProgressBar } from "@/src/components/ProgressBar";
import { SpellingWord } from "@/src/types/spelling";
import { speakSentence, speakWord } from "@/src/services/speechService";
import { colors, radii, spacing, typography } from "@/src/constants/theme";

interface WordIntroStepProps {
  word: SpellingWord;
  grade: number;
  index: number;
  total: number;
  accentColor: string;
  onNext: () => void;
}

export function WordIntroStep({ word, grade, index, total, accentColor, onNext }: WordIntroStepProps) {
  useEffect(() => {
    speakWord(word.word, grade, () => speakSentence(word.sentence, grade));
  }, [word.id]);

  const isLast = index === total - 1;

  return (
    <View style={styles.container}>
      <ProgressBar progress={(index + 1) / total} color={accentColor} />
      <Text style={styles.stepLabel}>
        Word {index + 1} of {total}
      </Text>

      <AppCard style={styles.wordCard}>
        <Text style={styles.word}>{word.word}</Text>
        {word.syllables && word.syllables.length > 1 ? (
          <Text style={styles.syllables}>{word.syllables.join(" · ")}</Text>
        ) : null}
        {word.spellingPattern ? (
          <View style={[styles.patternPill, { backgroundColor: accentColor + "26" }]}>
            <Text style={[styles.patternText, { color: accentColor }]}>{word.spellingPattern}</Text>
          </View>
        ) : null}

        <WordAudioButton label="Say it again" onPress={() => speakWord(word.word, grade)} />

        <Text style={styles.definitionLabel}>What it means</Text>
        <Text style={styles.definition}>{word.definition}</Text>

        <Text style={styles.definitionLabel}>In a sentence</Text>
        <Text style={styles.sentence}>"{word.sentence}"</Text>
        <WordAudioButton label="Replay sentence" size="sm" onPress={() => speakSentence(word.sentence, grade)} />
      </AppCard>

      <AppButton label={isLast ? "Start Practice" : "Next Word"} onPress={onNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  stepLabel: {
    fontSize: typography.caption.fontSize,
    color: colors.textSecondary,
    textAlign: "center",
  },
  wordCard: {
    alignItems: "center",
    gap: spacing.sm,
  },
  word: {
    fontSize: 42,
    fontWeight: "800",
    color: colors.textPrimary,
    letterSpacing: 1,
  },
  syllables: {
    fontSize: typography.body.fontSize,
    color: colors.textSecondary,
  },
  patternPill: {
    borderRadius: radii.pill,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  patternText: {
    fontWeight: "700",
    fontSize: typography.caption.fontSize,
  },
  definitionLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.textSecondary,
    letterSpacing: 0.5,
    marginTop: spacing.sm,
  },
  definition: {
    fontSize: typography.body.fontSize,
    color: colors.textPrimary,
    textAlign: "center",
  },
  sentence: {
    fontSize: typography.body.fontSize,
    color: colors.textPrimary,
    fontStyle: "italic",
    textAlign: "center",
  },
});
