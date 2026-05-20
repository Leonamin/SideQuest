import type { QuestRepository } from "@/core/application/ports/quest-repository";
import type {
  Quest,
  QuestDifficulty,
  QuestType,
} from "@/core/domain/quests/quest";
import { getDifficultyXp } from "@/core/domain/xp/xp-policy";

export type CreateLocalQuestInput = {
  projectId: string;
  title: string;
  description?: string;
  difficulty: QuestDifficulty;
  questType: QuestType;
  now: Date;
  questRepository: QuestRepository;
  createId: () => string;
};

export async function createLocalQuest(
  input: CreateLocalQuestInput,
): Promise<Quest> {
  const title = input.title.trim();
  const description = input.description?.trim();

  if (!title) {
    throw new Error("Quest title is required.");
  }

  const quest: Quest = {
    id: input.createId(),
    projectId: input.projectId,
    sourceType: "local",
    title,
    description: description || undefined,
    status: "todo",
    questType: input.questType,
    difficulty: input.difficulty,
    xpReward: getDifficultyXp(input.difficulty),
    createdAt: input.now,
    updatedAt: input.now,
  };

  await input.questRepository.save(quest);

  return quest;
}
