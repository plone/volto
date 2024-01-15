export default ImageGalleryTemplate;
declare function ImageGalleryTemplate({ items }: {
    items: any;
}): JSX.Element;
declare namespace ImageGalleryTemplate {
    namespace propTypes {
        let items: PropTypes.Validator<any[]>;
    }
}
import PropTypes from 'prop-types';
