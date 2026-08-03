export type AvatarId =
  | "adventurer"
  | "knight"
  | "princess"
  | "scientist"
  | "astronaut"
  | "athlete"
  | "artist"
  | "explorer"
  | "animal"
  | "robot";

export interface StudentProfile {
  name: string;
  grade: number;
  avatarId: AvatarId;
  speechEnabled: boolean;
  placementCompleted: boolean;
  xp: number;
  coins: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate?: string;
  createdAt: string;
}

export interface AppSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  speechEnabled: boolean;
  speedGamesEnabled: boolean;
  dyslexiaFontEnabled: boolean;
  highContrastEnabled: boolean;
  reducedMotionEnabled: boolean;
  dailyGoalMinutes: number;
  lessonLength: "short" | "standard" | "long";
}

export const DEFAULT_SETTINGS: AppSettings = {
  soundEnabled: true,
  musicEnabled: true,
  speechEnabled: true,
  speedGamesEnabled: true,
  dyslexiaFontEnabled: false,
  highContrastEnabled: false,
  reducedMotionEnabled: false,
  dailyGoalMinutes: 15,
  lessonLength: "standard",
};
