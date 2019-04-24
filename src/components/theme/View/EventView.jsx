/**
 * EventView view component.
 * @module components/theme/View/EventView
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Container, Image } from 'semantic-ui-react';

/**
 * EventView view component class.
 * @function EventView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const EventView = ({ content }) => (
  <Container className="view-wrapper">
    <Helmet title={content.title} />
    {content.title && (
      <h1 className="documentFirstHeading">
        {content.title}
        {content.subtitle && ` - ${content.subtitle}`}
      </h1>
    )}
    {console.log(content)}
    {content.description && (
      <p className="documentDescription">{content.description}</p>
    )}
    {content.text && (
      <div dangerouslySetInnerHTML={{ __html: content.text.data }} />
    )}
  </Container>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
EventView.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    text: PropTypes.shape({
      data: PropTypes.string,
    }),
  }).isRequired,
};

export default EventView;
