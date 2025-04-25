export default SearchSchema;
declare function SearchSchema({ data, intl }: {
    data?: {};
    intl: any;
}): {
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
        searchInputPrompt: {
            title: any;
        };
        showSearchInput: {
            type: string;
            title: any;
            default: boolean;
        };
        showSearchButton: {
            type: string;
            title: any;
            description: any;
        };
        showTotalResults: {
            type: string;
            title: any;
            default: boolean;
        };
        searchButtonLabel: {
            title: any;
            placeholder: any;
        };
        showSortOn: {
            type: string;
            title: any;
        };
        sortOnOptions: {
            title: any;
            widget: string;
        };
        facets: {
            title: any;
            widget: string;
            schema: {
                title: any;
                fieldsets: {
                    id: string;
                    title: string;
                    fields: string[];
                }[];
                properties: {
                    title: {
                        title: any;
                    };
                    field: {
                        title: any;
                        widget: string;
                        vocabulary: {
                            '@id': string;
                        };
                        filterOptions: (options: any) => any;
                    };
                    multiple: {
                        type: string;
                        title: any;
                        default: boolean;
                    };
                    hidden: {
                        type: string;
                        title: any;
                        default: boolean;
                        description: any;
                    };
                    advanced: {
                        type: string;
                        title: any;
                        default: boolean;
                        description: any;
                    };
                    type: {
                        title: any;
                        choices: any;
                        defaultValue: any;
                    };
                };
                required: string[];
            };
            schemaExtender: (originalSchema: any, formData: any) => any;
        };
        facetsTitle: {
            title: any;
        };
        query: {
            title: string;
        };
        availableViews: {
            title: any;
            choices: string[][];
            widget: string;
        };
    };
    required: any[];
};
