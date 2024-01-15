export default ContentsWorkflowModal;
declare function ContentsWorkflowModal(props: any): JSX.Element;
declare namespace ContentsWorkflowModal {
    namespace propTypes {
        let items: PropTypes.Validator<string[]>;
        let open: PropTypes.Validator<boolean>;
        let onOk: PropTypes.Validator<(...args: any[]) => any>;
        let onCancel: PropTypes.Validator<(...args: any[]) => any>;
    }
}
import PropTypes from 'prop-types';
