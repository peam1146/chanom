import { z } from "zod";

export const PaginationInput = z.object({
  limit: z.number().min(1).max(100).nullish(),
  cursor: z.number().nullish(), // <-- "cursor" needs to exist, but can be any type
  direction: z.enum(["forward", "backward"]), // optional, useful for bi-directional query
});
