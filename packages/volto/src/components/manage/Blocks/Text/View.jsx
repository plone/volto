import PropTypes from 'prop-types';
import redraft from 'redraft';
import React from 'react';
import config from '@plone/volto/registry';

const View = ({ data }) =>
  data.text ? (
    redraft(
      data.text,
      config.settings.richtextViewSettings.ToHTMLRenderers,
      config.settings.richtextViewSettings.ToHTMLOptions,
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
