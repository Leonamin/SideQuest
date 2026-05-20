import type { PetMood } from "@/core/domain/pets/pet";

export type MoodInput = {
  hasLeveledUpNow: boolean;
  hasCompletedQuestWithin24Hours: boolean;
  hasNoActivityFor3Days: boolean;
};

export function calculateMood(input: MoodInput): PetMood {
  if (input.hasLeveledUpNow) {
    return "celebrate";
  }

  if (input.hasCompletedQuestWithin24Hours) {
    return "happy";
  }

  if (input.hasNoActivityFor3Days) {
    return "sleepy";
  }

  return "idle";
}
