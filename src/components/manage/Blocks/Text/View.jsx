/**
 * View text block.
 * @module components/manage/Blocks/Text/View
 */

import PropTypes from 'prop-types';
import redraft from 'redraft';
import React from 'react';
import config from '@plone/volto/registry';

/**
 * View text block class.
 * @class View
 * @extends Component
 */
const View = ({ data }) =>
  data.text ? (
    redraft(
      data.text,
      config.settings.ToHTMLRenderers,
      config.settings.ToHTMLOptions,
    )
  ) : (
    <br />
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
