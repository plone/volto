export default DefaultTemplate;
declare function DefaultTemplate({ headlineTag, items, linkTitle, linkHref, isEditMode, }: {
    headlineTag: any;
    items: any;
    linkTitle: any;
    linkHref: any;
    isEditMode: any;
}): JSX.Element;
declare namespace DefaultTemplate {
    namespace propTypes {
        let items: PropTypes.Validator<any[]>;
        let linkMore: PropTypes.Requireable<any>;
        let isEditMode: PropTypes.Requireable<boolean>;
    }
}
import PropTypes from 'prop-types';
