/**
 * View title/description block.
 * @module volto-slate/blocks/Title/TitleBlockView
 */

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { renderLinkElement } from '@plone/volto-slate/editor/render';

/**
 * View title block component.
 * @class View
 * @extends Component
 */
const TitleBlockView = ({ properties, metadata, id, children }) => {
  const attr = { id };
  const LinkedTitle = useMemo(() => renderLinkElement('h1'), []);
  return (
    <LinkedTitle
      mode="view"
      children={(properties || metadata)['title'] ?? children}
      attributes={attr}
      className={'documentFirstHeading'}
    />
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
