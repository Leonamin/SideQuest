# SideQuest MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the SideQuest MVP from `PRODUCT.md`: a Next.js web app where a user creates a local project, creates and completes quests, receives XP, and sees a project pet grow, change mood, and react through a reward flow.

**Architecture:** Use Clean Architecture boundaries inside a single Next.js repository. Domain code is framework-free, application use cases orchestrate domain behavior through ports, infrastructure adapts Supabase/local repositories, and presentation code calls use cases through server actions or route handlers.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui where useful, Supabase Auth/Postgres, Drizzle ORM, Vitest, React Testing Library, Playwright.

---

## MVP Requirements From PRODUCT.md

The MVP includes:

* Login
* Project creation
* Local Quest creation and completion
* XP grant on quest completion
* Pet creation
* Pet level-up
* Pet mood changes
* Quest Board
* Pet Room
* Reward Modal
* Pixel RPG visual style

The MVP excludes Linear OAuth, Linear Project selection, Linear Issue import, Linear Done detection, BYOK, AI image generation, team invitation, inventory, achievements, world map, rankings, and external integrations.

## Branch And PR Strategy

Each branch must be opened as a PR and merged with squash merge.

1. `feat/app-foundation`
   * Scaffold the Next.js app, TypeScript, Tailwind, testing stack, and Clean Architecture folder structure.
   * Commit: `feat(nextjs): scaffold app foundation`

2. `feat/domain-game-loop`
   * Implement framework-free domain entities, value objects, policies, and use cases for projects, quests, XP, pets, mood, and reward claiming.
   * Commit: `feat(domain): add local quest game loop`

3. `feat/supabase-persistence`
   * Add Drizzle schema, Supabase migrations, repository ports, and Supabase repository implementations.
   * Commit: `feat(supabase): add mvp persistence schema`

4. `feat/auth-project-onboarding`
   * Add Supabase SSR auth integration, login/logout, project select, and project create flow.
   * Commit: `feat(auth): add project onboarding`

5. `feat/quest-board-workflow`
   * Add Quest Board UI, quest create form, quest status transitions, and completion action.
   * Commit: `feat(quests): add local quest board`

6. `feat/pet-room-rewards`
   * Add Pet Room UI, XP bar, mood dialogue, pet click reaction, reward modal, and level-up feedback.
   * Commit: `feat(pets): add pet room reward loop`

7. `test/mvp-e2e-coverage`
   * Add Playwright smoke coverage for login/onboarding, quest creation, quest completion, reward modal, XP update, and pet room state.
   * Commit: `test(mvp): add local game loop e2e coverage`

## Clean Architecture File Map

Create these directories in `feat/app-foundation`:

```text
src/
  app/
  components/
  features/
    auth/
    projects/
    quests/
    pets/
    rewards/
  core/
    domain/
      projects/
      quests/
      pets/
      xp/
    application/
      ports/
      use-cases/
    infrastructure/
      db/
      repositories/
      supabase/
  lib/
tests/
  unit/
  integration/
  e2e/
```

Boundary rules:

* `src/core/domain/**` imports no React, Next.js, Supabase, Drizzle, browser APIs, or Node-only APIs.
* `src/core/application/**` imports domain and ports only.
* `src/core/infrastructure/**` may import Supabase, Drizzle, and application ports.
* `src/app/**`, `src/components/**`, and `src/features/**` may import application use cases and UI helpers.
* Presentation code does not calculate XP, level, or mood directly.

## Domain Model Decisions

Use these MVP values:

```ts
export type QuestStatus = "todo" | "in_progress" | "done" | "archived" | "canceled";
export type QuestType = "main" | "side" | "daily" | "bug" | "chore" | "boss";
export type QuestDifficulty = "easy" | "normal" | "hard" | "boss";
export type PetMood = "idle" | "happy" | "sleepy" | "celebrate";
export type PetEvolutionStage = "egg" | "baby" | "child";
```

XP policy:

```ts
export const difficultyXp = {
  easy: 10,
  normal: 30,
  hard: 70,
  boss: 150,
} as const;

export function getRequiredXpForNextLevel(level: number): number {
  return 100 + level * 50;
}
```

Mood policy:

```ts
if (hasLeveledUpNow) return "celebrate";
if (hasCompletedQuestWithin24Hours) return "happy";
if (hasNoActivityFor3Days) return "sleepy";
return "idle";
```

Reward policy:

* Completing an already completed quest does not grant XP again.
* XP is granted only when `rewardClaimedAt` is empty.
* MVP never subtracts XP if a quest is reopened.

## Task 1: App Foundation

**Files:**

* Create: `package.json`
* Create: `next.config.ts`
* Create: `tsconfig.json`
* Create: `vitest.config.ts`
* Create: `playwright.config.ts`
* Create: `src/app/layout.tsx`
* Create: `src/app/page.tsx`
* Create: `src/app/globals.css`
* Create: `tests/unit/architecture-boundaries.test.ts`

