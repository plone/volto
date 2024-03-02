export { HelmetExport as Helmet };
export default HelmetExport;
declare const HelmetExport: {
    new (props: any): {
        shouldComponentUpdate(nextProps: any): boolean;
        mapNestedChildrenToProps(child: any, nestedChildren: any): {
            innerHTML: any;
            cssText?: undefined;
        } | {
            cssText: any;
            innerHTML?: undefined;
        };
        flattenArrayTypeChildren({ child, arrayTypeChildren, newChildProps, nestedChildren, }: {
            child: any;
            arrayTypeChildren: any;
            newChildProps: any;
            nestedChildren: any;
        }): any;
        mapObjectTypeChildren({ child, newProps, newChildProps, nestedChildren }: {
            child: any;
            newProps: any;
            newChildProps: any;
            nestedChildren: any;
        }): any;
        mapArrayTypeChildrenToProps(arrayTypeChildren: any, newProps: any): any;
        warnOnInvalidChildren(child: any, nestedChildren: any): true | void;
        mapChildrenToProps(children: any, newProps: any): any;
        render(): import("react/jsx-runtime").JSX.Element;
        context: unknown;
        setState<K extends string | number | symbol>(state: any, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        readonly props: Readonly<any>;
        state: Readonly<any>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
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
    new (props: any, context: any): {
        shouldComponentUpdate(nextProps: any): boolean;
        mapNestedChildrenToProps(child: any, nestedChildren: any): {
            innerHTML: any;
            cssText?: undefined;
        } | {
            cssText: any;
            innerHTML?: undefined;
        };
        flattenArrayTypeChildren({ child, arrayTypeChildren, newChildProps, nestedChildren, }: {
            child: any;
            arrayTypeChildren: any;
            newChildProps: any;
            nestedChildren: any;
        }): any;
        mapObjectTypeChildren({ child, newProps, newChildProps, nestedChildren }: {
            child: any;
            newProps: any;
            newChildProps: any;
            nestedChildren: any;
        }): any;
        mapArrayTypeChildrenToProps(arrayTypeChildren: any, newProps: any): any;
        warnOnInvalidChildren(child: any, nestedChildren: any): true | void;
        mapChildrenToProps(children: any, newProps: any): any;
        render(): import("react/jsx-runtime").JSX.Element;
        context: unknown;
        setState<K extends string | number | symbol>(state: any, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        readonly props: Readonly<any>;
        state: Readonly<any>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
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
     * @param {Object} base: {"target": "_blank", "href": "http://mysite.com/"}
     * @param {Object} bodyAttributes: {"className": "root"}
     * @param {String} defaultTitle: "Default Title"
     * @param {Boolean} defer: true
     * @param {Boolean} encodeSpecialCharacters: true
     * @param {Object} htmlAttributes: {"lang": "en", "amp": undefined}
     * @param {Array} link: [{"rel": "canonical", "href": "http://mysite.com/example"}]
     * @param {Array} meta: [{"name": "description", "content": "Test description"}]
     * @param {Array} noscript: [{"innerHTML": "<img src='http://mysite.com/js/test.js'"}]
     * @param {Function} onChangeClientState: "(newState) => console.log(newState)"
     * @param {Array} script: [{"type": "text/javascript", "src": "http://mysite.com/js/test.js"}]
     * @param {Array} style: [{"type": "text/css", "cssText": "div { display: block; color: blue; }"}]
     * @param {String} title: "Title"
     * @param {Object} titleAttributes: {"itemprop": "name"}
     * @param {String} titleTemplate: "MySite.com - %s"
     */
    propTypes: {
        base: any;
        bodyAttributes: any;
        children: any;
        defaultTitle: any;
        defer: any;
        encodeSpecialCharacters: any;
        htmlAttributes: any;
        link: any;
        meta: any;
        noscript: any;
        onChangeClientState: any;
        script: any;
        style: any;
        title: any;
        titleAttributes: any;
        titleTemplate: any;
    };
    defaultProps: {
        defer: boolean;
        encodeSpecialCharacters: boolean;
    };
    peek: any;
    rewind: () => any;
    canUseDOM: any;
    contextType?: React.Context<any>;
};
import React from 'react';
