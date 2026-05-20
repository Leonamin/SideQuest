export type XPLogReason =
  | "quest_clear"
  | "streak_bonus"
  | "boss_clear"
  | "manual_adjustment";

export type XPLog = {
  id: string;
  projectId: string;
  petId: string;
  questId: string;
  amount: number;
  reason: XPLogReason;
  createdAt: Date;
};
