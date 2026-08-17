import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LetterDiffEntry } from "@/src/services/gameEngine";
import { colors, radii, spacing } from "@/src/constants/theme";

interface WordDiffProps {
  attempt: LetterDiffEntry[];
  correct: LetterDiffEntry[];
}

/** Shows what the student typed next to the correct word, with mismatched letters highlighted — not just "wrong," but exactly where. */
export function WordDiff({ attempt, correct }: WordDiffProps) {
  return (
    <View style={styles.container}>
      {attempt.length > 0 ? (
        <View style={styles.row}>
          <Text style={styles.rowLabel}>You wrote</Text>
          <View style={styles.letters}>
            {attempt.map((entry, i) => (
              <View key={i} style={[styles.letterBox, { backgroundColor: entry.match ? colors.success + "22" : colors.warning + "22" }]}>
                <Text style={[styles.letterText, { color: entry.match ? colors.successDark : colors.warningDark }]}>
                  {entry.letter.toUpperCase()}
                </Text>
              </View>
            ))}
          </View>
        </View>
      ) : null}

      <View style={styles.row}>
        <Text style={styles.rowLabel}>Correct spelling</Text>
        <View style={styles.letters}>
          {correct.map((entry, i) => (
            <View key={i} style={[styles.letterBox, { backgroundColor: entry.match ? colors.surfaceMuted : colors.success + "22" }]}>
              <Text style={[styles.letterText, { color: entry.match ? colors.textPrimary : colors.successDark }]}>
                {entry.letter.toUpperCase()}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
    width: "100%",
    alignItems: "center",
  },
  row: {
    alignItems: "center",
    gap: spacing.xs,
  },
  rowLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textSecondary,
  },
  letters: {
    flexDirection: "row",
    gap: 4,
  },
  letterBox: {
    width: 32,
    height: 36,
    borderRadius: radii.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  letterText: {
    fontSize: 18,
    fontWeight: "800",
  },
});
