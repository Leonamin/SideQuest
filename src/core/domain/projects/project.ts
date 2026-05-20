export type ProjectType = "local";

export type Project = {
  id: string;
  ownerId: string;
  name: string;
  projectType: ProjectType;
  createdAt: Date;
  updatedAt: Date;
};
