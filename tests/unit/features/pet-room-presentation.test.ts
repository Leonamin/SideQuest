import { describe, expect, it } from "vitest";
import { getPetRoomViewModel } from "@/features/pets/presentation";
import type { Pet } from "@/core/domain/pets/pet";
import type { XPLog } from "@/core/domain/xp/xp-log";

const now = new Date("2026-05-20T00:00:00.000Z");

function createPet(overrides: Partial<Pet> = {}): Pet {
  return {
    id: "pet-1",
    projectId: "project-1",
    name: "Pixel",
    species: "hamster",
    colorVariant: "amber",
    personality: "brave",
    level: 2,
    currentXP: 75,
    totalXP: 225,
    evolutionStage: "baby",
    mood: "happy",
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

function createXPLog(overrides: Partial<XPLog> = {}): XPLog {
  return {
    id: "xp-log-1",
    projectId: "project-1",
    petId: "pet-1",
    questId: "quest-1",
    amount: 70,
    reason: "quest_clear",
    createdAt: now,
    ...overrides,
  };
}

describe("getPetRoomViewModel", () => {
  it("summarizes pet progress and recent rewards", () => {
    expect(
      getPetRoomViewModel({
        pet: createPet(),
        xpLogs: [
          createXPLog({ id: "xp-log-1", amount: 70 }),
          createXPLog({ id: "xp-log-2", amount: 30 }),
        ],
      }),
    ).toEqual({
      moodLabel: "Happy",
      stageLabel: "Baby",
      currentXP: 75,
      requiredXP: 200,
      progressPercent: 38,
      totalXP: 225,
      recentRewards: [
        { id: "xp-log-1", label: "Quest clear", amount: 70 },
        { id: "xp-log-2", label: "Quest clear", amount: 30 },
      ],
    });
  });

  it("caps progress at 100 percent", () => {
    expect(
      getPetRoomViewModel({
        pet: createPet({ currentXP: 999 }),
        xpLogs: [],
      }).progressPercent,
    ).toBe(100);
  });
});
