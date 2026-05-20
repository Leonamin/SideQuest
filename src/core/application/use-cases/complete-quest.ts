import { calculateMood } from "@/core/domain/pets/mood-policy";
import { applyXp, type Pet } from "@/core/domain/pets/pet";
import type { Quest } from "@/core/domain/quests/quest";
import { getDifficultyXp } from "@/core/domain/xp/xp-policy";

export type XPLog = {
  id: string;
  projectId: string;
  petId: string;
  questId: string;
  amount: number;
  reason: "quest_clear" | "boss_clear";
  createdAt: Date;
};

export type CompleteQuestInput = {
  quest: Quest;
  pet: Pet;
  now: Date;
};

export type CompleteQuestResult = {
  quest: Quest;
  pet: Pet;
  xpLog: XPLog | null;
};

export function completeQuest(input: CompleteQuestInput): CompleteQuestResult {
  if (input.quest.rewardClaimedAt) {
    return {
      quest: input.quest,
      pet: input.pet,
      xpLog: null,
    };
  }

  const amount = getDifficultyXp(input.quest.difficulty);
  const applied = applyXp(input.pet, amount, input.now);
  const mood = calculateMood({
    hasLeveledUpNow: applied.hasLeveledUp,
    hasCompletedQuestWithin24Hours: true,
    hasNoActivityFor3Days: false,
  });

  return {
    quest: {
      ...input.quest,
      status: "done",
      completedAt: input.now,
      rewardClaimedAt: input.now,
      updatedAt: input.now,
    },
    pet: {
      ...applied.pet,
      mood,
    },
    xpLog: {
      id: crypto.randomUUID(),
      projectId: input.quest.projectId,
      petId: input.pet.id,
      questId: input.quest.id,
      amount,
      reason: input.quest.difficulty === "boss" ? "boss_clear" : "quest_clear",
      createdAt: input.now,
    },
  };
}
