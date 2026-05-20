export type QuestSourceType = "local" | "linear";
export type QuestStatus =
  | "todo"
  | "in_progress"
  | "done"
  | "archived"
  | "canceled";
export type QuestType = "main" | "side" | "daily" | "bug" | "chore" | "boss";
export type QuestDifficulty = "easy" | "normal" | "hard" | "boss";

export type Quest = {
  id: string;
  projectId: string;
  sourceType: QuestSourceType;
  sourceIssueId?: string;
  title: string;
  description?: string;
  status: QuestStatus;
  questType: QuestType;
  difficulty: QuestDifficulty;
  priority?: number;
  estimate?: number;
  xpReward: number;
  assigneeId?: string;
  dueDate?: Date;
  completedAt?: Date;
  rewardClaimedAt?: Date;
  sourceUpdatedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};
