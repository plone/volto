import React from 'react';
import PropTypes from 'prop-types';

const DescriptionBlockView = ({ properties, metadata }) => {
  return (
    <p className="documentDescription">
      {(metadata || properties)['description'] || ''}
    </p>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
DescriptionBlockView.propTypes = {
  properties: PropTypes.objectOf(PropTypes.any).isRequired,
  metadata: PropTypes.objectOf(PropTypes.any),
};

export default DescriptionBlockView;
