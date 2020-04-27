import React from 'react';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { settings } from '~/config';
import { flattenToAppURL } from '@plone/volto/helpers';

const ImageGalleryTemplate = ({ items, linkMore, isEditMode }) => {
  let imageLink = items.map(item => {
    return {
      original: flattenToAppURL(
        item[settings.listingPreviewImageField].scales.preview.download,
      ),
      thumbnail: flattenToAppURL(
        item[settings.listingPreviewImageField].scales.thumb.download,
      ),
    };
  });

  return (
    <>
      <ImageGallery items={imageLink} lazyLoad />
    </>
  );
};

ImageGalleryTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default ImageGalleryTemplate;
