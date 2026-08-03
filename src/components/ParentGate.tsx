import React, { useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radii, spacing, typography } from "@/src/constants/theme";
import { APP_CONFIG } from "@/src/constants/config";

interface ParentGateProps {
  onUnlock: () => void;
}

export function ParentGate({ onUnlock }: ParentGateProps) {
  const [holding, setHolding] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startHold = () => {
    setHolding(true);
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration: APP_CONFIG.parentGateHoldMs,
      useNativeDriver: false,
    }).start();
    timerRef.current = setTimeout(onUnlock, APP_CONFIG.parentGateHoldMs);
  };

  const cancelHold = () => {
    setHolding(false);
    progress.setValue(0);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parent Area</Text>
      <Text style={styles.subtitle}>This section is for grown-ups.</Text>

      <Pressable
        onPressIn={startHold}
        onPressOut={cancelHold}
        accessibilityRole="button"
        accessibilityLabel="Hold for three seconds to enter the parent area"
        style={styles.button}
      >
        <Animated.View
          style={[
            styles.fill,
            {
              width: progress.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] }),
            },
          ]}
        />
        <Text style={styles.buttonText}>{holding ? "Keep holding…" : "Hold for 3 seconds"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: spacing.sm,
  },
  title: {
    fontSize: typography.h1.fontSize,
    fontWeight: typography.h1.fontWeight,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: typography.body.fontSize,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  button: {
    width: "100%",
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceMuted,
    paddingVertical: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderWidth: 2,
    borderColor: colors.border,
  },
  fill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.primaryLight,
  },
  buttonText: {
    fontSize: typography.button.fontSize,
    fontWeight: typography.button.fontWeight,
    color: colors.textPrimary,
  },
});
