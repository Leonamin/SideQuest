import { describe, expect, it, vi } from "vitest";
import { SupabaseQuestRepository } from "@/core/infrastructure/repositories/supabase-quest-repository";
import { SupabasePetRepository } from "@/core/infrastructure/repositories/supabase-pet-repository";
import { SupabaseXPLogRepository } from "@/core/infrastructure/repositories/supabase-xp-log-repository";

describe("Supabase repositories", () => {
  it("maps quest fields to snake_case rows when saving", async () => {
    const upsert = vi.fn().mockResolvedValue({ error: null });
    const client = {
      from: vi.fn().mockReturnValue({ upsert }),
    };
    const repository = new SupabaseQuestRepository(client);
    const now = new Date("2026-05-20T00:00:00.000Z");

    await repository.save({
      id: "quest-1",
      projectId: "project-1",
      sourceType: "local",
      title: "Ship MVP",
      status: "done",
      questType: "main",
      difficulty: "hard",
      xpReward: 70,
      completedAt: now,
      rewardClaimedAt: now,
      createdAt: now,
      updatedAt: now,
    });

    expect(client.from).toHaveBeenCalledWith("quests");
    expect(upsert).toHaveBeenCalledWith({
      id: "quest-1",
      project_id: "project-1",
      source_type: "local",
      source_issue_id: null,
      title: "Ship MVP",
      description: null,
      status: "done",
      quest_type: "main",
      difficulty: "hard",
      priority: null,
      estimate: null,
      xp_reward: 70,
      assignee_id: null,
      due_date: null,
      completed_at: now.toISOString(),
      reward_claimed_at: now.toISOString(),
      source_updated_at: null,
      created_at: now.toISOString(),
      updated_at: now.toISOString(),
    });
  });

  it("surfaces Supabase save errors", async () => {
    const upsert = vi
      .fn()
      .mockResolvedValue({ error: { message: "permission denied" } });
    const repository = new SupabasePetRepository({
      from: vi.fn().mockReturnValue({ upsert }),
    });
    const now = new Date("2026-05-20T00:00:00.000Z");

    await expect(
      repository.save({
        id: "pet-1",
        projectId: "project-1",
        name: "Pixel",
        species: "hamster",
        colorVariant: "amber",
        personality: "brave",
        level: 1,
        currentXP: 0,
        totalXP: 0,
        evolutionStage: "egg",
        mood: "idle",
        createdAt: now,
        updatedAt: now,
      }),
    ).rejects.toThrow("permission denied");
  });

  it("inserts XP logs without requiring update grants", async () => {
    const insert = vi.fn().mockResolvedValue({ error: null });
    const repository = new SupabaseXPLogRepository({
      from: vi.fn().mockReturnValue({ insert }),
    });
    const now = new Date("2026-05-20T00:00:00.000Z");

    await repository.save({
      id: "xp-log-1",
      projectId: "project-1",
      petId: "pet-1",
      questId: "quest-1",
      amount: 30,
      reason: "quest_clear",
      createdAt: now,
    });

    expect(insert).toHaveBeenCalledWith({
      id: "xp-log-1",
      project_id: "project-1",
      pet_id: "pet-1",
      quest_id: "quest-1",
      amount: 30,
      reason: "quest_clear",
      created_at: now.toISOString(),
    });
  });
});
