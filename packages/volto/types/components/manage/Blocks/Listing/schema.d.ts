export function schemaListing(props: any): {
    title: any;
    fieldsets: {
        id: string;
        title: any;
        fields: string[];
    }[];
    properties: {
        headline: {
            title: any;
        };
        headlineTag: {
            title: any;
            choices: any;
            default: string;
            noValueOption: boolean;
        };
        querystring: {
            title: any;
            widget: string;
        };
        linkTitle: {
            title: any;
        };
        linkHref: {
            title: any;
            widget: string;
            mode: string;
            selectedItemAttrs: string[];
            allowExternals: boolean;
        };
    };
    required: any[];
};
export default schemaListing;
