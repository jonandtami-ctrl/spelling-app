import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AvatarId } from "@/src/types/profile";
import { getAvatarEmoji } from "@/src/constants/avatars";
import { colors, radii } from "@/src/constants/theme";

interface StudentAvatarProps {
  avatarId: AvatarId;
  size?: number;
  ringColor?: string;
}

export function StudentAvatar({ avatarId, size = 64, ringColor = colors.primary }: StudentAvatarProps) {
  return (
    <View
      style={[
        styles.ring,
        { width: size, height: size, borderRadius: radii.pill, borderColor: ringColor },
      ]}
    >
      <Text style={{ fontSize: size * 0.5 }}>{getAvatarEmoji(avatarId)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ring: {
    backgroundColor: colors.surfaceMuted,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
});
