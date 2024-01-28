export function ContentsIndexHeaderComponent({ intl, width, label, connectDragSource, connectDropTarget, isDragging, }: {
    intl: any;
    width: any;
    label: any;
    connectDragSource: any;
    connectDropTarget: any;
    isDragging: any;
}): string;
export namespace ContentsIndexHeaderComponent {
    namespace propTypes {
        let width: PropTypes.Validator<number>;
        let label: PropTypes.Validator<string>;
        let connectDragSource: PropTypes.Validator<(...args: any[]) => any>;
        let connectDropTarget: PropTypes.Validator<(...args: any[]) => any>;
        let isDragging: PropTypes.Validator<boolean>;
        let order: PropTypes.Validator<number>;
        let onOrderIndex: PropTypes.Validator<(...args: any[]) => any>;
    }
}
declare const _default: ((props: any) => JSX.Element) & import("hoist-non-react-statics").NonReactStatics<any, {}>;
export default _default;
import PropTypes from 'prop-types';
