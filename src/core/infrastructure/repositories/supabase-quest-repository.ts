import type { QuestRepository } from "@/core/application/ports/quest-repository";
import type { Quest } from "@/core/domain/quests/quest";
import {
  throwOnSupabaseError,
  type SupabaseClientPort,
} from "@/core/infrastructure/repositories/supabase-client-port";

type QuestRow = {
  id: string;
  project_id: string;
  source_type: Quest["sourceType"];
  source_issue_id: string | null;
  title: string;
  description: string | null;
  status: Quest["status"];
  quest_type: Quest["questType"];
  difficulty: Quest["difficulty"];
  priority: number | null;
  estimate: number | null;
  xp_reward: number;
  assignee_id: string | null;
  due_date: string | null;
  completed_at: string | null;
  reward_claimed_at: string | null;
  source_updated_at: string | null;
  created_at: string;
  updated_at: string;
};

export class SupabaseQuestRepository implements QuestRepository {
  constructor(private readonly client: SupabaseClientPort) {}

  async save(quest: Quest): Promise<void> {
    const result = await this.client.from("quests").upsert(toQuestRow(quest));
    throwOnSupabaseError(result);
  }

  async findById(id: string): Promise<Quest | null> {
    const result = await this.client
      .from("quests")
      .select("*")
      .eq("id", id)
      .maybeSingle<QuestRow>();
    throwOnSupabaseError(result);

    return result.data ? toQuest(result.data) : null;
  }

  async listByProjectId(projectId: string): Promise<Quest[]> {
    const result = await this.client
      .from("quests")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false });
    throwOnSupabaseError(result);

    return ((result.data as QuestRow[] | null | undefined) ?? []).map(toQuest);
  }
}

function toQuestRow(quest: Quest): QuestRow {
  return {
    id: quest.id,
    project_id: quest.projectId,
    source_type: quest.sourceType,
    source_issue_id: quest.sourceIssueId ?? null,
    title: quest.title,
    description: quest.description ?? null,
    status: quest.status,
    quest_type: quest.questType,
    difficulty: quest.difficulty,
    priority: quest.priority ?? null,
    estimate: quest.estimate ?? null,
    xp_reward: quest.xpReward,
    assignee_id: quest.assigneeId ?? null,
    due_date: quest.dueDate?.toISOString() ?? null,
    completed_at: quest.completedAt?.toISOString() ?? null,
    reward_claimed_at: quest.rewardClaimedAt?.toISOString() ?? null,
    source_updated_at: quest.sourceUpdatedAt?.toISOString() ?? null,
    created_at: quest.createdAt.toISOString(),
    updated_at: quest.updatedAt.toISOString(),
  };
}

function toQuest(row: QuestRow): Quest {
  return {
    id: row.id,
    projectId: row.project_id,
    sourceType: row.source_type,
    sourceIssueId: row.source_issue_id ?? undefined,
    title: row.title,
    description: row.description ?? undefined,
    status: row.status,
    questType: row.quest_type,
    difficulty: row.difficulty,
    priority: row.priority ?? undefined,
    estimate: row.estimate ?? undefined,
    xpReward: row.xp_reward,
    assigneeId: row.assignee_id ?? undefined,
    dueDate: row.due_date ? new Date(row.due_date) : undefined,
    completedAt: row.completed_at ? new Date(row.completed_at) : undefined,
    rewardClaimedAt: row.reward_claimed_at
      ? new Date(row.reward_claimed_at)
      : undefined,
    sourceUpdatedAt: row.source_updated_at
      ? new Date(row.source_updated_at)
      : undefined,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}
