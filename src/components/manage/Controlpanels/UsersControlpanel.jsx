/**
 * Users controlpanel container.
 * @module components/manage/Controlpanels/UsersControlpanel
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Portal } from 'react-portal';
import {
  Button,
  Confirm,
  Form,
  Icon,
  Input,
  Segment,
  Table,
} from 'semantic-ui-react';
import { find, map } from 'lodash';
import {
  FormattedMessage,
  defineMessages,
  injectIntl,
  intlShape,
} from 'react-intl';

import {
  createUser,
  deleteUser,
  listRoles,
  listUsers,
  createGroup,
  deleteGroup,
  listGroups,
} from '../../../actions';
import { getBaseUrl } from '../../../helpers';
import {
  ModalForm,
  Toolbar,
  UsersControlpanelUser,
  UsersControlpanelGroups,
} from '../../../components';

const messages = defineMessages({
  searchUsers: {
    id: 'Search users...',
    defaultMessage: 'Search users...',
  },
  searchGroups: {
    id: 'Search group...',
    defaultMessage: 'Search group...',
  },
  save: {
    id: 'Save',
    defaultMessage: 'Save',
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  deleteUserConfirmTitle: {
    id: 'Delete User',
    defaultMessage: 'Delete User',
  },
  deleteGroupConfirmTitle: {
    id: 'Delete Group',
    defaultMessage: 'Delete Group',
  },
  addUserButtonTitle: {
    id: 'Add User',
    defaultMessage: 'Add User',
  },
  addGroupsButtonTitle: {
    id: 'Add Groups',
    defaultMessage: 'Add Groups',
  },
  addUserFormTitle: {
    id: 'Add User',
    defaultMessage: 'Add User',
  },
  addGroupsFormTitle: {
    id: 'Add group',
    defaultMessage: 'Add group',
  },
  addUserFormUsernameTitle: {
    id: 'Username',
    defaultMessage: 'Username',
  },
  addGroupsFormTitleTitle: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  addUserFormFullnameTitle: {
    id: 'Fullname',
    defaultMessage: 'Fullname',
  },
  addGroupsFormDescriptionTitle: {
    id: 'Description',
    defaultMessage: 'Description',
  },
  addUserFormEmailTitle: {
    id: 'Email',
    defaultMessage: 'Email',
  },
  addGroupsFormEmailTitle: {
    id: 'Email',
    defaultMessage: 'Email',
  },
  addUserFormPasswordTitle: {
    id: 'Password',
    defaultMessage: 'Password',
  },
  addUserFormRolesTitle: {
    id: 'Roles',
    defaultMessage: 'Roles',
  },
  addGroupsFormRolesTitle: {
    id: 'Roles',
    defaultMessage: 'Roles',
  },
});

@injectIntl
@connect(
  (state, props) => ({
    roles: state.roles.roles,
    users: state.users.users,
    groups: state.groups.groups,
    description: state.description,
    pathname: props.location.pathname,
    deleteRequest: state.users.delete,
    createRequest: state.users.create,
    deleteGroupRequest: state.groups.delete,
    createGroupRequest: state.groups.create,
  }),
  dispatch =>
    bindActionCreators(
      {
        listRoles,
        listUsers,
        deleteUser,
        createUser,
        listGroups,
        deleteGroup,
        createGroup,
      },
      dispatch,
    ),
)
/**
 * UsersControlpanel class.
 * @class UsersControlpanel
 * @extends Component
 */
