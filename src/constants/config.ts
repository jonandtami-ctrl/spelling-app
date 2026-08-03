export const APP_CONFIG = {
  appName: "Epic Spelling",
  subtitle: "Spell. Play. Master.",
  minGrade: 1,
  maxGrade: 8,
  wordsPerLesson: 10,
  lessonsPerUnit: 3,
  unitsPerGrade: 3,
  placementWordCount: 10,
  masteryStreakToMaster: 3,
  parentGateHoldMs: 3000,
} as const;

export type SubscriptionTier = "free" | "premium";

// Every feature is unlocked during development. Callers already pass the
// real feature name and tier so gating can be turned on later without
// touching call sites.
export function canAccessFeature(
  _featureName: string,
  _subscriptionTier: SubscriptionTier = "free"
): boolean {
  return true;
}
