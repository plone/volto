export function ContentsItemComponent({ item, selected, onClick, indexes, onCut, onCopy, onDelete, onMoveToTop, onMoveToBottom, connectDragPreview, connectDragSource, connectDropTarget, isDragging, order, }: {
    item: any;
    selected: any;
    onClick: any;
    indexes: any;
    onCut: any;
    onCopy: any;
    onDelete: any;
    onMoveToTop: any;
    onMoveToBottom: any;
    connectDragPreview: any;
    connectDragSource: any;
    connectDropTarget: any;
    isDragging: any;
    order: any;
}): string;
export namespace ContentsItemComponent {
    namespace propTypes {
        let item: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            '@id': PropTypes.Requireable<string>;
            title: PropTypes.Requireable<string>;
            is_folderish: PropTypes.Requireable<boolean>;
            '@type': PropTypes.Requireable<string>;
        }>>>;
        let selected: PropTypes.Validator<boolean>;
        let onClick: PropTypes.Validator<(...args: any[]) => any>;
        let indexes: PropTypes.Validator<PropTypes.InferProps<{
            id: PropTypes.Requireable<string>;
            type: PropTypes.Requireable<string>;
        }>[]>;
        let onCut: PropTypes.Validator<(...args: any[]) => any>;
        let onCopy: PropTypes.Validator<(...args: any[]) => any>;
        let onDelete: PropTypes.Validator<(...args: any[]) => any>;
        let onMoveToTop: PropTypes.Validator<(...args: any[]) => any>;
        let onMoveToBottom: PropTypes.Validator<(...args: any[]) => any>;
        let connectDragPreview: PropTypes.Validator<(...args: any[]) => any>;
        let connectDragSource: PropTypes.Validator<(...args: any[]) => any>;
        let connectDropTarget: PropTypes.Validator<(...args: any[]) => any>;
        let isDragging: PropTypes.Validator<boolean>;
        let order: PropTypes.Validator<number>;
        let onOrderItem: PropTypes.Validator<(...args: any[]) => any>;
    }
}
declare const _default: ((props: any) => JSX.Element) & import("hoist-non-react-statics").NonReactStatics<any, {}>;
export default _default;
import PropTypes from 'prop-types';
