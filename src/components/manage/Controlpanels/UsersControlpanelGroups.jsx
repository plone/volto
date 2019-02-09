/**
 * Users controlpanel groups.
 * @module components/manage/Controlpanels/UsersControlpanelGroups
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  defineMessages,
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';
import { Dropdown, Icon, Table } from 'semantic-ui-react';

const messages = defineMessages({});

@injectIntl
/**
 * UsersControlpanelGroups class.
 * @class UsersControlpanelGroups
 * @extends Component
 */
export default class UsersControlpanelGroups extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    groups: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        email: PropTypes.string,
        groupname: PropTypes.string,
        roles: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    user: PropTypes.shape({
      username: PropTypes.string,
      fullname: PropTypes.string,
      roles: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    roles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
      }),
    ).isRequired,

    onDelete: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Sharing
   */
  constructor(props) {
    super(props);
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <Table.Row key={this.props.groups.title}>
        <Table.Cell>{this.props.groups.groupname}</Table.Cell>
        {this.props.roles.map(role => (
          <Table.Cell key={role.id}>
            {(
              <Icon
                name="check circle outline"
                title="Global role"
                color="blue"
              />
            )}
          </Table.Cell>
            ))}
        <Table.Cell textAlign="right">
          <Dropdown icon="ellipsis horizontal">
            <Dropdown.Menu className="left">
              <Dropdown.Item
                onClick={this.props.onDelete}
                value={this.props.groups['@id']}
              >
                <Icon name="trash" />
                <FormattedMessage id="Delete" defaultMessage="Delete" />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
      </Table.Row>
    );
  }
}
