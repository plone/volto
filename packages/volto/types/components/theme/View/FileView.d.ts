export default FileView;
/**
 * File view component class.
 * @function FileView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
declare function FileView({ content }: {
    content: any;
}): string;
declare namespace FileView {
    namespace propTypes {
        let content: any;
    }
}
