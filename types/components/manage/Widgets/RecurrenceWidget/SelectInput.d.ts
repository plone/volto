export default SelectInput;
/**
 * SelectInput component class.
 * @function SelectInput
 * @returns {string} Markup of the component.
 */
declare function SelectInput({ name, disabled, options, value, onChange }: {
    name: any;
    disabled: any;
    options: any;
    value: any;
    onChange: any;
}): string;
declare namespace SelectInput {
    namespace propTypes {
        let name: PropTypes.Validator<string>;
        let options: PropTypes.Validator<any[]>;
        let disabled: PropTypes.Requireable<boolean>;
        let value: PropTypes.Requireable<any>;
        let onChange: PropTypes.Requireable<(...args: any[]) => any>;
    }
    namespace defaultProps {
        let name_1: string;
        export { name_1 as name };
        let options_1: any[];
        export { options_1 as options };
        let disabled_1: boolean;
        export { disabled_1 as disabled };
        let value_1: any;
        export { value_1 as value };
        let onChange_1: any;
        export { onChange_1 as onChange };
    }
}
import PropTypes from 'prop-types';
