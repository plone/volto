export default AlbumView;
/**
 * Album view component class.
 * @function AlbumView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */
declare class AlbumView extends React.Component<any, any, any> {
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
        let content: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            /**
             * Title of the object
             */
            title: PropTypes.Requireable<string>;
            /**
             * Description of the object
             */
            description: PropTypes.Requireable<string>;
            /**
             * Child items of the object
             */
            items: PropTypes.Requireable<PropTypes.InferProps<{
                /**
                 * Title of the item
                 */
                title: PropTypes.Requireable<string>;
                /**
                 * Description of the item
                 */
                description: PropTypes.Requireable<string>;
                /**
                 * Url of the item
                 */
                url: PropTypes.Requireable<string>;
                /**
                 * Image of the item
                 */
                image: PropTypes.Requireable<object>;
                /**
                 * Image caption of the item
                 */
                image_caption: PropTypes.Requireable<string>;
                /**
                 * Type of the item
                 */
                '@type': PropTypes.Requireable<string>;
            }>[]>;
        }>>>;
    }
}
import React from 'react';
import PropTypes from 'prop-types';
