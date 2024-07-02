export function ImageToolbar({ className, data, id, onChange, selected }: {
    className: any;
    data: any;
    id: any;
    onChange: any;
    selected: any;
}): JSX.Element;
export const ImageInput: import("react-redux").ConnectedComponent<{
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
        render(): JSX.Element;
        context: unknown;
        setState<K extends string | number | symbol>(state: any, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        readonly props: Readonly<any>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
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
    contextType?: React.Context<any>;
}, import("react-redux").Omit<Pick<React.ClassAttributes<{
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
    render(): JSX.Element;
    context: unknown;
    setState<K extends string | number | symbol>(state: any, callback?: () => void): void;
    forceUpdate(callback?: () => void): void;
    readonly props: Readonly<any>;
    refs: {
        [key: string]: React.ReactInstance;
    };
    componentDidMount?(): void;
    shouldComponentUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean;
    componentWillUnmount?(): void;
    componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
    getSnapshotBeforeUpdate?(prevProps: Readonly<any>, prevState: Readonly<any>): any;
    componentDidUpdate?(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void;
    componentWillMount?(): void;
    UNSAFE_componentWillMount?(): void;
    componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
    UNSAFE_componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
    componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): void;
    UNSAFE_componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): void;
}>, keyof React.ClassAttributes<{
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
    render(): JSX.Element;
    context: unknown;
    setState<K extends string | number | symbol>(state: any, callback?: () => void): void;
    forceUpdate(callback?: () => void): void;
    readonly props: Readonly<any>;
    refs: {
        [key: string]: React.ReactInstance;
    };
    componentDidMount?(): void;
    shouldComponentUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean;
    componentWillUnmount?(): void;
    componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
    getSnapshotBeforeUpdate?(prevProps: Readonly<any>, prevState: Readonly<any>): any;
    componentDidUpdate?(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void;
    componentWillMount?(): void;
    UNSAFE_componentWillMount?(): void;
    componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
    UNSAFE_componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
    componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): void;
    UNSAFE_componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): void;
}>> & {} & {
    data?: {};
    block?: string;
    onChangeBlock?: () => void;
}, never>>;
export default ImageUploadWidget;
import React from 'react';
declare function ImageUploadWidget(props: any): JSX.Element;
