/**
 * Form container class.
 * @class Form
 * @extends Component
 */
export class Form extends React.Component<any, any, any> {
    /**
     * Property types.
     * @property {Object} propTypes Property types.
     * @static
     */
    static propTypes: {
        schema: any;
        widgets: any;
        component: any;
        formData: any;
        globalData: any;
        metadataFieldsets: any;
        metadataFieldFocus: any;
        pathname: any;
        onSubmit: any;
        onCancel: any;
        submitLabel: any;
        cancelLabel: any;
        textButtons: any;
        buttonComponent: any;
        resetAfterSubmit: any;
        resetOnCancel: any;
        isEditForm: any;
        isAdminForm: any;
        title: any;
        error: any;
        loading: any;
        hideActions: any;
        description: any;
        visual: any;
        blocks: any;
        isFormSelected: any;
        onSelectForm: any;
        editable: any;
        onChangeFormData: any;
        requestError: any;
        allowedBlocks: any;
        showRestricted: any;
        global: any;
        checkSavedDraft: any;
        onSaveDraft: any;
        onCancelDraft: any;
    };
    /**
     * Default properties.
     * @property {Object} defaultProps Default properties.
     * @static
     */
    static defaultProps: {
        formData: any;
        widgets: any;
        component: any;
        onSubmit: any;
        onCancel: any;
        submitLabel: any;
        cancelLabel: any;
        textButtons: boolean;
        buttonComponent: any;
        resetAfterSubmit: boolean;
        resetOnCancel: boolean;
        isEditForm: boolean;
        isAdminForm: boolean;
        title: any;
        description: any;
        error: any;
        loading: any;
        hideActions: boolean;
        visual: boolean;
        blocks: any[];
        pathname: string;
        schema: {};
        isFormSelected: boolean;
        onSelectForm: any;
        editable: boolean;
        requestError: any;
        allowedBlocks: any;
        global: boolean;
        checkSavedDraft: () => void;
        onSaveDraft: () => void;
        onCancelDraft: () => void;
    };
    /**
     * Constructor
     * @method constructor
     * @param {Object} props Component properties
     * @constructs Form
     */
    constructor(props: any);
    state: {
        formData: any;
        initialFormData: any;
        errors: {};
        isClient: boolean;
        inFocus: {};
        sidebarMetadataIsAvailable: boolean;
    };
    /**
     * Change field handler
     * Remove errors for changed field
     * @method onChangeField
     * @param {string} id Id of the field
     * @param {*} value Value of the field
     * @returns {undefined}
     */
    onChangeField(id: string, value: any): undefined;
    /**
     * Select block handler
     * @method onSelectBlock
     * @param {string} id Id of the field
     * @param {string} isMultipleSelection true if multiple blocks are selected
     * @returns {undefined}
     */
    onSelectBlock(id: string, isMultipleSelection: string, event: any): undefined;
    /**
     * Submit handler also validate form and collect errors
     * @method onSubmit
     * @param {Object} event Event object.
     * @returns {undefined}
     */
    onSubmit(event: any): undefined;
    /**
     * Cancel handler
     * It prevents event from triggering submit, reset form if props.resetAfterSubmit
     * and calls this.props.onCancel
     * @method onCancel
     * @param {Object} event Event object.
     * @returns {undefined}
     */
    onCancel(event: any): undefined;
    /**
     * Tab selection is done only by setting activeIndex in state
     */
    onTabChange(e: any, { activeIndex }: {
        activeIndex: any;
    }): void;
    /**
     * Validate fields on blur
     * @method onBlurField
     * @param {string} id Id of the field
     * @param {*} value Value of the field
     * @returns {undefined}
     */
    onBlurField(id: string, value: any): undefined;
    /**
     * If user clicks on input, the form will be not considered pristine
     * this will avoid onBlur effects without interaction with the form
     * @param {Object} e event
     */
    onClickInput(e: any): void;
    /**
     * Toggle metadata fieldset handler
     * @method onToggleMetadataFieldset
     * @param {Object} event Event object.
     * @param {Object} blockProps Block properties.
     * @returns {undefined}
     */
    onToggleMetadataFieldset(event: any, blockProps: any): undefined;
    /**
     * Function sent as callback to saveAsDraft when user
     * choses to load local data
     * @param {Object} savedFormData
     */
    updateFormDataWithSaved(savedFormData: any): void;
    /**
     * On updates caused by props change
     * if errors from Backend come, these will be shown to their corresponding Fields
     * also the first Tab to have any errors will be selected
     * @param {Object} prevProps
     */
    componentDidUpdate(prevProps: any, prevState: any): Promise<void>;
    /**
     * Component did mount
     * @method componentDidMount
     * @returns {undefined}
     */
    componentDidMount(): undefined;
    /**
     * getOnlyFormModifiedValues handler
     * It returns only the values of the fields that are have really changed since the
     * form was loaded. Useful for edit forms and PATCH operations, when we only want to
     * send the changed data.
     * @method getOnlyFormModifiedValues
     * @param {Object} event Event object.
     * @returns {undefined}
     */
    getOnlyFormModifiedValues: () => undefined;
    /**
     * Removed blocks and blocks_layout fields from the form.
     * @method removeBlocksLayoutFields
     * @param {object} schema The schema definition of the form.
     * @returns A modified copy of the given schema.
     */
    removeBlocksLayoutFields: (schema: object) => any;
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
