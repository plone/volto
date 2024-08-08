type MinMaxValidator = {
    value: string | number;
    fieldSpec: string | number;
    criterion: string;
    formatMessage: Function;
};
type Validator = {
    value: string;
    field: Record<string, any>;
    formData: any;
    formatMessage: Function;
};
export declare const isMaxPropertyValid: ({ value, fieldSpec, criterion, formatMessage, }: MinMaxValidator) => any;
export declare const isMinPropertyValid: ({ value, fieldSpec, criterion, formatMessage, }: MinMaxValidator) => any;
export declare const minLengthValidator: ({ value, field, formatMessage, }: Validator) => any;
export declare const maxLengthValidator: ({ value, field, formatMessage, }: Validator) => any;
export declare const urlValidator: ({ value, formatMessage }: Validator) => any;
export declare const emailValidator: ({ value, formatMessage }: Validator) => string;
export declare const isNumberValidator: ({ value, formatMessage }: Validator) => any;
export declare const minimumValidator: ({ value, field, formatMessage }: Validator) => any;
export declare const maximumValidator: ({ value, field, formatMessage }: Validator) => any;
export declare const isIntegerValidator: ({ value, formatMessage }: Validator) => any;
export declare const hasUniqueItemsValidator: ({ value, field, formatMessage, }: Validator) => any;
export declare const startEventDateRangeValidator: ({ value, field, formData, formatMessage, }: Validator) => any;
export declare const endEventDateRangeValidator: ({ value, field, formData, formatMessage, }: Validator) => any;
export declare const patternValidator: ({ value, field, formatMessage, }: Validator) => any;
export declare const maxItemsValidator: ({ value, field, formatMessage, }: Validator) => any;
export declare const minItemsValidator: ({ value, field, formatMessage, }: Validator) => any;
export {};
