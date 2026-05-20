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
    const files = listFiles("src/core/domain").filter((file) =>
      file.endsWith(".ts"),
    );
    const violations = files.flatMap((file) => {
      const source = readFileSync(file, "utf8");
      return forbiddenDomainImports
        .filter(
          (importName) =>
            source.includes(`from "${importName}`) ||
            source.includes(`from '${importName}`),
        )
        .map((importName) => `${file} imports ${importName}`);
    });

    expect(violations).toEqual([]);
  });
});
