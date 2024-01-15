export default StandardWrapper;
declare function StandardWrapper(props: any): JSX.Element;
declare namespace StandardWrapper {
    namespace propTypes {
        let componentName: PropTypes.Validator<string>;
        let componentTitle: PropTypes.Requireable<string>;
        let unloadComponent: PropTypes.Validator<(...args: any[]) => any>;
        let loadComponent: PropTypes.Validator<(...args: any[]) => any>;
        let closeMenu: PropTypes.Validator<(...args: any[]) => any>;
        let hasActions: PropTypes.Requireable<boolean>;
    }
}
import PropTypes from 'prop-types';
