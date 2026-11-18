export namespace EMPTY_ITEM_SCHEMA {
    let title: string;
    let fieldsets: {
        id: string;
        title: string;
        fields: any[];
    }[];
    let properties: {};
    let required: any[];
}
export function resolveItemSchema({ schema, schemaName, props, intl }: {
    schema: any | Function;
    schemaName?: string;
    props?: any;
    intl?: any;
}): any;
export function itemSchemaFor({ baseSchema, item, schemaExtender, intl }: {
    baseSchema: any;
    item: any;
    schemaExtender?: Function;
    intl?: any;
}): any;
export function rowKeys(rows: any[]): string[];
