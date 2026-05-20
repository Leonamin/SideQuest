import type { Quest } from "@/core/domain/quests/quest";

export interface QuestRepository {
  save(quest: Quest): Promise<void>;
  findById(id: string): Promise<Quest | null>;
  listByProjectId(projectId: string): Promise<Quest[]>;
}
