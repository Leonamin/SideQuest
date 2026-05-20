# SideQuest

SideQuest is a pixel RPG productivity layer where local quests reward a project pet with XP, mood changes, and growth.

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run test
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
