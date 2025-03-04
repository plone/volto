export class AsyncConnect extends Component<any, any, any> {
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
        let render: any;
        let beginGlobalLoad: any;
        let endGlobalLoad: any;
        let reloadOnPropsChange: any;
        let routes: any;
        let location: any;
        let match: any;
        let helpers: any;
        let reduxConnectStore: any;
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
        let context: any;
    }
    export { propTypes_1 as propTypes };
}
import { Component } from 'react';
