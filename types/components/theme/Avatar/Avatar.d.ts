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
        let src: PropTypes.Requireable<string>;
        let title: PropTypes.Requireable<string>;
        let text: PropTypes.Requireable<string>;
        let size: PropTypes.Requireable<number>;
        let color: PropTypes.Requireable<string>;
        let className: PropTypes.Requireable<string>;
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
import PropTypes from 'prop-types';
declare const defaultSize: 30;
declare const defaultColor: "Teal";
declare const defaultClassName: "avatar circular";
