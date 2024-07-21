export function ImageSchema({ formData, intl }: {
    formData: any;
    intl: any;
}): {
    fieldsets: {
        id: string;
        title: any;
        fields: string[];
    }[];
    properties: {
        alt: {
            title: any;
            description: import("react/jsx-runtime").JSX.Element;
        };
        align: {
            title: any;
            widget: string;
            default: string;
        };
        size: {
            title: any;
            widget: string;
            default: string;
        };
        href: {
            title: any;
            widget: string;
            mode: string;
            selectedItemAttrs: string[];
            allowExternals: boolean;
        };
        openLinkInNewTab: {
            title: any;
            type: string;
        };
    };
    required: any[];
};
export function gridImageDisableSizeAndPositionHandlersSchema({ schema, formData, intl, }: {
    schema: any;
    formData: any;
    intl: any;
}): any;
