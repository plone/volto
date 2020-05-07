import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';
import 'react-image-gallery/styles/css/image-gallery.css';
import { settings } from '~/config';
import { flattenToAppURL } from '@plone/volto/helpers';

const ImageGallery = loadable(() => import('react-image-gallery'));

const ImageGalleryTemplate = ({ items }) => {
  const renderItems = items.filter(content =>
    settings.imageObjects.includes(content['@type']),
  );
  const imagesInfo = renderItems.map(item => {
    return {
      original: flattenToAppURL(
        item[settings.listingPreviewImageField].scales.preview.download,
      ),
      thumbnail: flattenToAppURL(
        item[settings.listingPreviewImageField].scales.thumb.download,
      ),
    };
  });

  return renderItems.length > 0 && <ImageGallery items={imagesInfo} lazyLoad />;
};

ImageGalleryTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default ImageGalleryTemplate;
