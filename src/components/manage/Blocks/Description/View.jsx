/**
 * View title/description block.
 * @module volto-slate/blocks/Title/TitleBlockView
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * View title block component.
 * @class View
 * @extends Component
 */
const TitleBlockView = ({ properties, metadata }) => {
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
TitleBlockView.propTypes = {
  properties: PropTypes.objectOf(PropTypes.any).isRequired,
  metadata: PropTypes.objectOf(PropTypes.any),
};

export default TitleBlockView;
