import { signInWithPassword, signUpWithPassword } from "@/features/auth/actions";

export const dynamic = "force-dynamic";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-10 text-[var(--foreground)]">
      <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-5xl gap-8 md:grid-cols-[1fr_360px] md:items-center">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
            SideQuest Guild Gate
          </p>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight sm:text-6xl">
            Sign in before your project pet wakes up.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">
            The MVP keeps the loop focused: one user, local projects, local
            quests, and a pet that grows from completed work.
          </p>
        </div>

        <div className="border-2 border-[var(--foreground)] bg-[var(--panel)] p-5 shadow-[8px_8px_0_var(--foreground)]">
          <h2 className="text-xl font-bold">Account</h2>
          {params.error ? (
            <p className="mt-3 border border-[var(--accent)] bg-white p-3 text-sm text-[var(--accent)]">
              {params.error}
            </p>
          ) : null}
          <form className="mt-5 grid gap-4">
            <label className="grid gap-2 text-sm font-bold">
              Email
              <input
                className="border-2 border-[var(--foreground)] bg-white px-3 py-2"
                name="email"
                type="email"
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-bold">
              Password
              <input
                className="border-2 border-[var(--foreground)] bg-white px-3 py-2"
                name="password"
                type="password"
                required
                minLength={6}
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                className="border-2 border-[var(--foreground)] bg-[var(--foreground)] px-4 py-2 font-bold text-[var(--background)]"
                formAction={signInWithPassword}
              >
                Sign in
              </button>
              <button
                className="border-2 border-[var(--foreground)] bg-white px-4 py-2 font-bold"
                formAction={signUpWithPassword}
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
