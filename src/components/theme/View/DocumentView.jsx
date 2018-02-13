/**
 * Document view component.
 * @module components/theme/View/DocumentView
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

/**
 * Component to display the document view.
 * @function DocumentView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */
const DocumentView = ({ content }) => (
  <div id="page-home">
    <Helmet title={content.title} />
    <h1>{content.title}</h1>
    {content.description && (
      <p className="description">{content.description}</p>
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
  /**
   * Content of the object
   */
  content: PropTypes.shape({
    /**
     * Title of the object
     */
    title: PropTypes.string,
    /**
     * Description of the object
     */
    description: PropTypes.string,
    /**
     * Text of the object
     */
    text: PropTypes.shape({
      /**
       * Data of the text of the object
       */
      data: PropTypes.string,
    }),
  }).isRequired,
};

export default DocumentView;
