import Link from "next/link";
import { redirect } from "next/navigation";
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

  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-8 text-[var(--foreground)]">
      <section className="mx-auto max-w-5xl">
        <Link className="font-bold text-[var(--accent)]" href="/projects">
          Back to projects
        </Link>
        <div className="mt-8 border-2 border-[var(--foreground)] bg-[var(--panel)] p-6 shadow-[8px_8px_0_var(--foreground)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
            Quest Board
          </p>
          <h1 className="mt-2 text-4xl font-bold">Local quest board</h1>
          <p className="mt-4 text-[var(--muted)]">
            Project {projectId} is ready for the next MVP slice: local quest
            creation and completion.
          </p>
        </div>
      </section>
    </main>
  );
}
