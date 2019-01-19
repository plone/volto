/**
 * View map tile.
 * @module components/manage/Tiles/Maps/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Image, Container } from 'semantic-ui-react';
import Iframe from 'react-iframe';

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
    <Container >
    <iframe src={data.url} width="600" height="450" frameborder="0" style={{border:0, zIndex: 1, position: 'relative' }} allowfullscreen></iframe>

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
