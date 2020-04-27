import React from 'react';
import PropTypes from 'prop-types';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const ImageGalleryTemplate = ({ items, linkMore, isEditMode }) => {
  let imageLink = items.map(item => {
    return { original: item['@id'] };
  });

  return (
    <>
      <ImageGallery items={imageLink} />
    </>
  );
};

ImageGalleryTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default ImageGalleryTemplate;
