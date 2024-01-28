export class AsyncConnect extends React.Component<any, any, any> {
    constructor(props: any);
    state: {
        previousLocation: any;
    };
    mounted: boolean;
    loadDataCounter: number;
    componentDidMount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: any): void;
    componentWillUnmount(): void;
    isLoaded(): any;
    loadAsyncData({ reduxConnectStore, ...otherProps }: {
        [x: string]: any;
        reduxConnectStore: any;
    }): any;
    render(): JSX.Element;
}
export namespace AsyncConnect {
    namespace propTypes {
        let render: PropTypes.Requireable<(...args: any[]) => any>;
        let beginGlobalLoad: PropTypes.Validator<(...args: any[]) => any>;
        let endGlobalLoad: PropTypes.Validator<(...args: any[]) => any>;
        let reloadOnPropsChange: PropTypes.Requireable<(...args: any[]) => any>;
        let routes: PropTypes.Validator<any[]>;
        let location: PropTypes.Validator<object>;
        let match: PropTypes.Validator<object>;
        let helpers: PropTypes.Requireable<any>;
        let reduxConnectStore: PropTypes.Validator<object>;
    }
    namespace defaultProps {
        let helpers_1: {};
        export { helpers_1 as helpers };
        export function reloadOnPropsChange(): boolean;
        export function render({ routes }: {
            routes: any;
        }): any;
    }
}
export function AsyncConnectWithContext({ context, ...otherProps }: {
    [x: string]: any;
    context: any;
}): JSX.Element;
export namespace AsyncConnectWithContext {
    export namespace propTypes_1 {
        let context: PropTypes.Requireable<object>;
    }
    export { propTypes_1 as propTypes };
}
import React from 'react';
import PropTypes from 'prop-types';
