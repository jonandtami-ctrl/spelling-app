import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AppCard } from "@/src/components/AppCard";
import { colors, radii, spacing, typography } from "@/src/constants/theme";

interface GameInfo {
  emoji: string;
  title: string;
  description: string;
  available: boolean;
}

const GAMES: GameInfo[] = [
  { emoji: "⌨️", title: "Spell It", description: "Listen and type the word.", available: true },
  { emoji: "🔤", title: "Missing Letter", description: "Fill in the missing letter.", available: false },
  { emoji: "🔀", title: "Word Scramble", description: "Unscramble the letters.", available: false },
  { emoji: "✅", title: "Spelling Choice", description: "Pick the correct spelling.", available: false },
  { emoji: "🧩", title: "Word Builder", description: "Tap letters to build the word.", available: false },
  { emoji: "⏱️", title: "Speed Spell", description: "Spell as many words as you can.", available: false },
  { emoji: "🎯", title: "Word Catch", description: "Catch the correctly spelled word.", available: false },
  { emoji: "🗺️", title: "Spelling Adventure", description: "Explore a map, one word at a time.", available: false },
  { emoji: "🕵️", title: "Sentence Detective", description: "Find the misspelled word.", available: false },
  { emoji: "🔊", title: "Homophone Challenge", description: "Choose the right sound-alike word.", available: false },
];

export default function GamesScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Games</Text>
      <Text style={styles.subtitle}>Spell It is ready inside every lesson. More games are on the way!</Text>

      {GAMES.map((game) => (
        <AppCard key={game.title} style={[styles.card, !game.available && styles.cardDisabled]}>
          <Text style={styles.emoji}>{game.emoji}</Text>
          <View style={styles.textWrap}>
            <Text style={styles.gameTitle}>{game.title}</Text>
            <Text style={styles.gameDescription}>{game.description}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: game.available ? colors.success : colors.surfaceMuted }]}>
            <Text style={[styles.badgeText, { color: game.available ? colors.textInverse : colors.textSecondary }]}>
              {game.available ? "In Lessons" : "Coming Soon"}
            </Text>
          </View>
        </AppCard>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxxl,
  },
  title: {
    fontSize: typography.h1.fontSize,
    fontWeight: typography.h1.fontWeight,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: typography.body.fontSize,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  cardDisabled: {
    opacity: 0.75,
  },
  emoji: {
    fontSize: 30,
  },
  textWrap: {
    flex: 1,
  },
  gameTitle: {
    fontSize: typography.body.fontSize,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  gameDescription: {
    fontSize: typography.caption.fontSize,
    color: colors.textSecondary,
    marginTop: 2,
  },
  badge: {
    borderRadius: radii.pill,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "800",
  },
});
