import type { Pet } from "@/core/domain/pets/pet";
import type { XPLog, XPLogReason } from "@/core/domain/xp/xp-log";
import { getRequiredXpForNextLevel } from "@/core/domain/xp/xp-policy";

export type PetRoomViewModel = {
  moodLabel: string;
  stageLabel: string;
  currentXP: number;
  requiredXP: number;
  progressPercent: number;
  totalXP: number;
  recentRewards: Array<{
    id: string;
    label: string;
    amount: number;
  }>;
};

const rewardLabels: Record<XPLogReason, string> = {
  quest_clear: "Quest clear",
  streak_bonus: "Streak bonus",
  boss_clear: "Boss clear",
  manual_adjustment: "Manual adjustment",
};

export function getPetRoomViewModel(input: {
  pet: Pet;
  xpLogs: XPLog[];
}): PetRoomViewModel {
  const requiredXP = getRequiredXpForNextLevel(input.pet.level);
  const progressPercent = Math.min(
    100,
    Math.round((input.pet.currentXP / requiredXP) * 100),
  );

  return {
    moodLabel: toTitleCase(input.pet.mood),
    stageLabel: toTitleCase(input.pet.evolutionStage),
    currentXP: input.pet.currentXP,
    requiredXP,
    progressPercent,
    totalXP: input.pet.totalXP,
    recentRewards: input.xpLogs.slice(0, 5).map((xpLog) => ({
      id: xpLog.id,
      label: rewardLabels[xpLog.reason],
      amount: xpLog.amount,
    })),
  };
}

function toTitleCase(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
