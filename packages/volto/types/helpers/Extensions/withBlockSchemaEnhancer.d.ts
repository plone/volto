/**
 * Allows compose-like declaration of schema enhancers
 *
 * Example usage:
 * const schemaEnhancer = composeSchema(schemaEnhancerA, schemaEnhancerB)
 *
 * where each enhancer is a function with signature
 * ({schema, formData, ...rest}) => schema
 *
 */
export function composeSchema(...args: any[]): (args: any) => any;
export function addExtensionFieldToSchema({ schema, name, items, intl, title, description, insertFieldToOrder, }: {
    schema: any;
    name: any;
    items: any;
    intl: any;
    title: any;
    description: any;
    insertFieldToOrder?: typeof _addField;
}): any;
export function withBlockSchemaEnhancer(FormComponent: any, extensionName?: string, insertFieldToOrder?: typeof _addField): ({ ...props }: {
    [x: string]: any;
}) => JSX.Element;
export function applySchemaEnhancer({ schema: originalSchema, formData, intl, blocksConfig, }: {
    schema: any;
    formData: any;
    intl: any;
    blocksConfig?: any;
}): any;
export function withVariationSchemaEnhancer(FormComponent: any): (props: any) => JSX.Element;
export namespace EMPTY_STYLES_SCHEMA {
    let fieldsets: {
        id: string;
        title: string;
        fields: any[];
    }[];
    let properties: {};
    let required: any[];
}
export function addStyling({ schema, formData, intl }: {
    schema: any;
    formData: any;
    intl: any;
}): any;
/**
 * Sets the field name as first field in schema
 */
declare function _addField(schema: any, name: any): void;
export {};
