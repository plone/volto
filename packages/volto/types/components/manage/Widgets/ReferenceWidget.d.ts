export default ReferenceWidget;
declare function ReferenceWidget(props: any): import("react/jsx-runtime").JSX.Element;
declare namespace ReferenceWidget {
    namespace propTypes {
        let id: any;
        let title: any;
        let description: any;
        let required: any;
        let multiple: any;
        let error: any;
        let value: any;
        let onChange: any;
        let wrapped: any;
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
        let multiple_1: boolean;
        export { multiple_1 as multiple };
    }
}
