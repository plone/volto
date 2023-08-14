import PropTypes from 'prop-types';

import config from '@plone/volto/registry';

import DefaultImageSVG from '@plone/volto/components/manage/Blocks/Listing/default-image.svg';

/**
 * Renders a preview image for a catalog brain result item.
 */
function PreviewImage({ item, alt, ...rest }) {
  const Image = config.getComponent({ name: 'Image' }).component;

  if (item.image_field && item.image_scales?.[item.image_field]?.[0]) {
    return (
      <Image item={item} imageField={item.image_field} alt={alt} {...rest} />
    );
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
  }),
  alt: PropTypes.string.isRequired,
};

export default PreviewImage;
