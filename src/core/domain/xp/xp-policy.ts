import type { QuestDifficulty } from "@/core/domain/quests/quest";

const difficultyXp: Record<QuestDifficulty, number> = {
  easy: 10,
  normal: 30,
  hard: 70,
  boss: 150,
};

export function getDifficultyXp(difficulty: QuestDifficulty): number {
  return difficultyXp[difficulty];
}

export function getRequiredXpForNextLevel(level: number): number {
  return 100 + level * 50;
}
