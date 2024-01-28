export default Anontools;
declare function Anontools(): JSX.Element;
declare namespace Anontools {
    namespace propTypes {
        let token: PropTypes.Requireable<string>;
        let content: PropTypes.Requireable<PropTypes.InferProps<{
            '@id': PropTypes.Requireable<string>;
        }>>;
    }
    namespace defaultProps {
        let token_1: any;
        export { token_1 as token };
        let content_1: {
            '@id': any;
        };
        export { content_1 as content };
    }
}
import PropTypes from 'prop-types';
