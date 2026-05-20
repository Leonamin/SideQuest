"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { completeStoredQuest } from "@/core/application/use-cases/complete-stored-quest";
import { createLocalQuest } from "@/core/application/use-cases/create-local-quest";
import type { SupabaseClientPort } from "@/core/infrastructure/repositories/supabase-client-port";
import { SupabasePetRepository } from "@/core/infrastructure/repositories/supabase-pet-repository";
import { SupabaseQuestRepository } from "@/core/infrastructure/repositories/supabase-quest-repository";
import { SupabaseXPLogRepository } from "@/core/infrastructure/repositories/supabase-xp-log-repository";
import { createSupabaseServerClient } from "@/core/infrastructure/supabase/server";
import type { QuestDifficulty, QuestType } from "@/core/domain/quests/quest";

const questDifficulties: QuestDifficulty[] = ["easy", "normal", "hard", "boss"];
const questTypes: QuestType[] = ["main", "side", "daily", "bug", "chore", "boss"];

function getRequiredString(formData: FormData, key: string): string {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

function getQuestDifficulty(formData: FormData): QuestDifficulty {
  const value = getRequiredString(formData, "difficulty");

  return questDifficulties.includes(value as QuestDifficulty)
    ? (value as QuestDifficulty)
    : "normal";
}

function getQuestType(formData: FormData): QuestType {
  const value = getRequiredString(formData, "questType");

  return questTypes.includes(value as QuestType) ? (value as QuestType) : "side";
}

async function getAuthenticatedQuestClient() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return supabase as unknown as SupabaseClientPort;
}

export async function createQuestAction(formData: FormData): Promise<void> {
  const projectId = getRequiredString(formData, "projectId");
  const client = await getAuthenticatedQuestClient();

  await createLocalQuest({
    projectId,
    title: getRequiredString(formData, "title"),
    description: getRequiredString(formData, "description"),
    difficulty: getQuestDifficulty(formData),
    questType: getQuestType(formData),
    now: new Date(),
    questRepository: new SupabaseQuestRepository(client),
    createId: () => crypto.randomUUID(),
  });

  revalidatePath(`/projects/${projectId}/quests`);
}

export async function completeQuestAction(formData: FormData): Promise<void> {
  const projectId = getRequiredString(formData, "projectId");
  const questId = getRequiredString(formData, "questId");
  const client = await getAuthenticatedQuestClient();
  const path = `/projects/${projectId}/quests`;

  const result = await completeStoredQuest({
    questId,
    now: new Date(),
    questRepository: new SupabaseQuestRepository(client),
    petRepository: new SupabasePetRepository(client),
    xpLogRepository: new SupabaseXPLogRepository(client),
    createId: () => crypto.randomUUID(),
  });

  revalidatePath(path);

  if (result.xpLog) {
    redirect(`${path}?reward=${result.xpLog.amount}`);
  }

  redirect(path);
}
