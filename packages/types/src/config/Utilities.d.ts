/**
 * Map utility "type" to its method signature.
 * Extend via module augmentation:
 * declare module '@plone/types' { interface UtilityTypeMap { foo: (id: string) => string } }
 */
export interface UtilityTypeMap {
  validator: (
    id: string,
    value: any,
    intl: any,
    formatMessage: any,
    schema: any,
  ) => string | undefined;
  transform: (data: any) => any;
  fieldFactoryInitialData: (intl: any) => Record<string, any>;
  fieldFactoryProperties: (intl: any) => Record<string, any>;
}

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
