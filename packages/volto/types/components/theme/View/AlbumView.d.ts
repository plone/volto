export default AlbumView;
/**
 * Album view component class.
 * @function AlbumView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */
declare class AlbumView {
    constructor(props: any);
    state: {
        openIndex: any;
    };
    closeModal(): void;
    nextImage(): void;
    prevImage(): void;
    render(): JSX.Element;
}
declare namespace AlbumView {
    namespace propTypes {
        let content: any;
    }
}
