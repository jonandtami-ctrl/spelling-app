import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEYS = {
  profile: "epic-spelling:profile",
  settings: "epic-spelling:settings",
  wordProgress: "epic-spelling:word-progress",
  lessonProgress: "epic-spelling:lesson-progress",
  customLists: "epic-spelling:custom-lists",
  testResults: "epic-spelling:test-results",
  dailyMissions: "epic-spelling:daily-missions",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

/**
 * Thin, typed wrapper around AsyncStorage. Screens and other services should
 * always go through here rather than importing AsyncStorage directly, so
 * JSON parsing and corrupted-data handling live in exactly one place.
 */
export async function getItem<T>(key: StorageKey, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function setItem<T>(key: StorageKey, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Local storage is best-effort; a failed write should never crash a lesson.
  }
}

export async function removeItem(key: StorageKey): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch {
    // ignore
  }
}

export async function clearAll(): Promise<void> {
  try {
    await AsyncStorage.removeMany(Object.values(STORAGE_KEYS));
  } catch {
    // ignore
  }
}
