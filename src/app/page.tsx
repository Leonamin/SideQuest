import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-10 text-[var(--foreground)]">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl flex-col justify-between">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
            SideQuest
          </p>
          <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
            Turn local quests into pet growth.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">
            The MVP starts with a local quest board, XP rewards, and a project
            pet room before any Linear integration is added.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            className="border-2 border-[var(--foreground)] bg-[var(--foreground)] px-4 py-3 font-bold text-[var(--background)]"
            href="/login"
          >
            Enter SideQuest
          </Link>
          <Link
            className="border-2 border-[var(--foreground)] bg-white px-4 py-3 font-bold"
            href="/projects"
          >
            Project Select
          </Link>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {["Local Project", "Quest XP", "Pet Room"].map((label) => (
            <div
              key={label}
              className="border-2 border-[var(--foreground)] bg-[var(--panel)] p-4 shadow-[6px_6px_0_var(--foreground)]"
            >
              <p className="text-sm font-bold uppercase tracking-[0.12em]">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
