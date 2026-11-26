export const AVATAR_IDS = [
  "AVATAR_01",
  "AVATAR_02",
  "AVATAR_03",
  "AVATAR_04",
  "AVATAR_05",
  "AVATAR_06",
  "AVATAR_07",
  "AVATAR_08",
  "AVATAR_09",
  "AVATAR_10",
] as const;

export type AvatarId = (typeof AVATAR_IDS)[number];

export const DEFAULT_AVATAR_ID: AvatarId = "AVATAR_01";
