import React, { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors, radii, shadow, spacing } from "@/src/constants/theme";

interface WordAudioButtonProps {
  onPress: () => void;
  label?: string;
  size?: "sm" | "lg";
}

export function WordAudioButton({ onPress, label = "Listen", size = "lg" }: WordAudioButtonProps) {
  const [playing, setPlaying] = useState(false);

  const handlePress = () => {
    setPlaying(true);
    onPress();
    setTimeout(() => setPlaying(false), 900);
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={handlePress}
      style={({ pressed }) => [
        styles.button,
        size === "sm" && styles.buttonSm,
        playing && styles.playing,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.icon, size === "sm" && styles.iconSm]}>{playing ? "🔊" : "🔈"}</Text>
      {size === "lg" && <Text style={styles.label}>{label}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    backgroundColor: colors.info,
    borderRadius: radii.pill,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    ...shadow.soft,
  },
  buttonSm: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  playing: {
    backgroundColor: colors.primary,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  icon: {
    fontSize: 22,
  },
  iconSm: {
    fontSize: 18,
  },
  label: {
    color: colors.textInverse,
    fontWeight: "700",
    fontSize: 16,
  },
});
