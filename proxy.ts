import type { NextRequest } from "next/server";
import { updateSupabaseSession } from "@/core/infrastructure/supabase/proxy";

export async function proxy(request: NextRequest) {
  return updateSupabaseSession(request);
}

export const config = {
  matcher: ["/projects/:path*"],
};
