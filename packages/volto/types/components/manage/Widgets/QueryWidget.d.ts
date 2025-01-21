/**
 * Widget for a querystring value, to define a catalog search criteria.
 */
export class QuerystringWidgetComponent extends React.Component<any, any, any> {
    /**
     * Property types.
     * @property {Object} propTypes Property types.
     * @static
     */
    static propTypes: {
        id: any;
        title: any;
        description: any;
        required: any;
        error: any;
        value: any;
        focus: any;
        onChange: any;
        onEdit: any;
        onDelete: any;
        getQuerystring: any;
    };
    /**
     * Default properties.
     * @property {Object} defaultProps Default properties.
     * @static
     */
    static defaultProps: {
        description: any;
        required: boolean;
        error: any[];
        value: any;
        onChange: any;
        onEdit: any;
        onDelete: any;
        focus: boolean;
    };
    /**
     * Constructor
     * @method constructor
     * @param {Object} props Component properties
     * @constructs EditComponent
     */
    constructor(props: any);
    state: {
        visual: boolean;
    };
    /**
     * Change value handler
     * @method onChangeValue
     * @param {Number} index Index of the row.
     * @param {String|Array} value Value of the row.
     * @returns {undefined}
     */
    onChangeValue(index: number, value: string | any[]): undefined;
    /**
     * Get correct widget
     * @method getWidget
     * @param {Object} row Row object.
     * @param {number} index Row index.
     * @returns {Object} Widget.
     */
    getWidget(row: any, index: number, Select: any): any;
    /**
     * Component did mount lifecycle method
     * @method componentDidMount
     * @returns {undefined}
     */
    componentDidMount(): undefined;
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
