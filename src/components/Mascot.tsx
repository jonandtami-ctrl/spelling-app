import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

export type MascotMood = "idle" | "happy" | "oops" | "celebrate";

interface MascotProps {
  mood?: MascotMood;
  size?: number;
  /** Change this value to re-trigger the bounce animation (e.g. a word index or attempt count). */
  bounceKey?: string | number;
}

const MOOD_EMOJI: Record<MascotMood, string> = {
  idle: "🐝",
  happy: "🐝",
  oops: "🐝",
  celebrate: "🐝",
};

const MOOD_ACCESSORY: Record<MascotMood, string | null> = {
  idle: null,
  happy: "✨",
  oops: "💭",
  celebrate: "🎉",
};

export function Mascot({ mood = "idle", size = 56, bounceKey }: MascotProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const bounceSequence = Animated.sequence([
      Animated.spring(scale, { toValue: 1.25, useNativeDriver: true, friction: 3 }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 4 }),
    ]);

    if (mood === "celebrate") {
      Animated.parallel([
        bounceSequence,
        Animated.sequence([
          Animated.timing(rotate, { toValue: 1, duration: 150, useNativeDriver: true }),
          Animated.timing(rotate, { toValue: -1, duration: 150, useNativeDriver: true }),
          Animated.timing(rotate, { toValue: 0, duration: 150, useNativeDriver: true }),
        ]),
      ]).start();
    } else {
      bounceSequence.start();
    }
  }, [mood, bounceKey]);

  const accessory = MOOD_ACCESSORY[mood];

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          { fontSize: size },
          {
            transform: [
              { scale },
              {
                rotate: rotate.interpolate({ inputRange: [-1, 1], outputRange: ["-15deg", "15deg"] }),
              },
            ],
          },
        ]}
      >
        {MOOD_EMOJI[mood]}
      </Animated.Text>
      {accessory ? <Text style={[styles.accessory, { fontSize: size * 0.45 }]}>{accessory}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  accessory: {
    position: "absolute",
    top: -8,
    right: -8,
  },
});
