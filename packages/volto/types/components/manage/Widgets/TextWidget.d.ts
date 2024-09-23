export default TextWidget;
declare function TextWidget(props: any): import("react/jsx-runtime").JSX.Element;
declare namespace TextWidget {
    namespace propTypes {
        let id: any;
        let title: any;
        let description: any;
        let required: any;
        let error: any;
        let value: any;
        let focus: any;
        let onChange: any;
        let onBlur: any;
        let onClick: any;
        let onEdit: any;
        let onDelete: any;
        let icon: any;
        let iconAction: any;
        let minLength: any;
        let maxLength: any;
        let wrapped: any;
        let placeholder: any;
    }
    namespace defaultProps {
        let description_1: any;
        export { description_1 as description };
        let required_1: boolean;
        export { required_1 as required };
        let error_1: any[];
        export { error_1 as error };
        let value_1: any;
        export { value_1 as value };
        export function onChange_1(): void;
        export { onChange_1 as onChange };
        export function onBlur_1(): void;
        export { onBlur_1 as onBlur };
        export function onClick_1(): void;
        export { onClick_1 as onClick };
        let onEdit_1: any;
        export { onEdit_1 as onEdit };
        let onDelete_1: any;
        export { onDelete_1 as onDelete };
        let focus_1: boolean;
        export { focus_1 as focus };
        let icon_1: any;
        export { icon_1 as icon };
        let iconAction_1: any;
        export { iconAction_1 as iconAction };
        let minLength_1: any;
        export { minLength_1 as minLength };
        let maxLength_1: any;
        export { maxLength_1 as maxLength };
    }
}
