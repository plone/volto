/**
 * View image block.
 * @module components/manage/Blocks/Image/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { UniversalLink } from '@plone/volto/components';
import cx from 'classnames';
import config from '@plone/volto/registry';

/**
 * View image block class.
 * @class View
 * @extends Component
 */
const View = ({ data, properties }) => {
  const Image = config.getComponent({ name: 'Image' }).component;

  return (
    <p
      className={cx(
        'block image align',
        {
          center: !Boolean(data.align),
        },
        data.align,
      )}
    >
      {properties.image && (
        <>
          {(() => {
            const image = (
              <Image
                className={cx({ 'full-width': data.align === 'full' })}
                item={properties}
                imageField="image"
                sizes={(() => {
                  if (data.align === 'full' || data.align === 'center')
                    return '100vw';
                  if (data.align === 'left' || data.align === 'right')
                    return '50vw';
                  return undefined;
                })()}
                alt={properties.image_caption || ''}
                responsive={true}
              />
            );
            if (data.href) {
              return (
                <UniversalLink
                  href={data.href}
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
  properties: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
