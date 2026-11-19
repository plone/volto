export function withContentNavigation(WrappedComponent: any): {
    (props: any): React.JSX.Element;
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
import React from 'react';
