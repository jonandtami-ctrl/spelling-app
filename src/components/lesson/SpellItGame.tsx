import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import * as Haptics from "expo-haptics";
import { AppCard } from "@/src/components/AppCard";
import { AppButton } from "@/src/components/AppButton";
import { WordAudioButton } from "@/src/components/WordAudioButton";
import { ProgressBar } from "@/src/components/ProgressBar";
import { Mascot, MascotMood } from "@/src/components/Mascot";
import { Confetti } from "@/src/components/Confetti";
import { WordDiff } from "@/src/components/WordDiff";
import { SpellingWord } from "@/src/types/spelling";
import { isCorrectSpelling } from "@/src/services/spellingService";
import { speakSentence, speakText, speakWord } from "@/src/services/speechService";
import { diffWord, explainMistake, getRandomEncouragement, getRandomGentleRetry } from "@/src/services/gameEngine";
import { colors, radii, spacing, typography } from "@/src/constants/theme";

interface SpellItGameProps {
  word: SpellingWord;
  grade: number;
  index: number;
  total: number;
  accentColor: string;
  onResult: (correct: boolean, attemptedSpelling: string) => void;
}

export function SpellItGame({ word, grade, index, total, accentColor, onResult }: SpellItGameProps) {
  const [attempt, setAttempt] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    speakWord(word.word, grade, () => speakSentence(word.sentence, grade));
  }, [word.id]);

  const handleSubmit = () => {
    if (attempt.trim().length === 0) return;
    const correct = isCorrectSpelling(attempt, word);
    const feedbackMessage = correct ? getRandomEncouragement() : getRandomGentleRetry();

    setWasCorrect(correct);
    setMessage(feedbackMessage);
    setSubmitted(true);

    if (correct) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      speakText(feedbackMessage, grade);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
      speakWord(word.word, grade);
    }
  };

  const handleContinue = () => {
    onResult(wasCorrect, attempt.trim());
  };

  const mood: MascotMood = !submitted ? "idle" : wasCorrect ? "celebrate" : "oops";
  const wordDiff = submitted && !wasCorrect ? diffWord(attempt, word.word) : { attempt: [], correct: [] };

  return (
    <View style={styles.container}>
      <ProgressBar progress={(index + 1) / total} color={accentColor} />
      <Text style={styles.stepLabel}>
        Spell It · Word {index + 1} of {total}
      </Text>

      <AppCard style={styles.card}>
        {submitted && wasCorrect ? <Confetti key={`${word.id}-confetti`} pieceCount={12} /> : null}

        <Mascot mood={mood} bounceKey={`${word.id}-${submitted}`} size={48} />

        <Text style={styles.instruction}>Listen, then spell the word.</Text>

        <View style={styles.audioRow}>
          <WordAudioButton label="Word" size="sm" onPress={() => speakWord(word.word, grade)} />
          <WordAudioButton label="Sentence" size="sm" onPress={() => speakSentence(word.sentence, grade)} />
        </View>

        <TextInput
          value={attempt}
          onChangeText={setAttempt}
          editable={!submitted}
          placeholder="Type the word"
          placeholderTextColor={colors.textSecondary}
          autoCapitalize="none"
          autoCorrect={false}
          style={[
            styles.input,
            submitted && { borderColor: wasCorrect ? colors.success : colors.warning, backgroundColor: wasCorrect ? colors.success + "14" : colors.warning + "14" },
          ]}
          returnKeyType="done"
          onSubmitEditing={!submitted ? handleSubmit : undefined}
        />

        {submitted ? (
          <View style={styles.feedback}>
            <Text style={[styles.feedbackTitle, { color: wasCorrect ? colors.successDark : colors.warningDark }]}>
              {wasCorrect ? "✓ " : ""}
              {message}
            </Text>
            {!wasCorrect ? (
              <>
                <WordDiff attempt={wordDiff.attempt} correct={wordDiff.correct} />
                <Text style={styles.explanation}>{explainMistake(attempt, word.word, word.spellingPattern)}</Text>
              </>
            ) : null}
          </View>
        ) : null}

        {submitted ? (
          <AppButton label="Continue" onPress={handleContinue} />
        ) : (
          <AppButton label="Submit" onPress={handleSubmit} disabled={attempt.trim().length === 0} />
        )}
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
    gap: spacing.md,
    alignItems: "center",
  },
  instruction: {
    fontSize: typography.body.fontSize,
    color: colors.textSecondary,
  },
  audioRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  input: {
    width: "100%",
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 2,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: 24,
    fontWeight: "700",
    color: colors.textPrimary,
    textAlign: "center",
    letterSpacing: 1,
  },
  feedback: {
    alignItems: "center",
    gap: spacing.xs,
  },
  feedbackTitle: {
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
