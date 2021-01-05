/**
 * View image block.
 * @module components/manage/Blocks/Image/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import ImageFromUrl from '@plone/volto/components/theme/ImageFromUrl/ImageFromUrl';

import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers';

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
            <ImageFromUrl
              url={data.url}
              alt={data.alt}
              className={cx({
                'full-width': data.align === 'full',
                large: data.size === 'l',
                medium: data.size === 'm',
                small: data.size === 's',
              })}
              size={(() => {
                switch (data.size) {
                  case 'm':
                    return 'preview';

                  case 's':
                    return 'mini';

                  case 'l':
                  default:
                    return null;
                }
              })()}
            />
          );
          if (data.href) {
            if (!isInternalURL(data.href)) {
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
                  to={flattenToAppURL(data.href)}
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
};

export default View;
