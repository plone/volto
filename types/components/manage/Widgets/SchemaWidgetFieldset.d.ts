export function SchemaWidgetFieldsetComponent({ title, order, active, onShowEditFieldset, onShowDeleteFieldset, onClick, getItemStyle, isDraggable, isDisabled, reactBeautifulDnd, }: {
    title: any;
    order: any;
    active: any;
    onShowEditFieldset: any;
    onShowDeleteFieldset: any;
    onClick: any;
    getItemStyle: any;
    isDraggable: any;
    isDisabled: any;
    reactBeautifulDnd: any;
}): string;
export namespace SchemaWidgetFieldsetComponent {
    namespace propTypes {
        let order: PropTypes.Validator<number>;
        let active: PropTypes.Validator<boolean>;
        let onOrderFieldset: PropTypes.Validator<(...args: any[]) => any>;
        let onShowEditFieldset: PropTypes.Validator<(...args: any[]) => any>;
        let onShowDeleteFieldset: PropTypes.Validator<(...args: any[]) => any>;
        let onClick: PropTypes.Validator<(...args: any[]) => any>;
        let getItemStyle: PropTypes.Validator<(...args: any[]) => any>;
        let isDraggable: PropTypes.Requireable<boolean>;
        let isDisabled: PropTypes.Requireable<boolean>;
    }
}
declare const _default: ((props: any) => JSX.Element) & import("hoist-non-react-statics").NonReactStatics<any, {}>;
export default _default;
import PropTypes from 'prop-types';
