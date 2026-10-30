export function LeadImageBlockSchema({ intl }: {
    intl: any;
}): {
    title: any;
    fieldsets: {
        id: string;
        title: any;
        fields: string[];
    }[];
    properties: {
        align: {
            title: any;
            widget: string;
        };
        href: {
            title: any;
            widget: string;
        };
        openLinkInNewTab: {
            title: any;
            type: string;
        };
    };
    required: any[];
};
