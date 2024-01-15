export default ContainerBlockEdit;
declare function ContainerBlockEdit(props: any): JSX.Element;
declare namespace ContainerBlockEdit {
    namespace propTypes {
        let block: PropTypes.Validator<string>;
        let onChangeBlock: PropTypes.Validator<(...args: any[]) => any>;
        let pathname: PropTypes.Validator<string>;
        let selected: PropTypes.Validator<boolean>;
        let manage: PropTypes.Validator<boolean>;
        let direction: PropTypes.Requireable<string>;
    }
}
import PropTypes from 'prop-types';
