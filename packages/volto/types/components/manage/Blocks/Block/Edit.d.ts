/**
 * Edit block class.
 * @class Edit
 * @extends Component
 */
export class Edit extends Component<any, any, any> {
    /**
     * Property types.
     * @property {Object} propTypes Property types.
     * @static
     */
    static propTypes: {
        type: any;
        data: any;
        properties: any;
        selected: any;
        multiSelected: any;
        index: any;
        id: any;
        manage: any;
        onMoveBlock: any;
        onDeleteBlock: any;
        editable: any;
        pathname: any;
    };
    /**
     * Default properties.
     * @property {Object} defaultProps Default properties.
     * @static
     */
    static defaultProps: {
        manage: boolean;
        editable: boolean;
    };
    constructor(props: any);
    constructor(props: any, context: any);
    componentDidMount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: any): void;
    blockNode: any;
    /**
     * Render method.
     * @method render
     * @returns {string} Markup for the component.
     */
    render(): string;
}
declare const _default: import("react").ForwardRefExoticComponent<Pick<import("react-intl").WithIntlProps<import("react-intl").WrappedComponentProps<string>>, string> & import("react").RefAttributes<import("react").ComponentType<import("react-intl").WrappedComponentProps<string>>>> & {
    WrappedComponent: import("react").ComponentType<import("react-intl").WrappedComponentProps<string>>;
};
export default _default;
import { Component } from 'react';
