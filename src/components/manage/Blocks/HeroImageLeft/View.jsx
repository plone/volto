/**
 * View image block.
 * @module components/manage/Blocks/Hero/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { flattenToAppURL } from '@plone/volto/helpers';

/**
 * View image block class.
 * @class View
 * @extends Component
 */
const View = ({ data }) => (
  <div className="block hero">
    <div className="block-inner-wrapper">
      {data.url && (
        <img
          src={`${flattenToAppURL(data.url)}/@@images/image`}
          alt=""
          className="hero-image"
        />
      )}
      <div className="hero-body">
        {data.title && <h1>{data.title}</h1>}
        {data.description && <p>{data.description}</p>}
      </div>
    </div>
  </div>
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
