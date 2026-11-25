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
    static defaultProps: {
        manage: boolean;
        editable: boolean;
    };
    constructor(props: any);
    constructor(props: any, context: any);
    /**
     * Default properties.
     * @property {Object} defaultProps Default properties.
     * @static
     */
    blockNode: React.RefObject<any>;
    componentDidMount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: any): void;
    /**
     * True when the event originates inside a nested block form rendered by
     * this block (e.g. a child block of a Group, Columns, Grid, Tabs or
     * Accordion container). Child modifier semantics belong to the nested
     * form; the container may only activate itself as a single selection.
     * @param {Event} event the synthetic event
     * @returns {boolean}
     */
    isNestedFormEvent: (event: Event) => boolean;
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
