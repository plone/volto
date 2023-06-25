/**
 * View image block.
 * @module components/manage/Blocks/Image/View
 */

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

/**
 * View image block class.
 * @class View
 * @extends Component
 */
export const View = ({ data, detached, properties }) => {
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
      )}
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
                sizes={(() => {
                  if (data.align === 'full') return '100vw';
                  if (data.align === 'center') {
                    if (data.size === 'l') return '100vw';
                    if (data.size === 'm') return '50vw';
                    if (data.size === 's') return '25vw';
                  }
                  if (data.align === 'left' || data.align === 'right') {
                    if (data.size === 'l') return '50vw';
                    if (data.size === 'm') return '25vw';
                    if (data.size === 's') return '15vw';
                  }
                  return undefined;
                })()}
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
