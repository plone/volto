import { Content } from '../content';
import type { Params } from 'react-router';
import type PloneClient from '@plone/client';

/**
 * Map utility "type" to its method signature.
 * Extend via module augmentation:
 * declare module '@plone/types' { interface UtilityTypeMap { foo: (id: string) => string } }
 */
export interface UtilityTypeMap {
  validator: ValidatorUtility;
  transform: (data: any) => any;
  fieldFactoryInitialData: (intl: any) => Record<string, any>;
  fieldFactoryProperties: (intl: any) => Record<string, any>;
}

export type ValidatorUtilityArgs = {
  value: any;
  field: Record<string, any>;
  formData: any;
  formatMessage: (...args: any[]) => any;
};

export type ValidatorUtility = (
  options: ValidatorUtilityArgs,
) => string | null | undefined;

type UtilityMethodFor<Type extends string> = Type extends keyof UtilityTypeMap
  ? UtilityTypeMap[Type]
  : (...args: any[]) => any;

export type Utility<Type extends string = string> = Record<
  string,
  { method: UtilityMethodFor<Type> }
>;

type UtilitiesByMap = {
  [Type in keyof UtilityTypeMap]: Utility<Type>;
};

export type UtilitiesConfig = UtilitiesByMap & Record<string, Utility>;

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
