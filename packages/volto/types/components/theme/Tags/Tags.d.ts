export default Tags;
/**
 * Tags component.
 * @function Tags
 * @param {Object} props Component properties.
 * @param {Object} props.content Content object that may contain subjects.
 * @param {Array} [props.content.subjects] Optional array of tags (subjects).
 * @returns {JSX.Element|null} Markup of the component or null if no tags are available.
 */
declare function Tags({ content }: {
    content: {
        subjects?: any[];
    };
}): JSX.Element | null;
declare namespace Tags {
    namespace propTypes {
        let content: any;
    }
    namespace defaultProps {
        export namespace content_1 {
            let subjects: any[];
        }
        export { content_1 as content };
    }
}
