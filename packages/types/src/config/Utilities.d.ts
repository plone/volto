import { Content } from '../content';
import type { Params } from 'react-router';
import type PloneClient from '@plone/client';

export type Utility = Record<string, { method: UtilityMethod }>;

export type UtilitiesConfig = Record<string, Utility>;

export type UtilityMethod =
  | DummyUtilityMethod
  | LoaderDataUtilityMethod
  | ContentSubRequestUtilityMethod;

// TODO: remove when all utilities are properly typed
export type DummyUtilityMethod = (...args: any[]) => any;

export type LoaderDataUtilityMethod = (
  args: LoaderUtilityArgs,
) => Promise<{ status: number; data: unknown }>;
export type ContentSubRequestUtilityMethod = (
  args: LoaderUtilityArgs,
) => Promise<undefined>;

export interface LoaderUtilityArgs {
  cli: PloneClient;
  content: Content;
  request: Request;
  path: string;
  params: Params;
  locale: string;
}
