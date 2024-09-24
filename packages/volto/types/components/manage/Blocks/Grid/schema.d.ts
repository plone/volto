export function GridBlockSchema(props: any): {
    title: any;
    block: string;
    fieldsets: {
        id: string;
        title: string;
        fields: string[];
    }[];
    properties: {
        headline: {
            title: any;
        };
    };
    required: any[];
};
