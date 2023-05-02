/**
 * View title/description block.
 * @module volto-slate/blocks/Title/TitleBlockView
 */

import React from 'react';
import PropTypes from 'prop-types';
import config from '@plone/volto/registry';

/**
 * View title block component.
 * @class View
 * @extends Component
 */
const TitleBlockView = ({ properties, metadata }) => {
  const AboveTitle = config.getComponent('AboveTitle').component;
  return (
    <>
      {AboveTitle ? (
        <>
          <AboveTitle item={properties} />
          <h1 className="documentFirstHeading">
            {(metadata || properties)['title'] || ''}
          </h1>
        </>
      ) : (
        <h1 className="documentFirstHeading">
          {(metadata || properties)['title'] || ''}
        </h1>
      )}
    </>
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
