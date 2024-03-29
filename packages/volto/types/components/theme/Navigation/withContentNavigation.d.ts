export function withContentNavigation(WrappedComponent: any): {
    (props: any): import("react/jsx-runtime").JSX.Element;
    propTypes: {
        /**
         * Location, from router
         */
        location: any;
        /**
         * Parameters passed to the @contextnavigation endpoint
         */
        params: any;
    };
    displayName: string;
};
