export default ContentsRenameModal;
declare function ContentsRenameModal(props: any): JSX.Element;
declare namespace ContentsRenameModal {
    namespace propTypes {
        let items: PropTypes.Validator<PropTypes.InferProps<{
            id: PropTypes.Requireable<string>;
            title: PropTypes.Requireable<string>;
            url: PropTypes.Requireable<string>;
        }>[]>;
        let open: PropTypes.Validator<boolean>;
        let onOk: PropTypes.Validator<(...args: any[]) => any>;
        let onCancel: PropTypes.Validator<(...args: any[]) => any>;
    }
}
import PropTypes from 'prop-types';
