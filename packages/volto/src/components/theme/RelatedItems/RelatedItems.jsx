/**
 * RelatedItems component.
 * @module components/theme/RelatedItems/RelatedItems
 */

import React from 'react';
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
 * @param {array} tags Array of related items.
 * @returns {string} Markup of the component.
 */

const RelatedItems = ({ relatedItems, intl }) =>
  relatedItems && relatedItems.length > 0 ? (
    <Container>
      <h4 className="ui header">{intl.formatMessage(messages.relatedItems)}</h4>
      <div className="ui list">
        {relatedItems.map((relatedItem) =>
          relatedItem ? (
            <div className="item" key={relatedItem['@id']}>
              <div className="content">
                <UniversalLink className="header" item={relatedItem}>
                  <div>{relatedItem['title']}</div>
                  <div className="description">
                    {relatedItem['description']}
                  </div>
                </UniversalLink>
              </div>
            </div>
          ) : null,
        )}
      </div>
    </Container>
  ) : (
    <span />
  );

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
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
RelatedItems.defaultProps = {
  RelatedItems: null,
};

export default injectIntl(RelatedItems);
