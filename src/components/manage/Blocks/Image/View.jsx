/**
 * View image block.
 * @module components/manage/Blocks/Image/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Image, UniversalLink } from '@plone/volto/components';
import cx from 'classnames';
import { isString } from 'lodash';
import { withBlockExtensions } from '@plone/volto/helpers';

/**
 * View image block class.
 * @class View
 * @extends Component
 */
export const View = ({ data, detached, properties }) => {
  const href = data?.href?.[0]?.['@id'] || '';
  const className = cx('responsive', {
    'full-width': data.align === 'full',
    large: data.size === 'l',
    medium: data.size === 'm',
    small: data.size === 's',
  });

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
            const image = isString(data.url) ? (
              <img
                src={data.url}
                alt={data.alt || ''}
                className={className}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <Image
                className={className}
                item={data.url}
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
