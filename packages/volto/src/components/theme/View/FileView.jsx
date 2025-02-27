/**
 * File view component.
 * @module components/theme/View/FileView
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Container as SemanticContainer } from 'semantic-ui-react';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';
import config from '@plone/volto/registry';

/**
 * File view component class.
 * @function FileView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const FileView = ({ content }) => {
  const Container =
    config.getComponent({ name: 'Container' }).component || SemanticContainer;

  return (
    <Container className="view-wrapper">
      <h1 className="documentFirstHeading">
        {content.title}
        {content.subtitle && ` - ${content.subtitle}`}
      </h1>
      {content.description && (
        <p className="documentDescription">{content.description}</p>
      )}
      {content.file?.download && (
        <UniversalLink href={content.file.download}>
          {content.file.filename}
        </UniversalLink>
      )}
    </Container>
  );
};

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
