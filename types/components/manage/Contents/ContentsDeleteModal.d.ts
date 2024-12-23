export default ContentsDeleteModal;
declare function ContentsDeleteModal(props: any): JSX.Element;
declare namespace ContentsDeleteModal {
    namespace propTypes {
        let itemsToDelete: PropTypes.Validator<PropTypes.InferProps<{
            UID: PropTypes.Requireable<string>;
        }>[]>;
        let open: PropTypes.Validator<boolean>;
        let onOk: PropTypes.Validator<(...args: any[]) => any>;
        let onCancel: PropTypes.Validator<(...args: any[]) => any>;
    }
}
import PropTypes from 'prop-types';
