export declare const AlignWidget: import("@loadable/component").LoadableComponent<any>;
export declare const ButtonsWidget: import("@loadable/component").LoadableComponent<any>;
export declare const ArrayWidget: import("@loadable/component").LoadableClassComponent<any>;
export declare const CheckboxWidget: import("@loadable/component").LoadableComponent<import("react-intl").WithIntlProps<any>>;
export declare const FileWidget: import("@loadable/component").LoadableComponent<import("react-intl").WithIntlProps<any>>;
export declare const IdWidget: import("@loadable/component").LoadableComponent<any>;
export declare const PasswordWidget: import("@loadable/component").LoadableComponent<import("react-intl").WithIntlProps<any>>;
export declare const QueryWidget: import("@loadable/component").LoadableClassComponent<any>;
export declare const QuerySortOnWidget: import("@loadable/component").LoadableClassComponent<any>;
export declare const QuerystringWidget: import("@loadable/component").LoadableComponent<any>;
export declare const SchemaWidget: import("@loadable/component").LoadableClassComponent<any>;
export declare const SelectWidget: import("@loadable/component").LoadableClassComponent<any>;
export declare const TextareaWidget: import("@loadable/component").LoadableComponent<import("react-intl").WithIntlProps<any>>;
export declare const TextWidget: import("@loadable/component").LoadableComponent<any>;
export declare const TokenWidget: import("@loadable/component").LoadableClassComponent<any>;
export declare const WysiwygWidget: import("@loadable/component").LoadableClassComponent<any>;
export declare const UrlWidget: import("@loadable/component").LoadableClassComponent<{
    new (): {
        state: {
            isObjectBrowserOpen: boolean;
        };
        openObjectBrowser: ({ mode, onSelectItem, dataName, overlay, propDataName, searchableTypes, selectableTypes, maximumSelectionSize, currentPath, }?: {
            mode: string;
            dataName: string;
            onSelectItem: string;
            overlay: string;
        }) => void;
        closeObjectBrowser: () => void;
        render(): import("react/jsx-runtime").JSX.Element;
        context: unknown;
        setState<K extends string | number | symbol>(state: any, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        readonly props: Readonly<any>;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: import("react").ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<any>, prevState: Readonly<any>): any;
        componentDidUpdate?(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): void;
    };
    defaultProps: {
        onChangeBlock: () => void;
        data: {};
        block: string;
    };
    contextType?: import("react").Context<any> | undefined;
}>;
export declare const InternalUrlWidget: import("@loadable/component").LoadableClassComponent<{
    new (): {
        state: {
            isObjectBrowserOpen: boolean;
        };
        openObjectBrowser: ({ mode, onSelectItem, dataName, overlay, propDataName, searchableTypes, selectableTypes, maximumSelectionSize, currentPath, }?: {
            mode: string;
            dataName: string;
            onSelectItem: string;
            overlay: string;
        }) => void;
        closeObjectBrowser: () => void;
        render(): import("react/jsx-runtime").JSX.Element;
        context: unknown;
        setState<K extends string | number | symbol>(state: any, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        readonly props: Readonly<any>;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: import("react").ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<any>, prevState: Readonly<any>): any;
        componentDidUpdate?(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): void;
    };
    defaultProps: {
        onChangeBlock: () => void;
        data: {};
        block: string;
    };
    contextType?: import("react").Context<any> | undefined;
}>;
export declare const EmailWidget: import("@loadable/component").LoadableComponent<any>;
export declare const NumberWidget: import("@loadable/component").LoadableComponent<import("react-intl").WithIntlProps<any>>;
export declare const ImageSizeWidget: import("@loadable/component").LoadableComponent<import("react-intl").WithIntlProps<any>>;
export declare const RegistryImageWidget: import("@loadable/component").LoadableComponent<import("react-intl").WithIntlProps<any>>;
export declare const ReferenceWidget: import("@loadable/component").LoadableComponent<any>;
export declare const ObjectBrowserWidget: import("@loadable/component").LoadableComponent<Omit<import("react-intl").WithIntlProps<import("react-intl").WrappedComponentProps<string>>, "ref"> & import("react").RefAttributes<import("react").ComponentType<import("react-intl").WrappedComponentProps<string>>>>;
export declare const ObjectWidget: import("@loadable/component").LoadableComponent<{
    [x: string]: any;
    block: any;
    schema: any;
    value: any;
    onChange: any;
    errors?: {};
    id: any;
}>;
export declare const ObjectListWidget: import("@loadable/component").LoadableComponent<any>;
export declare const VocabularyTermsWidget: import("@loadable/component").LoadableComponent<any>;
export declare const SelectMetadataWidget: import("@loadable/component").LoadableComponent<any>;
export declare const SelectAutoComplete: import("@loadable/component").LoadableClassComponent<any>;
export declare const ColorPickerWidget: import("@loadable/component").LoadableComponent<import("@plone/volto/components/manage/Widgets/ColorPickerWidget").ColorPickerWidgetProps>;
export declare const DatetimeWidget: import("@loadable/component").LoadableClassComponent<any>;
export declare const RecurrenceWidget: import("@loadable/component").LoadableClassComponent<any>;
export declare const FormFieldWrapper: import("@loadable/component").LoadableComponent<import("react-intl").WithIntlProps<any>>;
