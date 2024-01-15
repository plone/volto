export default Icon;
/**
 * Component to display an SVG as Icon.
 * @function Field
 * @param {Object} props Component properties.
 * @param {string} props.name Name source object.
 * @param {string} props.size Size of the Icon (in px).
 * @param {string} props.color Color of the Icon.
 * @param {string} props.className className to add to the component.
 * @param {string} props.title Title (a11y).
 * @returns {string} Markup of the component.
 *
 * Use:
 * drop icon to the icons folder ("src/icons")
 * import svg into the file
 * import this Icon component
 * add icon component with name = your imported svg
 *
 * Reasoning:
 * add a11y title to SVGs
 * load svg via webpack for optimization
 * Zero conf Inlined SVGs, as it is the best option when working with SVG
 * see razzle.config.js
 *
 * for further reference see {@link https://kitconcept.com/blog/pastanaga-icon-system/ | here}
 */
declare function Icon({ name, size, color, className, title, onClick, style, id, ariaHidden, }: {
    name: string;
    size: string;
    color: string;
    className: string;
    title: string;
}): string;
declare namespace Icon {
    namespace propTypes {
        let name: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            xmlns: PropTypes.Requireable<string>;
            viewBox: PropTypes.Requireable<string>;
            content: PropTypes.Requireable<string>;
        }>>>;
        let size: PropTypes.Requireable<string>;
        let color: PropTypes.Requireable<string>;
        let className: PropTypes.Requireable<string>;
        let title: PropTypes.Requireable<string>;
        let onClick: PropTypes.Requireable<(...args: any[]) => any>;
    }
    namespace defaultProps {
        export { defaultSize as size };
        let color_1: any;
        export { color_1 as color };
        let className_1: any;
        export { className_1 as className };
        let title_1: any;
        export { title_1 as title };
        let onClick_1: any;
        export { onClick_1 as onClick };
    }
}
import PropTypes from 'prop-types';
declare const defaultSize: "36px";
