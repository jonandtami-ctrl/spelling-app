export interface GradeTheme {
  grade: number;
  name: string;
  accent: string;
  accentDark: string;
  soft: string;
  emoji: string;
}

export const GRADE_THEMES: Record<number, GradeTheme> = {
  1: { grade: 1, name: "Sunny Meadow", accent: "#FFB020", accentDark: "#D98C00", soft: "#FFF3DA", emoji: "🌻" },
  2: { grade: 2, name: "Enchanted Forest", accent: "#22C07A", accentDark: "#189863", soft: "#DEFBEC", emoji: "🌳" },
  3: { grade: 3, name: "Ocean Adventure", accent: "#2FA3E0", accentDark: "#1E7FB5", soft: "#DEF3FF", emoji: "🌊" },
  4: { grade: 4, name: "Jungle Quest", accent: "#4CAF3D", accentDark: "#358A2A", soft: "#E5F7DE", emoji: "🐒" },
  5: { grade: 5, name: "Mountain Expedition", accent: "#5B7FDB", accentDark: "#3E5FB8", soft: "#E4EBFF", emoji: "⛰️" },
  6: { grade: 6, name: "Space Mission", accent: "#7A4FE0", accentDark: "#5A32BE", soft: "#EDE4FF", emoji: "🚀" },
  7: { grade: 7, name: "Ancient Kingdom", accent: "#C6822A", accentDark: "#9C641C", soft: "#FBEBD6", emoji: "🏰" },
  8: { grade: 8, name: "Future City", accent: "#2AC9C9", accentDark: "#1D9E9E", soft: "#DAF9F9", emoji: "🌆" },
};

export function getGradeTheme(grade: number): GradeTheme {
  return GRADE_THEMES[grade] ?? GRADE_THEMES[1];
}
