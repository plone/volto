/**
 * Document view component.
 * @module components/theme/View/ListingView
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Container } from 'semantic-ui-react';
import { UniversalLink, Component } from '@plone/volto/components';

/**
 * List view component class.
 * @function ListingView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const ListingView = ({ content }) => (
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
            <Component
              componentName="PreviewImage"
              item={item}
              alt={item.image_caption}
              className="ui image"
              responsive={true}
              loading="lazy"
            />
          )}
        </Segment>
      ))}
    </section>
  </Container>
);

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
