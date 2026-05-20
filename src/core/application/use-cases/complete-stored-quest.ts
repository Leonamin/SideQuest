import type { PetRepository } from "@/core/application/ports/pet-repository";
import type { QuestRepository } from "@/core/application/ports/quest-repository";
import type { XPLogRepository } from "@/core/application/ports/xp-log-repository";
import { completeQuest, type CompleteQuestResult } from "@/core/application/use-cases/complete-quest";

export type CompleteStoredQuestInput = {
  questId: string;
  now: Date;
  questRepository: QuestRepository;
  petRepository: PetRepository;
  xpLogRepository: XPLogRepository;
  createId: () => string;
};

export async function completeStoredQuest(
  input: CompleteStoredQuestInput,
): Promise<CompleteQuestResult> {
  const quest = await input.questRepository.findById(input.questId);

  if (!quest) {
    throw new Error("Quest was not found.");
  }

  const pet = await input.petRepository.findByProjectId(quest.projectId);

  if (!pet) {
    throw new Error("Project pet was not found.");
  }

  const result = completeQuest({
    quest,
    pet,
    now: input.now,
    createId: input.createId,
  });

  await input.questRepository.save(result.quest);
  await input.petRepository.save(result.pet);

  if (result.xpLog) {
    await input.xpLogRepository.save(result.xpLog);
  }

  return result;
}
