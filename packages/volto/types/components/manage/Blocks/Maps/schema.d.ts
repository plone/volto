export function MapsSchema(props: any): {
    title: any;
    block: string;
    fieldsets: {
        id: string;
        title: string;
        fields: string[];
    }[];
    properties: {
        url: {
            title: any;
            widget: string;
        };
        title: {
            title: any;
        };
        align: {
            title: any;
            widget: string;
        };
    };
    required: any[];
};
