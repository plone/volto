declare const _default: import("react-redux").ConnectedComponent<{
    ({ types, pathname, content, currentLanguage }: {
        types: any;
        pathname: any;
        content: any;
        currentLanguage: any;
    }): JSX.Element;
    propTypes: {
        pathname: any;
        types: any;
    };
}, import("react-redux").Omit<Pick<{
    types: any;
    pathname: any;
    content: any;
    currentLanguage: any;
}, never> & Pick<import("prop-types").InferProps<{
    pathname: any;
    types: any;
}>, any>, "types" | "currentLanguage">>;
export default _default;
