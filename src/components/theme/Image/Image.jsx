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
 * @param {string} responsive - if the image is responsive
 * @param {string} size - (css class) actual width: thumb, small, medium or large
 * @param {string} role - img role attribute
 * @param {boolean} critical - if critical, do not lazy load the image
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
  responsive = true,
  role = 'img',
  critical = false,
  maxSize,
  minSize = 0,
  useOriginal = false,
  sizes = '100vw',
  ...imageProps
}) => {
  const { src, srcSet, width, height, aspectRatio } = getImageAttributes(
    image,
    {
      imageField,
      maxSize,
      useOriginal,
      minSize,
    },
  );
  const imageRef = useRef();
  const [srcset, setSrcset] = useState(
    critical && srcSet ? srcSet.join(', ') : null,
  );
  const imageHasLoaded = imageRef?.current?.complete;

  //picture classname
  let pictureClassName = `volto-image${
    containerClassName ? ` ${containerClassName}` : ''
  }`;
  if (floated) {
    pictureClassName = `${pictureClassName} floated ${floated}`;
  }
  if (size) {
    pictureClassName = `${pictureClassName} ${size}`;
  }

  if (responsive) {
    pictureClassName = `${pictureClassName} responsive`;
  }

  //apply srcset
  const applySrcSet = useCallback(() => {
    setSrcset(
      srcSet
        .filter((s, index) => {
          let addable = (ss) => {
            let devicePixelRatio = window.devicePixelRatio;

            let w = ss ? parseInt(ss.split(' ')[1].replace('w', ''), 10) : null;

            return w
              ? w <=
                  (imageRef?.current?.width * devicePixelRatio ?? Infinity) ||
                  w <=
                    (imageRef?.current?.height * devicePixelRatio ?? Infinity)
              : false;
          };

          let add = addable(s);

          return add;
        })
        .join(', '),
    );
  }, [srcSet]);

  //intersection observer
  useEffect(() => {
    if ('IntersectionObserver' in window && !srcset) {
      const observer = new IntersectionObserver(
        (entries) => {
          setTimeout(() => {
            if (
              entries[0].isIntersecting === true &&
              //imageRef?.current?.complete && //removed to load images on top of the page.
              (!srcset || srcset?.split(', ')?.length < 2) &&
              srcSet?.length > 0
            ) {
              applySrcSet();
            }
          }, 10);
        },
        { threshold: [0], rootMargin: '100px' },
      );
      observer.observe(imageRef.current);
    } else if (srcSet?.length > 0) {
      applySrcSet();
    }
  }, [imageRef, applySrcSet, imageHasLoaded, srcSet, srcset]);

  return (
    <>
      <picture className={pictureClassName}>
        {srcset?.length > 0 && <source srcSet={srcset} sizes={sizes} />}
        <img
          src={src}
          alt={alt}
          className={className}
          role={role}
          //loading={critical ? 'eager' : 'lazy'} //removed because this is for the placeholder.Lazy loading is made from intersectionObserver
          width={width}
          height={height}
          style={{ 'aspect-ratio': `${aspectRatio}` }}
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
                ${width ? `width="${width}` : ''}
                ${height ? `height="${height}` : ''}                         
                loading="lazy"               
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
  size: PropTypes.string,
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
