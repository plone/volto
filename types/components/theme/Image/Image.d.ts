/**
 * Image component
 * @param {object} item - Context item that has the image field (can also be a catalog brain or summary)
 * @param {string} imageField - Key of the image field inside the item, or inside the image_scales object of the item if it is a catalog brain or summary
 * @param {string} src - URL of the image to be used if the item field is not available
 * @param {string} alt - Alternative text for the image
 * @param {boolean} loading - (default: eager) set to `lazy` to lazy load the image
 * @param {boolean} responsive - (default: false) set to `true` to add the `responsive` class to the image
 * @param {string} className - Additional classes to add to the image
 */
declare function Image({ item, imageField, src, alt, loading, responsive, className, ...imageProps }: object): JSX.Element;
declare namespace Image {
    namespace propTypes {
        let item: PropTypes.Requireable<PropTypes.InferProps<{
            '@id': PropTypes.Requireable<string>;
            image_field: PropTypes.Requireable<string>;
            image_scales: PropTypes.Requireable<object>;
            image: PropTypes.Requireable<object>;
        }>>;
        let imageField: PropTypes.Requireable<string>;
        let src: PropTypes.Requireable<string>;
        let alt: PropTypes.Validator<string>;
        let loading: PropTypes.Requireable<string>;
        let responsive: PropTypes.Requireable<boolean>;
        let className: PropTypes.Requireable<string>;
    }
}
export default Image;
import PropTypes from 'prop-types';
