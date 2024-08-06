/**
 * RelatedItems component.
 * @module components/theme/RelatedItems/RelatedItems
 */

import { UniversalLink } from '@plone/volto/components';
import { defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

const messages = defineMessages({
  relatedItems: {
    id: 'Related Items',
    defaultMessage: 'Related Items',
  },
});

/**
 * Related Items component.
 * @function RelatedItems
 * @param {array} relatedItems Array of related items.
 * @returns {JSX.Element} Markup of the component.
 */
const RelatedItems = ({ relatedItems, intl }) => {
  if (!relatedItems || relatedItems.length === 0) {
    return null;
  }

  return (
    <Container className="related-items">
      <h2>{intl.formatMessage(messages.relatedItems)}</h2>
      <ul>
        {relatedItems.map((relatedItem) =>
          relatedItem ? (
            <li key={relatedItem['@id']}>
              <UniversalLink href={relatedItem['@id']}>
                {relatedItem.title}
              </UniversalLink>
            </li>
          ) : null,
        )}
      </ul>
    </Container>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
RelatedItems.propTypes = {
  relatedItems: PropTypes.arrayOf(
    PropTypes.shape({
      '@id': PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
  intl: PropTypes.object.isRequired,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
RelatedItems.defaultProps = {
  relatedItems: [],
};

export default injectIntl(RelatedItems);
