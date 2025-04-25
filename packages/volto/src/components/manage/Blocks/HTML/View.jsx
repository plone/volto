import React from 'react';
import PropTypes from 'prop-types';

const View = ({ data }) => (
  <div className="block html" dangerouslySetInnerHTML={{ __html: data.html }} />
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
