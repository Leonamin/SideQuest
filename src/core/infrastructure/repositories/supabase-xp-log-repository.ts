import type { XPLogRepository } from "@/core/application/ports/xp-log-repository";
import type { XPLog } from "@/core/domain/xp/xp-log";
import {
  throwOnSupabaseError,
  type SupabaseClientPort,
} from "@/core/infrastructure/repositories/supabase-client-port";

type XPLogRow = {
  id: string;
  project_id: string;
  pet_id: string;
  quest_id: string;
  amount: number;
  reason: XPLog["reason"];
  created_at: string;
};

export class SupabaseXPLogRepository implements XPLogRepository {
  constructor(private readonly client: SupabaseClientPort) {}

  async save(xpLog: XPLog): Promise<void> {
    const result = await this.client.from("xp_logs").insert(toXPLogRow(xpLog));
    throwOnSupabaseError(result);
  }

  async listByProjectId(projectId: string): Promise<XPLog[]> {
    const result = await this.client
      .from("xp_logs")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false });
    throwOnSupabaseError(result);

    return ((result.data as XPLogRow[] | null | undefined) ?? []).map(toXPLog);
  }
}

function toXPLogRow(xpLog: XPLog): XPLogRow {
  return {
    id: xpLog.id,
    project_id: xpLog.projectId,
    pet_id: xpLog.petId,
    quest_id: xpLog.questId,
    amount: xpLog.amount,
    reason: xpLog.reason,
    created_at: xpLog.createdAt.toISOString(),
  };
}

function toXPLog(row: XPLogRow): XPLog {
  return {
    id: row.id,
    projectId: row.project_id,
    petId: row.pet_id,
    questId: row.quest_id,
    amount: row.amount,
    reason: row.reason,
    createdAt: new Date(row.created_at),
  };
}
