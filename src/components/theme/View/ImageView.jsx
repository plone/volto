/**
 * Image view component.
 * @module components/theme/View/ImageView
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

/**
 * Image view component class.
 * @function ImageView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const ImageView = ({ content }) => (
  <div className="view-wrapper">
    <Helmet title={content.title} />
    <h1 className="documentFirstHeading">
      {content.title}
      {content.subtitle && ` - ${content.subtitle}`}
    </h1>
    {content.description && (
      <p className="description">{content.description}</p>
    )}
    <img alt={content.title} src={content.image.scales.preview.download} />
  </div>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
ImageView.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.shape({
      scales: PropTypes.shape({
        preview: PropTypes.shape({
          download: PropTypes.string,
        }),
      }),
    }),
  }).isRequired,
};

export default ImageView;
