import type { XPLog } from "@/core/domain/xp/xp-log";

export interface XPLogRepository {
  save(xpLog: XPLog): Promise<void>;
  listByProjectId(projectId: string): Promise<XPLog[]>;
}
