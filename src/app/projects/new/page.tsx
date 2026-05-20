import { redirect } from "next/navigation";
import { createProjectAction } from "@/features/projects/actions";
import { createSupabaseServerClient } from "@/core/infrastructure/supabase/server";

export const dynamic = "force-dynamic";

export default async function NewProjectPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-10 text-[var(--foreground)]">
      <section className="mx-auto max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
          Local Project
        </p>
        <h1 className="mt-2 text-4xl font-bold">Create a quest file.</h1>
        <form
          action={createProjectAction}
          className="mt-8 grid gap-5 border-2 border-[var(--foreground)] bg-[var(--panel)] p-5 shadow-[8px_8px_0_var(--foreground)]"
        >
          <label className="grid gap-2 text-sm font-bold">
            Project name
            <input
              className="border-2 border-[var(--foreground)] bg-white px-3 py-2"
              name="name"
              required
              maxLength={80}
            />
          </label>
          <button className="border-2 border-[var(--foreground)] bg-[var(--foreground)] px-4 py-3 font-bold text-[var(--background)]">
            Create project
          </button>
        </form>
      </section>
    </main>
  );
}
