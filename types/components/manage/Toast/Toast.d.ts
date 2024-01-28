export default Toast;
declare function Toast(props: any): JSX.Element;
declare namespace Toast {
    namespace propTypes {
        let title: PropTypes.Requireable<NonNullable<string | any[]>>;
        let content: PropTypes.Validator<string>;
        let info: PropTypes.Requireable<boolean>;
        let success: PropTypes.Requireable<boolean>;
        let error: PropTypes.Requireable<boolean>;
        let warning: PropTypes.Requireable<boolean>;
    }
}
import PropTypes from 'prop-types';
