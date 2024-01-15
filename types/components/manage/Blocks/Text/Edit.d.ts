/**
 * Edit text block class.
 * @class Edit
 * @extends Component
 */
export class EditComponent extends React.Component<any, any, any> {
    /**
     * Property types.
     * @property {Object} propTypes Property types.
     * @static
     */
    static propTypes: {
        data: PropTypes.Validator<{
            [x: string]: any;
        }>;
        detached: PropTypes.Requireable<boolean>;
        index: PropTypes.Validator<number>;
        selected: PropTypes.Validator<boolean>;
        block: PropTypes.Validator<string>;
        onAddBlock: PropTypes.Validator<(...args: any[]) => any>;
        onInsertBlock: PropTypes.Validator<(...args: any[]) => any>;
        onChangeBlock: PropTypes.Validator<(...args: any[]) => any>;
        onDeleteBlock: PropTypes.Validator<(...args: any[]) => any>;
        onMutateBlock: PropTypes.Validator<(...args: any[]) => any>;
        onFocusPreviousBlock: PropTypes.Validator<(...args: any[]) => any>;
        onFocusNextBlock: PropTypes.Validator<(...args: any[]) => any>;
        onSelectBlock: PropTypes.Validator<(...args: any[]) => any>;
        editable: PropTypes.Requireable<boolean>;
        allowedBlocks: PropTypes.Requireable<string[]>;
        showRestricted: PropTypes.Requireable<boolean>;
        formTitle: PropTypes.Requireable<string>;
        formDescription: PropTypes.Requireable<string>;
        blocksConfig: PropTypes.Requireable<{
            [x: string]: any;
        }>;
        properties: PropTypes.Requireable<{
            [x: string]: any;
        }>;
    };
    /**
     * Default properties
     * @property {Object} defaultProps Default properties.
     * @static
     */
    static defaultProps: {
        detached: boolean;
        editable: boolean;
    };
    /**
     * Constructor
     * @method constructor
     * @param {Object} props Component properties
     * @constructs WysiwygEditor
     */
    constructor(props: any);
    draftConfig: any;
    /**
     * Change handler
     * @method onChange
     * @param {object} editorState Editor state.
     * @returns {undefined}
     */
    onChange(editorState: object): undefined;
    /**
     * Component will receive props
     * @method componentDidMount
     * @returns {undefined}
     */
    componentDidMount(): undefined;
    /**
     * Component will receive props
     * @method componentWillReceiveProps
     * @param {Object} nextProps Next properties
     * @returns {undefined}
     */
    UNSAFE_componentWillReceiveProps(nextProps: any): undefined;
    componentDidUpdate(prevProps: any): void;
    /**
     * @param {*} nextProps
     * @param {*} nextState
     * @returns {boolean}
     * @memberof Edit
     */
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    /**
     * Render method.
     * @method render
     * @returns {string} Markup for the component.
     */
    render(): string;
    node: any;
}
export const Edit: any;
export default Preloader;
import React from 'react';
import PropTypes from 'prop-types';
declare function Preloader(props: any): JSX.Element;
