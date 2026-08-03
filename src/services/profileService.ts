import { STORAGE_KEYS, getItem, removeItem, setItem } from "./storageService";
import { AvatarId, StudentProfile } from "@/src/types/profile";

export const XP_PER_LEVEL = 100;

export function xpIntoLevel(xp: number): { level: number; xpIntoLevel: number; xpForNextLevel: number } {
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const xpIntoLevelValue = xp % XP_PER_LEVEL;
  return { level, xpIntoLevel: xpIntoLevelValue, xpForNextLevel: XP_PER_LEVEL };
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export function createDefaultProfile(name: string, grade: number, avatarId: AvatarId, speechEnabled: boolean): StudentProfile {
  return {
    name,
    grade,
    avatarId,
    speechEnabled,
    placementCompleted: false,
    xp: 0,
    coins: 0,
    level: 1,
    currentStreak: 0,
    longestStreak: 0,
    createdAt: new Date().toISOString(),
  };
}

export async function getProfile(): Promise<StudentProfile | null> {
  return getItem<StudentProfile | null>(STORAGE_KEYS.profile, null);
}

export async function saveProfile(profile: StudentProfile): Promise<void> {
  await setItem(STORAGE_KEYS.profile, profile);
}

export async function hasCompletedOnboarding(): Promise<boolean> {
  const profile = await getProfile();
  return profile != null;
}

export async function addXp(amount: number): Promise<StudentProfile | null> {
  const profile = await getProfile();
  if (!profile) return null;
  const nextXp = profile.xp + amount;
  const updated: StudentProfile = {
    ...profile,
    xp: nextXp,
    level: xpIntoLevel(nextXp).level,
  };
  await saveProfile(updated);
  return updated;
}

export async function addCoins(amount: number): Promise<StudentProfile | null> {
  const profile = await getProfile();
  if (!profile) return null;
  const updated: StudentProfile = { ...profile, coins: profile.coins + amount };
  await saveProfile(updated);
  return updated;
}

export async function recordActivityToday(): Promise<StudentProfile | null> {
  const profile = await getProfile();
  if (!profile) return null;

  const today = todayIso();
  if (profile.lastActiveDate === today) return profile;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const wasYesterday = profile.lastActiveDate === yesterday.toISOString().slice(0, 10);

  const currentStreak = wasYesterday ? profile.currentStreak + 1 : 1;
  const updated: StudentProfile = {
    ...profile,
    lastActiveDate: today,
    currentStreak,
    longestStreak: Math.max(profile.longestStreak, currentStreak),
  };
  await saveProfile(updated);
  return updated;
}

export async function updateGrade(grade: number): Promise<StudentProfile | null> {
  const profile = await getProfile();
  if (!profile) return null;
  const updated: StudentProfile = { ...profile, grade };
  await saveProfile(updated);
  return updated;
}

export async function resetProfile(): Promise<void> {
  await removeItem(STORAGE_KEYS.profile);
}
