export default TeaserBody;
declare function TeaserBody(props: any): JSX.Element;
declare namespace TeaserBody {
    namespace propTypes {
        let data: PropTypes.Validator<{
            [x: string]: any;
        }>;
        let isEditMode: PropTypes.Requireable<boolean>;
    }
}
import PropTypes from 'prop-types';
