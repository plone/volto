export default TeaserDefaultTemplate;
declare function TeaserDefaultTemplate(props: any): JSX.Element;
declare namespace TeaserDefaultTemplate {
    namespace propTypes {
        let data: PropTypes.Validator<{
            [x: string]: any;
        }>;
        let isEditMode: PropTypes.Requireable<boolean>;
    }
}
import PropTypes from 'prop-types';
