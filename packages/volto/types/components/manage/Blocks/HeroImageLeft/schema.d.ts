export default schemaHero;
declare function schemaHero({ intl }: {
    intl: any;
}): {
    title: string;
    required: any[];
    fieldsets: {
        id: string;
        title: any;
        fields: string[];
    }[];
    properties: {
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
};
