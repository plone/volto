/**
 * Document view component.
 * @module components/theme/View/ListingView
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Container as SemanticContainer } from 'semantic-ui-react';
import { UniversalLink, PreviewImage } from '@plone/volto/components';
import config from '@plone/volto/registry';

/**
 * List view component class.
 * @function ListingView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const ListingView = ({ content }) => {
  const Container =
    config.getComponent({ name: 'Container' }).component || SemanticContainer;

  return (
    <Container id="page-home">
      <section id="content-core">
        {content.items.map((item) => (
          <Segment key={item.url} className="listing-item">
            <Container>
              <h2>
                <UniversalLink item={item} title={item['@type']}>
                  {item.title}
                </UniversalLink>
              </h2>
              {item.description && <p>{item.description}</p>}
            </Container>
            {item.image_field && (
              <PreviewImage
                item={item}
                size="thumb"
                alt={item.image_caption ? item.image_caption : item.title}
                className="ui image"
              />
            )}
          </Segment>
        ))}
      </section>
    </Container>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
ListingView.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        '@id': PropTypes.string,
        '@type': PropTypes.string,
        description: PropTypes.string,
        review_state: PropTypes.string,
        title: PropTypes.string,
        url: PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default ListingView;
