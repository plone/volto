/**
 * A HOC that injects querystring metadata information from the backend.
 *
 */
export default function withQueryString(WrappedComponent: any): {
    (props: any): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
