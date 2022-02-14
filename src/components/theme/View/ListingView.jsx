/**
 * Document view component.
 * @module components/theme/View/ListingView
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Segment, Container } from 'semantic-ui-react';
import Image from '@plone/volto/components/theme/Image/Image';

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
              <Link to={item.url} title={item['@type']}>
                {item.title}
              </Link>
            </h2>
            {item.description && <p>{item.description}</p>}
          </Container>
          {item.image_field && (
            <Image
              image={item['@id']}
              size="thumb"
              floated="right"
              imageField={item.image_field}
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
