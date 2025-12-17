export default FormFieldWrapper;
/**
 * FormFieldWrapper component.
 * @function FormFieldWrapper
 * @param {Object} props - Component props
 * @returns {JSX.Element} Markup for the component.
 */
declare function FormFieldWrapper({ id, title, description, fieldSet, required, error, wrapped, columns, draggable, onEdit, className, isDisabled, onDelete, noForInFieldLabel, multilingual_options, children, }: any): JSX.Element;
declare namespace FormFieldWrapper {
    namespace propTypes {
        let id: any;
        let title: any;
        let description: any;
        let required: any;
        let error: any;
        let wrapped: any;
        let columns: any;
        let draggable: any;
        let isDisabled: any;
        let onEdit: any;
        let className: any;
        let onDelete: any;
        let fieldSet: any;
        let noForInFieldLabel: any;
        let multilingual_options: any;
        let children: any;
    }
}
