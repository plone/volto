export default GridBlockEdit;
declare function GridBlockEdit(props: any): JSX.Element;
declare namespace GridBlockEdit {
    namespace propTypes {
        let block: PropTypes.Validator<string>;
        let onChangeBlock: PropTypes.Validator<(...args: any[]) => any>;
        let pathname: PropTypes.Validator<string>;
        let selected: PropTypes.Validator<boolean>;
        let manage: PropTypes.Validator<boolean>;
    }
}
import PropTypes from 'prop-types';
