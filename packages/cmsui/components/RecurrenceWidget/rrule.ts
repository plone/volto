import * as RRuleLib from 'rrule';
import type * as RRuleTypes from 'rrule';

type Options = RRuleTypes.Options;
type WeekdayStr = RRuleTypes.WeekdayStr;
type RRuleType = RRuleTypes.RRule;

const { RRule, rrulestr, RRuleSet } = ((RRuleLib as any).default ||
  RRuleLib) as typeof RRuleTypes;

export { rrulestr, RRule, RRuleSet };
export type { Options, WeekdayStr, RRuleType };
