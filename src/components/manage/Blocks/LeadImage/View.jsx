/**
 * View image block.
 * @module components/manage/Blocks/Image/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { settings } from '~/config';

import { flattenToAppURL } from '@plone/volto/helpers';

/**
 * View image block class.
 * @class View
 * @extends Component
 */
const View = ({ data, properties }) => (
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
            <img
              className={cx({ 'full-width': data.align === 'full' })}
              src={flattenToAppURL(properties.image.download)}
              alt={properties.image_caption || ''}
            />
          );
          if (data.href) {
            if (
              (data.href.startsWith('http') || data.href.startsWith('https')) &&
              !data.href.includes(settings.apiPath)
            ) {
              return (
                <a
                  target={data.openLinkInNewTab ? '_blank' : null}
                  href={data.href}
                >
                  {image}
                </a>
              );
            } else {
              return (
                <Link
                  to={data.href.replace(settings.apiPath, '')}
                  target={data.openLinkInNewTab ? '_blank' : null}
                >
                  {image}
                </Link>
              );
            }
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
  properties: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
