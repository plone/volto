export default Avatar;
declare function Avatar({ src, title, text, size, color, className }: {
    src: any;
    title: any;
    text: any;
    size: any;
    color: any;
    className: any;
}): JSX.Element;
declare namespace Avatar {
    namespace propTypes {
        let src: any;
        let title: any;
        let text: any;
        let size: any;
        let color: any;
        let className: any;
    }
    namespace defaultProps {
        let src_1: any;
        export { src_1 as src };
        let title_1: any;
        export { title_1 as title };
        let text_1: any;
        export { text_1 as text };
        export { defaultSize as size };
        export { defaultColor as color };
        export { defaultClassName as className };
    }
}
declare const defaultSize: 30;
declare const defaultColor: "Teal";
declare const defaultClassName: "avatar circular";
