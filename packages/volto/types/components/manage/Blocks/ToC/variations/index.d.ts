export default ToCVariations;
declare const ToCVariations: ({
    id: string;
    title: string;
    view: {
        ({ data, tocEntries }: {
            data: any;
            tocEntries: any;
        }): import("react/jsx-runtime").JSX.Element;
        propTypes: {
            properties: any;
        };
    };
    isDefault: boolean;
} | {
    id: string;
    title: string;
    view: {
        ({ data, tocEntries }: {
            data: any;
            tocEntries: any;
        }): import("react/jsx-runtime").JSX.Element;
        propTypes: {
            properties: any;
        };
    };
    isDefault?: undefined;
})[];
