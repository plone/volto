/**
 * File view component.
 * @module components/theme/View/FileView
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Container } from 'semantic-ui-react';

import { flattenToAppURL } from '@plone/volto/helpers';

/**
 * File view component class.
 * @function FileView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const FileView = ({ content }) => (
  <Container className="view-wrapper">
    <Helmet title={content.title} />
    <h1 className="documentFirstHeading">
      {content.title}
      {content.subtitle && ` - ${content.subtitle}`}
    </h1>
    {content.description && (
      <p className="documentDescription">{content.description}</p>
    )}
    <a href={flattenToAppURL(content.file.download)}>{content.file.filename}</a>
  </Container>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
FileView.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    file: PropTypes.shape({
      download: PropTypes.string,
      filename: PropTypes.string,
    }),
  }).isRequired,
};

export default FileView;
