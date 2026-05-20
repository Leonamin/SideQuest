import type { Project } from "@/core/domain/projects/project";

export interface ProjectRepository {
  save(project: Project): Promise<void>;
  findById(id: string): Promise<Project | null>;
  listByOwnerId(ownerId: string): Promise<Project[]>;
}
