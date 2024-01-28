/**
 * A navigation slot implementation, similar to the classic Plone navigation
 * portlet. It uses the same API, so the options are similar to
 * INavigationPortlet
 */
export function ContextNavigationComponent(props: any): "" | JSX.Element;
export namespace ContextNavigationComponent {
    namespace propTypes {
        let navigation: PropTypes.Requireable<PropTypes.InferProps<{
            items: PropTypes.Requireable<PropTypes.InferProps<{
                title: PropTypes.Requireable<string>;
                url: PropTypes.Requireable<string>;
            }>[]>;
            has_custom_name: PropTypes.Requireable<boolean>;
            title: PropTypes.Requireable<string>;
        }>>;
    }
}
declare const _default: any;
export default _default;
import PropTypes from 'prop-types';
