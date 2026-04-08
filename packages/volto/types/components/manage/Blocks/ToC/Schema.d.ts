export default TableOfContentsSchema;
declare function TableOfContentsSchema({ data, intl }: {
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
        title: {
            title: any;
        };
        hide_title: {
            title: any;
            type: string;
        };
        levels: {
            title: any;
            isMulti: boolean;
            choices: string[][];
        };
        ordered: {
            title: any;
            type: string;
        };
        sticky: {
            title: any;
            type: string;
        };
    };
    required: any[];
};
