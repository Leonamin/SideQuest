# SideQuest

SideQuest is a pixel RPG productivity layer where local quests reward a project pet with XP, mood changes, and growth.

## Getting Started

Install dependencies and run the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Scripts

```bash
pnpm dev
pnpm build
pnpm lint
pnpm test
pnpm e2e
```

## MVP Status

Implemented MVP slices:

- Supabase dev deployment safety workflow and local port isolation.
- Next.js app foundation with Clean Architecture folders.
- Local project creation with Supabase Auth.
- Local quest board with create and complete actions.
- XP grant, pet mood/level updates, and reward history.
- Pet room with level progress and recent rewards.
- Quest clear reward modal.
- Local Supabase seed account for development.
- pnpm-only JavaScript workflow.

Linear integration remains intentionally out of MVP scope.

## E2E Tests

Public smoke coverage runs with:

```bash
pnpm e2e
```

The authenticated local game-loop E2E test is skipped unless these environment variables are set for a SideQuest-only Supabase project:

```text
E2E_EMAIL
E2E_PASSWORD
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
```

## Supabase Safety Policy

SideQuest must use a Supabase account and projects that are separate from KoriBetween.

Do not run these commands from a company Supabase CLI session in this repository:

```bash
supabase link
supabase db push
supabase functions deploy
```

Supabase deployment is handled through GitHub Actions with SideQuest-specific repository secrets and variables.

Required GitHub Actions secrets:

```text
SUPABASE_ACCESS_TOKEN
SUPABASE_DB_PASSWORD_DEV
```

Required GitHub Actions variables:

```text
SUPABASE_PROJECT_REF_DEV
NEXT_PUBLIC_SUPABASE_URL_DEV
NEXT_PUBLIC_SUPABASE_ANON_KEY_DEV
```

The workflow blocks known KoriBetween project refs before it can link or push migrations.

Known blocked refs:

```text
ublirowfqjgzxfrdtlsf
qocpkjrmvfxjchrldgfk
```

## Supabase Dev Deployment

Use the `Deploy Supabase Dev` GitHub Actions workflow.

By default, the workflow runs a dry run only. To apply migrations to `SideQuest-Dev`, run the workflow manually and set `apply_migrations` to `true`.

The workflow only deploys database migrations under `supabase/migrations`.

## Local Supabase

SideQuest uses non-default local Supabase ports to avoid colliding with other projects on the same machine:

```text
API:    http://127.0.0.1:55321
DB:     127.0.0.1:55322
Studio: http://127.0.0.1:55323
Mailpit: http://127.0.0.1:55324
```
