export interface RuleRespose {
  message: string;
}

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
