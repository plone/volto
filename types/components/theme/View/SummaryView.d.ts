export default SummaryView;
/**
 * Summary view component class.
 * @function SummaryView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */
declare function SummaryView({ content }: any): string;
declare namespace SummaryView {
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
                 * Image of the item
                 */
                image: PropTypes.Requireable<object>;
                /**
                 * Image caption of the item
                 */
                image_caption: PropTypes.Requireable<string>;
                /**
                 * Type of the item
                 */
                '@type': PropTypes.Requireable<string>;
            }>[]>;
        }>>>;
    }
}
import PropTypes from 'prop-types';
