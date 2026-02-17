export default RelatedItems;
/**
 * Related Items component.
 * @function RelatedItems
 * @param {array} relatedItems Array of related items.
 * @returns {JSX.Element} Markup of the component.
 */
declare function RelatedItems({ content }: any[]): JSX.Element;
declare namespace RelatedItems {
    namespace propTypes {
        let content: any;
    }
}
