import { describe, expect, it, vi } from "vitest";
import { createLocalProject } from "@/core/application/use-cases/create-local-project";
import type { PetRepository } from "@/core/application/ports/pet-repository";
import type { ProjectRepository } from "@/core/application/ports/project-repository";

describe("createLocalProject", () => {
  it("creates a local project and default pet for the authenticated owner", async () => {
    const now = new Date("2026-05-20T00:00:00.000Z");
    const projectRepository: ProjectRepository = {
      save: vi.fn().mockResolvedValue(undefined),
      findById: vi.fn(),
      listByOwnerId: vi.fn(),
    };
    const petRepository: PetRepository = {
      save: vi.fn().mockResolvedValue(undefined),
      findByProjectId: vi.fn(),
    };

    const result = await createLocalProject({
      ownerId: "user-1",
      name: "MVP Launch",
      now,
      projectRepository,
      petRepository,
      createId: vi
        .fn()
        .mockReturnValueOnce("project-1")
        .mockReturnValueOnce("pet-1"),
    });

    expect(result.project).toMatchObject({
      id: "project-1",
      ownerId: "user-1",
      name: "MVP Launch",
      projectType: "local",
      createdAt: now,
      updatedAt: now,
    });
    expect(result.pet).toMatchObject({
      id: "pet-1",
      projectId: "project-1",
      name: "Pixel",
      species: "hamster",
      level: 1,
      currentXP: 0,
      totalXP: 0,
      evolutionStage: "egg",
      mood: "idle",
    });
    expect(projectRepository.save).toHaveBeenCalledWith(result.project);
    expect(petRepository.save).toHaveBeenCalledWith(result.pet);
  });

  it("rejects blank project names", async () => {
    await expect(
      createLocalProject({
        ownerId: "user-1",
        name: "   ",
        now: new Date("2026-05-20T00:00:00.000Z"),
        projectRepository: {
          save: vi.fn(),
          findById: vi.fn(),
          listByOwnerId: vi.fn(),
        },
        petRepository: {
          save: vi.fn(),
          findByProjectId: vi.fn(),
        },
        createId: vi.fn(),
      }),
    ).rejects.toThrow("Project name is required.");
  });
});
