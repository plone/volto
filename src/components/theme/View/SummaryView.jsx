/**
 * Summary view component.
 * @module components/theme/View/SummaryView
 */

import React from 'react';
import PropTypes from 'prop-types';
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
    <article id="content">
      <header>
        <h1 className="documentFirstHeading">{content.title}</h1>
        {content.description && <p>{content.description}</p>}
      </header>
      <section id="content-core">
        {content.items.map(item =>
          <article key={item.url}>
            <h2>
              <Link to={item.url} title={item['@type']}>
                {item.title}
              </Link>
            </h2>
            {item.description && <p>{item.description}</p>}
            <p>
              <Link to={item.url}>
                Read More…
              </Link>
            </p>
          </article>,
        )}
      </section>
    </article>
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
