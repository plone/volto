export function TeaserSchema({ data, intl }: {
    data: any;
    intl: any;
}): {
    title: any;
    fieldsets: {
        id: string;
        title: string;
        fields: string[];
    }[];
    properties: {
        href: {
            title: any;
            widget: string;
            mode: string;
            selectedItemAttrs: string[];
            allowExternals: boolean;
        };
        overwrite: {
            title: any;
            description: any;
            type: string;
            default: boolean;
        };
        title: {
            title: any;
        };
        head_title: {
            title: any;
        };
        description: {
            title: any;
            widget: string;
        };
        preview_image: {
            title: any;
            widget: string;
            mode: string;
            allowExternals: boolean;
            selectedItemAttrs: string[];
        };
        openLinkInNewTab: {
            title: any;
            type: string;
        };
    };
    required: string[];
};
export function gridTeaserDisableStylingSchema({ schema, formData, intl }: {
    schema: any;
    formData: any;
    intl: any;
}): any;
