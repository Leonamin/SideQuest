export type SupabaseResponse<T> = {
  data?: T | null;
  error: { message: string } | null;
};

export interface SupabaseFilterBuilder<T = unknown>
  extends PromiseLike<SupabaseResponse<T>> {
  select(columns?: string): SupabaseFilterBuilder<T>;
  eq(column: string, value: string): SupabaseFilterBuilder<T>;
  maybeSingle<T = unknown>(): Promise<SupabaseResponse<T>>;
  order(column: string, options?: { ascending?: boolean }): SupabaseFilterBuilder<T>;
}

export interface SupabaseQueryBuilder extends SupabaseFilterBuilder {
  upsert(row: Record<string, unknown>): Promise<SupabaseResponse<unknown>>;
}

export type SupabaseClientPort = {
  from(table: string): SupabaseQueryBuilder;
};

export function throwOnSupabaseError(
  result: SupabaseResponse<unknown>,
): void {
  if (result.error) {
    throw new Error(result.error.message);
  }
}
