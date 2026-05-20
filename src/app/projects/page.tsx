import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut } from "@/features/auth/actions";
import type { SupabaseClientPort } from "@/core/infrastructure/repositories/supabase-client-port";
import { SupabaseProjectRepository } from "@/core/infrastructure/repositories/supabase-project-repository";
import { createSupabaseServerClient } from "@/core/infrastructure/supabase/server";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const projectRepository = new SupabaseProjectRepository(
    supabase as unknown as SupabaseClientPort,
  );
  const projects = await projectRepository.listByOwnerId(user.id);

  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-8 text-[var(--foreground)]">
      <section className="mx-auto max-w-5xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              Project Select
            </p>
            <h1 className="mt-2 text-4xl font-bold">Choose a quest file.</h1>
          </div>
          <form action={signOut}>
            <button className="border-2 border-[var(--foreground)] bg-white px-4 py-2 font-bold">
              Sign out
            </button>
          </form>
        </header>

        <div className="mt-8">
          <Link
            className="inline-block border-2 border-[var(--foreground)] bg-[var(--foreground)] px-4 py-3 font-bold text-[var(--background)] shadow-[4px_4px_0_var(--accent)]"
            href="/projects/new"
          >
            New Local Project
          </Link>
        </div>

        <div className="mt-8 grid gap-4">
          {projects.length ? (
            projects.map((project) => (
              <Link
                className="border-2 border-[var(--foreground)] bg-[var(--panel)] p-4 shadow-[6px_6px_0_var(--foreground)]"
                href={`/projects/${project.id}/quests`}
                key={project.id}
              >
                <h2 className="text-xl font-bold">{project.name}</h2>
                <p className="mt-2 text-sm uppercase tracking-[0.12em] text-[var(--muted)]">
                  {project.projectType} project
                </p>
              </Link>
            ))
          ) : (
            <div className="border-2 border-dashed border-[var(--foreground)] p-6">
              <p className="font-bold">No local projects yet.</p>
              <p className="mt-2 text-[var(--muted)]">
                Create one to hatch your first project pet.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
