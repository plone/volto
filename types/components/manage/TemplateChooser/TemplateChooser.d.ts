export default TemplateChooser;
declare function TemplateChooser({ templates, onSelectTemplate }: {
    templates: any;
    onSelectTemplate: any;
}): JSX.Element;
declare namespace TemplateChooser {
    namespace propTypes {
        let templates: PropTypes.Validator<(...args: any[]) => any>;
        let onSelectTemplate: PropTypes.Validator<(...args: any[]) => any>;
    }
}
import PropTypes from 'prop-types';
