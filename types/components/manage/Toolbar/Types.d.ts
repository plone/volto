declare const _default: import("react-redux").ConnectedComponent<{
    ({ types, pathname, content, currentLanguage }: {
        types: any;
        pathname: any;
        content: any;
        currentLanguage: any;
    }): JSX.Element;
    propTypes: {
        pathname: PropTypes.Validator<string>;
        types: PropTypes.Validator<PropTypes.InferProps<{
            '@id': PropTypes.Requireable<string>;
            addable: PropTypes.Requireable<boolean>;
            title: PropTypes.Requireable<string>;
        }>[]>;
    };
}, import("react-redux").Omit<Pick<{
    types: any;
    pathname: any;
    content: any;
    currentLanguage: any;
}, never> & Pick<PropTypes.InferProps<{
    pathname: PropTypes.Validator<string>;
    types: PropTypes.Validator<PropTypes.InferProps<{
        '@id': PropTypes.Requireable<string>;
        addable: PropTypes.Requireable<boolean>;
        title: PropTypes.Requireable<string>;
    }>[]>;
}>, "pathname" | "types"> & Pick<{
    types: any;
    pathname: any;
    content: any;
    currentLanguage: any;
}, "content" | "currentLanguage">, "types" | "currentLanguage">>;
export default _default;
import PropTypes from 'prop-types';
