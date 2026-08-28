import { createClient } from "@supabase/supabase-js";

/**
 * Server-only insert for the preorder list. Uses the publishable key with a
 * narrow anon INSERT policy — nobody can read the list back through the API.
 */
export async function insertPreorderEmail(
  email: string,
  variant: "coffee" | "wine" | null,
): Promise<{ duplicate: boolean }> {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) throw new Error("Backend not configured");

  const client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(
          input instanceof Request ? input.headers : undefined,
        );
        if (init?.headers) {
          new Headers(init.headers).forEach((value, header) =>
            headers.set(header, value),
          );
        }
        // Opaque publishable keys are sent via apikey, never as a bearer token.
        if (headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });

  const { error } = await client
    .from("preorder_emails")
    .insert({ email, variant });

  if (error) {
    // Unique violation — the email is already on the list. Treat as success.
    if (error.code === "23505") return { duplicate: true };
    throw new Error(error.message);
  }
  return { duplicate: false };
}
