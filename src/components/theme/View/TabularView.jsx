/**
 * Tabular view component.
 * @module components/theme/View/TabularView
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Table } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

/**
 * Tabular view component class.
 * @function TabularView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */
const TabularView = ({ content }) => (
  <Container className="view-wrapper">
    <article id="content">
      <header>
        <h1 className="documentFirstHeading">{content.title}</h1>
        {content.description && (
          <p className="documentDescription">{content.description}</p>
        )}
      </header>
      <section id="content-core">
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <FormattedMessage id="Title" defaultMessage="Title" />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <FormattedMessage
                  id="Description"
                  defaultMessage="Description"
                />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <FormattedMessage id="Type" defaultMessage="Type" />
              </Table.HeaderCell>
              <Table.HeaderCell>
                <FormattedMessage id="State" defaultMessage="State" />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {content.items.map((item) => (
              <Table.Row key={item.url}>
                <Table.Cell>
                  <Link
                    to={item.url}
                    className="summary url"
                    title={item['@type']}
                  >
                    {item.title}
                  </Link>
                </Table.Cell>
                <Table.Cell>{item.description}</Table.Cell>
                <Table.Cell>{item['@type']}</Table.Cell>
                <Table.Cell>{item.review_state}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </section>
    </article>
  </Container>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
TabularView.propTypes = {
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
         * Review state of the item
         */
        review_state: PropTypes.string,
        /**
         * Type of the item
         */
        '@type': PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default TabularView;
