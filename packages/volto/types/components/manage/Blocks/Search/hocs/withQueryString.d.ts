/**
 * A HOC that injects querystring metadata information from the backend.
 *
 */
export default function withQueryString(WrappedComponent: any): {
    (props: any): React.JSX.Element;
    displayName: string;
};
import React from 'react';
