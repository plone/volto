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
        data: any;
        detached: any;
        index: any;
        selected: any;
        block: any;
        onAddBlock: any;
        onInsertBlock: any;
        onChangeBlock: any;
        onDeleteBlock: any;
        onMutateBlock: any;
        onFocusPreviousBlock: any;
        onFocusNextBlock: any;
        onSelectBlock: any;
        editable: any;
        allowedBlocks: any;
        showRestricted: any;
        formTitle: any;
        formDescription: any;
        blocksConfig: any;
        properties: any;
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
declare function Preloader(props: any): import("react/jsx-runtime").JSX.Element;
