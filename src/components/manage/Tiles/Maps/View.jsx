/**
 * View map tile.
 * @module components/manage/Tiles/Maps/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import './styles.css';

/**
 * View image tile class.
 * @class View
 * @extends Component
 */
const View = ({ data }) => (
  <p
    className={['tile', 'image', 'align', data.align]
      .filter(e => !!e)
      .join(' ')}
  >
    <Container>
      <iframe
        title="Embeded Google Maps"
        src={data.url}
        className="google-map"
        frameborder="0"
        allowfullscreen
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
