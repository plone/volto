/**
 * View image tile.
 * @module components/manage/Tiles/Image/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { settings } from '~/config';
import ImageZoom from 'react-medium-image-zoom';

import { flattenToAppURL } from '@plone/volto/helpers';

/**
 * View image tile class.
 * @class View
 * @extends Component
 */
const View = ({ data, detached }) => (
  <p
    className={cx(
      'tile image align',
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
            <img
              src={
                data.url.includes(settings.apiPath)
                  ? `${flattenToAppURL(data.url)}/@@images/image`
                  : data.url
              }
              alt={data.alt || ''}
            />
          );
          if (data.external) {
            const isReallyExternal =
              (data.external.startsWith('http') ||
                data.external.startsWith('https')) &&
              !data.external.includes(settings.apiPath);

            if (isReallyExternal) {
              return <a href={data.external}>{image}</a>;
            } else {
              return (
                <Link to={data.external.replace(settings.apiPath, '')}>
                  {image}
                </Link>
              );
            }
          } else if (data.href) {
            return <Link to={data.href}>{image}</Link>;
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
