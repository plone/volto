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
  const hasType = properties['@type'];
  const AboveTitle =
    hasType &&
    config.getComponent({ name: 'AboveTitle', dependencies: [hasType] })
      .component;

  return (
    <>
      {AboveTitle ? <AboveTitle item={properties} /> : null}
      <h1 className="documentFirstHeading">
        {(metadata || properties)['title'] || ''}
      </h1>
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
