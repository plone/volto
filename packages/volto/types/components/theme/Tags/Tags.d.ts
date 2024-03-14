export default Tags;
/**
 * Tags component class.
 * @function Tags
 * @param {array} tags Array of tags.
 * @returns {string} Markup of the component.
 */
declare function Tags({ tags }: any[]): string;
declare namespace Tags {
    namespace propTypes {
        let tags: any;
    }
    namespace defaultProps {
        let tags_1: any;
        export { tags_1 as tags };
    }
}
