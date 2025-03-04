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

export interface RuleRespose {
  message: string;
}

export const deleteRulesDataSchema = z.object({
  rules_ids: z.array(z.string()),
});

interface AssignedRule {
  bubbles: boolean;
  description: string;
  enabled: boolean;
  global_enabled: boolean;
  id: string;
  title: string;
  trigger: string;
  url: string;
}

interface ContentRules {
  acquired_rules: any[];
  assignable_rules: any[];
  assigned_rules: AssignedRule[];
}

export interface GetRulesResponse {
  'content-rules': ContentRules;
}
