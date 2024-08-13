export default NewsItemView;
/**
 * NewsItemView view component class.
 * @function NewsItemView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
declare function NewsItemView({ content }: {
    content: any;
}): string;
declare namespace NewsItemView {
    namespace propTypes {
        let content: any;
    }
}
