export default TabularView;
/**
 * Tabular view component class.
 * @function TabularView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */
declare function TabularView({ content }: any): string;
declare namespace TabularView {
    namespace propTypes {
        let content: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            /**
             * Title of the object
             */
            title: PropTypes.Requireable<string>;
            /**
             * Description of the object
             */
            description: PropTypes.Requireable<string>;
            /**
             * Child items of the object
             */
            items: PropTypes.Requireable<PropTypes.InferProps<{
                /**
                 * Title of the item
                 */
                title: PropTypes.Requireable<string>;
                /**
                 * Description of the item
                 */
                description: PropTypes.Requireable<string>;
                /**
                 * Url of the item
                 */
                url: PropTypes.Requireable<string>;
                /**
                 * Review state of the item
                 */
                review_state: PropTypes.Requireable<string>;
                /**
                 * Type of the item
                 */
                '@type': PropTypes.Requireable<string>;
            }>[]>;
        }>>>;
    }
}
import PropTypes from 'prop-types';
