export default View;
declare function View({ data }: {
    data: any;
}): any;
declare namespace View {
    namespace propTypes {
        let data: PropTypes.Validator<{
            [x: string]: any;
        }>;
    }
}
import PropTypes from 'prop-types';
