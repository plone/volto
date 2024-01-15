export default Actions;
declare function Actions(props: any): JSX.Element;
declare namespace Actions {
    namespace propTypes {
        let pathname: PropTypes.Validator<string>;
    }
}
import PropTypes from 'prop-types';
