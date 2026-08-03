import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet } from "react-native";

interface ConfettiProps {
  pieceCount?: number;
}

const PIECES = ["🎉", "✨", "⭐", "🎊", "💛", "🟣"];

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

/**
 * A lightweight, self-contained celebration burst. Mount it (optionally with
 * a changing `key` prop from the parent) to replay the animation — it runs
 * once and settles, no external timers or cleanup required from the caller.
 */
export function Confetti({ pieceCount = 14 }: ConfettiProps) {
  const pieces = useRef(
    Array.from({ length: pieceCount }, () => ({
      emoji: PIECES[Math.floor(Math.random() * PIECES.length)],
      left: randomBetween(2, 92),
      delay: randomBetween(0, 200),
      duration: randomBetween(900, 1400),
      drift: randomBetween(-40, 40),
      rotation: randomBetween(-180, 180),
      progress: new Animated.Value(0),
    }))
  ).current;

  useEffect(() => {
    const animations = pieces.map((piece) =>
      Animated.timing(piece.progress, {
        toValue: 1,
        duration: piece.duration,
        delay: piece.delay,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      })
    );
    Animated.stagger(20, animations).start();
  }, []);

  return (
    <Animated.View style={StyleSheet.absoluteFill} pointerEvents="none">
      {pieces.map((piece, i) => (
        <Animated.Text
          key={i}
          style={[
            styles.piece,
            {
              left: `${piece.left}%`,
              opacity: piece.progress.interpolate({ inputRange: [0, 0.85, 1], outputRange: [1, 1, 0] }),
              transform: [
                { translateY: piece.progress.interpolate({ inputRange: [0, 1], outputRange: [0, 220] }) },
                { translateX: piece.progress.interpolate({ inputRange: [0, 1], outputRange: [0, piece.drift] }) },
                {
                  rotate: piece.progress.interpolate({ inputRange: [0, 1], outputRange: ["0deg", `${piece.rotation}deg`] }),
                },
              ],
            },
          ]}
        >
          {piece.emoji}
        </Animated.Text>
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  piece: {
    position: "absolute",
    top: 0,
    fontSize: 20,
  },
});
