import type { StyleDefinition } from '../blocks';

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
  styleFieldDefinition: StyleFieldDefinitionUtility;
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

export type StyleFieldDefinitionUtilityArgs = {
  data: Record<string, unknown>;
  container?: Record<string, unknown>;
  blockType?: string;
  fieldName: string;
};

export type StyleFieldDefinitionUtility = (
  options: StyleFieldDefinitionUtilityArgs,
) => readonly StyleDefinition[];

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
