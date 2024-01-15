export default SidebarPopup;
declare function SidebarPopup(props: any): JSX.Element;
declare namespace SidebarPopup {
    namespace propTypes {
        let open: PropTypes.Requireable<boolean>;
        let onClose: PropTypes.Requireable<(...args: any[]) => any>;
        let overlay: PropTypes.Requireable<boolean>;
    }
    namespace defaultProps {
        let open_1: boolean;
        export { open_1 as open };
        export function onClose_1(): void;
        export { onClose_1 as onClose };
        let overlay_1: boolean;
        export { overlay_1 as overlay };
    }
}
import PropTypes from 'prop-types';
