export { HelmetExport as Helmet };
export default HelmetExport;
declare const HelmetExport: {
    new (): {
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
        render(): JSX.Element;
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
};
