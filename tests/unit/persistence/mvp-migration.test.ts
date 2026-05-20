import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const requiredTables = ["profiles", "projects", "pets", "quests", "xp_logs"];

function readMvpMigration(): string {
  const migrationDir = "supabase/migrations";
  const migrationFile = readdirSync(migrationDir).find((file) =>
    file.endsWith("_mvp_schema.sql"),
  );

  if (!migrationFile) {
    throw new Error("Missing MVP schema migration");
  }

  return readFileSync(join(migrationDir, migrationFile), "utf8");
}

describe("MVP Supabase migration", () => {
  it("creates every MVP table in the public schema", () => {
    const sql = readMvpMigration();

    for (const table of requiredTables) {
      expect(sql).toContain(`create table public.${table}`);
    }
  });

  it("enables RLS for every public table", () => {
    const sql = readMvpMigration();

    for (const table of requiredTables) {
      expect(sql).toContain(
        `alter table public.${table} enable row level security;`,
      );
    }
  });

  it("uses authenticated ownership policies and does not grant anon table access", () => {
    const sql = readMvpMigration();

    expect(sql).not.toMatch(/\bto anon\b/i);
    expect(sql).not.toMatch(/\bgrant\b.+\bto anon\b/i);

    for (const table of requiredTables) {
      expect(sql).toContain(`on public.${table}`);
      expect(sql).toContain("to authenticated");
      expect(sql).toContain("(select auth.uid())");
    }
  });

  it("grants authenticated table access for the Data API", () => {
    const sql = readMvpMigration();

    for (const table of requiredTables) {
      expect(sql).toContain(
        `revoke all on public.${table} from anon, authenticated;`,
      );
      expect(sql).toMatch(
        new RegExp(`grant .+ on public\\.${table} to authenticated;`),
      );
    }
  });
});
