/**
 * Users controlpanel user.
 * @module components/manage/Controlpanels/UsersControlpanelUser
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  defineMessages,
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';
import { Dropdown, Table, Checkbox } from 'semantic-ui-react';
import checkedSVG from '../../../icons/checkbox-checked.svg';
import uncheckedSVG from '../../../icons/checkbox-unchecked.svg';
import trashSVG from '../../../icons/delete.svg';
import { Icon } from '../../../components';

@injectIntl
/**
 * UsersControlpanelUser class.
 * @class UsersControlpanelUser
 * @extends Component
 */
export default class UsersControlpanelUser extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
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
    this.state = {
      checked: true,
    };
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler(e, value) {
    this.props.updateUser(value.name, value.value, value.checked);
  }
  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <Table.Row key={this.props.user.username}>
        <Table.Cell>{this.props.user.fullname}</Table.Cell>
        {this.props.roles.map(role => (
          <Table.Cell key={role.id}>
            {this.props.user.roles.indexOf(role.id) !== -1 ? (
              <Checkbox
                checked={this.state.checked}
                name={role.id}
                size="25px"
                title="Global role"
                color="#007eb1"
                onClick={this.onClickHandler}
                value={this.props.user['@id']}
              />
            ) : (
              <Checkbox
                name={role.id}
                checked={!this.state.checked}
                size="25px"
                title="Global role"
                color="#826a6a"
                onClick={this.onClickHandler}
                value={this.props.user['@id']}
              />
            )}
          </Table.Cell>
        ))}
        <Table.Cell textAlign="right">
          <Dropdown icon="ellipsis horizontal">
            <Dropdown.Menu className="left">
              <Dropdown.Item
                onClick={this.props.onDelete}
                value={this.props.user['@id']}
              >
                <Icon name={trashSVG} size="15px" />
                <FormattedMessage id="Delete" defaultMessage="Delete" />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
      </Table.Row>
    );
  }
}
