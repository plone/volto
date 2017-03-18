/**
 * Summary view component.
 * @module components/theme/View/SummaryView
 */

import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

/**
 * Summary view component class.
 * @function SummaryView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const SummaryView = ({ content }) => (
  <div id="page-home">
    <Helmet title={content.title} />
    <div className="container">
      <article id="content">
        <header>
          <h1 className="documentFirstHeading">{content.title}</h1>
          {content.description && <div className="documentDescription description">{content.description}</div>}
        </header>
        <section id="content-core">
          {content.items.map(item =>
            <article
              className="tileItem"
              key={item.url}
            >
              <h2 className="tileHeadline">
                <Link
                  to={item.url}
                  className="summary url"
                  title={item['@type']}
                >
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
              <div className="visualClear" />
            </article>,
          )}
        </section>
      </article>
    </div>
  </div>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
SummaryView.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        url: PropTypes.string,
        '@type': PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default SummaryView;
