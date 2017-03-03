/**
 * Summary view component.
 * @module containers/SummaryView
 */

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

/**
 * Summary view component class.
 * @function SummaryView
 * @params {object} page Page object.
 * @returns {string} Markup of the component.
 */
const SummaryView = ({ page }) => (
  <div id="page-home">
    <Helmet title={page.title} />
    <div className="container">
      <article id="content">
        <header>
          <h1 className="documentFirstHeading">{page.title}</h1>
          {page.description && <div className="documentDescription description">{page.description}</div>}
        </header>
        <section id="content-core">
          {page.items.map(item =>
            <article className="tileItem"
                     key={item.url}>
              <h2 className="tileHeadline">
                <Link to={item.url}
                      className="summary url"
                      title={item['@type']}>
                  {item.title}
                </Link>
              </h2>
              {item.description &&
                <div className="tileBody">
                  <span className="description">{item.description}</span>
                </div>
              }
              <div className="tileFooter">
                <Link to={item.url}>
                  Read More…
                </Link>
              </div>
              <div className="visualClear"> </div>
            </article>
          )}
        </section>
       </article>
    </div>
  </div>
);

export default SummaryView;
