import { z } from 'zod';

export const createLockDataSchema = z.object({
  stealable: z.boolean().optional(),
  timeout: z.number().optional(),
});

export const deleteLockDataSchema = z.object({
  force: z.boolean().optional(),
});
