/**
 * Document view component.
 * @module components/theme/View/DocumentView
 */

import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

/**
 * Document view component class.
 * @function DocumentView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const DocumentView = ({ content }) => (
  <div id="page-home">
    <Helmet title={content.title} />
    <h1 className="documentFirstHeading">{content.title}</h1>
    <div className="documentDescription description">{content.description}</div>
    {content.text && <p className="body" dangerouslySetInnerHTML={{ __html: content.text.data }} />}
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
