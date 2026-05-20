import type { PetRepository } from "@/core/application/ports/pet-repository";
import type { Pet } from "@/core/domain/pets/pet";
import {
  throwOnSupabaseError,
  type SupabaseClientPort,
} from "@/core/infrastructure/repositories/supabase-client-port";

type PetRow = {
  id: string;
  project_id: string;
  name: string;
  species: Pet["species"];
  color_variant: string;
  personality: string;
  level: number;
  current_xp: number;
  total_xp: number;
  evolution_stage: Pet["evolutionStage"];
  mood: Pet["mood"];
  created_at: string;
  updated_at: string;
};

export class SupabasePetRepository implements PetRepository {
  constructor(private readonly client: SupabaseClientPort) {}

  async save(pet: Pet): Promise<void> {
    const result = await this.client.from("pets").upsert(toPetRow(pet));
    throwOnSupabaseError(result);
  }

  async findByProjectId(projectId: string): Promise<Pet | null> {
    const result = await this.client
      .from("pets")
      .select("*")
      .eq("project_id", projectId)
      .maybeSingle<PetRow>();
    throwOnSupabaseError(result);

    return result.data ? toPet(result.data) : null;
  }
}

function toPetRow(pet: Pet): PetRow {
  return {
    id: pet.id,
    project_id: pet.projectId,
    name: pet.name,
    species: pet.species,
    color_variant: pet.colorVariant,
    personality: pet.personality,
    level: pet.level,
    current_xp: pet.currentXP,
    total_xp: pet.totalXP,
    evolution_stage: pet.evolutionStage,
    mood: pet.mood,
    created_at: pet.createdAt.toISOString(),
    updated_at: pet.updatedAt.toISOString(),
  };
}

function toPet(row: PetRow): Pet {
  return {
    id: row.id,
    projectId: row.project_id,
    name: row.name,
    species: row.species,
    colorVariant: row.color_variant,
    personality: row.personality,
    level: row.level,
    currentXP: row.current_xp,
    totalXP: row.total_xp,
    evolutionStage: row.evolution_stage,
    mood: row.mood,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}
