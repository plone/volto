export function objectSchema({ intl, isDisabled, value }: {
    intl: any;
    isDisabled: any;
    value: any;
}): {
    fieldsets: {
        id: string;
        title: string;
        fields: string[];
    }[];
    properties: {
        query: {
            title: any;
            widget: string;
        };
        sort_on: {
            title: any;
            widget: string;
            isDisabled: any;
        };
        sort_order_boolean: {
            title: any;
            type: string;
            isDisabled: any;
        };
        limit: {
            title: any;
            type: string;
            isDisabled: any;
        };
        offset: {
            title: any;
            type: string;
            isDisabled: any;
            default: number;
        };
        b_size: {
            title: any;
            type: string;
            isDisabled: any;
        };
    };
    required: any[];
};
export default QuerystringWidget;
declare function QuerystringWidget(props: any): import("react/jsx-runtime").JSX.Element;
