import { AvatarId } from "@/src/types/profile";

export interface AvatarOption {
  id: AvatarId;
  emoji: string;
  label: string;
}

export const AVATAR_OPTIONS: AvatarOption[] = [
  { id: "adventurer", emoji: "🧭", label: "Adventurer" },
  { id: "knight", emoji: "🛡️", label: "Knight" },
  { id: "princess", emoji: "👑", label: "Princess" },
  { id: "scientist", emoji: "🔬", label: "Scientist" },
  { id: "astronaut", emoji: "🧑‍🚀", label: "Astronaut" },
  { id: "athlete", emoji: "⚽", label: "Athlete" },
  { id: "artist", emoji: "🎨", label: "Artist" },
  { id: "explorer", emoji: "🗺️", label: "Explorer" },
  { id: "animal", emoji: "🦁", label: "Animal Friend" },
  { id: "robot", emoji: "🤖", label: "Robot" },
];

export function getAvatarEmoji(avatarId: AvatarId): string {
  return AVATAR_OPTIONS.find((a) => a.id === avatarId)?.emoji ?? "🧭";
}
