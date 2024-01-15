export function UrlWidget(props: any): JSX.Element;
export namespace UrlWidget {
    namespace propTypes {
        let id: PropTypes.Validator<string>;
        let title: PropTypes.Validator<string>;
        let description: PropTypes.Requireable<string>;
        let required: PropTypes.Requireable<boolean>;
        let error: PropTypes.Requireable<string[]>;
        let value: PropTypes.Requireable<string>;
        let onChange: PropTypes.Validator<(...args: any[]) => any>;
        let onBlur: PropTypes.Requireable<(...args: any[]) => any>;
        let onClick: PropTypes.Requireable<(...args: any[]) => any>;
        let minLength: PropTypes.Requireable<number>;
        let maxLength: PropTypes.Requireable<number>;
        let openObjectBrowser: PropTypes.Validator<(...args: any[]) => any>;
        let placeholder: PropTypes.Requireable<string>;
    }
    namespace defaultProps {
        let description_1: any;
        export { description_1 as description };
        let required_1: boolean;
        export { required_1 as required };
        let error_1: any[];
        export { error_1 as error };
        let value_1: any;
        export { value_1 as value };
        export function onChange_1(): void;
        export { onChange_1 as onChange };
        export function onBlur_1(): void;
        export { onBlur_1 as onBlur };
        export function onClick_1(): void;
        export { onClick_1 as onClick };
        let minLength_1: any;
        export { minLength_1 as minLength };
        let maxLength_1: any;
        export { maxLength_1 as maxLength };
    }
}
declare const _default: {
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
};
export default _default;
import PropTypes from 'prop-types';
import React from 'react';
