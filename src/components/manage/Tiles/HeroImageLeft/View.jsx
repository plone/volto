/**
 * View image tile.
 * @module components/manage/Tiles/Hero/View
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * View image tile class.
 * @class View
 * @extends Component
 */
const View = ({ data }) => (
  <div className="tile hero">
    <div className="tile-inner-wrapper">
      <img src={`${data.url}/@@images/image`} alt="" className="hero-image" />
      <div className="hero-body">
        <h1>{data.boldTitle}</h1>
        <p>{data.title}</p>
      </div>
    </div>
  </div>
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
