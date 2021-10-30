/**
 * Users controlpanel container.
 * @module components/manage/Controlpanels/UsersControlpanel
 */
import {
  createUser,
  deleteUser,
  listRoles,
  listGroups,
  listUsers,
  updateUser,
  updateGroup,
} from '@plone/volto/actions';
import {
  Icon,
  ModalForm,
  Toast,
  Toolbar,
  RenderUsers,
  Pagination,
  Error,
} from '@plone/volto/components';
import { Link } from 'react-router-dom';
import { Helmet, messages } from '@plone/volto/helpers';
import { includes, map, pull, difference } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Portal } from 'react-portal';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { bindActionCreators, compose } from 'redux';
import {
  Confirm,
  Container,
  Input,
  Button,
  Menu,
  Popup,
  Segment,
  Table,
} from 'semantic-ui-react';
import checkboxUncheckedSVG from '@plone/volto/icons/checkbox-unchecked.svg';
import checkboxCheckedSVG from '@plone/volto/icons/checkbox-checked.svg';
import addUserSvg from '@plone/volto/icons/add-user.svg';
import saveSVG from '@plone/volto/icons/save.svg';
import groupSVG from '@plone/volto/icons/group.svg';
import deleteSVG from '@plone/volto/icons/delete.svg';
import zoomSVG from '@plone/volto/icons/zoom.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

/**
 * UsersControlpanel class.
 * @class UsersControlpanel
 * @extends Component
 */
