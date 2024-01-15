export default LinkMore;
declare function LinkMore({ data, isEditMode }: {
    data: any;
    isEditMode: any;
}): JSX.Element;
declare namespace LinkMore {
    namespace propTypes {
        let data: PropTypes.Validator<{
            [x: string]: any;
        }>;
    }
}
import PropTypes from 'prop-types';
