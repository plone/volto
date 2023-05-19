/**
 * View image block.
 * @module components/manage/Blocks/Image/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Image, UniversalLink } from '@plone/volto/components';
import cx from 'classnames';
import { isString } from 'lodash';
import {
  flattenToAppURL,
  isInternalURL,
  withBlockExtensions,
} from '@plone/volto/helpers';

/**
 * View image block class.
 * @class View
 * @extends Component
 */
export const View = ({ data, detached, properties }) => {
  const href = data?.href?.[0]?.['@id'] || '';

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
                className={cx('responsive', {
                  'full-width': data.align === 'full',
                  large: data.size === 'l',
                  medium: data.size === 'm',
                  small: data.size === 's',
                })}
                item={isString(data.url) ? undefined : data.url}
                src={
                  isString(data.url)
                    ? // Backwards compat in the case that the block is storing the full server URL
                      isInternalURL(data.url)
                      ? (() => {
                          if (data.size === 'l')
                            return `${flattenToAppURL(
                              data.url,
                            )}/@@images/image`;
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
                    : undefined
                }
                alt={data.alt || ''}
                loading="lazy"
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
