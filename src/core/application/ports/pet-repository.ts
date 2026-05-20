import type { Pet } from "@/core/domain/pets/pet";

export interface PetRepository {
  save(pet: Pet): Promise<void>;
  findByProjectId(projectId: string): Promise<Pet | null>;
}