class UsersControlpanel extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    listRoles: PropTypes.func.isRequired,
    listUsers: PropTypes.func.isRequired,
    updateUser: PropTypes.func,
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
      search: '',
      showAddUser: false,
      showAddUserErrorConfirm: false,
      addUserError: '',
      showDelete: false,
      entries: [],
      isClient: false,
      currentPage: 0,
      pageSize: 10,
      selected: [],
    };
  }

  fetchData = async () => {
    await this.props.listRoles();
    this.props.listGroups();
    await this.props.listUsers();
    this.setState({
      entries: this.props.users,
    });
  };
  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.setState({
      isClient: true,
    });
    this.fetchData();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      (this.props.deleteRequest.loading && nextProps.deleteRequest.loaded) ||
      (this.props.createRequest.loading && nextProps.createRequest.loaded)
    ) {
      this.props.listUsers(this.state.search);
    }
    if (this.props.createRequest.loading && nextProps.createRequest.loaded) {
      this.onAddUserSuccess();
    }
    if (this.props.createRequest.loading && nextProps.createRequest.error) {
      this.onAddUserError(nextProps.createRequest.error);
    }
    if (
      this.props.loadRolesRequest.loading &&
      nextProps.loadRolesRequest.error
    ) {
      this.setState({
        error: nextProps.loadRolesRequest.error,
      });
    }
  }

  /**
   * Search handler
   * @method onSearch
   * @param {object} event Event object.
   * @returns {undefined}
   */
  onSearch = (event) => {
    event.preventDefault();
    this.props.listUsers(this.state.search);
  };

  /**
   * On change search handler
   * @method onChangeSearch
   * @param {object} event Event object.
   * @returns {undefined}
   */
  onChangeSearch = (event) => {
    this.setState({
      search: event.target.value,
    });
  };

  /**
   *
   *
   * @param {*} event Event object.
   * @memberof UsersControlpanel
   * @returns {undefined}
   */
  onDeleteSelected = () => {
    this.setState({
      showDelete: true,
    });
  };

  /**
   * On delete ok
   * @method onDeleteOk
   * @returns {undefined}
   */
  onDeleteOk = () => {
    const { selected } = this.state;
    if (selected) {
      for (let i = 0; i < selected.length; i++) {
        this.props.deleteUser(selected[i]);
      }
    }
    this.setState({
      showDelete: false,
      selected: [],
    });
  };

  /**
   * On delete cancel
   * @method onDeleteCancel
   * @returns {undefined}
   */
  onDeleteCancel = () => {
    this.setState({
      showDelete: false,
    });
  };

  /**
   *@param {object} user
   *@returns {undefined}
   *@memberof UsersControlpanel
   */
  addUserToGroup = (user) => {
    const { groups, username } = user;
    groups.forEach((group) => {
      this.props.updateGroup(group, {
        users: {
          [username]: true,
        },
      });
    });
  };

  /**
   * Callback to be called by the ModalForm when the form is submitted.
   *
   * @param {object} data Form data from the ModalForm.
   * @param {func} callback to set new form data in the ModalForm
   * @returns {undefined}
   */
  onAddUserSubmit = (data, callback) => {
    const { groups } = data;
    if (groups && groups.length > 0) this.addUserToGroup(data);
    this.props.createUser(data);
    this.setState({
      addUserSetFormDataCallback: callback,
    });
  };

  /**
   * Handle Success after createUser()
   *
   * @returns {undefined}
   */
  onAddUserSuccess = () => {
    this.state.addUserSetFormDataCallback({});
    this.setState({
      showAddUser: false,
      addUserError: undefined,
      addUserSetFormDataCallback: undefined,
    });
    toast.success(
      <Toast
        success
        title={this.props.intl.formatMessage(messages.success)}
        content={this.props.intl.formatMessage(messages.userCreated)}
      />,
    );
  };

  /**
   *
   *
   * @param {*} data
   * @param {*} callback
   * @memberof UsersControlpanel
   */
  updateUserRole = (name, value) => {
    this.setState({
      entries: map(this.state.entries, (entry) => ({
        ...entry,
        roles:
          entry.id === name && !entry.roles.includes(value)
            ? [...entry.roles, value]
            : entry.id !== name
            ? entry.roles
            : pull(entry.roles, value),
      })),
    });
  };
  /**
   *
   * @param {*} event
   * @memberof UsersControlpanel
   */
  updateUserRoleSubmit = (e) => {
    e.stopPropagation();

    const roles = this.props.roles.map((item) => item.id);
    this.state.entries.forEach((item) => {
      const userData = { roles: {} };
      const removedRoles = difference(roles, item.roles);

      removedRoles.forEach((role) => {
        userData.roles[role] = false;
      });
      item.roles.forEach((role) => {
        userData.roles[role] = true;
      });
      this.props.updateUser(item.id, userData);
    });
    toast.success(
      <Toast
        success
        title={this.props.intl.formatMessage(messages.success)}
        content={this.props.intl.formatMessage(messages.updateRoles)}
      />,
    );
  };

  /**
   * Handle Errors after createUser()
   *
   * @param {object} error object. Requires the property .message
   * @returns {undefined}
   */
  onAddUserError = (error) => {
    this.setState({
      addUserError: error.response.body.error.message,
    });
  };

  /**
   * On change page
   * @method onChangePage
   * @param {object} event Event object.
   * @param {string} value Page value.
   * @returns {undefined}
   */
  onChangePage = (event, { value }) => {
    this.setState({
      currentPage: value,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.users !== prevProps.users) {
      this.setState({
        entries: this.props.users,
      });
    }
  }

  /**
   * On select all handler
   * @method onSelectAll
   * @returns {undefined}
   */
  onSelectAll = () => {
    const { entries } = this.state;
    this.setState((prevState) => ({
      selected:
        prevState.selected.length === entries.length
          ? []
          : map(entries, (item) => item.id),
    }));
  };

  /**
   * On select single user handler
   * @method onChangeSelect
   * @returns {undefined}
   */
  onChangeSelect = (id) => {
    this.setState((prevState) => ({
      selected: !includes(prevState.selected, id)
        ? [...prevState.selected, id]
        : pull(prevState.selected, id),
    }));
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (this.state.error) {
      return <Error error={this.state.error} />;
    }
    /*let fullnameToDelete = this.state.userToDelete
        ? this.state.userToDelete.fullname
        : '';*/

    const isSelectedAll =
      this.state.selected.length === this.state.entries.length;

    return (
      <Container className="users-control-panel">
        <Helmet title={this.props.intl.formatMessage(messages.users)} />
        <div className="container">
          <Confirm
            open={this.state.showDelete}
            header={this.props.intl.formatMessage(
              messages.deleteUserConfirmTitle,
            )}
            content={
              <div className="content">
                <FormattedMessage
                  id="Do you really want to delete the following users?"
                  defaultMessage="Do you really want to delete the following users?"
                />
                <ul className="content">
                  {map(this.state.selected, (item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            }
            onCancel={this.onDeleteCancel}
            onConfirm={this.onDeleteOk}
            size={null}
          />
          {this.state.showAddUser ? (
            <ModalForm
              open={this.state.showAddUser}
              className="modal"
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
                      'groups',
                    ],
                  },
                ],
                properties: {
                  username: {
                    title: this.props.intl.formatMessage(
                      messages.addUserFormUsernameTitle,
                    ),
                    type: 'string',
                    description:
                      'Enter a user name, usually something like "jsmith". No spaces or special characters. Usernames and passwords are case sensitive, make sure the caps lock key is not enabled. This is the name used to log in.',
                  },
                  fullname: {
                    title: this.props.intl.formatMessage(
                      messages.addUserFormFullnameTitle,
                    ),
                    type: 'string',
                    description: 'Enter full name, e.g. John Smith.',
                  },
                  email: {
                    title: this.props.intl.formatMessage(
                      messages.addUserFormEmailTitle,
                    ),
                    type: 'string',
                    description:
                      'Enter an email address. This is necessary in case the password is lost. We respect your privacy, and will not give the address away to any third parties or expose it anywhere.',
                    widget: 'email',
                  },
                  password: {
                    title: this.props.intl.formatMessage(
                      messages.addUserFormPasswordTitle,
                    ),
                    type: 'password',
                    description:
                      'Enter your new password. Minimum 5 characters.',
                    widget: 'password',
                  },
                  roles: {
                    title: this.props.intl.formatMessage(
                      messages.addUserFormRolesTitle,
                    ),
                    type: 'array',
                    choices: this.props.roles.map((role) => [role.id, role.id]),
                    noValueOption: false,
                    description: '',
                  },
                  groups: {
                    title: this.props.intl.formatMessage(
                      messages.addUserGroupNameTitle,
                    ),
                    type: 'array',
                    choices: this.props.groups.map((group) => [
                      group.id,
                      group.id,
                    ]),
                    noValueOption: false,
                    description: '',
                  },
                },
                required: ['username', 'fullname', 'email', 'password'],
              }}
            />
          ) : null}
        </div>
        <Segment.Group raised>
          <Segment className="primary">
            <FormattedMessage id="Users" defaultMessage="Users" />
          </Segment>
          <Segment secondary>
            <FormattedMessage
              id="Note that roles set here apply directly to a user. The symbol{plone_svg}indicates a role inherited from membership in a group."
              defaultMessage="Note that roles set here apply directly to a user. The symbol{plone_svg}indicates a role inherited from membership in a group."
              values={{
                plone_svg: (
                  <Icon
                    name={groupSVG}
                    size="20px"
                    color="#007EB1"
                    title={'plone-svg'}
                  />
                ),
              }}
            />
          </Segment>
          <Segment>
            <Menu secondary attached>
              <Menu.Item position="left">
                <Input
                  transparent
                  name="SearchableText"
                  placeholder={this.props.intl.formatMessage(
                    messages.searchUsers,
                  )}
                  size="large"
                  onChange={this.onChangeSearch}
                  id="user-search-input"
                />
                <Icon
                  name={zoomSVG}
                  size="30px"
                  color="#007eb1"
                  onClick={this.onSearch}
                  className="zoom"
                />
              </Menu.Item>
              <Popup
                trigger={
                  <Menu.Item
                    icon
                    as={Button}
                    onClick={this.onDeleteSelected}
                    disabled={!this.state.selected.length > 0}
                  >
                    <Icon
                      name={deleteSVG}
                      size="24px"
                      color={
                        this.state.selected.length > 0 ? '#e40166' : 'grey'
                      }
                      className="delete"
                    />
                  </Menu.Item>
                }
                position="top center"
                content={this.props.intl.formatMessage(messages.delete)}
                size="mini"
              />
            </Menu>
          </Segment>

          <div className="table">
            <Table padded striped attached unstackable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    <Icon
                      name={
                        isSelectedAll
                          ? checkboxCheckedSVG
                          : checkboxUncheckedSVG
                      }
                      onClick={this.onSelectAll}
                      color={isSelectedAll ? '#007eb1' : '#826a6a'}
                      size="24px"
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <FormattedMessage
                      id="User name"
                      defaultMessage="User name"
                    />
                  </Table.HeaderCell>
                  {this.props.roles.map((role) => (
                    <Table.HeaderCell key={role.id}>{role.id}</Table.HeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body data-user="users">
                {this.state.entries
                  .slice(
                    this.state.currentPage * 10,
                    this.state.pageSize * (this.state.currentPage + 1),
                  )
                  .map((user) => (
                    <RenderUsers
                      key={user.id}
                      selected={this.state.selected}
                      onChangeSelect={this.onChangeSelect}
                      roles={this.props.roles}
                      user={user}
                      updateUser={this.updateUserRole}
                      inheritedRole={this.props.inheritedRole}
                    />
                  ))}
              </Table.Body>
            </Table>
          </div>
          <div className="contents-pagination">
            <Pagination
              current={this.state.currentPage}
              total={Math.ceil(
                this.state.entries?.length / this.state.pageSize,
              )}
              onChangePage={this.onChangePage}
            />
          </div>
        </Segment.Group>
        {this.state.isClient && (
          <Portal node={document.getElementById('toolbar')}>
            <Toolbar
              pathname={this.props.pathname}
              hideDefaultViewButtons
              inner={
                <>
                  <Button
                    id="toolbar-save"
                    className="save"
                    aria-label={this.props.intl.formatMessage(messages.save)}
                    onClick={this.updateUserRoleSubmit}
                    loading={this.props.createRequest.loading}
                  >
                    <Icon
                      name={saveSVG}
                      className="circled"
                      size="30px"
                      title={this.props.intl.formatMessage(messages.save)}
                    />
                  </Button>
                  <Link to="/controlpanel" className="cancel">
                    <Icon
                      name={clearSVG}
                      className="circled"
                      aria-label={this.props.intl.formatMessage(
                        messages.cancel,
                      )}
                      size="30px"
                      title={this.props.intl.formatMessage(messages.cancel)}
                    />
                  </Link>
                  <Button
                    id="toolbar-add"
                    aria-label={this.props.intl.formatMessage(
                      messages.addUserButtonTitle,
                    )}
                    onClick={() => {
                      this.setState({ showAddUser: true });
                    }}
                    loading={this.props.createRequest.loading}
                  >
                    <Icon
                      name={addUserSvg}
                      size="45px"
                      color="#826A6A"
                      title={this.props.intl.formatMessage(
                        messages.addUserButtonTitle,
                      )}
                    />
                  </Button>
                </>
              }
            />
          </Portal>
        )}
      </Container>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      roles: state.roles.roles,
      users: state.users.users,
      groups: state.groups.groups,
      description: state.description,
      pathname: props.location.pathname,
      deleteRequest: state.users.delete,
      createRequest: state.users.create,
      loadRolesRequest: state.roles,
      inheritedRole: state.authRole.authenticatedRole,
    }),
    (dispatch) =>
      bindActionCreators(
        {
          listRoles,
          listUsers,
          listGroups,
          deleteUser,
          createUser,
          updateUser,
          updateGroup,
        },
        dispatch,
      ),
  ),
)(UsersControlpanel);
