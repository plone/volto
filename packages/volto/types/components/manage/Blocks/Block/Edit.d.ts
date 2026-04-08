/**
 * Edit block class.
 * @class Edit
 * @extends Component
 */
export class Edit extends React.Component<any, any, any> {
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
    blockNode: React.RefObject<any>;
    /**
     * Render method.
     * @method render
     * @returns {string} Markup for the component.
     */
    render(): string;
}
declare const _default: any;
export default _default;
import React from 'react';
