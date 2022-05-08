import React, { /* useState, useEffect, useCallback, */ useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getImageAttributes } from '@plone/volto/components/theme/Image/utils';

/**
 * Image component
 * @param {object | string} image - Plone image as object or url
 * @param {string} alt - Alternative text for image
 * @param {string} className - CSS class attribute
 * @param {string} pictureClassName - CSS class attribute for picture element
 * @param {string} size - (default: full) Size of image: can be small, medium, large, full
 * @param {string} responsive - if the image is responsive it adapts to the container
 * @param {string} role - img role attribute
 * @param {boolean} loading - (default: eager) if set to `lazy`, the srcset is loaded when the image is in the viewport
 */
const Image = ({
  image,
  alt = '',
  className,
  pictureClassName,
  size = 'full',
  responsive = true,
  role = 'img',
  loading = 'eager',
  ...imageProps
}) => {
  const { src, srcSet, width, height } = getImageAttributes(image, size);
  const imageRef = useRef();
  // const [srcset, setSrcset] = useState(
  //   critical && srcSet ? srcSet.join(', ') : null,
  // );
  // const imageHasLoaded = imageRef.current?.complete;

  //apply srcset
  // const applySrcSet = useCallback(() => {
  //   setSrcset(
  //     srcSet
  //       .filter((s, index) => {
  //         let addable = (ss) => {
  //           let devicePixelRatio = window.devicePixelRatio;

  //           let w = ss ? parseInt(ss.split(' ')[1].replace('w', ''), 10) : null;

  //           return w
  //             ? w <=
  //                 (imageRef?.current?.width * devicePixelRatio ?? Infinity) ||
  //                 w <=
  //                   (imageRef?.current?.height * devicePixelRatio ?? Infinity)
  //             : false;
  //         };

  //         let add = addable(s);

  //         return add;
  //       })
  //       .join(', '),
  //   );
  // }, [srcSet]);

  //intersection observer
  // useEffect(() => {
  //   if ('IntersectionObserver' in window && !srcset) {
  //     const observer = new IntersectionObserver(
  //       (entries) => {
  //         setTimeout(() => {
  //           if (
  //             entries[0].isIntersecting === true &&
  //             //imageRef?.current?.complete && //removed to load images on top of the page.
  //             (!srcset || srcset?.split(', ')?.length < 2) &&
  //             srcSet?.length > 0
  //           ) {
  //             applySrcSet();
  //           }
  //         }, 10);
  //       },
  //       { threshold: [0], rootMargin: '100px' },
  //     );
  //     observer.observe(imageRef.current);
  //   } else if (srcSet?.length > 0) {
  //     applySrcSet();
  //   }
  // }, [imageRef, applySrcSet, imageHasLoaded, srcSet, srcset]);

  return (
    <>
      <picture
        className={cx('volto-image', {
          pictureClassName,
          responsive,
        })}
      >
        {loading === 'eager' && srcSet.length > 0 && (
          <source srcSet={srcSet} sizes="100vw" />
        )}
        <img
          src={src}
          alt={alt}
          className={className}
          role={role}
          width={width}
          height={height}
          {...imageProps}
          ref={imageRef}
        />
        {/* {loading === 'lazy' && (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
                <img
                  src="${src}"
                  ${srcSet?.length > 0 && `srcset="${srcSet.join(', ')}"`}
                  alt="${alt}"
                  class="${className || ''}"
                  role="${role}"
                  ${width ? `width="${width}` : ''}
                  ${height ? `height="${height}` : ''}
                  loading="lazy"
                />
              `,
            }}
          />
        )} */}
      </picture>
    </>
  );
};

Image.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
  pictureClassName: PropTypes.string,
  size: PropTypes.string,
  responsive: PropTypes.bool,
  role: PropTypes.string,
  loading: PropTypes.bool,
};

export default Image;
