export default DescriptionBlockView;
declare function DescriptionBlockView({ properties, metadata }: {
    properties: any;
    metadata: any;
}): JSX.Element;
declare namespace DescriptionBlockView {
    namespace propTypes {
        let properties: PropTypes.Validator<{
            [x: string]: any;
        }>;
        let metadata: PropTypes.Requireable<{
            [x: string]: any;
        }>;
    }
}
import PropTypes from 'prop-types';