- [ ] **Step 1: Scaffold Next.js with TypeScript**

Run:

```bash
npx create-next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*"
```

Expected:

```text
Creates a Next.js App Router project without removing PRODUCT.md, README.md, supabase/, docs/, or .github/.
```

- [ ] **Step 2: Install test dependencies**

Run:

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom playwright
```

Expected:

```text
Dependencies are added to package.json and package-lock.json.
```

- [ ] **Step 3: Add architecture boundary test**

Create `tests/unit/architecture-boundaries.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const forbiddenDomainImports = ["next/", "react", "@supabase/", "drizzle-orm"];

function listFiles(dir: string): string[] {
  try {
    return readdirSync(dir).flatMap((entry) => {
      const path = join(dir, entry);
      return statSync(path).isDirectory() ? listFiles(path) : [path];
    });
  } catch {
    return [];
  }
}

describe("architecture boundaries", () => {
  it("keeps domain code free from framework and infrastructure imports", () => {
    const files = listFiles("src/core/domain").filter((file) => file.endsWith(".ts"));
    const violations = files.flatMap((file) => {
      const source = readFileSync(file, "utf8");
      return forbiddenDomainImports
        .filter((importName) => source.includes(`from "${importName}`) || source.includes(`from '${importName}`))
        .map((importName) => `${file} imports ${importName}`);
    });

    expect(violations).toEqual([]);
  });
});
```

- [ ] **Step 4: Add package scripts**

Ensure `package.json` contains:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest",
    "e2e": "playwright test"
  }
}
```

- [ ] **Step 5: Verify**

Run:

```bash
npm run test
npm run lint
npm run build
```

Expected:

```text
All commands exit 0.
```

- [ ] **Step 6: Commit and PR**

Run:

```bash
git add package.json package-lock.json next.config.ts tsconfig.json vitest.config.ts playwright.config.ts src tests
git commit -m "feat(nextjs): scaffold app foundation"
git push -u origin feat/app-foundation
gh pr create --base main --head feat/app-foundation --title "feat(nextjs): scaffold app foundation"
```

## Task 2: Domain Game Loop

**Files:**

* Create: `src/core/domain/quests/quest.ts`
* Create: `src/core/domain/xp/xp-policy.ts`
* Create: `src/core/domain/pets/pet.ts`
* Create: `src/core/domain/pets/mood-policy.ts`
* Create: `src/core/application/use-cases/complete-quest.ts`
* Create: `tests/unit/domain/complete-quest.test.ts`

- [ ] **Step 1: Write failing test for reward grant**

Create `tests/unit/domain/complete-quest.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { completeQuest } from "@/core/application/use-cases/complete-quest";

describe("completeQuest", () => {
  it("marks a local quest done, grants difficulty XP once, and updates pet mood", () => {
    const now = new Date("2026-05-20T00:00:00.000Z");
    const result = completeQuest({
      now,
      quest: {
        id: "quest-1",
        projectId: "project-1",
        title: "Ship MVP loop",
        status: "todo",
        questType: "main",
        difficulty: "hard",
        xpReward: 70,
        createdAt: now,
        updatedAt: now,
      },
      pet: {
        id: "pet-1",
        projectId: "project-1",
        name: "Pixel",
        species: "hamster",
        level: 1,
        currentXP: 0,
        totalXP: 0,
        evolutionStage: "egg",
        mood: "idle",
        createdAt: now,
        updatedAt: now,
      },
    });

    expect(result.quest.status).toBe("done");
    expect(result.quest.rewardClaimedAt).toEqual(now);
    expect(result.pet.totalXP).toBe(70);
    expect(result.pet.currentXP).toBe(70);
    expect(result.pet.level).toBe(1);
    expect(result.pet.mood).toBe("happy");
    expect(result.xpLog.amount).toBe(70);
  });
});
```

- [ ] **Step 2: Run failing test**

Run:

```bash
npm run test -- tests/unit/domain/complete-quest.test.ts
```

Expected:

```text
FAIL because completeQuest is not implemented.
```

- [ ] **Step 3: Implement domain and use case**

Implement the minimal types and logic needed for the test:

```ts
export function getDifficultyXp(difficulty: QuestDifficulty): number {
  return difficultyXp[difficulty];
}
```

```ts
export function completeQuest(input: CompleteQuestInput): CompleteQuestResult {
  if (input.quest.rewardClaimedAt) {
    return { quest: input.quest, pet: input.pet, xpLog: null };
  }

  const amount = getDifficultyXp(input.quest.difficulty);
  const petAfterXp = applyXp(input.pet, amount, input.now);
  const quest = {
    ...input.quest,
    status: "done" as const,
    completedAt: input.now,
    rewardClaimedAt: input.now,
    updatedAt: input.now,
  };

  return {
    quest,
    pet: { ...petAfterXp, mood: petAfterXp.didLevelUp ? "celebrate" : "happy" },
    xpLog: {
      id: crypto.randomUUID(),
      projectId: input.quest.projectId,
      petId: input.pet.id,
      questId: input.quest.id,
      amount,
      reason: input.quest.difficulty === "boss" ? "boss_clear" : "quest_clear",
      createdAt: input.now,
    },
  };
}
```

