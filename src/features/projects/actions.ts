"use server";

import { redirect } from "next/navigation";
import { createLocalProject } from "@/core/application/use-cases/create-local-project";
import type { SupabaseClientPort } from "@/core/infrastructure/repositories/supabase-client-port";
import { SupabasePetRepository } from "@/core/infrastructure/repositories/supabase-pet-repository";
import { SupabaseProjectRepository } from "@/core/infrastructure/repositories/supabase-project-repository";
import { createSupabaseServerClient } from "@/core/infrastructure/supabase/server";

function getProjectName(formData: FormData): string {
  const value = formData.get("name");

  return typeof value === "string" ? value : "";
}

export async function createProjectAction(formData: FormData): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const client = supabase as unknown as SupabaseClientPort;
  const result = await createLocalProject({
    ownerId: user.id,
    name: getProjectName(formData),
    now: new Date(),
    projectRepository: new SupabaseProjectRepository(client),
    petRepository: new SupabasePetRepository(client),
    createId: () => crypto.randomUUID(),
  });

  redirect(`/projects/${result.project.id}/quests`);
}
