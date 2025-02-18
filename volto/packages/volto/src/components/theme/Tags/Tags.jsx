/**
 * Tags component.
 * @module components/theme/Tags/Tags
 */

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import config from '@plone/registry';

/**
 * Tags component.
 * @function Tags
 * @param {Object} props Component properties.
 * @param {Object} props.content Content object that may contain subjects.
 * @param {Array} [props.content.subjects] Optional array of tags (subjects).
 * @returns {JSX.Element|null} Markup of the component or null if no tags are available.
 */
const Tags = ({ content }) => {
  const tags = content?.subjects || [];

  if (!config.settings.showTags || !tags.length) return null;

  return (
    <Container className="tags">
      {tags.map((tag) => (
        <Link className="ui label" to={`/search?Subject=${tag}`} key={tag}>
          {tag}
        </Link>
      ))}
    </Container>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Tags.propTypes = {
  content: PropTypes.shape({
    subjects: PropTypes.arrayOf(PropTypes.string),
  }),
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
Tags.defaultProps = {
  content: {
    subjects: [],
  },
};

export default Tags;
