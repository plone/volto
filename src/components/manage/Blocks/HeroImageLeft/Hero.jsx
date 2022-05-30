/**
 * View image block.
 * @module components/manage/Blocks/Hero/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import config from '@plone/volto/registry';

/**
 * View image block class.
 * @class View
 * @extends Component
 */
export const Hero = (props) => {
  const { variation } = props;
  const variations = config.blocks?.blocksConfig['hero']?.variations || [];
  const defaultVariation = variations.filter((item) => item.isDefault)?.[0];
  const Layout = variation.view || defaultVariation.view;

  return (
    <div className="block-inner-wrapper">
      <Layout {...props}></Layout>
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Hero.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  variation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default injectIntl(Hero);
