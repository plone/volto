export default PreviewImage;
/**
 * Renders a preview image for a catalog brain result item.
 */
declare function PreviewImage({ item, alt, image_field, showDefault, ...rest }: {
    [x: string]: any;
    item: any;
    alt: any;
    image_field: any;
    showDefault?: boolean;
}): import("react/jsx-runtime").JSX.Element;
declare namespace PreviewImage {
    namespace propTypes {
        let item: any;
        let alt: any;
    }
}
