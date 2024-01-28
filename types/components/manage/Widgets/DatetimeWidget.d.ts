/**
 * DatetimeWidget component class
 * @class DatetimeWidget
 * @extends Component
 *
 * To use it, in schema properties, declare a field like:
 *
 * ```jsx
 * {
 *  title: "Publish date",
 *  type: 'datetime',
 * }
 * ```
 */
export class DatetimeWidgetComponent extends React.Component<any, any, any> {
    /**
     * Constructor
     * @method constructor
     * @param {Object} props Component properties
     * @constructs DatetimeWidget
     */
    constructor(props: any);
    moment: any;
    state: {
        focused: boolean;
        isDefault: boolean;
    };
    getInternalValue(): any;
    getDateOnly(): any;
    /**
     * Update date storage
     * @method onDateChange
     * @param {Object} date updated momentjs Object for date
     * @returns {undefined}
     */
    onDateChange: (date: any) => undefined;
    /**
     * Update date storage
     * @method onTimeChange
     * @param {Object} time updated momentjs Object for time
     * @returns {undefined}
     */
    onTimeChange: (time: any) => undefined;
    onResetDates: () => void;
    /**
     * Handle SingleDatePicker focus
     * @method onFocusChange
     * @param {boolean} focused component focus state.
     * @returns {undefined}
     */
    onFocusChange: ({ focused }: boolean) => undefined;
    render(): JSX.Element;
}
export namespace DatetimeWidgetComponent {
    namespace propTypes {
        let id: PropTypes.Validator<string>;
        let title: PropTypes.Validator<string>;
        let description: PropTypes.Requireable<string>;
        let required: PropTypes.Requireable<boolean>;
        let error: PropTypes.Requireable<string[]>;
        let dateOnly: PropTypes.Requireable<boolean>;
        let noPastDates: PropTypes.Requireable<boolean>;
        let value: PropTypes.Requireable<string>;
        let onChange: PropTypes.Validator<(...args: any[]) => any>;
        let wrapped: PropTypes.Requireable<boolean>;
        let resettable: PropTypes.Requireable<boolean>;
    }
    namespace defaultProps {
        let description_1: any;
        export { description_1 as description };
        let required_1: boolean;
        export { required_1 as required };
        let error_1: any[];
        export { error_1 as error };
        let dateOnly_1: boolean;
        export { dateOnly_1 as dateOnly };
        let noPastDates_1: boolean;
        export { noPastDates_1 as noPastDates };
        let value_1: any;
        export { value_1 as value };
        let resettable_1: boolean;
        export { resettable_1 as resettable };
    }
}
declare const _default: ((props: any) => JSX.Element) & import("hoist-non-react-statics").NonReactStatics<any, {}>;
export default _default;
import React from 'react';
import PropTypes from 'prop-types';
