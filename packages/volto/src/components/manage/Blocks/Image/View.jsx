import React from 'react';
import PropTypes from 'prop-types';
import { UniversalLink } from '@plone/volto/components';
import cx from 'classnames';
import {
  flattenToAppURL,
  isInternalURL,
  withBlockExtensions,
} from '@plone/volto/helpers';
import config from '@plone/volto/registry';

export const View = ({ className, data, detached, properties, style }) => {
  const href = data?.href?.[0]?.['@id'] || '';

  const Image = config.getComponent({ name: 'Image' }).component;

  return (
    <p
      className={cx(
        'block image align',
        {
          center: !Boolean(data.align),
          detached,
        },
        data.align,
        className,
      )}
      style={style}
    >
      {data.url && (
        <>
          {(() => {
            const image = (
              <Image
                className={cx({
                  'full-width': data.align === 'full',
                  large: data.size === 'l',
                  medium: data.size === 'm',
                  small: data.size === 's',
                })}
                item={
                  data.image_scales
                    ? {
                        '@id': data.url,
                        image_field: data.image_field,
                        image_scales: data.image_scales,
                      }
                    : undefined
                }
                src={
                  data.image_scales
                    ? undefined
                    : isInternalURL(data.url)
                      ? // Backwards compat in the case that the block is storing the full server URL
                        (() => {
                          if (data.size === 'l')
                            return `${flattenToAppURL(data.url)}/@@images/image`;
                          if (data.size === 'm')
                            return `${flattenToAppURL(
                              data.url,
                            )}/@@images/image/preview`;
                          if (data.size === 's')
                            return `${flattenToAppURL(
                              data.url,
                            )}/@@images/image/mini`;
                          return `${flattenToAppURL(data.url)}/@@images/image`;
                        })()
                      : data.url
                }
                sizes={config.blocks.blocksConfig.image.getSizes(data)}
                alt={data.alt || ''}
                loading="lazy"
                responsive={true}
              />
            );
            if (href) {
              return (
                <UniversalLink
                  href={href}
                  openLinkInNewTab={data.openLinkInNewTab}
                >
                  {image}
                </UniversalLink>
              );
            } else {
              return image;
            }
          })()}
        </>
      )}
    </p>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withBlockExtensions(View);
