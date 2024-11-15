import { z } from "zod";


export const  VideoLocationSchema = z.object({
  folder_id: z.string().optional(),
  workspace_id: z.string(),
});
