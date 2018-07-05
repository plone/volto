/**
 * View video tile.
 * @module components/manage/Tiles/Video/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Embed } from 'semantic-ui-react';

/**
 * View video tile class.
 * @class View
 * @extends Component
 */
const View = ({ data }) => (
  <p
    className={['tile', 'image', 'align', data.align]
      .filter(e => !!e)
      .join(' ')}
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
