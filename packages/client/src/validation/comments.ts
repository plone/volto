import { z } from 'zod';

export const createCommentDataSchema = z.object({
  text: z.string(),
});
