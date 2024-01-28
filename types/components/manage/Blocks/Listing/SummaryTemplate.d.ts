export default SummaryTemplate;
declare function SummaryTemplate({ items, linkTitle, linkHref, isEditMode }: {
    items: any;
    linkTitle: any;
    linkHref: any;
    isEditMode: any;
}): JSX.Element;
declare namespace SummaryTemplate {
    namespace propTypes {
        let items: PropTypes.Validator<any[]>;
        let linkMore: PropTypes.Requireable<any>;
        let isEditMode: PropTypes.Requireable<boolean>;
    }
}
import PropTypes from 'prop-types';
