export default TabularView;
/**
 * Tabular view component class.
 * @function TabularView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */
declare function TabularView({ content }: any): string;
declare namespace TabularView {
    namespace propTypes {
        let content: any;
    }
}
