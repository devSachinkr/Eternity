import { z } from "zod";


export const  VideoLocationSchema = z.object({
  folder_id: z.string().optional(),
  workspaceId: z.string(),
});
