export const colors = {
  background: "#F6F3FF",
  backgroundAlt: "#FFFFFF",
  surface: "#FFFFFF",
  surfaceMuted: "#F1EDFB",

  textPrimary: "#241B4E",
  textSecondary: "#655C8A",
  textInverse: "#FFFFFF",

  primary: "#6C3CE9",
  primaryDark: "#4B22B0",
  primaryLight: "#9B7BFF",

  secondary: "#FF7A59",
  secondaryDark: "#E85B3B",

  success: "#22C07A",
  successDark: "#189863",
  warning: "#FFB020",
  warningDark: "#D98C00",
  info: "#2FA3E0",

  xp: "#FFC93C",
  coin: "#FFD166",
  star: "#FFB020",

  border: "#E4DEFB",
  shadow: "#3A2C7A",
} as const;

export const gradientPrimary = [colors.primary, colors.primaryDark] as const;
export const gradientSunny = ["#FFD166", "#FF7A59"] as const;
export const gradientSuccess = [colors.success, colors.successDark] as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radii = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 28,
  pill: 999,
} as const;

export const typography = {
  display: { fontSize: 34, fontWeight: "800" as const, letterSpacing: -0.5 },
  h1: { fontSize: 26, fontWeight: "800" as const, letterSpacing: -0.3 },
  h2: { fontSize: 21, fontWeight: "700" as const },
  h3: { fontSize: 18, fontWeight: "700" as const },
  body: { fontSize: 16, fontWeight: "500" as const },
  bodyLarge: { fontSize: 18, fontWeight: "500" as const },
  caption: { fontSize: 13, fontWeight: "600" as const },
  button: { fontSize: 17, fontWeight: "700" as const },
};

export const shadow = {
  soft: {
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  card: {
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  button: {
    shadowColor: colors.shadow,
    shadowOpacity: 0.22,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
  },
} as const;

export const theme = { colors, spacing, radii, typography, shadow } as const;
