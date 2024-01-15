export default View;
declare function View({ data, properties }: {
    data: any;
    properties: any;
}): JSX.Element;
declare namespace View {
    namespace propTypes {
        let data: PropTypes.Validator<{
            [x: string]: any;
        }>;
        let properties: PropTypes.Validator<{
            [x: string]: any;
        }>;
    }
}
import PropTypes from 'prop-types';
