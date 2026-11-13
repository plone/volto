export function HTMLBlockSchema(): {
    title: string;
    fieldsets: {
        id: string;
        title: string;
        fields: string[];
    }[];
    properties: {
        html: {
            title: string;
            description: string;
            widget: string;
        };
    };
    required: any[];
};
