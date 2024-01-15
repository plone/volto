export function withContentNavigation(WrappedComponent: any): {
    (props: any): JSX.Element;
    propTypes: {
        /**
         * Location, from router
         */
        location: PropTypes.Requireable<PropTypes.InferProps<{
            pathname: PropTypes.Requireable<string>;
        }>>;
        /**
         * Parameters passed to the @contextnavigation endpoint
         */
        params: PropTypes.Requireable<PropTypes.InferProps<{
            name: PropTypes.Requireable<string>;
            root_path: PropTypes.Requireable<string>;
            includeTop: PropTypes.Requireable<boolean>;
            currentFolderOnly: PropTypes.Requireable<boolean>;
            topLevel: PropTypes.Requireable<number>;
            bottomLevel: PropTypes.Requireable<number>;
            no_icons: PropTypes.Requireable<boolean>;
            thumb_scale: PropTypes.Requireable<string>;
            no_thumbs: PropTypes.Requireable<boolean>;
        }>>;
    };
    displayName: string;
};
import PropTypes from 'prop-types';
