export default Schema;
declare const Schema: {
    fieldsets: {
        id: string;
        title: string;
        fields: string[];
    }[];
    properties: {
        placeholder: {
            title: string;
            description: string;
            type: string;
        };
        required: {
            title: string;
            description: string;
            type: string;
        };
        fixed: {
            title: string;
            description: string;
            type: string;
        };
        disableNewBlocks: {
            title: string;
            description: string;
            type: string;
        };
        readOnly: {
            title: string;
            description: string;
            type: string;
        };
    };
    title: string;
    required: any[];
};
