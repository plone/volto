export default PreviewImage;
/**
 * Renders a preview image for a catalog brain result item.
 */
declare function PreviewImage({ item, alt, image_field, showDefault, ...rest }: {
    [x: string]: any;
    item: any;
    alt: any;
    image_field: any;
    showDefault?: boolean;
}): JSX.Element;
declare namespace PreviewImage {
    namespace propTypes {
        let item: PropTypes.Requireable<PropTypes.InferProps<{
            '@id': PropTypes.Validator<string>;
            title: PropTypes.Validator<string>;
            image_field: PropTypes.Requireable<string>;
            image_scales: PropTypes.Requireable<object>;
            showDefault: PropTypes.Requireable<boolean>;
        }>>;
        let alt: PropTypes.Validator<string>;
    }
}
import PropTypes from 'prop-types';
