export default Header;
declare function Header({ pathname }: {
    pathname: any;
}): JSX.Element;
declare namespace Header {
    namespace propTypes {
        let token: any;
        let pathname: any;
        let content: any;
    }
    namespace defaultProps {
        let token_1: any;
        export { token_1 as token };
        let content_1: any;
        export { content_1 as content };
    }
}
