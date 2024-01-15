export function connectAppComponent(AppComponent: any): import("react-redux").ConnectedComponent<any, any>;
/**
 * @export
 * @class App
 * @extends {Component}
 */
export class App extends React.Component<any, any, any> {
    /**
     * Property types.
     * @property {Object} propTypes Property types.
     * @static
     */
    static propTypes: {
        pathname: PropTypes.Validator<string>;
    };
    constructor(props: any);
    state: {
        hasError: boolean;
        error: any;
        errorInfo: any;
    };
    mainRef: React.RefObject<any>;
    /**
     * @method componentWillReceiveProps
     * @param {Object} nextProps Next properties
     * @returns {undefined}
     */
    UNSAFE_componentWillReceiveProps(nextProps: any): undefined;
    /**
     * ComponentDidCatch
     * @method ComponentDidCatch
     * @param {string} error  The error
     * @param {string} info The info
     * @returns {undefined}
     */
    componentDidCatch(error: string, info: string): undefined;
    dispatchContentClick: (event: any) => void;
    /**
     * Render method.
     * @method render
     * @returns {string} Markup for the component.
     */
    render(): string;
}
export const __test__: import("react-redux").ConnectedComponent<React.JSXElementConstructor<never>, never>;
export function fetchContent({ store, location }: {
    store: any;
    location: any;
}): Promise<any>;
declare const _default: import("react-redux").ConnectedComponent<any, any>;
export default _default;
import React from 'react';
import PropTypes from 'prop-types';
