/**
 * Tabular view component.
 * @module components/theme/View/TabularView
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { Table } from 'semantic-ui-react';

/**
 * Tabular view component class.
 * @function TabularView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const TabularView = ({ content }) => (
  <div id="page-home">
    <Helmet title={content.title} />
    <article id="content">
      <header>
        <h1 className="documentFirstHeading">{content.title}</h1>
        {content.description &&
          <p className="description">{content.description}</p>}
      </header>
      <section id="content-core">
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>State</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {content.items.map(item => (
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
  </div>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
TabularView.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        url: PropTypes.string,
        review_state: PropTypes.string,
        '@type': PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default TabularView;
