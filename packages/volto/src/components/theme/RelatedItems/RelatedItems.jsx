/**
 * RelatedItems component.
 * @module components/theme/RelatedItems/RelatedItems
 */

import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';
import { defineMessages, useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import config from '@plone/volto/registry';

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
const RelatedItems = ({ content }) => {
  const intl = useIntl();
  const relatedItems = content?.relatedItems;
  if (
    !config.settings.showRelatedItems ||
    !relatedItems ||
    relatedItems.length === 0
  ) {
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
  content: PropTypes.shape({
    relatedItems: PropTypes.arrayOf(
      PropTypes.shape({
        '@id': PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }),
    ),
  }),
};

export default RelatedItems;
