import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { insertPreorderEmail } from "./preorder.server";

export const joinPreorderList = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        email: z.string().trim().toLowerCase().email().max(320),
        variant: z.enum(["coffee", "wine"]).nullish(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    return insertPreorderEmail(data.email, data.variant ?? null);
  });
