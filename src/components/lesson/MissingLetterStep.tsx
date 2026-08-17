import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppCard } from "@/src/components/AppCard";
import { AppButton } from "@/src/components/AppButton";
import { WordAudioButton } from "@/src/components/WordAudioButton";
import { ProgressBar } from "@/src/components/ProgressBar";
import { LetterTile, LetterTileState } from "@/src/components/LetterTile";
import { Mascot, MascotMood } from "@/src/components/Mascot";
import { SpellingWord } from "@/src/types/spelling";
import { speakWord } from "@/src/services/speechService";
import { buildLetterChoices, pickBlankIndex } from "@/src/services/gameEngine";
import { colors, radii, spacing, typography } from "@/src/constants/theme";

interface MissingLetterStepProps {
  word: SpellingWord;
  grade: number;
  index: number;
  total: number;
  accentColor: string;
  onResult: (correct: boolean) => void;
}

export function MissingLetterStep({ word, grade, index, total, accentColor, onResult }: MissingLetterStepProps) {
  const { blankIndex, correctLetter, choices } = useMemo(() => {
    const blank = pickBlankIndex(word.word);
    const letter = word.word[blank];
    return { blankIndex: blank, correctLetter: letter, choices: buildLetterChoices(letter, 4) };
  }, [word.id]);

  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    speakWord(word.word, grade);
  }, [word.id]);

  const submitted = selected != null;
  const wasCorrect = selected != null && selected.toLowerCase() === correctLetter.toLowerCase();
  const mood: MascotMood = !submitted ? "idle" : wasCorrect ? "happy" : "oops";

  const tileState = (letter: string): LetterTileState => {
    if (!submitted) return "default";
    if (letter === selected) return wasCorrect ? "correct" : "incorrect";
    if (letter.toLowerCase() === correctLetter.toLowerCase()) return "correct";
    return "muted";
  };

  return (
    <View style={styles.container}>
      <ProgressBar progress={(index + 1) / total} color={accentColor} />
      <Text style={styles.stepLabel}>
        Fill the Blank · Word {index + 1} of {total}
      </Text>

      <AppCard style={styles.card}>
        <Mascot mood={mood} bounceKey={`${word.id}-${selected ?? ""}`} size={40} />
        <Text style={styles.instruction}>Which letter completes the word?</Text>

        <View style={styles.wordRow}>
          {word.word.split("").map((letter, i) => (
            <View
              key={i}
              style={[
                styles.letterBox,
                i === blankIndex && { borderColor: accentColor, backgroundColor: accentColor + "14" },
              ]}
            >
              <Text style={styles.letterBoxText}>{i === blankIndex ? (submitted ? letter.toUpperCase() : "_") : letter.toUpperCase()}</Text>
            </View>
          ))}
        </View>

        <WordAudioButton label="Hear the word" size="sm" onPress={() => speakWord(word.word, grade)} />

        <View style={styles.choiceRow}>
          {choices.map((letter) => (
            <LetterTile
              key={letter}
              letter={letter}
              state={tileState(letter)}
              disabled={submitted}
              onPress={() => setSelected(letter)}
            />
          ))}
        </View>

        {submitted ? (
          <View style={{ alignItems: "center", gap: spacing.xs }}>
            <Text style={[styles.feedback, { color: wasCorrect ? colors.successDark : colors.warningDark }]}>
              {wasCorrect ? "Great pattern spotting!" : `Close! The letter is "${correctLetter.toUpperCase()}".`}
            </Text>
            {!wasCorrect && word.spellingPattern ? (
              <Text style={styles.explanation}>
                "{word.word}" follows the {word.spellingPattern} pattern — that's why "{correctLetter.toUpperCase()}" fits here.
              </Text>
            ) : null}
          </View>
        ) : null}

        {submitted ? (
          <AppButton label="Continue" onPress={() => onResult(wasCorrect)} />
        ) : null}
      </AppCard>
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
  card: {
    alignItems: "center",
    gap: spacing.md,
  },
  instruction: {
    fontSize: typography.body.fontSize,
    color: colors.textSecondary,
  },
  wordRow: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  letterBox: {
    width: 40,
    height: 48,
    borderRadius: radii.sm,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  letterBoxText: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  choiceRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  feedback: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.h3.fontWeight,
    textAlign: "center",
  },
  explanation: {
    fontSize: typography.caption.fontSize,
    color: colors.textSecondary,
    textAlign: "center",
    paddingHorizontal: spacing.md,
  },
});
