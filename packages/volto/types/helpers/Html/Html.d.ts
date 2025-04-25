export function loadReducers(state?: {}): any;
export default Html;
/**
 * Html class.
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 *
 * Critical.css behaviour: when a file `public/critical.css` is present, the
 * loading of stylesheets is changed. The styles in critical.css are inlined in
 * the generated HTML, and the whole story needs to change completely: instead
 * of treating stylesheets as priority for rendering, we want to defer their
 * loading as much as possible. So we change the stylesheets to be prefetched
 * and we switch their rel back to stylesheets at document ready event.
 *
 * @function Html
 * @param {Object} props Component properties.
 * @param {Object} props.assets Assets to be rendered.
 * @param {Object} props.component Content to be rendered as child node.
 * @param {Object} props.store Store object.
 * @returns {string} Markup of the not found page.
 */
/**
 * Html class.
 * @class Html
 * @extends Component
 */
declare class Html extends React.Component<any, any, any> {
    /**
     * Property types.
     * @property {Object} propTypes Property types.
     * @static
     */
    static propTypes: {
        extractor: any;
        markup: any;
        store: any;
    };
    constructor(props: any);
    constructor(props: any, context: any);
    /**
     * Render method.
     * @method render
     * @returns {string} Markup for the component.
     */
    render(): string;
}
import React from 'react';
