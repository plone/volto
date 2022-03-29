import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { getImageAttributes } from '@plone/volto/helpers';

/**
 * Image component
 * @param {object | string} image - Plone image as object or url
 * @param {string} imageField - (default: image) image field for scales URL
 * @param {string} alt - Alternative text for image
 * @param {string} className - CSS class attribute
 * @param {string} containerClassName - CSS class attribute for picture element
 * @param {string} floated - float left or right
 * @param {string} size - actual width: thumb, small, medium or large
 * @param {string} role - img role attribute
 * @param {boolean} critical - whether to lazy load the image
 * @param {number} maxSize - maximum size to render
 * @param {boolean} useOriginal - whether to render original size
 */
const Image = ({
  image,
  imageField = 'image',
  alt = '',
  className,
  containerClassName,
  floated,
  size,
  role = 'img',
  critical = false,
  maxSize,
  minSize = 0,
  useOriginal = false,
  ...imageProps
}) => {
  const { src, srcSet } = getImageAttributes(image, {
    imageField,
    maxSize,
    useOriginal,
    minSize,
  });
  const imageRef = useRef();
  const [srcset, setSrcset] = useState(
    critical && srcSet ? srcSet.join(', ') : null,
  );
  const imageHasLoaded = imageRef?.current?.complete;

  let pictureClassName = `volto-image${
    containerClassName ? ` ${containerClassName}` : ''
  }`;
  if (floated) {
    pictureClassName = `${pictureClassName} floated ${floated}`;
  }
  if (size) {
    pictureClassName = `${pictureClassName} ${size}`;
  }

  const applySrcSet = useCallback(() => {
    setSrcset(
      srcSet
        .filter((s, index) => {
          let addable = (ss) => {
            let w = ss ? parseInt(ss.split(' ')[1].replace('w', ''), 10) : null;
            return w
              ? w <= (imageRef?.current?.width ?? Infinity) ||
                  w <= (imageRef?.current?.height ?? Infinity)
              : false;
          };

          let add = addable(s);

          if (!add && addable(srcSet[index - 1])) {
            add = true; //add the next item grather then imageRef width, to avoid less quality
          }

          return add;
        })
        .join(', '),
    );
  }, [srcSet]);

  useEffect(() => {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          setTimeout(() => {
            if (
              entries[0].isIntersecting === true &&
              imageRef?.current?.complete &&
              (!srcset || srcset?.split(', ')?.length < 2) &&
              srcSet?.length > 0
            ) {
              applySrcSet();
            }
          }, 600);
        },
        { threshold: [0] },
      );
      observer.observe(imageRef.current);
    } else if (srcSet?.length > 0) {
      applySrcSet();
    }
  }, [imageRef, applySrcSet, imageHasLoaded, srcSet, srcset]);

  return (
    <>
      <picture className={pictureClassName}>
        {srcset?.length > 0 && <source srcSet={srcset} />}
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
  imageField: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  floated: PropTypes.oneOf(['left', 'right']),
  size: PropTypes.oneOf(['thumb', 'small', 'medium', 'large']),
  role: PropTypes.string,
  critical: PropTypes.bool,
  maxSize: PropTypes.number,
  useOriginal: PropTypes.bool,
};

Image.defaultProps = {
  imageField: 'image',
  alt: '',
  role: 'img',
  critical: false,
  useOriginal: false,
};

export default Image;