export default class UsersControlpanel extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    listRoles: PropTypes.func.isRequired,
    listUsers: PropTypes.func.isRequired,
    listGroups: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    roles: PropTypes.arrayOf(
      PropTypes.shape({
        '@id': PropTypes.string,
        '@type': PropTypes.string,
        id: PropTypes.string,
      }),
    ).isRequired,
    users: PropTypes.arrayOf(
      PropTypes.shape({
        username: PropTypes.string,
        fullname: PropTypes.string,
        roles: PropTypes.arrayOf(PropTypes.string),
      }),
    ).isRequired,
    groups: PropTypes.arrayOf(
      PropTypes.shape({
        Title: PropTypes.string,
        Description: PropTypes.string,
        roles: PropTypes.arrayOf(PropTypes.string),
        groupname: PropTypes.string,
      }),
    ).isRequired,
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
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSearchGroups = this.onSearchGroups.bind(this);
    this.delete = this.delete.bind(this);
    this.deleteGroup = this.deleteGroup.bind(this);
    this.onDeleteOk = this.onDeleteOk.bind(this);
    this.onDeleteCancel = this.onDeleteCancel.bind(this);
    this.onAddUserSubmit = this.onAddUserSubmit.bind(this);
    this.onAddGroupSubmit = this.onAddGroupSubmit.bind(this);
    this.onAddUserError = this.onAddUserError.bind(this);
    this.onAddGroupError = this.onAddGroupError.bind(this);
    this.onAddUserSuccess = this.onAddUserSuccess.bind(this);
    this.onAddGroupSuccess = this.onAddGroupSuccess.bind(this);
    this.state = {
      search: '',
      showAddUser: false,
      showAddUserErrorConfirm: false,
      addUserError: '',
      addGroupError: '',
      showDelete: false,
      userToDelete: undefined,
      groupToDelete: undefined,
      showAddGroup: false,
    };
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.listRoles();
    this.props.listUsers();
    this.props.listGroups();
    console.log(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (
      (this.props.deleteRequest.loading && nextProps.deleteRequest.loaded) ||
      (this.props.createRequest.loading && nextProps.createRequest.loaded)
    ) {
      this.props.listUsers(this.state.search);
    }
    if (
      (this.props.deleteGroupRequest.loading &&
        nextProps.deleteGroupRequest.loaded) ||
      (this.props.createGroupRequest.loading &&
        nextProps.createGroupRequest.loaded)
    ) {
      this.props.listGroups(this.state.search);
    }
    if (this.props.createRequest.loading && nextProps.createRequest.loaded) {
      this.onAddUserSuccess();
    }
    if (
      this.props.createGroupRequest.loading &&
      nextProps.createGroupRequest.loaded
    ) {
      this.onAddGroupSuccess();
    }
    if (this.props.createRequest.loading && nextProps.createRequest.error) {
      this.onAddUserError(nextProps.createRequest.error);
    }
    if (this.props.createRequest.loading && nextProps.createRequest.error) {
      this.onAddGroupError(nextProps.createRequest.error);
    }
  }

  getUserFromProps(value) {
    return find(this.props.users, ['@id', value]);
  }

  getGroupFromProps(value) {
    return find(this.props.groups, ['@id', value]);
  }
  /**
   * Search handler
   * @method onSearch
   * @param {object} event Event object.
   * @returns {undefined}
   */
  onSearch(event) {
    event.preventDefault();
    this.props.listUsers(this.state.search);
  }

  onSearchGroups(event) {
    event.preventDefault();
    this.props.listGroups(this.state.search);
  }

  /**
   * On change search handler
   * @method onChangeSearch
   * @param {object} event Event object.
   * @returns {undefined}
   */
  onChangeSearch(event) {
    this.setState({
      search: event.target.value,
    });
  }

  /**
   * Delete a user
   * @method delete
   * @param {object} event Event object.
   * @param {string} value username.
   * @returns {undefined}
   */
  delete(event, { value }) {
    if (value) {
      this.setState({
        showDelete: true,
        userToDelete: this.getUserFromProps(value),
      });
    }
  }

  deleteGroup(event, { value }) {
    if (value) {
      this.setState({
        showDelete: true,
        groupToDelete: this.getGroupFromProps(value),
      });
    }
  }

  /**
   * On delete ok
   * @method onDeleteOk
   * @returns {undefined}
   */
  onDeleteOk() {
    this.props.deleteUser(this.state.userToDelete.id);
    this.setState({
      showDelete: false,
      userToDelete: undefined,
    });
  }

  /**
   * On delete cancel
   * @method onDeleteCancel
   * @returns {undefined}
   */
  onDeleteCancel() {
    this.setState({
      showDelete: false,
      itemsToDelete: [],
    });
  }

  /**
   * Callback to be called by the ModalForm when the form is submitted.
   *
   * @param {object} data Form data from the ModalForm.
   * @param {func} callback to set new form data in the ModalForm
   * @returns {undefined}
   */
  onAddUserSubmit(data, callback) {
    this.props.createUser(data);
    this.setState({
      addUserSetFormDataCallback: callback,
    });
  }

  onAddGroupSubmit(data, callback) {
    this.props.createGroup(data);
    this.setState({
      addGroupSetFormDataCallback: callback,
    });
  }

  /**
   * Handle Errors after createUser()
   *
   * @param {object} error orbject. Requires the property .message
   * @returns {undefined}
   */
  onAddUserError(error) {
    this.setState({
      addUserError: error.message,
    });
  }

  onAddGroupError(error) {
    this.setState({
      addGroupError: error.message,
    });
  }

  /**
   * Handle Success after createUser()
   *
   * @returns {undefined}
   */
  onAddUserSuccess() {
    this.state.addUserSetFormDataCallback({});
    this.setState({
      showAddUser: false,
      addUserError: undefined,
      addUserSetFormDataCallback: undefined,
    });
  }

  onAddGroupSuccess() {
    this.state.addGroupSetFormDataCallback({});
    this.setState({
      showAddGroup: false,
      addGroupError: undefined,
      addGroupSetFormDataCallback: undefined,
    });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    let usernameToDelete = this.state.userToDelete
      ? this.state.userToDelete.username
      : '';
    let fullnameToDelete = this.state.userToDelete
      ? this.state.userToDelete.fullname
      : '';
    return (
      <div id="page-users">
        <Button
          content={this.props.intl.formatMessage(messages.addUserButtonTitle)}
          onClick={() => {
            this.setState({ showAddUser: true });
          }}
        />
        <Button
          content={this.props.intl.formatMessage(messages.addGroupsButtonTitle)}
          onClick={() => {
            this.setState({ showAddGroup: true });
          }}
        />
        <Helmet title="Users and Groups" />
        <div className="container">
          <Confirm
            open={this.state.showDelete}
            header={
              this.getGroupFromProps()
                ? this.props.intl.formatMessage(
                    messages.deleteGroupConfirmTitle,
                  )
                : this.props.intl.formatMessage(messages.deleteUserConfirmTitle)
            }
            content={
              <div className="content">
                <ul className="content">
                  <FormattedMessage
                    id="Do you really want to delete the user {username} ({fullname})?"
                    defaultMessage="Do you really want to delete the user {username} ({fullname})?"
                    values={{
                      username: <b>{usernameToDelete}</b>,
                      fullname: <b>{fullnameToDelete}</b>,
                    }}
                  />
                </ul>
              </div>
            }
            onCancel={this.onDeleteCancel}
            onConfirm={this.onDeleteOk}
          />
          <ModalForm
            style={{
              width: '50%',
              height: '50%',
              overflow: 'auto',
              margin: 'auto',
              position: 'relative',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
            open={this.state.showAddUser}
            onSubmit={this.onAddUserSubmit}
            submitError={this.state.addUserError}
            onCancel={() => this.setState({ showAddUser: false })}
            title={this.props.intl.formatMessage(messages.addUserFormTitle)}
            loading={this.props.createRequest.loading}
            schema={{
              fieldsets: [
                {
                  id: 'default',
                  title: 'FIXME: User Data',
                  fields: [
                    'username',
                    'fullname',
                    'email',
                    'password',
                    'roles',
                  ],
                },
              ],
              properties: {
                username: {
                  title: this.props.intl.formatMessage(
                    messages.addUserFormUsernameTitle,
                  ),
                  type: 'string',
                  description: '',
                },
                fullname: {
                  title: this.props.intl.formatMessage(
                    messages.addUserFormFullnameTitle,
                  ),
                  type: 'string',
                  description: '',
                },
                email: {
                  title: this.props.intl.formatMessage(
                    messages.addUserFormEmailTitle,
                  ),
                  type: 'string',
                  description: '',
                },
                password: {
                  title: this.props.intl.formatMessage(
                    messages.addUserFormPasswordTitle,
                  ),
                  type: 'string',
                  description: '',
                },
                roles: {
                  title: this.props.intl.formatMessage(
                    messages.addUserFormRolesTitle,
                  ),
                  type: 'array',
                  items: {
                    choices: this.props.roles.map(role => [role.id, role.id]),
                  },
                  description: '',
                },
              },
              required: ['username', 'fullname', 'email', 'password'],
            }}
          />
          <ModalForm
            style={{
              width: '50%',
              height: '50%',
              overflow: 'auto',
              margin: 'auto',
              position: 'relative',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
            open={this.state.showAddGroup}
            onSubmit={this.onAddGroupSubmit}
            submitError={this.state.addGroupError}
            onCancel={() => this.setState({ showAddGroup: false })}
            title={this.props.intl.formatMessage(messages.addGroupsFormTitle)}
            loading={this.props.createGroupRequest.loading}
            schema={{
              fieldsets: [
                {
                  id: 'default',
                  title: 'FIXME: Group Data',
                  fields: ['Title', 'Description', 'groupname', 'email'],
                },
              ],
              properties: {
                Title: {
                  title: this.props.intl.formatMessage(
                    messages.addGroupsFormTitleTitle,
                  ),
                  type: 'string',
                  description: '',
                },
                Description: {
                  title: this.props.intl.formatMessage(
                    messages.addGroupsFormDescriptionTitle,
                  ),
                  type: 'string',
                  description: '',
                },
                groupname: {
                  title: 'groupname',
                  type: 'string',
                  description: '',
                },
                email: {
                  title: this.props.intl.formatMessage(
                    messages.addGroupsFormEmailTitle,
                  ),
                  type: 'string',
                  description: '',
                },
                roles: {
                  title: this.props.intl.formatMessage(
                    messages.addGroupsFormRolesTitle,
                  ),
                  type: 'array',
                  items: {
                    choices: this.props.roles.map(role => [role.id, role.id]),
                  },
                  description: '',
                },
              },
              required: ['Title', 'description', 'groupname', 'email'],
            }}
          />
        </div>
        <Segment.Group raised>
          <Segment className="primary">
            <FormattedMessage
              id="Users and groups settings"
              defaultMessage="Users and groups settings"
            />
          </Segment>
          <Segment secondary>
            <FormattedMessage id="Users" defaultMessage="Users" />
          </Segment>
          <Segment>
            <Form onSubmit={this.onSearch}>
              <Form.Field>
                <Input
                  name="SearchableText"
                  action={{ icon: 'search' }}
                  placeholder={this.props.intl.formatMessage(
                    messages.searchUsers,
                  )}
                  onChange={this.onChangeSearch}
                />
              </Form.Field>
            </Form>
          </Segment>
          <Segment secondary>
            <FormattedMessage id="Groups" defaultMessage="Groups" />
          </Segment>
          <Segment>
            <Form onSubmit={this.onSearchGroups}>
              <Form.Field>
                <Input
                  name="SearchableText"
                  action={{ icon: 'search' }}
                  placeholder={this.props.intl.formatMessage(
                    messages.searchGroups,
                  )}
                  onChange={this.onChangeSearch}
                />
              </Form.Field>
            </Form>
          </Segment>
          <Form onSubmit={this.onSubmit}>
            <Table padded striped attached>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    <FormattedMessage
                      id="User name"
                      defaultMessage="User name"
                    />
                  </Table.HeaderCell>
                  {this.props.roles.map(role => (
                    <Table.HeaderCell key={role.id}>{role.id}</Table.HeaderCell>
                  ))}
                  <Table.HeaderCell>
                    <FormattedMessage id="Actions" defaultMessage="Actions" />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.props.users.map(user => (
                  <UsersControlpanelUser
                    key={user.id}
                    onDelete={this.delete}
                    roles={this.props.roles}
                    user={user}
                  />
                ))}
                {this.props.groups.map(groups => (
                  <UsersControlpanelGroups
                    key={groups.id}
                    user={this.props.users}
                    onDelete={this.deleteGroup}
                    roles={this.props.roles}
                    groups={groups}
                  />
                ))}
              </Table.Body>
            </Table>
          </Form>
        </Segment.Group>
        <Portal node={__CLIENT__ && document.getElementById('toolbar')}>
          <Toolbar
            pathname={this.props.pathname}
            inner={
              <Link to={`${getBaseUrl(this.props.pathname)}`} className="item">
                <Icon
                  name="arrow left"
                  size="big"
                  color="blue"
                  title={this.props.intl.formatMessage(messages.back)}
                />
              </Link>
            }
          />
        </Portal>
      </div>
    );
  }
}
