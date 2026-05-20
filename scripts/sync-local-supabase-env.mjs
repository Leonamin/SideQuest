import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const envPath = join(process.cwd(), ".env.local");
const existing = existsSync(envPath) ? readFileSync(envPath, "utf8") : "";

if (
  existing.includes("NEXT_PUBLIC_SUPABASE_URL=") &&
  existing.includes("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=")
) {
  process.exit(0);
}

let statusOutput = "";

try {
  statusOutput = execFileSync("supabase", ["status", "-o", "env"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
} catch {
  console.warn(
    "Supabase local env was not generated. Run `supabase start` before `pnpm dev`, or create `.env.local` manually.",
  );
  process.exit(0);
}

const apiUrl = getStatusValue(statusOutput, "API_URL");
const publishableKey = getStatusValue(statusOutput, "PUBLISHABLE_KEY");

if (!apiUrl || !publishableKey) {
  console.warn(
    "Supabase local env was not generated because local status did not include API_URL and PUBLISHABLE_KEY.",
  );
  process.exit(0);
}

const nextEnv = [
  existing.trim(),
  `NEXT_PUBLIC_SUPABASE_URL=${apiUrl}`,
  `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=${publishableKey}`,
]
  .filter(Boolean)
  .join("\n");

writeFileSync(envPath, `${nextEnv}\n`);
console.log("Wrote local Supabase public env to .env.local.");

function getStatusValue(output, key) {
  const match = output.match(new RegExp(`^${key}="([^"]+)"$`, "m"));

  return match?.[1];
}
