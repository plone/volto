export default Title;
/**
 * Component to display a title.
 * @function Field
 * @param {Object} props Component properties.
 * @param {string} props.title Title.
 * @returns {string} Markup of the component.
 */
declare function Title({ title }: {
    title: string;
}): string;
declare namespace Title {
    namespace propTypes {
        let title: any;
    }
}
