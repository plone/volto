// Define method signatures for known utility types
// Users can extend this interface via declaration merging to add custom utility types
export interface UtilityTypeSignatures {
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

// Base utility type for unknown utility types
export type Utility = Record<string, { method: (...args: any[]) => any }>;

// Typed utility configuration that enforces method signatures for known types
export type UtilitiesConfig = Record<string, Utility>;
