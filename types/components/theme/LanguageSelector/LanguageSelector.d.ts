export default LanguageSelector;
declare function LanguageSelector(props: any): JSX.Element;
declare namespace LanguageSelector {
    namespace propTypes {
        let onClickAction: PropTypes.Requireable<(...args: any[]) => any>;
    }
    namespace defaultProps {
        export function onClickAction_1(): void;
        export { onClickAction_1 as onClickAction };
    }
}
import PropTypes from 'prop-types';
