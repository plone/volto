/**
 * Document view component.
 * @module containers/DocumentView
 */

import React from 'react';
import Helmet from 'react-helmet';

/**
 * Document view component class.
 * @function DocumentView
 * @params {object} page Page object.
 * @returns {string} Markup of the component.
 */
const DocumentView = ({ page }) => (
  <div id="page-home">
    <Helmet title={page.title} />
    <div className="container">
      <h1 className="documentFirstHeading">{page.title}</h1>
      <div className="documentDescription description">{page.description}</div>
      <p className="body" dangerouslySetInnerHTML={{__html: page.text.data}} />
    </div>
  </div>
);

export default DocumentView;
