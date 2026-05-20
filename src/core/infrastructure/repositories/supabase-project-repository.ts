import type { ProjectRepository } from "@/core/application/ports/project-repository";
import type { Project } from "@/core/domain/projects/project";
import {
  throwOnSupabaseError,
  type SupabaseClientPort,
} from "@/core/infrastructure/repositories/supabase-client-port";

type ProjectRow = {
  id: string;
  owner_id: string;
  name: string;
  project_type: "local";
  created_at: string;
  updated_at: string;
};

export class SupabaseProjectRepository implements ProjectRepository {
  constructor(private readonly client: SupabaseClientPort) {}

  async save(project: Project): Promise<void> {
    const result = await this.client.from("projects").upsert(toProjectRow(project));
    throwOnSupabaseError(result);
  }

  async findById(id: string): Promise<Project | null> {
    const result = await this.client
      .from("projects")
      .select("*")
      .eq("id", id)
      .maybeSingle<ProjectRow>();
    throwOnSupabaseError(result);

    return result.data ? toProject(result.data) : null;
  }

  async listByOwnerId(ownerId: string): Promise<Project[]> {
    const result = await this.client
      .from("projects")
      .select("*")
      .eq("owner_id", ownerId)
      .order("created_at", { ascending: false });
    throwOnSupabaseError(result);

    return ((result.data as ProjectRow[] | null | undefined) ?? []).map(
      toProject,
    );
  }
}

function toProjectRow(project: Project): ProjectRow {
  return {
    id: project.id,
    owner_id: project.ownerId,
    name: project.name,
    project_type: project.projectType,
    created_at: project.createdAt.toISOString(),
    updated_at: project.updatedAt.toISOString(),
  };
}

function toProject(row: ProjectRow): Project {
  return {
    id: row.id,
    ownerId: row.owner_id,
    name: row.name,
    projectType: row.project_type,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}
