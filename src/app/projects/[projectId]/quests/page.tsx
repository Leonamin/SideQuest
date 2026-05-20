import Link from "next/link";
import { redirect } from "next/navigation";
import { completeQuestAction, createQuestAction } from "@/features/quests/actions";
import type { SupabaseClientPort } from "@/core/infrastructure/repositories/supabase-client-port";
import { SupabasePetRepository } from "@/core/infrastructure/repositories/supabase-pet-repository";
import { SupabaseProjectRepository } from "@/core/infrastructure/repositories/supabase-project-repository";
import { SupabaseQuestRepository } from "@/core/infrastructure/repositories/supabase-quest-repository";
import { createSupabaseServerClient } from "@/core/infrastructure/supabase/server";

export const dynamic = "force-dynamic";

type QuestBoardPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function QuestBoardPage({ params }: QuestBoardPageProps) {
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
  const questRepository = new SupabaseQuestRepository(client);
  const petRepository = new SupabasePetRepository(client);
  const [project, quests, pet] = await Promise.all([
    projectRepository.findById(projectId),
    questRepository.listByProjectId(projectId),
    petRepository.findByProjectId(projectId),
  ]);

  if (!project) {
    redirect("/projects");
  }

  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-8 text-[var(--foreground)]">
      <section className="mx-auto max-w-5xl">
        <Link className="font-bold text-[var(--accent)]" href="/projects">
          Back to projects
        </Link>
        <header className="mt-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              Quest Board
            </p>
            <h1 className="mt-2 text-4xl font-bold">{project.name}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {pet ? (
              <div className="border-2 border-[var(--foreground)] bg-[var(--panel)] px-4 py-3 text-sm font-bold">
                {pet.name} Lv.{pet.level} / {pet.totalXP} XP
              </div>
            ) : null}
            <Link
              className="border-2 border-[var(--foreground)] bg-white px-4 py-3 text-sm font-bold"
              href={`/projects/${projectId}/pet`}
            >
              Pet Room
            </Link>
          </div>
        </header>

        <form
          action={createQuestAction}
          className="mt-8 grid gap-4 border-2 border-[var(--foreground)] bg-[var(--panel)] p-5 shadow-[8px_8px_0_var(--foreground)]"
        >
          <input name="projectId" type="hidden" value={projectId} />
          <div className="grid gap-4 md:grid-cols-[1fr_160px_160px]">
            <label className="grid gap-2 text-sm font-bold">
              Quest title
              <input
                className="border-2 border-[var(--foreground)] bg-white px-3 py-2"
                name="title"
                required
                maxLength={120}
              />
            </label>
            <label className="grid gap-2 text-sm font-bold">
              Difficulty
              <select
                className="border-2 border-[var(--foreground)] bg-white px-3 py-2"
                name="difficulty"
                defaultValue="normal"
              >
                <option value="easy">Easy</option>
                <option value="normal">Normal</option>
                <option value="hard">Hard</option>
                <option value="boss">Boss</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-bold">
              Type
              <select
                className="border-2 border-[var(--foreground)] bg-white px-3 py-2"
                name="questType"
                defaultValue="side"
              >
                <option value="main">Main</option>
                <option value="side">Side</option>
                <option value="daily">Daily</option>
                <option value="bug">Bug</option>
                <option value="chore">Chore</option>
                <option value="boss">Boss</option>
              </select>
            </label>
          </div>
          <label className="grid gap-2 text-sm font-bold">
            Notes
            <textarea
              className="min-h-24 border-2 border-[var(--foreground)] bg-white px-3 py-2"
              name="description"
              maxLength={500}
            />
          </label>
          <button className="w-fit border-2 border-[var(--foreground)] bg-[var(--foreground)] px-4 py-3 font-bold text-[var(--background)]">
            Add quest
          </button>
        </form>

        <div className="mt-8 grid gap-4">
          {quests.length ? (
            quests.map((quest) => (
              <article
                className="grid gap-4 border-2 border-[var(--foreground)] bg-[var(--panel)] p-4 shadow-[6px_6px_0_var(--foreground)] md:grid-cols-[1fr_auto]"
                key={quest.id}
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent)]">
                    {quest.questType} / {quest.difficulty} / {quest.xpReward} XP
                  </p>
                  <h2 className="mt-2 text-xl font-bold">{quest.title}</h2>
                  {quest.description ? (
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                      {quest.description}
                    </p>
                  ) : null}
                </div>
                <form action={completeQuestAction}>
                  <input name="projectId" type="hidden" value={projectId} />
                  <input name="questId" type="hidden" value={quest.id} />
                  <button
                    className="border-2 border-[var(--foreground)] bg-white px-4 py-2 font-bold disabled:opacity-50"
                    disabled={quest.status === "done"}
                  >
                    {quest.status === "done" ? "Done" : "Complete"}
                  </button>
                </form>
              </article>
            ))
          ) : (
            <div className="border-2 border-dashed border-[var(--foreground)] p-6">
              <p className="font-bold">No quests yet.</p>
              <p className="mt-2 text-[var(--muted)]">
                Add a local quest to start earning XP for this project pet.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
