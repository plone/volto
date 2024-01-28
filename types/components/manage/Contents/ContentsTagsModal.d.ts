export default ContentsTagsModal;
declare function ContentsTagsModal(props: any): JSX.Element;
declare namespace ContentsTagsModal {
    namespace propTypes {
        let items: PropTypes.Validator<PropTypes.InferProps<{
            subjects: PropTypes.Requireable<string[]>;
            url: PropTypes.Requireable<string>;
        }>[]>;
        let open: PropTypes.Validator<boolean>;
        let onOk: PropTypes.Validator<(...args: any[]) => any>;
        let onCancel: PropTypes.Validator<(...args: any[]) => any>;
    }
}
import PropTypes from 'prop-types';
