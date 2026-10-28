export default TableOfContentsSchema;
/**
 * The Table of Contents block data schema. It is registered as the
 * `blockSchema` of the `toc` block, and the ToC block edit component reads it
 * from there.
 */
declare function TableOfContentsSchema({ data, formData, intl }: {
    data: any;
    formData: any;
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
