/**
 * The Image block data schema. It is registered as the `blockSchema` of the
 * `image` block, and the Image block sidebar reads it from there.
 */
export function ImageSchema({ formData, data, intl }: {
    formData: any;
    data: any;
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
            description: import("react").JSX.Element;
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
