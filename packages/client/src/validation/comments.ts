import { z } from 'zod';

export const newCommentDataSchema = z.object({
  text: z.string(),
});
