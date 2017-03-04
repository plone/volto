/**
 * Document view component.
 * @module containers/DocumentView
 */

import React from 'react';
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
    <div className="container">
      <h1 className="documentFirstHeading">{content.title}</h1>
      <div className="documentDescription description">{content.description}</div>
      {content.text && <p className="body" dangerouslySetInnerHTML={{__html: content.text.data}} />}
    </div>
  </div>
);

export default DocumentView;
