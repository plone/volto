export function convertReactPropstoHtmlAttributes(props: any, initAttributes?: {}): {};
export function handleClientStateChange(newState: any): void;
export function mapStateOnServer({ baseTag, bodyAttributes, encode, htmlAttributes, linkTags, metaTags, noscriptTags, scriptTags, styleTags, title, titleAttributes, }: {
    baseTag: any;
    bodyAttributes: any;
    encode: any;
    htmlAttributes: any;
    linkTags: any;
    metaTags: any;
    noscriptTags: any;
    scriptTags: any;
    styleTags: any;
    title?: string;
    titleAttributes: any;
}): {
    base: {
        toComponent: () => any;
        toString: () => any;
    };
    bodyAttributes: {
        toComponent: () => any;
        toString: () => any;
    };
    htmlAttributes: {
        toComponent: () => any;
        toString: () => any;
    };
    link: {
        toComponent: () => any;
        toString: () => any;
    };
    meta: {
        toComponent: () => any;
        toString: () => any;
    };
    noscript: {
        toComponent: () => any;
        toString: () => any;
    };
    script: {
        toComponent: () => any;
        toString: () => any;
    };
    style: {
        toComponent: () => any;
        toString: () => any;
    };
    title: {
        toComponent: () => any;
        toString: () => any;
    };
};
export function reducePropsToState(propsList: any): {
    baseTag: any;
    bodyAttributes: any;
    defer: any;
    encode: any;
    htmlAttributes: any;
    linkTags: any;
    metaTags: any;
    noscriptTags: any;
    onChangeClientState: any;
    scriptTags: any;
    styleTags: any;
    title: any;
    titleAttributes: any;
};
export const requestAnimationFrame: any;
export function warn(msg: any): void;
