import { createBrowserClient } from "@supabase/ssr";
import { getSupabasePublicConfig } from "@/core/infrastructure/supabase/env";

export function createSupabaseBrowserClient() {
  const config = getSupabasePublicConfig();

  return createBrowserClient(config.url, config.publishableKey);
}
