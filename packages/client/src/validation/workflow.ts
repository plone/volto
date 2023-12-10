import { z } from 'zod';

export const createWorkflowDataSchema = z.object({
  comment: z.string().optional(),
  effective: z.string().optional(),
  expires: z.string().optional(),
  include_children: z.boolean().optional(),
});
