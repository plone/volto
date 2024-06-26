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
  getControlpanel,
  updateUser,
  updateGroup,
  getUserSchema,
  getUser,
} from '@plone/volto/actions';
import jwtDecode from 'jwt-decode';
import {
  Icon,
  Toast,
  Toolbar,
  Pagination,
  Error,
} from '@plone/volto/components';
import { ModalForm } from '@plone/volto/components/manage/Form';
import RenderUsers from '@plone/volto/components/manage/Controlpanels/Users/RenderUsers';
import { Link } from 'react-router-dom';
import {
  Helmet,
  messages,
  isManager,
  canAssignGroup,
} from '@plone/volto/helpers';
import clearSVG from '@plone/volto/icons/clear.svg';
import addUserSvg from '@plone/volto/icons/add-user.svg';
import saveSVG from '@plone/volto/icons/save.svg';
import ploneSVG from '@plone/volto/icons/plone.svg';
import { find, map, pull, difference } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createPortal } from 'react-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { bindActionCreators, compose } from 'redux';
import {
  Confirm,
  Container,
  Form,
  Input,
  Button,
  Segment,
  Table,
} from 'semantic-ui-react';

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
    user: PropTypes.shape({
      '@id': PropTypes.string,
      id: PropTypes.string,
      description: PropTypes.string,
      email: PropTypes.string,
      fullname: PropTypes.string,
      groups: PropTypes.object,
      location: PropTypes.string,
      portrait: PropTypes.string,
      home_page: PropTypes.string,
      roles: PropTypes.arrayOf(PropTypes.string),
      username: PropTypes.string,
    }).isRequired,
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
    this.delete = this.delete.bind(this);

    this.onDeleteOk = this.onDeleteOk.bind(this);
    this.onDeleteCancel = this.onDeleteCancel.bind(this);
    this.onAddUserSubmit = this.onAddUserSubmit.bind(this);
    this.onAddUserError = this.onAddUserError.bind(this);
    this.onAddUserSuccess = this.onAddUserSuccess.bind(this);
    this.updateUserRole = this.updateUserRole.bind(this);
    this.state = {
      search: '',
      isLoading: false,
      showAddUser: false,
      showAddUserErrorConfirm: false,
      addUserError: '',
      showDelete: false,
      userToDelete: undefined,
      entries: [],
      isClient: false,
      currentPage: 0,
      pageSize: 10,
      loginUsingEmail: false,
    };
  }

  fetchData = async () => {
    await this.props.getControlpanel('usergroup');
    await this.props.listRoles();
    if (!this.props.many_users) {
      this.props.listGroups();
      await this.props.listUsers();
      this.setState({
        entries: this.props.users,
      });
    }
    await this.props.getUserSchema();
    await this.props.getUser(this.props.userId);
  };

  // Because username field needs to be disabled if email login is enabled!
  checkLoginUsingEmailStatus = async () => {
    await this.props.getControlpanel('security');
    this.setState({
      loginUsingEmail: this.props.controlPanelData?.data.use_email_as_login,
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
    this.checkLoginUsingEmailStatus();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      (this.props.deleteRequest.loading && nextProps.deleteRequest.loaded) ||
      (this.props.createRequest.loading && nextProps.createRequest.loaded)
    ) {
      this.props.listUsers({
        search: this.state.search,
      });
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

  getUserFromProps(value) {
    return find(this.props.users, ['@id', value]);
  }

  /**
   * Search handler
   * @method onSearch
   * @param {object} event Event object.
   * @returns {undefined}
   */
  onSearch(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    this.props
      .listUsers({
        search: this.state.search,
      })
      .then(() => {
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        // eslint-disable-next-line no-console
        console.error('Error searching users', error);
      });
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

  /**
   * On delete ok
   * @method onDeleteOk
   * @returns {undefined}
   */
  onDeleteOk() {
    if (this.state.userToDelete) {
      this.props.deleteUser(this.state.userToDelete.id);
      toast.success(
        <Toast
          success
          title={this.props.intl.formatMessage(messages.success)}
          content={this.props.intl.formatMessage(messages.userDeleted)}
        />,
      );
      this.setState({
        showDelete: false,
        userToDelete: undefined,
      });
    }
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
      userToDelete: undefined,
    });
  }

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
  onAddUserSubmit(data, callback) {
    const { groups, sendPasswordReset, password } = data;
    if (
      sendPasswordReset !== undefined &&
      sendPasswordReset === true &&
      password !== undefined
    ) {
      toast.error(
        <Toast
          error
          title={this.props.intl.formatMessage(messages.error)}
          content={this.props.intl.formatMessage(
            messages.addUserFormPasswordAndSendPasswordTogetherNotAllowed,
          )}
        />,
      );
    } else {
      if (groups && groups.length > 0) this.addUserToGroup(data);
      this.props.createUser(data, sendPasswordReset);
      this.setState({
        addUserSetFormDataCallback: callback,
      });
    }
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
    toast.success(
      <Toast
        success
        title={this.props.intl.formatMessage(messages.success)}
        content={this.props.intl.formatMessage(messages.userCreated)}
      />,
    );
  }

  /**
   *
   *
   * @param {*} data
   * @param {*} callback
   * @memberof UsersControlpanel
   */
  updateUserRole(name, value) {
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
  }
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
  onAddUserError(error) {
    this.setState({
      addUserError: error.response.body.error.message,
    });
  }

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
   * Filters the roles a user can assign when adding a user.
   * @method canAssignAdd
   * @returns {arry}
   */
  canAssignAdd(isManager) {
    if (isManager) return this.props.roles;
    return this.props.user?.roles
      ? this.props.roles.filter((role) =>
          this.props.user.roles.includes(role.id),
        )
      : [];
  }

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
    let usernameToDelete = this.state.userToDelete
      ? this.state.userToDelete.username
      : '';
    // Copy the userschema using JSON serialization/deserialization
    // this is really ugly, but if we don't do this the original value
    // of the userschema is changed and it is used like that through
    // the lifecycle of the application
    let adduserschema = {};
    let isUserManager = false;
    if (this.props?.userschema?.loaded) {
      isUserManager = isManager(this.props.user);
      adduserschema = JSON.parse(
        JSON.stringify(this.props?.userschema?.userschema),
      );
      adduserschema.properties['username'] = {
        title: this.props.intl.formatMessage(messages.addUserFormUsernameTitle),
        type: 'string',
        description: this.props.intl.formatMessage(
          messages.addUserFormUsernameDescription,
        ),
      };
      adduserschema.properties['password'] = {
        title: this.props.intl.formatMessage(messages.addUserFormPasswordTitle),
        type: 'password',
        description: this.props.intl.formatMessage(
          messages.addUserFormPasswordDescription,
        ),
        widget: 'password',
      };
      adduserschema.properties['sendPasswordReset'] = {
        title: this.props.intl.formatMessage(
          messages.addUserFormSendPasswordResetTitle,
        ),
        type: 'boolean',
      };
      adduserschema.properties['roles'] = {
        title: this.props.intl.formatMessage(messages.addUserFormRolesTitle),
        type: 'array',
        choices: this.canAssignAdd(isUserManager).map((role) => [
          role.id,
          role.title,
        ]),
        noValueOption: false,
      };
      adduserschema.properties['groups'] = {
        title: this.props.intl.formatMessage(messages.addUserGroupNameTitle),
        type: 'array',
        choices: this.props.groups
          .filter((group) => canAssignGroup(isUserManager, group))
          .map((group) => [group.id, group.id]),
        noValueOption: false,
      };
      if (
        adduserschema.fieldsets &&
        adduserschema.fieldsets.length > 0 &&
        !adduserschema.fieldsets[0]['fields'].includes('username')
      ) {
        adduserschema.fieldsets[0]['fields'] = adduserschema.fieldsets[0][
          'fields'
        ].concat([
          'username',
          'password',
          'sendPasswordReset',
          'roles',
          'groups',
        ]);
      }
    }

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
                <ul className="content">
                  <FormattedMessage
                    id="Do you really want to delete the user {username}?"
                    defaultMessage="Do you really want to delete the user {username}?"
                    values={{
                      username: <b>{usernameToDelete}</b>,
                    }}
                  />
                </ul>
              </div>
            }
            onCancel={this.onDeleteCancel}
            onConfirm={this.onDeleteOk}
            size={null}
          />
          {this.props?.userschema?.loaded && this.state.showAddUser ? (
            <ModalForm
              open={this.state.showAddUser}
              className="modal"
              onSubmit={this.onAddUserSubmit}
              submitError={this.state.addUserError}
              onCancel={() =>
                this.setState({ showAddUser: false, addUserError: undefined })
              }
              title={this.props.intl.formatMessage(messages.addUserFormTitle)}
              loading={this.props.createRequest.loading}
              schema={adduserschema}
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
                    name={ploneSVG}
                    size="20px"
                    color="#007EB1"
                    title={'plone-svg'}
                  />
                ),
              }}
            />
          </Segment>
          <Segment>
            <Form onSubmit={this.onSearch}>
              <Form.Field>
                <Input
                  name="SearchableText"
                  action={{
                    icon: 'search',
                    loading: this.state.isLoading,
                    disabled: this.state.isLoading,
                  }}
                  placeholder={this.props.intl.formatMessage(
                    messages.searchUsers,
                  )}
                  onChange={this.onChangeSearch}
                  id="user-search-input"
                />
              </Form.Field>
            </Form>
          </Segment>
          <Form>
            {((this.props.many_users && this.state.entries.length > 0) ||
              !this.props.many_users) && (
              <Table padded striped attached unstackable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>
                      <FormattedMessage
                        id="User name"
                        defaultMessage="User name"
                      />
                    </Table.HeaderCell>
                    {this.props.roles.map((role) => (
                      <Table.HeaderCell key={role.id}>
                        {role.title}
                      </Table.HeaderCell>
                    ))}
                    <Table.HeaderCell>
                      <FormattedMessage id="Actions" defaultMessage="Actions" />
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body data-user="users">
                  {this.state.entries
                    .slice(
                      this.state.currentPage * 10,
                      this.state.pageSize * (this.state.currentPage + 1),
                    )
                    .map((user) => {
                      return (
                        <RenderUsers
                          key={user.id}
                          onDelete={this.delete}
                          loading={this.state.userToDelete === user}
                          roles={this.props.roles}
                          user={user}
                          updateUser={this.updateUserRole}
                          inheritedRole={this.props.inheritedRole}
                          userschema={this.props.userschema}
                          listUsers={this.props.listUsers}
                          isUserManager={isUserManager}
                        />
                      );
                    })}
                </Table.Body>
              </Table>
            )}
            {this.state.entries.length === 0 && this.state.search && (
              <Segment>
                {this.props.intl.formatMessage(messages.userSearchNoResults)}
              </Segment>
            )}
            <div className="contents-pagination">
              <Pagination
                current={this.state.currentPage}
                total={Math.ceil(
                  this.state.entries?.length / this.state.pageSize,
                )}
                onChangePage={this.onChangePage}
              />
            </div>
          </Form>
        </Segment.Group>
        {this.state.isClient &&
          createPortal(
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
            />,
            document.getElementById('toolbar'),
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
      user: state.users.user,
      userId: state.userSession.token
        ? jwtDecode(state.userSession.token).sub
        : '',
      groups: state.groups.groups,
      many_users: state.controlpanels?.controlpanel?.data?.many_users,
      many_groups: state.controlpanels?.controlpanel?.data?.many_groups,
      description: state.description,
      pathname: props.location.pathname,
      deleteRequest: state.users.delete,
      createRequest: state.users.create,
      loadRolesRequest: state.roles,
      inheritedRole: state.authRole.authenticatedRole,
      userschema: state.userschema,
      controlPanelData: state.controlpanels?.controlpanel,
    }),
    (dispatch) =>
      bindActionCreators(
        {
          listRoles,
          listUsers,
          listGroups,
          getControlpanel,
          deleteUser,
          createUser,
          updateUser,
          updateGroup,
          getUserSchema,
          getUser,
        },
        dispatch,
      ),
  ),
)(UsersControlpanel);
