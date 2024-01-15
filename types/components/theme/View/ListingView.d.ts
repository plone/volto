export default ListingView;
/**
 * List view component class.
 * @function ListingView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
declare function ListingView({ content }: {
    content: any;
}): string;
declare namespace ListingView {
    namespace propTypes {
        let content: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            title: PropTypes.Requireable<string>;
            description: PropTypes.Requireable<string>;
            items: PropTypes.Requireable<PropTypes.InferProps<{
                '@id': PropTypes.Requireable<string>;
                '@type': PropTypes.Requireable<string>;
                description: PropTypes.Requireable<string>;
                review_state: PropTypes.Requireable<string>;
                title: PropTypes.Requireable<string>;
                url: PropTypes.Requireable<string>;
            }>[]>;
        }>>>;
    }
}
import PropTypes from 'prop-types';
