import { create } from "zustand";
import { AvatarId } from "@/src/types/profile";
import { APP_CONFIG } from "@/src/constants/config";

interface OnboardingState {
  name: string;
  grade: number;
  avatarId: AvatarId;
  speechEnabled: boolean;
  setName: (name: string) => void;
  setGrade: (grade: number) => void;
  setAvatarId: (avatarId: AvatarId) => void;
  setSpeechEnabled: (enabled: boolean) => void;
  reset: () => void;
}

const initialState = {
  name: "",
  grade: APP_CONFIG.minGrade,
  avatarId: "adventurer" as AvatarId,
  speechEnabled: true,
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  ...initialState,
  setName: (name) => set({ name }),
  setGrade: (grade) => set({ grade }),
  setAvatarId: (avatarId) => set({ avatarId }),
  setSpeechEnabled: (speechEnabled) => set({ speechEnabled }),
  reset: () => set(initialState),
}));
