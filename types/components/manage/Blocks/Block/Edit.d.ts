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
        type: PropTypes.Validator<string>;
        data: PropTypes.Validator<{
            [x: string]: any;
        }>;
        properties: PropTypes.Validator<{
            [x: string]: any;
        }>;
        selected: PropTypes.Validator<boolean>;
        multiSelected: PropTypes.Requireable<boolean>;
        index: PropTypes.Validator<number>;
        id: PropTypes.Validator<string>;
        manage: PropTypes.Requireable<boolean>;
        onMoveBlock: PropTypes.Validator<(...args: any[]) => any>;
        onDeleteBlock: PropTypes.Validator<(...args: any[]) => any>;
        editable: PropTypes.Requireable<boolean>;
        pathname: PropTypes.Validator<string>;
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
import PropTypes from 'prop-types';
