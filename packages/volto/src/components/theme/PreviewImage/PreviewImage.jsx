import PropTypes from 'prop-types';

import config from '@plone/volto/registry';

import DefaultImageSVG from '@plone/volto/components/manage/Blocks/Listing/default-image.svg';

/**
 * Renders a preview image for a catalog brain result item.
 */
function PreviewImage({ item, alt, image_field, showDefault = true, ...rest }) {
  const Image = config.getComponent({ name: 'Image' }).component;

  const image = (
    <Image
      item={item}
      image_field={image_field || item.image_field}
      alt={alt}
      {...rest}
    />
  );

  if (!image && !showDefault) return null;

  if (image_field || item?.image_field) {
    return image;
  } else {
    return (
      <img
        src={
          config.getComponent({
            name: 'DefaultImage',
            dependencies: ['listing', 'summary'],
          }).component || DefaultImageSVG
        }
        alt={alt}
        {...rest}
        width="400"
        height="300"
      />
    );
  }
}

PreviewImage.propTypes = {
  item: PropTypes.shape({
    '@id': PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image_field: PropTypes.string,
    image_scales: PropTypes.object,
    showDefault: PropTypes.bool,
  }),
  alt: PropTypes.string.isRequired,
};

export default PreviewImage;
