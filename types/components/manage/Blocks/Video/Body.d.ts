export default Body;
declare function Body({ data, isEditMode }: {
    data: any;
    isEditMode: any;
}): JSX.Element;
declare namespace Body {
    namespace propTypes {
        let data: PropTypes.Validator<{
            [x: string]: any;
        }>;
    }
}
export function getVideoIDAndPlaceholder(url: any): {
    videoID: any;
    listID: any;
    thumbnailURL: string;
};
import PropTypes from 'prop-types';
