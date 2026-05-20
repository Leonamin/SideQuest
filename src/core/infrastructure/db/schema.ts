import {
  check,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(),
  email: text("email"),
  displayName: text("display_name"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
});

export const projects = pgTable(
  "projects",
  {
    id: uuid("id").primaryKey(),
    ownerId: uuid("owner_id").notNull(),
    name: text("name").notNull(),
    projectType: text("project_type").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
  },
  (table) => [
    check("projects_project_type_check", sql`${table.projectType} in ('local')`),
  ],
);

export const pets = pgTable(
  "pets",
  {
    id: uuid("id").primaryKey(),
    projectId: uuid("project_id").notNull(),
    name: text("name").notNull(),
    species: text("species").notNull(),
    colorVariant: text("color_variant").notNull(),
    personality: text("personality").notNull(),
    level: integer("level").notNull(),
    currentXP: integer("current_xp").notNull(),
    totalXP: integer("total_xp").notNull(),
    evolutionStage: text("evolution_stage").notNull(),
    mood: text("mood").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
  },
  (table) => [
    uniqueIndex("pets_project_id_unique").on(table.projectId),
    check(
      "pets_evolution_stage_check",
      sql`${table.evolutionStage} in ('egg', 'baby', 'child')`,
    ),
    check(
      "pets_mood_check",
      sql`${table.mood} in ('idle', 'happy', 'sleepy', 'celebrate')`,
    ),
  ],
);

export const quests = pgTable("quests", {
  id: uuid("id").primaryKey(),
  projectId: uuid("project_id").notNull(),
  sourceType: text("source_type").notNull(),
  sourceIssueId: text("source_issue_id"),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status").notNull(),
  questType: text("quest_type").notNull(),
  difficulty: text("difficulty").notNull(),
  priority: integer("priority"),
  estimate: integer("estimate"),
  xpReward: integer("xp_reward").notNull(),
  assigneeId: uuid("assignee_id"),
  dueDate: timestamp("due_date", { withTimezone: true }),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  rewardClaimedAt: timestamp("reward_claimed_at", { withTimezone: true }),
  sourceUpdatedAt: timestamp("source_updated_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
});

export const xpLogs = pgTable(
  "xp_logs",
  {
    id: uuid("id").primaryKey(),
    projectId: uuid("project_id").notNull(),
    petId: uuid("pet_id").notNull(),
    questId: uuid("quest_id").notNull(),
    amount: integer("amount").notNull(),
    reason: text("reason").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  },
  (table) => [uniqueIndex("xp_logs_quest_id_unique").on(table.questId)],
);
