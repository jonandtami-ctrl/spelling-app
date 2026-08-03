import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text } from "react-native";
import * as Haptics from "expo-haptics";
import { colors, radii, shadow } from "@/src/constants/theme";

export type LetterTileState = "default" | "correct" | "incorrect" | "muted";

interface LetterTileProps {
  letter: string;
  onPress?: () => void;
  state?: LetterTileState;
  disabled?: boolean;
  size?: number;
}

const STATE_COLORS: Record<LetterTileState, { bg: string; text: string; border: string }> = {
  default: { bg: colors.surface, text: colors.textPrimary, border: colors.border },
  muted: { bg: colors.surfaceMuted, text: colors.textSecondary, border: colors.surfaceMuted },
  correct: { bg: colors.success, text: colors.textInverse, border: colors.success },
  incorrect: { bg: colors.warning, text: colors.textInverse, border: colors.warning },
};

export function LetterTile({ letter, onPress, state = "default", disabled, size = 56 }: LetterTileProps) {
  const shake = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (state === "incorrect") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
      Animated.sequence([
        Animated.timing(shake, { toValue: 1, duration: 60, useNativeDriver: true }),
        Animated.timing(shake, { toValue: -1, duration: 60, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 1, duration: 60, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 0, duration: 60, useNativeDriver: true }),
      ]).start();
    }
    if (state === "correct") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    }
  }, [state]);

  const palette = STATE_COLORS[state];

  return (
    <Animated.View style={{ transform: [{ translateX: shake.interpolate({ inputRange: [-1, 1], outputRange: [-6, 6] }) }] }}>
      <Pressable
        onPress={onPress}
        disabled={disabled || !onPress}
        accessibilityRole="button"
        accessibilityLabel={`Letter ${letter}`}
        style={({ pressed }) => [
          styles.tile,
          {
            width: size,
            height: size,
            backgroundColor: palette.bg,
            borderColor: palette.border,
          },
          pressed && !disabled && styles.pressed,
        ]}
      >
        <Text style={[styles.letter, { color: palette.text, fontSize: size * 0.44 }]}>{letter.toUpperCase()}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tile: {
    borderRadius: radii.md,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    ...shadow.soft,
  },
  pressed: {
    transform: [{ scale: 0.93 }],
  },
  letter: {
    fontWeight: "800",
  },
});
