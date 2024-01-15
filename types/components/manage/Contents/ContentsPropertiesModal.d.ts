export default ContentsPropertiesModal;
declare function ContentsPropertiesModal(props: any): JSX.Element;
declare namespace ContentsPropertiesModal {
    namespace propTypes {
        let items: PropTypes.Validator<string[]>;
        let open: PropTypes.Validator<boolean>;
        let onOk: PropTypes.Validator<(...args: any[]) => any>;
        let onCancel: PropTypes.Validator<(...args: any[]) => any>;
    }
}
import PropTypes from 'prop-types';
