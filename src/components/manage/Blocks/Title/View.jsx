/**
 * View title/description block.
 * @module volto-slate/blocks/Title/TitleBlockView
 */

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Slugger from 'github-slugger';
import { renderLinkElement } from '@plone/volto-slate/editor/render';

/**
 * View title block component.
 * @class View
 * @extends Component
 */
const TitleBlockView = ({ properties, metadata, id, children }) => {
  let attr = { id };
  const title = (properties || metadata)['title'];
  const slug = Slugger.slug(title);
  attr.id = slug || id;
  const LinkedTitle = useMemo(() => renderLinkElement('h1'), []);
  return (
    <LinkedTitle
      mode="view"
      children={title ?? children}
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
