export default ToCVariations;
declare const ToCVariations: ({
    id: string;
    title: string;
    view: import("react").FC<import("react-intl").WithIntlProps<import("react-intl").WrappedComponentProps<string>>> & {
        WrappedComponent: import("react").ComponentType<import("react-intl").WrappedComponentProps<string>>;
    };
    isDefault: boolean;
} | {
    id: string;
    title: string;
    view: import("react").FC<import("react-intl").WithIntlProps<import("react-intl").WrappedComponentProps<string>>> & {
        WrappedComponent: import("react").ComponentType<import("react-intl").WrappedComponentProps<string>>;
    };
    isDefault?: undefined;
})[];
