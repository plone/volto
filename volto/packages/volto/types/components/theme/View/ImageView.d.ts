export default ImageView;
/**
 * Image view component class.
 * @function ImageView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
declare function ImageView({ content }: {
    content: any;
}): string;
declare namespace ImageView {
    namespace propTypes {
        let content: any;
    }
}
