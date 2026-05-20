## Git Commit Rules

- Every git commit message must use Conventional Commits format:
  - `feat(scope): summary`
  - `fix(scope): summary`
  - `refactor(scope): summary`
  - `chore(scope): summary`
  - `docs(scope): summary`
  - `test(scope): summary`
  - `ci(scope): summary`
  - `build(scope): summary`
  - `perf(scope): summary`
  - `revert(scope): summary`
- Never create a commit message without a valid type prefix.
- Prefer a short lowercase scope when the area is clear, such as `admin-flutter`, `supabase`, or `nextjs`.
- Before every commit, inspect the staged diff and choose the most accurate conventional type instead of defaulting blindly.
- If the work is primarily architectural cleanup, use `refactor(...)`.
- If the work changes behavior for users or adds a new capability, use `feat(...)`.
- If the work corrects a bug or regression, use `fix(...)`.

## Naming Rules

- Boolean fields, getters, parameters, and local variables must use a boolean prefix.
- Preferred prefixes:
  - `is...` for state or condition
  - `has...` for possession or presence
  - `can...` for permission or capability
  - `should...` for recommendation or deferred intent
  - `needs...` for requirement
- Avoid prefix-less boolean names such as `ready`, `saving`, `loading`, `recommended`, `processing`, or `valid`.

## Next.js Rules

<!-- BEGIN:nextjs-agent-rules -->
This version has breaking changes. Read the relevant guide in `node_modules/next/dist/docs/` before writing Next.js-specific code, and heed deprecation notices.
<!-- END:nextjs-agent-rules -->
