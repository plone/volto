export default ColorPickerWidget;
declare function ColorPickerWidget(props: any): JSX.Element;
declare namespace ColorPickerWidget {
    namespace propTypes {
        let id: any;
        let title: any;
        let required: any;
        let value: any;
        let onChange: any;
        let colors: any;
    }
    namespace defaultProps {
        let required_1: boolean;
        export { required_1 as required };
        let value_1: any;
        export { value_1 as value };
        let onChange_1: any;
        export { onChange_1 as onChange };
        let colors_1: any[];
        export { colors_1 as colors };
    }
}
