/**
 * View image block.
 * @module components/manage/Blocks/Image/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { UniversalLink } from '@plone/volto/components';
import cx from 'classnames';
import Image from '@plone/volto/components/theme/Image/Image';

/**
 * View image block class.
 * @class View
 * @extends Component
 */
const View = ({ data, detached }) => (
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
              image={data.url}
              alt={data.alt}
              className={cx({
                'full-width': data.align === 'full',
                large: data.size === 'l',
                medium: data.size === 'm',
                small: data.size === 's',
              })}
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

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
