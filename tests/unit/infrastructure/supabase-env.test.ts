import { describe, expect, it } from "vitest";
import { getSupabasePublicConfig } from "@/core/infrastructure/supabase/env";

describe("getSupabasePublicConfig", () => {
  it("prefers standard public Supabase env names", () => {
    expect(
      getSupabasePublicConfig({
        NEXT_PUBLIC_SUPABASE_URL: "https://sidequest.supabase.co",
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "publishable",
        NEXT_PUBLIC_SUPABASE_URL_DEV: "http://127.0.0.1:55321",
        NEXT_PUBLIC_SUPABASE_ANON_KEY_DEV: "dev-anon",
      }),
    ).toEqual({
      url: "https://sidequest.supabase.co",
      publishableKey: "publishable",
    });
  });

  it("falls back to repository dev variable names", () => {
    expect(
      getSupabasePublicConfig({
        NEXT_PUBLIC_SUPABASE_URL_DEV: "http://127.0.0.1:55321",
        NEXT_PUBLIC_SUPABASE_ANON_KEY_DEV: "dev-anon",
      }),
    ).toEqual({
      url: "http://127.0.0.1:55321",
      publishableKey: "dev-anon",
    });
  });

  it("throws when public Supabase env is missing", () => {
    expect(() => getSupabasePublicConfig({})).toThrow(
      "Missing Supabase public environment variables.",
    );
  });
});
