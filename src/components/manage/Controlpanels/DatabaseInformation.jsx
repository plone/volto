/**
 * Users controlpanel container.
 * @module components/manage/Controlpanels/DatabaseInformation
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Portal } from 'react-portal';
import { Container, Divider, Message, Segment, Table } from 'semantic-ui-react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';

import { getDatabaseInformation } from '@plone/volto/actions';
import { Helmet } from '@plone/volto/helpers';
import { Icon, Toolbar } from '@plone/volto/components';
import backSVG from '@plone/volto/icons/back.svg';

const messages = defineMessages({
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
});

/**
 * DatabaseInformation class.
 * @class DatabaseInformation
 * @extends Component
 */
class DatabaseInformation extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    getDatabaseInformation: PropTypes.func.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs DiffComponent
   */
  constructor(props) {
    super(props);
    this.state = { isClient: false };
  }

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.getDatabaseInformation();
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.setState({ isClient: true });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return this.props.databaseInformation ? (
      <Container id="database-page" className="controlpanel-database">
        <Helmet title="DatabaseInformation" />
        <Segment.Group raised>
          <Segment className="primary">
            <FormattedMessage
              id="Database Information"
              defaultMessage="Database Information"
            />
          </Segment>
          <Segment>
            <Message>
              <FormattedMessage
                id="The Database Manager allow you to view database status information"
                defaultMessage="The Database Manager allow you to view database status information"
              />
            </Message>
          </Segment>
          <Segment>
            <Message>
              <Message.Header>
                <FormattedMessage
                  id="Database main"
                  defaultMessage="Database main"
                />
              </Message.Header>
            </Message>
            <Table celled padded columns="2">
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <FormattedMessage
                      id="Database Location"
                      defaultMessage="Database Location"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {this.props.databaseInformation.db_name}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <FormattedMessage
                      id="Database Size"
                      defaultMessage="Database Size"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {this.props.databaseInformation.database_size}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <FormattedMessage
                      id="Total number of objects in the database"
                      defaultMessage="Total number of objects in the database"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {this.props.databaseInformation.db_size}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <FormattedMessage
                      id="Total number of objects in memory from all caches"
                      defaultMessage="Total number of objects in memory from all caches"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {this.props.databaseInformation.cache_size}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <FormattedMessage
                      id="Target number of objects in memory per cache"
                      defaultMessage="Target number of objects in memory per cache"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {this.props.databaseInformation.cache_length}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <FormattedMessage
                      id="Target memory size per cache in bytes"
                      defaultMessage="Target memory size per cache in bytes"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {this.props.databaseInformation.cache_length_bytes}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Segment>
          <Segment>
            <Divider />

            <Message>
              <Message.Header>
                <FormattedMessage
                  id="Total number of objects in each cache"
                  defaultMessage="Total number of objects in each cache"
                />
              </Message.Header>
            </Message>
            <Table celled padded>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    <FormattedMessage
                      id="Cache Name"
                      defaultMessage="Cache Name"
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <FormattedMessage
                      id="Number of active objects"
                      defaultMessage="Number of active objects"
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <FormattedMessage
                      id="Total active and non-active objects"
                      defaultMessage="Total active and non-active objects"
                    />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              {this.props.databaseInformation.cache_detail_length.map(
                (item) => (
                  <Table.Row>
                    <Table.Cell>{item.connection}</Table.Cell>
                    <Table.Cell>{item.ngsize}</Table.Cell>
                    <Table.Cell>{item.size}</Table.Cell>
                  </Table.Row>
                ),
              )}
            </Table>
          </Segment>
        </Segment.Group>

        {this.state.isClient && (
          <Portal node={document.getElementById('toolbar')}>
            <Toolbar
              pathname={this.props.pathname}
              hideDefaultViewButtons
              inner={
                <>
                  <Link to="/controlpanel" className="item">
                    <Icon
                      name={backSVG}
                      aria-label={this.props.intl.formatMessage(messages.back)}
                      className="contents circled"
                      size="30px"
                      title={this.props.intl.formatMessage(messages.back)}
                    />
                  </Link>
                </>
              }
            />
          </Portal>
        )}
      </Container>
    ) : null;
  }
}

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      databaseInformation: state.controlpanels.databaseinformation,
      pathname: props.location.pathname,
    }),
    { getDatabaseInformation },
  ),
)(DatabaseInformation);
