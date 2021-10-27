import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { getImageAttributes } from '@plone/volto/helpers';

/**
 * Image component
 * @param {object | string} image - Plone image as object or url
 * @param {string} alt - Alternative text for image
 * @param {string} className - CSS class attribute
 * @param {string} role - img role attribute
 * @param {boolean} critical - whether to lazy load the image
 * @param {number} maxSize - maximum size to render
 * @param {boolean} useOriginal - whether to render original size
 */
const Image = ({
  image,
  alt = '',
  className,
  role = 'img',
  critical = false,
  maxSize,
  useOriginal = false,
  ...imageProps
}) => {
  const { src, srcSet } = getImageAttributes(image, { maxSize, useOriginal });
  const imageRef = useRef();
  const [srcset, setSrcset] = useState(
    critical && srcSet ? srcSet.join(', ') : null,
  );
  const hasSrcSet = srcset?.length;
  const imageHasLoaded = imageRef?.current?.complete;

  useEffect(() => {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting === true &&
            imageHasLoaded &&
            !srcset &&
            srcSet?.length > 0
          ) {
            setTimeout(() => {
              setSrcset(
                srcSet
                  .filter(
                    (s) =>
                      parseInt(s.split(' ')[1].replace('w', ''), 10) <=
                      imageRef.current.width,
                  )
                  .join(', '),
              );
            }, 600);
          }
        },
        { threshold: [0] },
      );
      observer.observe(imageRef.current);
    }
  }, [imageHasLoaded, srcSet, srcset]);

  return (
    <>
      <picture>
        {hasSrcSet && <source srcSet={srcset} />}
        <img
          src={src}
          alt={alt}
          className={className}
          role={role}
          loading="lazy"
          style={{ width: '100%', objectFit: 'cover' }}
          {...imageProps}
          ref={imageRef}
        />
      </picture>
      {!critical && (
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <img
                src="${src}"
                ${srcSet?.length && `srcset="${srcSet.join(', ')}"`}
                alt="${alt}"
                class="${className || ''}"
                role="${role}"
                loading="lazy"
                style="width: 100%; object-fit: cover;"
            `,
          }}
        />
      )}
    </>
  );
};

Image.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
  role: PropTypes.string,
  critical: PropTypes.bool,
  maxSize: PropTypes.number,
  useOriginal: PropTypes.bool,
};

Image.defaultProps = {
  alt: '',
  role: 'img',
  critical: false,
  useOriginal: false,
};

export default Image;
