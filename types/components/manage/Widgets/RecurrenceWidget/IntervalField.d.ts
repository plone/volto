export default IntervalField;
/**
 * IntervalField component class.
 * @function IntervalField
 * @returns {string} Markup of the component.
 */
declare function IntervalField({ label, labelAfter, value, onChange }: {
    label: any;
    labelAfter: any;
    value: any;
    onChange: any;
}): string;
declare namespace IntervalField {
    namespace propTypes {
        let label: PropTypes.Validator<string>;
        let labelAfter: PropTypes.Requireable<string>;
        let value: PropTypes.Requireable<any>;
        let onChange: PropTypes.Requireable<(...args: any[]) => any>;
    }
    namespace defaultProps {
        let label_1: any;
        export { label_1 as label };
        let labelAfter_1: any;
        export { labelAfter_1 as labelAfter };
        let onChange_1: any;
        export { onChange_1 as onChange };
    }
}
import PropTypes from 'prop-types';
