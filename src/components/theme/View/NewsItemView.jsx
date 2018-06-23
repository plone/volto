/**
 * Document view component.
 * @module components/theme/View/DocumentView
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Image } from 'semantic-ui-react';

/**
 * Document view component class.
 * @function DocumentView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const DocumentView = ({ content }) => (
  <div className="view-wrapper">
    <Helmet title={content.title} />
    {content.title && (
      <h1 className="documentFirstHeading">
        {content.title}
        {content.subtitle && ` - ${content.subtitle}`}
      </h1>
    )}
    {content.description && (
      <p className="documentDescription">{content.description}</p>
    )}
    {content.image && (
      <Image
        className="documentImage"
        alt={content.title}
        title={content.title}
        src={
          content.image['content-type'] === 'image/svg+xml'
            ? content.image.download
            : content.image.scales.mini.download
        }
        floated="right"
      />
    )}
    {content.text && (
      <p dangerouslySetInnerHTML={{ __html: content.text.data }} />
    )}
  </div>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
DocumentView.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    text: PropTypes.shape({
      data: PropTypes.string,
    }),
  }).isRequired,
};

export default DocumentView;
