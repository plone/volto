export function VideoBlockSchema(props: any): {
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
        preview_image: {
            title: any;
            widget: string;
        };
        align: {
            title: any;
            widget: string;
        };
    };
    required: any[];
};
export default VideoBlockSchema;