- [ ] **Step 4: Add duplicate reward test**

Add a test where `rewardClaimedAt` is already set and assert no new XP is granted.

- [ ] **Step 5: Verify**

Run:

```bash
npm run test
npm run lint
npm run build
```

- [ ] **Step 6: Commit and PR**

Run:

```bash
git add src/core tests/unit
git commit -m "feat(domain): add local quest game loop"
git push -u origin feat/domain-game-loop
gh pr create --base main --head feat/domain-game-loop --title "feat(domain): add local quest game loop"
```

## Task 3: Supabase Persistence

**Files:**

* Create: `src/core/infrastructure/db/schema.ts`
* Create: `src/core/application/ports/project-repository.ts`
* Create: `src/core/application/ports/quest-repository.ts`
* Create: `src/core/application/ports/pet-repository.ts`
* Create: `src/core/infrastructure/repositories/supabase-project-repository.ts`
* Create: `src/core/infrastructure/repositories/supabase-quest-repository.ts`
* Create: `src/core/infrastructure/repositories/supabase-pet-repository.ts`
* Create: `supabase/migrations/<timestamp>_mvp_schema.sql`

Required tables:

* `profiles`
* `projects`
* `pets`
* `quests`
* `xp_logs`

Required security:

* Enable RLS on every public table.
* Policies must scope all reads and writes to `auth.uid()`.
* No service role key is required for MVP browser flows.

Verification:

```bash
npm run test
npm run lint
supabase db start
supabase db reset
```

Commit:

```bash
git commit -m "feat(supabase): add mvp persistence schema"
```

## Task 4: Auth And Project Onboarding

**Files:**

* Create: `src/core/infrastructure/supabase/client.ts`
* Create: `src/core/infrastructure/supabase/server.ts`
* Create: `src/features/auth/actions.ts`
* Create: `src/features/projects/actions.ts`
* Create: `src/app/login/page.tsx`
* Create: `src/app/projects/page.tsx`
* Create: `src/app/projects/new/page.tsx`

Acceptance:

* User can log in with Supabase Auth.
* User can create one Local Project.
* Project creation creates a default pet.
* User is redirected to Quest Board after project creation.

Commit:

```bash
git commit -m "feat(auth): add project onboarding"
```

## Task 5: Quest Board Workflow

**Files:**

* Create: `src/features/quests/components/quest-board.tsx`
* Create: `src/features/quests/components/quest-create-form.tsx`
* Create: `src/features/quests/actions.ts`
* Create: `src/app/projects/[projectId]/quests/page.tsx`

Acceptance:

* User can create local quests with type and difficulty.
* Quest list groups quests by quest type.
* Completing a quest calls the application use case.
* Completion cannot double-claim XP.

Commit:

```bash
git commit -m "feat(quests): add local quest board"
```

## Task 6: Pet Room And Reward Loop

**Files:**

* Create: `src/features/pets/components/pet-room.tsx`
* Create: `src/features/pets/components/pixel-pet.tsx`
* Create: `src/features/rewards/components/reward-modal.tsx`
* Create: `src/app/projects/[projectId]/pet/page.tsx`

Acceptance:

* Pet Room shows pet name, level, current XP, XP required for next level, mood, and dialogue.
* Quest completion opens Reward Modal with XP granted and level-up state.
* Pet click changes temporary reaction state without changing persisted mood.
* UI uses pixel-style borders, compact layout, and stable responsive dimensions.

Commit:

```bash
git commit -m "feat(pets): add pet room reward loop"
```

## Task 7: MVP End-To-End Verification

**Files:**

* Create: `tests/e2e/local-game-loop.spec.ts`
* Modify: `.github/workflows/ci.yml`

Acceptance:

* CI runs typecheck, lint, unit tests, build, and Playwright smoke tests.
* E2E covers login, project creation, quest creation, quest completion, reward modal, and pet room.
* README documents local development commands.

Commit:

```bash
git commit -m "test(mvp): add local game loop e2e coverage"
```

## Completion Checklist

The MVP is complete only when all of these are proven by current evidence:

* A user can log in.
* A user can create a Local Project.
* A project creates a default pet.
* A user can create a local quest.
* A user can complete a local quest.
* Quest completion grants XP once.
* XP can level up the pet.
* Mood changes to happy or celebrate after completion.
* Pet Room reflects current pet state.
* Reward Modal appears after completion.
* Linear is absent from MVP user flows.
* Unit tests pass.
* Build passes.
* Playwright MVP smoke test passes.
* Every branch has a PR.
* Every PR is squash-merged.
