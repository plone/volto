/**
 * Summary view component.
 * @module components/theme/View/SummaryView
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

/**
 * Component to display the summary view.
 * @function SummaryView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */
const SummaryView = ({ content }) => (
  <div id="page-home">
    <Helmet title={content.title} />
    <article id="content">
      <header>
        <h1 className="documentFirstHeading">{content.title}</h1>
        {content.description && (
          <p className="description">{content.description}</p>
        )}
      </header>
      <section id="content-core">
        {content.items.map(item => (
          <article key={item.url}>
            <h2>
              <Link to={item.url} title={item['@type']}>
                {item.title}
              </Link>
            </h2>
            {item.description && <p>{item.description}</p>}
            <p>
              <Link to={item.url}>
                <FormattedMessage id="Read More…" defaultMessage="Read More…" />
              </Link>
            </p>
          </article>
        ))}
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
     * Child items of the object
     */
    items: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * Title of the item
         */
        title: PropTypes.string,
        /**
         * Description of the item
         */
        description: PropTypes.string,
        /**
         * Url of the item
         */
        url: PropTypes.string,
        /**
         * Type of the item
         */
        '@type': PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default SummaryView;
