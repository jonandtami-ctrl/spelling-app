import React from "react";
import { ColorValue, Text } from "react-native";
import { Tabs } from "expo-router";
import { colors } from "@/src/constants/theme";

const TAB_ICONS: Record<string, string> = {
  home: "🏠",
  learn: "📚",
  games: "🎮",
  "my-words": "⭐",
  progress: "📈",
};

function TabIcon({ name, color }: { name: string; color: ColorValue }) {
  return <Text style={{ fontSize: 22, color }}>{TAB_ICONS[name] ?? "•"}</Text>;
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          borderTopColor: colors.border,
          height: 64,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{ title: "Home", tabBarIcon: ({ color }) => <TabIcon name="home" color={color} /> }}
      />
      <Tabs.Screen
        name="learn"
        options={{ title: "Learn", tabBarIcon: ({ color }) => <TabIcon name="learn" color={color} /> }}
      />
      <Tabs.Screen
        name="games"
        options={{ title: "Games", tabBarIcon: ({ color }) => <TabIcon name="games" color={color} /> }}
      />
      <Tabs.Screen
        name="my-words"
        options={{ title: "My Words", tabBarIcon: ({ color }) => <TabIcon name="my-words" color={color} /> }}
      />
      <Tabs.Screen
        name="progress"
        options={{ title: "Progress", tabBarIcon: ({ color }) => <TabIcon name="progress" color={color} /> }}
      />
    </Tabs>
  );
}
