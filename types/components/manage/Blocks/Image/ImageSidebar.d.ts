export default ImageSidebar;
declare function ImageSidebar(props: any): JSX.Element;
declare namespace ImageSidebar {
    namespace propTypes {
        let data: PropTypes.Validator<{
            [x: string]: any;
        }>;
        let block: PropTypes.Validator<string>;
        let onChangeBlock: PropTypes.Validator<(...args: any[]) => any>;
    }
}
import PropTypes from 'prop-types';
