import React from 'react';
import PropTypes from 'prop-types';

const FormBlockView = ({ properties, metadata }) => {
  return <h2>Form!</h2>;
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
FormBlockView.propTypes = {
  properties: PropTypes.objectOf(PropTypes.any).isRequired,
  metadata: PropTypes.objectOf(PropTypes.any),
};

export default FormBlockView;
