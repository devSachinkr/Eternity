import { z } from "zod";

export const workspaceSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Workspace name is required" })
    .max(200, { message: "Workspace name must be less than 200 characters" }),
});
