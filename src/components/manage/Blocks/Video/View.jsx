/**
 * View video block.
 * @module components/manage/Blocks/Video/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Embed } from 'semantic-ui-react';
import cx from 'classnames';

/**
 * View video block class.
 * @class View
 * @extends Component
 */
const View = ({ data }) => (
  <p
    className={cx(
      'block video align',
      {
        center: !Boolean(data.align),
      },
      data.align,
    )}
  >
    {data.url && (
      <div
        className={cx('video-inner', {
          'full-width': data.align === 'full',
        })}
      >
        {data.url.match('list') ? (
          <Embed
            url={`https://www.youtube.com/embed/videoseries?list=${
              data.url.match(/^.*\?list=(.*)$/)[1]
            }`}
            icon="arrow right"
            defaultActive
            autoplay={false}
          />
        ) : (
          <Embed
            id={
              data.url.match(/.be\//)
                ? data.url.match(/^.*\.be\/(.*)/)[1]
                : data.url.match(/^.*\?v=(.*)$/)[1]
            }
            source="youtube"
            icon="arrow right"
            defaultActive
            autoplay={false}
          />
        )}
      </div>
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
