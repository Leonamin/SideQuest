import { getRequiredXpForNextLevel } from "@/core/domain/xp/xp-policy";

export type PetSpecies =
  | "hamster"
  | "slime"
  | "dragon"
  | "robot"
  | "cat"
  | "ghost";
export type PetEvolutionStage = "egg" | "baby" | "child";
export type PetMood = "idle" | "happy" | "sleepy" | "celebrate";

export type Pet = {
  id: string;
  projectId: string;
  name: string;
  species: PetSpecies;
  colorVariant: string;
  personality: string;
  level: number;
  currentXP: number;
  totalXP: number;
  evolutionStage: PetEvolutionStage;
  mood: PetMood;
  createdAt: Date;
  updatedAt: Date;
};

export type ApplyXpResult = {
  pet: Pet;
  hasLeveledUp: boolean;
};

export function applyXp(pet: Pet, amount: number, now: Date): ApplyXpResult {
  let level = pet.level;
  let currentXP = pet.currentXP + amount;
  let hasLeveledUp = false;

  while (currentXP >= getRequiredXpForNextLevel(level)) {
    currentXP -= getRequiredXpForNextLevel(level);
    level += 1;
    hasLeveledUp = true;
  }

  return {
    hasLeveledUp,
    pet: {
      ...pet,
      level,
      currentXP,
      totalXP: pet.totalXP + amount,
      evolutionStage: getEvolutionStage(level),
      updatedAt: now,
    },
  };
}

function getEvolutionStage(level: number): PetEvolutionStage {
  if (level >= 4) {
    return "child";
  }

  if (level >= 2) {
    return "baby";
  }

  return "egg";
}
