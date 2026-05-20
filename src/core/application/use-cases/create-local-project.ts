import type { PetRepository } from "@/core/application/ports/pet-repository";
import type { ProjectRepository } from "@/core/application/ports/project-repository";
import type { Pet } from "@/core/domain/pets/pet";
import type { Project } from "@/core/domain/projects/project";

export type CreateLocalProjectInput = {
  ownerId: string;
  name: string;
  now: Date;
  projectRepository: ProjectRepository;
  petRepository: PetRepository;
  createId: () => string;
};

export type CreateLocalProjectResult = {
  project: Project;
  pet: Pet;
};

export async function createLocalProject(
  input: CreateLocalProjectInput,
): Promise<CreateLocalProjectResult> {
  const name = input.name.trim();

  if (!name) {
    throw new Error("Project name is required.");
  }

  const project: Project = {
    id: input.createId(),
    ownerId: input.ownerId,
    name,
    projectType: "local",
    createdAt: input.now,
    updatedAt: input.now,
  };
  const pet: Pet = {
    id: input.createId(),
    projectId: project.id,
    name: "Pixel",
    species: "hamster",
    colorVariant: "amber",
    personality: "brave",
    level: 1,
    currentXP: 0,
    totalXP: 0,
    evolutionStage: "egg",
    mood: "idle",
    createdAt: input.now,
    updatedAt: input.now,
  };

  await input.projectRepository.save(project);
  await input.petRepository.save(pet);

  return { project, pet };
}
