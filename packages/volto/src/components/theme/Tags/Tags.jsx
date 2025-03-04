/**
 * Tags component.
 * @module components/theme/Tags/Tags
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

/**
 * Tags component class.
 * @function Tags
 * @param {array} tags Array of tags.
 * @returns {string} Markup of the component.
 */
const Tags = ({ tags }) =>
  tags && tags.length > 0 ? (
    <Container className="tags">
      {tags.map((tag) => (
        <Link className="ui label" to={`/search?Subject=${tag}`} key={tag}>
          {tag}
        </Link>
      ))}
    </Container>
  ) : (
    <span />
  );

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
Tags.defaultProps = {
  tags: null,
};

export default Tags;
