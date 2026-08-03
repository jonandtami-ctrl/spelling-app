import { create } from "zustand";
import { StudentProfile } from "@/src/types/profile";
import * as profileService from "@/src/services/profileService";

interface ProfileState {
  profile: StudentProfile | null;
  isLoading: boolean;
  hasLoaded: boolean;
  refresh: () => Promise<void>;
  addXp: (amount: number) => Promise<void>;
  addCoins: (amount: number) => Promise<void>;
  recordActivityToday: () => Promise<void>;
  setGrade: (grade: number) => Promise<void>;
  clear: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  isLoading: false,
  hasLoaded: false,
  refresh: async () => {
    set({ isLoading: true });
    const profile = await profileService.getProfile();
    set({ profile, isLoading: false, hasLoaded: true });
  },
  addXp: async (amount) => {
    const profile = await profileService.addXp(amount);
    if (profile) set({ profile });
  },
  addCoins: async (amount) => {
    const profile = await profileService.addCoins(amount);
    if (profile) set({ profile });
  },
  recordActivityToday: async () => {
    const profile = await profileService.recordActivityToday();
    if (profile) set({ profile });
  },
  setGrade: async (grade) => {
    const profile = await profileService.updateGrade(grade);
    if (profile) set({ profile });
  },
  clear: () => set({ profile: null }),
}));
