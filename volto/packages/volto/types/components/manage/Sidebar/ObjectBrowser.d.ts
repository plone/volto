export default withObjectBrowser;
declare function withObjectBrowser(WrappedComponent: any): {
    new (): {
        state: {
            isObjectBrowserOpen: boolean;
        };
        /**
         * openObjectBrowser
         * @function openObjectBrowser
         * @param {Object} object ObjectBrowser configuration.
         * @param {string} object.mode Quick mode, defaults to `image`. Values: link, image, multiple
         * @param {string} object.dataName Name of the block data property to write the selected item.
         * @param {string} object.onSelectItem Function that will be called on item selection.
         * @param {string} object.overlay Boolean to show overlay background on content when opening objectBrowser.
         *
         * Usage:
         *
         * this.props.openObjectBrowser();
         *
         * this.props.openObjectBrowser({mode: 'link'});
         *
         * this.props.openObjectBrowser({
         *   dataName: 'myfancydatafield'
         *   });
         *
         * this.props.openObjectBrowser({
         *   onSelectItem: url =>
         *     this.props.onChangeBlock(this.props.block, {
         *       ...this.props.data,
         *       myfancydatafield: url,
         *     }),
         *   });
         */
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
    /**
     * Default properties
     * @property {Object} defaultProps Default properties.
     * @static
     */
    defaultProps: {
        onChangeBlock: () => void;
        data: {};
        block: string;
    };
    contextType?: React.Context<any> | undefined;
};
import React from 'react';
