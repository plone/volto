/**
 * Image view component.
 * @module components/theme/View/ImageView
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Container } from 'semantic-ui-react';

import { flattenToAppURL } from '@plone/volto/helpers';

/**
 * Image view component class.
 * @function ImageView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const ImageView = ({ content }) => (
  <Container className="view-wrapper">
    <Helmet title={content.title} />
    <h1 className="documentFirstHeading">
      {content.title}
      {content.subtitle && ` - ${content.subtitle}`}
    </h1>
    {content.description && (
      <p className="documentDescription">{content.description}</p>
    )}
    <img
      alt={content.title}
      src={flattenToAppURL(content.image.scales.preview.download)}
    />
  </Container>
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
