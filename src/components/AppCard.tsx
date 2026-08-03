import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { colors, radii, shadow, spacing } from "@/src/constants/theme";

interface AppCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  padded?: boolean;
  accentColor?: string;
}

export function AppCard({ children, style, padded = true, accentColor }: AppCardProps) {
  return (
    <View
      style={[
        styles.card,
        padded && styles.padded,
        accentColor ? { borderColor: accentColor, borderWidth: 2 } : null,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    ...shadow.card,
  },
  padded: {
    padding: spacing.lg,
  },
});
