/**
 * View map tile.
 * @module components/manage/Tiles/Maps/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import $ from 'jquery';

/**
 * View image tile class.
 * @class View
 * @extends Component
 */

const getSrc = url => {
  window.$ = $;
  return $(url).attr('src');
};

const View = ({ data }) => (
  <p
    className={['tile', 'image', 'align', data.align]
      .filter(e => !!e)
      .join(' ')}
  >
    <Container>
      <iframe
        title="Embeded Google Maps"
        src={getSrc(data.url)}
        className="google-map"
        frameBorder="0"
        allowFullscreen
      />
    </Container>
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
