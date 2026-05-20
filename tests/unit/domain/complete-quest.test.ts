import { describe, expect, it } from "vitest";
import { completeQuest } from "@/core/application/use-cases/complete-quest";
import type { Pet } from "@/core/domain/pets/pet";
import type { Quest } from "@/core/domain/quests/quest";

const now = new Date("2026-05-20T00:00:00.000Z");

function createQuest(overrides: Partial<Quest> = {}): Quest {
  return {
    id: "quest-1",
    projectId: "project-1",
    sourceType: "local",
    title: "Ship MVP loop",
    status: "todo",
    questType: "main",
    difficulty: "hard",
    xpReward: 70,
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

function createPet(overrides: Partial<Pet> = {}): Pet {
  return {
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
    ...overrides,
  };
}

describe("completeQuest", () => {
  it("marks a local quest done, grants difficulty XP once, and sets a happy mood", () => {
    const result = completeQuest({
      now,
      quest: createQuest(),
      pet: createPet(),
    });

    expect(result.quest.status).toBe("done");
    expect(result.quest.completedAt).toEqual(now);
    expect(result.quest.rewardClaimedAt).toEqual(now);
    expect(result.pet.totalXP).toBe(70);
    expect(result.pet.currentXP).toBe(70);
    expect(result.pet.level).toBe(1);
    expect(result.pet.mood).toBe("happy");
    expect(result.xpLog).toMatchObject({
      projectId: "project-1",
      petId: "pet-1",
      questId: "quest-1",
      amount: 70,
      reason: "quest_clear",
      createdAt: now,
    });
  });

  it("levels up and celebrates when granted XP reaches the next level threshold", () => {
    const result = completeQuest({
      now,
      quest: createQuest({ difficulty: "boss", xpReward: 150 }),
      pet: createPet({ currentXP: 120, totalXP: 120 }),
    });

    expect(result.pet.level).toBe(2);
    expect(result.pet.currentXP).toBe(120);
    expect(result.pet.totalXP).toBe(270);
    expect(result.pet.evolutionStage).toBe("baby");
    expect(result.pet.mood).toBe("celebrate");
    expect(result.xpLog?.reason).toBe("boss_clear");
  });

  it("does not grant XP again when the reward has already been claimed", () => {
    const completedAt = new Date("2026-05-19T00:00:00.000Z");
    const result = completeQuest({
      now,
      quest: createQuest({
        status: "done",
        completedAt,
        rewardClaimedAt: completedAt,
      }),
      pet: createPet({ currentXP: 70, totalXP: 70, mood: "happy" }),
    });

    expect(result.quest.rewardClaimedAt).toEqual(completedAt);
    expect(result.pet.currentXP).toBe(70);
    expect(result.pet.totalXP).toBe(70);
    expect(result.pet.mood).toBe("happy");
    expect(result.xpLog).toBeNull();
  });
});
