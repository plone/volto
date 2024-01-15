export default Header;
declare function Header({ pathname }: {
    pathname: any;
}): JSX.Element;
declare namespace Header {
    namespace propTypes {
        let token: PropTypes.Requireable<string>;
        let pathname: PropTypes.Validator<string>;
        let content: PropTypes.Requireable<{
            [x: string]: any;
        }>;
    }
    namespace defaultProps {
        let token_1: any;
        export { token_1 as token };
        let content_1: any;
        export { content_1 as content };
    }
}
import PropTypes from 'prop-types';
