import React from 'react';
import PropTypes from 'prop-types';
import {
  isInternalURL,
  flattenToAppURL,
  getSrcSet,
} from '@plone/volto/helpers';

const ImageFromUrl = ({
  image,
  url,
  alt = '',
  className,
  size,
  role,
  ...imageProps
}) => {
  let src = image && image?.scales ? image.download : url;

  if (!src) return null;

  const imageParams = '/@@images/image' + (size ? `/${size}` : '');
  const isInternal = isInternalURL(src);

  src = isInternal ? flattenToAppURL(src) : src;
  if (isInternal && src.indexOf('/@@images') === -1)
    src = `${src}${imageParams}`;

  return (
    <img
      alt={alt}
      role={role ?? 'img'}
      src={src}
      loading="lazy"
      className={className}
      {...(isInternal ? getSrcSet(image?.scales ? image : src, size) : {})}
      {...imageProps}
    />
  );
};

ImageFromUrl.propTypes = {
  image: PropTypes.object,
  url: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
  role: PropTypes.string,
};

export default ImageFromUrl;
