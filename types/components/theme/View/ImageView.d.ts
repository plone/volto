export default ImageView;
/**
 * Image view component class.
 * @function ImageView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
declare function ImageView({ content }: {
    content: any;
}): string;
declare namespace ImageView {
    namespace propTypes {
        let content: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            title: PropTypes.Requireable<string>;
            description: PropTypes.Requireable<string>;
            image: PropTypes.Requireable<PropTypes.InferProps<{
                scales: PropTypes.Requireable<PropTypes.InferProps<{
                    preview: PropTypes.Requireable<PropTypes.InferProps<{
                        download: PropTypes.Requireable<string>;
                    }>>;
                }>>;
            }>>;
        }>>>;
    }
}
import PropTypes from 'prop-types';
