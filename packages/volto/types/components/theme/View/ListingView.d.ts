export default ListingView;
/**
 * List view component class.
 * @function ListingView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
declare function ListingView({ content }: {
    content: any;
}): string;
declare namespace ListingView {
    namespace propTypes {
        let content: any;
    }
}
