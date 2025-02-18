import { z } from 'zod';

export const runUpgradeDataSchema = z.object({
  dry_run: z.boolean(),
});
