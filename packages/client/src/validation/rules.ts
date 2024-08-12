import { z } from 'zod';

export const updateRulesDataSchema = z.object({
  'form.button.Bubble': z.boolean().optional(),
  'form.button.NoBubble': z.boolean().optional(),
  'form.button.Enable': z.boolean().optional(),
  'form.button.Disable': z.boolean().optional(),
  rules_ids: z.array(z.string()).optional(),
  operation: z.string().optional(),
  rule_id: z.string().optional(),
});

export const deleteRulesDataSchema = z.object({
  rules_ids: z.array(z.string()),
});
