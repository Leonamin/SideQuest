import { describe, expect, it, vi } from "vitest";
import { createLocalQuest } from "@/core/application/use-cases/create-local-quest";
import { completeStoredQuest } from "@/core/application/use-cases/complete-stored-quest";
import type { PetRepository } from "@/core/application/ports/pet-repository";
import type { QuestRepository } from "@/core/application/ports/quest-repository";
import type { XPLogRepository } from "@/core/application/ports/xp-log-repository";
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

describe("quest board workflow", () => {
  it("creates a local quest with difficulty-based XP", async () => {
    const questRepository: QuestRepository = {
      save: vi.fn().mockResolvedValue(undefined),
      findById: vi.fn(),
      listByProjectId: vi.fn(),
    };

    const quest = await createLocalQuest({
      projectId: "project-1",
      title: "  Draft onboarding flow  ",
      description: "  Make the first pass  ",
      difficulty: "normal",
      questType: "side",
      now,
      questRepository,
      createId: () => "quest-1",
    });

    expect(quest).toMatchObject({
      id: "quest-1",
      projectId: "project-1",
      sourceType: "local",
      title: "Draft onboarding flow",
      description: "Make the first pass",
      status: "todo",
      questType: "side",
      difficulty: "normal",
      xpReward: 30,
      createdAt: now,
      updatedAt: now,
    });
    expect(questRepository.save).toHaveBeenCalledWith(quest);
  });

  it("persists quest, pet, and XP log when completing a stored quest", async () => {
    const questRepository: QuestRepository = {
      save: vi.fn().mockResolvedValue(undefined),
      findById: vi.fn().mockResolvedValue(createQuest()),
      listByProjectId: vi.fn(),
    };
    const petRepository: PetRepository = {
      save: vi.fn().mockResolvedValue(undefined),
      findByProjectId: vi.fn().mockResolvedValue(createPet()),
    };
    const xpLogRepository: XPLogRepository = {
      save: vi.fn().mockResolvedValue(undefined),
      listByProjectId: vi.fn(),
    };

    const result = await completeStoredQuest({
      questId: "quest-1",
      now,
      questRepository,
      petRepository,
      xpLogRepository,
      createId: () => "xp-log-1",
    });

    expect(result.quest.status).toBe("done");
    expect(result.pet.totalXP).toBe(70);
    expect(result.xpLog?.id).toBe("xp-log-1");
    expect(questRepository.save).toHaveBeenCalledWith(result.quest);
    expect(petRepository.save).toHaveBeenCalledWith(result.pet);
    expect(xpLogRepository.save).toHaveBeenCalledWith(result.xpLog);
  });

  it("rejects completion when the quest has no project pet", async () => {
    const questRepository: QuestRepository = {
      save: vi.fn(),
      findById: vi.fn().mockResolvedValue(createQuest()),
      listByProjectId: vi.fn(),
    };
    const petRepository: PetRepository = {
      save: vi.fn(),
      findByProjectId: vi.fn().mockResolvedValue(null),
    };

    await expect(
      completeStoredQuest({
        questId: "quest-1",
        now,
        questRepository,
        petRepository,
        xpLogRepository: {
          save: vi.fn(),
          listByProjectId: vi.fn(),
        },
        createId: () => "xp-log-1",
      }),
    ).rejects.toThrow("Project pet was not found.");
  });
});
