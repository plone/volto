export default DefaultView;
/**
 * Component to display the default view.
 * @function DefaultView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */
declare function DefaultView(props: any): string;
declare namespace DefaultView {
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
             * Text of the object
             */
            text: PropTypes.Requireable<PropTypes.InferProps<{
                /**
                 * Data of the text of the object
                 */
                data: PropTypes.Requireable<string>;
            }>>;
        }>>>;
    }
}
import PropTypes from 'prop-types';
