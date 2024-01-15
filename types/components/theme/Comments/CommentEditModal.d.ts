export default CommentEditModal;
declare function CommentEditModal(props: any): JSX.Element;
declare namespace CommentEditModal {
    namespace propTypes {
        let id: PropTypes.Validator<string>;
        let text: PropTypes.Validator<string>;
        let request: PropTypes.Requireable<PropTypes.InferProps<{
            loading: PropTypes.Requireable<boolean>;
            loaded: PropTypes.Requireable<boolean>;
        }>>;
        let open: PropTypes.Validator<boolean>;
        let onOk: PropTypes.Validator<(...args: any[]) => any>;
        let onCancel: PropTypes.Validator<(...args: any[]) => any>;
    }
    namespace defaultProps {
        let id_1: string;
        export { id_1 as id };
        let text_1: string;
        export { text_1 as text };
    }
}
import PropTypes from 'prop-types';
