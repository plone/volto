export default FileView;
/**
 * File view component class.
 * @function FileView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
declare function FileView({ content }: {
    content: any;
}): string;
declare namespace FileView {
    namespace propTypes {
        let content: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            title: PropTypes.Requireable<string>;
            description: PropTypes.Requireable<string>;
            file: PropTypes.Requireable<PropTypes.InferProps<{
                download: PropTypes.Requireable<string>;
                filename: PropTypes.Requireable<string>;
            }>>;
        }>>>;
    }
}
import PropTypes from 'prop-types';
