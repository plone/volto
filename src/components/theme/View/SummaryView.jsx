/**
 * Summary view component.
 * @module components/theme/View/SummaryView
 */

import React from 'react';
import PropTypes from 'prop-types';
import { UniversalLink } from '@plone/volto/components';
import { Container as SemanticContainer } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import PreviewImage from '../PreviewImage/PreviewImage';
import config from '@plone/volto/registry';

/**
 * Summary view component class.
 * @function SummaryView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */
const SummaryView = ({ content }) => {
  const Container =
    config.getComponent({ name: 'Container' }).component || SemanticContainer;

  return (
    <Container className="view-wrapper summary-view">
      <article id="content">
        <header>
          <h1 className="documentFirstHeading">{content.title}</h1>
          {content.description && (
            <p className="documentDescription">{content.description}</p>
          )}
        </header>
        <section id="content-core">
          {content.items.map((item) => (
            <article key={item.url}>
              <h2>
                <UniversalLink item={item} title={item['@type']}>
                  {item.title}
                </UniversalLink>
              </h2>
              {item.image_field && (
                <PreviewImage
                  item={item}
                  alt={item.image_caption ? item.image_caption : item.title}
                  size="thumb"
                  className="ui image floated right clear"
                />
              )}
              {item.description && <p>{item.description}</p>}
              <p>
                <UniversalLink item={item}>
                  <FormattedMessage
                    id="Read More…"
                    defaultMessage="Read More…"
                  />
                </UniversalLink>
              </p>
            </article>
          ))}
        </section>
      </article>
    </Container>
  );
};

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
         * Image of the item
         */
        image: PropTypes.object,
        /**
         * Image caption of the item
         */
        image_caption: PropTypes.string,
        /**
         * Type of the item
         */
        '@type': PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default SummaryView;
