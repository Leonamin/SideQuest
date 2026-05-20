import Link from "next/link";
import { redirect } from "next/navigation";
import { getPetRoomViewModel } from "@/features/pets/presentation";
import type { SupabaseClientPort } from "@/core/infrastructure/repositories/supabase-client-port";
import { SupabasePetRepository } from "@/core/infrastructure/repositories/supabase-pet-repository";
import { SupabaseProjectRepository } from "@/core/infrastructure/repositories/supabase-project-repository";
import { SupabaseXPLogRepository } from "@/core/infrastructure/repositories/supabase-xp-log-repository";
import { createSupabaseServerClient } from "@/core/infrastructure/supabase/server";

export const dynamic = "force-dynamic";

type PetRoomPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function PetRoomPage({ params }: PetRoomPageProps) {
  const { projectId } = await params;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const client = supabase as unknown as SupabaseClientPort;
  const projectRepository = new SupabaseProjectRepository(client);
  const petRepository = new SupabasePetRepository(client);
  const xpLogRepository = new SupabaseXPLogRepository(client);
  const [project, pet, xpLogs] = await Promise.all([
    projectRepository.findById(projectId),
    petRepository.findByProjectId(projectId),
    xpLogRepository.listByProjectId(projectId),
  ]);

  if (!project) {
    redirect("/projects");
  }

  if (!pet) {
    redirect(`/projects/${projectId}/quests`);
  }

  const viewModel = getPetRoomViewModel({ pet, xpLogs });

  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-8 text-[var(--foreground)]">
      <section className="mx-auto max-w-5xl">
        <div className="flex flex-wrap gap-4">
          <Link className="font-bold text-[var(--accent)]" href="/projects">
            Back to projects
          </Link>
          <Link
            className="font-bold text-[var(--accent)]"
            href={`/projects/${projectId}/quests`}
          >
            Quest board
          </Link>
        </div>

        <header className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
            Pet Room
          </p>
          <h1 className="mt-2 text-4xl font-bold">{project.name}</h1>
        </header>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <section className="border-2 border-[var(--foreground)] bg-[var(--panel)] p-6 shadow-[8px_8px_0_var(--foreground)]">
            <div className="grid gap-8 md:grid-cols-[220px_1fr] md:items-center">
              <div className="mx-auto grid aspect-square w-full max-w-56 place-items-center border-2 border-[var(--foreground)] bg-[#d7efe7]">
                <div className="relative h-32 w-32">
                  <div className="absolute left-5 top-9 h-20 w-24 border-2 border-[var(--foreground)] bg-[#f2b45b]" />
                  <div className="absolute left-8 top-5 h-10 w-10 border-2 border-[var(--foreground)] bg-[#f2b45b]" />
                  <div className="absolute right-8 top-5 h-10 w-10 border-2 border-[var(--foreground)] bg-[#f2b45b]" />
                  <div className="absolute left-12 top-16 h-3 w-3 bg-[var(--foreground)]" />
                  <div className="absolute right-12 top-16 h-3 w-3 bg-[var(--foreground)]" />
                  <div className="absolute left-[58px] top-24 h-2 w-4 bg-[var(--accent)]" />
                </div>
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--accent)]">
                  {viewModel.stageLabel} / {viewModel.moodLabel}
                </p>
                <h2 className="mt-2 text-3xl font-bold">
                  {pet.name} Lv.{pet.level}
                </h2>
                <div className="mt-6">
                  <div className="flex justify-between text-sm font-bold">
                    <span>
                      {viewModel.currentXP} / {viewModel.requiredXP} XP
                    </span>
                    <span>{viewModel.progressPercent}%</span>
                  </div>
                  <div className="mt-2 h-5 border-2 border-[var(--foreground)] bg-white">
                    <div
                      className="h-full bg-[var(--accent)]"
                      style={{ width: `${viewModel.progressPercent}%` }}
                    />
                  </div>
                </div>
                <p className="mt-5 text-sm font-bold">
                  Lifetime XP: {viewModel.totalXP}
                </p>
              </div>
            </div>
          </section>

          <section className="border-2 border-[var(--foreground)] bg-[var(--panel)] p-5 shadow-[8px_8px_0_var(--foreground)]">
            <h2 className="text-xl font-bold">Recent rewards</h2>
            <div className="mt-5 grid gap-3">
              {viewModel.recentRewards.length ? (
                viewModel.recentRewards.map((reward) => (
                  <div
                    className="flex items-center justify-between border-2 border-[var(--foreground)] bg-white px-3 py-2"
                    key={reward.id}
                  >
                    <span className="font-bold">{reward.label}</span>
                    <span className="text-sm font-bold text-[var(--accent)]">
                      +{reward.amount} XP
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-[var(--muted)]">
                  Complete quests to fill this room with reward history.
                </p>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
