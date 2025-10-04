/**
 * Users controlpanel container.
 * @module components/manage/Controlpanels/UsersControlpanel
 */
import {
  createUser,
  deleteUser,
  listUsers,
  updateUser,
  getUser,
} from '@plone/volto/actions/users/users';
import { listRoles } from '@plone/volto/actions/roles/roles';
import { listGroups, updateGroup } from '@plone/volto/actions/groups/groups';
import { getControlpanel } from '@plone/volto/actions/controlpanels/controlpanels';
import { getUserSchema } from '@plone/volto/actions/userschema/userschema';
import jwtDecode from 'jwt-decode';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import Toast from '@plone/volto/components/manage/Toast/Toast';
import Toolbar from '@plone/volto/components/manage/Toolbar/Toolbar';
import Pagination from '@plone/volto/components/theme/Pagination/Pagination';
import Error from '@plone/volto/components/theme/Error/Error';
import { ModalForm } from '@plone/volto/components/manage/Form';
import RenderUsers from '@plone/volto/components/manage/Controlpanels/Users/RenderUsers';
import { Link } from 'react-router-dom';
import Helmet from '@plone/volto/helpers/Helmet/Helmet';
import { messages } from '@plone/volto/helpers/MessageLabels/MessageLabels';
import { isManager, canAssignGroup } from '@plone/volto/helpers/User/User';
import clearSVG from '@plone/volto/icons/clear.svg';
import addUserSvg from '@plone/volto/icons/add-user.svg';
import saveSVG from '@plone/volto/icons/save.svg';
import ploneSVG from '@plone/volto/icons/plone.svg';
import find from 'lodash/find';
import map from 'lodash/map';
import pull from 'lodash/pull';
import difference from 'lodash/difference';

import { useState, useEffect, useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Confirm,
  Container,
  Form,
  Input,
  Button,
  Dimmer,
  Segment,
  Table,
  Loader,
} from 'semantic-ui-react';

/**
 * UsersControlpanel functional component.
 * @function UsersControlpanel
 */
const UsersControlpanel = () => {
  const intl = useIntl();
  const dispatch = useDispatch();

  // Redux state selectors
  const roles = useSelector((state) => state.roles.roles);
  const users = useSelector((state) => state.users.users);
  const user = useSelector((state) => state.users.user);
  const userId = useSelector((state) =>
    state.userSession.token ? jwtDecode(state.userSession.token).sub : '',
  );
  const groups = useSelector((state) => state.groups.groups);
  const many_users = useSelector(
    (state) => state.controlpanels?.controlpanel?.data?.many_users,
  );

  const location = useLocation();
  const pathname = location.pathname;
  const deleteRequest = useSelector((state) => state.users.delete);
  const createRequest = useSelector((state) => state.users.create);
  const loadRolesRequest = useSelector((state) => state.roles);
  const inheritedRole = useSelector(
    (state) => state.authRole.authenticatedRole,
  );
  const userschema = useSelector((state) => state.userschema);
  const controlPanelData = useSelector(
    (state) => state.controlpanels?.controlpanel,
  );

  // Action creators
  const listRolesAction = useCallback(() => dispatch(listRoles()), [dispatch]);
  const listUsersAction = useCallback(
    (params) => dispatch(listUsers(params)),
    [dispatch],
  );
  const listGroupsAction = useCallback(
    () => dispatch(listGroups()),
    [dispatch],
  );
  const getControlpanelAction = useCallback(
    (panel) => dispatch(getControlpanel(panel)),
    [dispatch],
  );
  const deleteUserAction = useCallback(
    (userId) => dispatch(deleteUser(userId)),
    [dispatch],
  );
  const updateUserAction = useCallback(
    (userId, data) => dispatch(updateUser(userId, data)),
    [dispatch],
  );
  const updateGroupAction = useCallback(
    (groupId, data) => dispatch(updateGroup(groupId, data)),
    [dispatch],
  );
  const getUserSchemaAction = useCallback(
    () => dispatch(getUserSchema()),
    [dispatch],
  );
  const getUserAction = useCallback(
    (userId) => dispatch(getUser(userId)),
    [dispatch],
  );

  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [addUserError, setAddUserError] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState(undefined);
  const [entries, setEntries] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  // eslint-disable-next-line no-unused-vars
  const [loginUsingEmail, setLoginUsingEmail] = useState(false); // Reserved for future use to disable username field when email login is enabled
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    await getControlpanelAction('usergroup');
    await listRolesAction();
    if (!many_users) {
      listGroupsAction();
      await listUsersAction();
      setEntries(users);
    }
    await getUserSchemaAction();
    await getUserAction(userId);
  }, [
    getControlpanelAction,
    listRolesAction,
    many_users,
    listGroupsAction,
    listUsersAction,
    users,
    getUserSchemaAction,
    getUserAction,
    userId,
  ]);

  /**
   * Check login using email status from security control panel
   * @method checkLoginUsingEmailStatus
   * @returns {undefined}
   */
  const checkLoginUsingEmailStatus = useCallback(async () => {
    try {
      await getControlpanelAction('security');
      if (controlPanelData?.data?.use_email_as_login) {
        setLoginUsingEmail(controlPanelData.data.use_email_as_login);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching security control panel', error);
    }
  }, [getControlpanelAction, controlPanelData]);

  const getUserFromProps = useCallback(
    (value) => {
      return find(users, ['@id', value]);
    },
    [users],
  );

  /**
   * Search handler
   * @method onSearch
   * @param {object} event Event object.
   * @returns {undefined}
   */
  const onSearch = useCallback(
    (event) => {
      event.preventDefault();
      setIsLoading(true);
      listUsersAction({
        search: search,
      })
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          // eslint-disable-next-line no-console
          console.error('Error searching users', error);
        });
    },
    [listUsersAction, search],
  );

  /**
   * On change search handler
   * @method onChangeSearch
   * @param {object} event Event object.
   * @returns {undefined}
   */
  const onChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  /**
   * Handle delete user click
   * @method handleDeleteUser
   * @param {object} event Event object.
   * @param {string} value username.
   * @returns {undefined}
   */
  const handleDeleteUser = useCallback(
    (event, data) => {
      // Handle both formats: direct value from event target or object with value
      const value =
        data?.value || event?.target?.value || event?.currentTarget?.value;
      if (value) {
        setShowDelete(true);
        setUserToDelete(getUserFromProps(value));
      }
    },
    [getUserFromProps],
  );

  /**
   * On delete ok
   * @method onDeleteOk
   * @returns {undefined}
   */
  const onDeleteOk = useCallback(() => {
    if (userToDelete) {
      const deleteAction = deleteUserAction(userToDelete.id);
      if (deleteAction && typeof deleteAction.then === 'function') {
        deleteAction
          .then(() => {
            // Handle success
            setUserToDelete(undefined);
            setShowDelete(false);

            // Refresh users list
            listUsersAction({ search: search });

            // Show success message
            toast.success(
              <Toast
                success
                title={intl.formatMessage(messages.success)}
                content={intl.formatMessage(messages.userDeleted)}
              />,
            );
          })
          .catch((error) => {
            // Handle error
            // eslint-disable-next-line no-console
            console.error('Error deleting user', error);
          });
      }
    }
  }, [userToDelete, deleteUserAction, listUsersAction, search, intl]);

  /**
   * On delete cancel
   * @method onDeleteCancel
   * @returns {undefined}
   */
  const onDeleteCancel = () => {
    setShowDelete(false);
    setUserToDelete(undefined);
  };

  /**
   *@param {object} user
   *@returns {undefined}
   *@memberof UsersControlpanel
   */
  const addUserToGroup = useCallback(
    (user) => {
      const { groups: userGroups, username } = user;
      userGroups.forEach((group) => {
        updateGroupAction(group, {
          users: {
            [username]: true,
          },
        });
      });
    },
    [updateGroupAction],
  );

  /**
   * Callback to be called by the ModalForm when the form is submitted.
   *
   * @param {object} data Form data from the ModalForm.
   * @param {func} callback to set new form data in the ModalForm
   * @returns {undefined}
   */
  const onAddUserSubmit = useCallback(
    (data, callback) => {
      const { groups: userGroups, sendPasswordReset, password } = data;
      if (
        sendPasswordReset !== undefined &&
        sendPasswordReset === true &&
        password !== undefined
      ) {
        toast.error(
          <Toast
            error
            title={intl.formatMessage(messages.error)}
            content={intl.formatMessage(
              messages.addUserFormPasswordAndSendPasswordTogetherNotAllowed,
            )}
          />,
        );
      } else {
        if (userGroups && userGroups.length > 0) addUserToGroup(data);

        const createUserAction = createUser(data, sendPasswordReset);
        dispatch(createUserAction)
          .then(() => {
            // Handle success
            if (callback) {
              callback({});
            }
            setShowAddUser(false);
            setAddUserError(undefined);

            // Refresh users list
            listUsersAction({ search: search });

            // Show success message
            toast.success(
              <Toast
                success
                title={intl.formatMessage(messages.success)}
                content={intl.formatMessage(messages.userCreated)}
              />,
            );
          })
          .catch((error) => {
            // Handle error
            setAddUserError(
              error.response?.body?.error?.message || 'Error creating user',
            );
          });
      }
    },
    [intl, addUserToGroup, dispatch, search, listUsersAction],
  );

  /**
   * Update user role
   * @param {*} name
   * @param {*} value
   */
  const updateUserRole = useCallback(
    (name, value) => {
      setEntries(
        map(entries, (entry) => ({
          ...entry,
          roles:
            entry.id === name && !entry.roles.includes(value)
              ? [...entry.roles, value]
              : entry.id !== name
                ? entry.roles
                : pull(entry.roles, value),
        })),
      );
    },
    [entries],
  );

  /**
   * Update user role submit
   * @param {*} event
   */
  const updateUserRoleSubmit = useCallback(
    (e) => {
      e.stopPropagation();

      const roleIds = roles.map((item) => item.id);
      entries.forEach((item) => {
        const userData = { roles: {} };
        const removedRoles = difference(roleIds, item.roles);

        removedRoles.forEach((role) => {
          userData.roles[role] = false;
        });
        item.roles.forEach((role) => {
          userData.roles[role] = true;
        });
        updateUserAction(item.id, userData);
      });
      toast.success(
        <Toast
          success
          title={intl.formatMessage(messages.success)}
          content={intl.formatMessage(messages.updateRoles)}
        />,
      );
    },
    [roles, entries, updateUserAction, intl],
  );

  /**
   * Handle Errors after createUser()
   *
   * @param {object} error object. Requires the property .message
   * @returns {undefined}
   */
  const onAddUserError = useCallback((error) => {
    setAddUserError(error.response.body.error.message);
  }, []);

  /**
   * On change page
   * @method onChangePage
   * @param {object} event Event object.
   * @param {string} value Page value.
   * @returns {undefined}
   */
  const onChangePage = (event, { value }) => {
    setCurrentPage(value);
  };

  /**
   * Filters the roles a user can assign when adding a user.
   * @method canAssignAdd
   * @returns {arry}
   */
  const canAssignAdd = useCallback(
    (isManager) => {
      if (isManager) return roles;
      return user?.roles
        ? roles.filter((role) => user.roles.includes(role.id))
        : [];
    },
    [roles, user],
  );

  useEffect(() => {
    setIsClient(true);
    fetchData();
    checkLoginUsingEmailStatus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setEntries(users);
  }, [users]);

  useEffect(() => {
    if (createRequest?.error && !createRequest?.loading) {
      onAddUserError(createRequest.error);
    }
  }, [createRequest?.error, createRequest?.loading, onAddUserError]);

  useEffect(() => {
    if (loadRolesRequest?.error && !loadRolesRequest?.loading) {
      setError(loadRolesRequest.error);
    }
  }, [loadRolesRequest?.error, loadRolesRequest?.loading]);

  if (error) {
    return <Error error={error} />;
  }

  const usernameToDelete = userToDelete ? userToDelete.username : '';

  // Copy the userschema using JSON serialization/deserialization
  // this is really ugly, but if we don't do this the original value
  // of the userschema is changed and it is used like that through
  // the lifecycle of the application
  let adduserschema = {};
  let isUserManager = false;
  if (userschema?.loaded) {
    isUserManager = isManager(user);
    adduserschema = JSON.parse(JSON.stringify(userschema?.userschema));

    // Add custom form fields to the schema
    adduserschema.properties.username = {
      title: intl.formatMessage(messages.addUserFormUsernameTitle),
      type: 'string',
      description: intl.formatMessage(messages.addUserFormUsernameDescription),
    };

    adduserschema.properties.password = {
      title: intl.formatMessage(messages.addUserFormPasswordTitle),
      type: 'password',
      description: intl.formatMessage(messages.addUserFormPasswordDescription),
      widget: 'password',
    };

    adduserschema.properties.sendPasswordReset = {
      title: intl.formatMessage(messages.addUserFormSendPasswordResetTitle),
      type: 'boolean',
    };

    adduserschema.properties.roles = {
      title: intl.formatMessage(messages.addUserFormRolesTitle),
      type: 'array',
      choices: canAssignAdd(isUserManager).map((role) => [role.id, role.title]),
      noValueOption: false,
    };

    adduserschema.properties.groups = {
      title: intl.formatMessage(messages.addUserGroupNameTitle),
      type: 'array',
      choices: groups
        .filter((group) => canAssignGroup(isUserManager, group))
        .map((group) => [group.id, group.id]),
      noValueOption: false,
    };
    // Add custom fields to the first fieldset if they don't already exist
    if (
      adduserschema.fieldsets &&
      adduserschema.fieldsets.length > 0 &&
      !adduserschema.fieldsets[0].fields.includes('username')
    ) {
      adduserschema.fieldsets[0].fields =
        adduserschema.fieldsets[0].fields.concat([
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
      <Helmet title={intl.formatMessage(messages.users)} />
      <div className="container">
        <Confirm
          open={showDelete}
          header={intl.formatMessage(messages.deleteUserConfirmTitle)}
          content={
            <div className="content">
              <Dimmer active={deleteRequest?.loading}>
                <Loader>
                  <FormattedMessage id="Loading" defaultMessage="Loading." />
                </Loader>
              </Dimmer>

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
          onCancel={onDeleteCancel}
          onConfirm={onDeleteOk}
          size={null}
        />
        {userschema?.loaded && showAddUser ? (
          <ModalForm
            open={showAddUser}
            className="modal"
            onSubmit={onAddUserSubmit}
            submitError={addUserError}
            onCancel={() => {
              setShowAddUser(false);
              setAddUserError(undefined);
            }}
            title={intl.formatMessage(messages.addUserFormTitle)}
            loading={createRequest?.loading}
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
          <Form onSubmit={onSearch}>
            <Form.Field>
              <Input
                name="SearchableText"
                action={{
                  icon: 'search',
                  loading: isLoading,
                  disabled: isLoading,
                }}
                placeholder={intl.formatMessage(messages.searchUsers)}
                onChange={onChangeSearch}
                id="user-search-input"
              />
            </Form.Field>
          </Form>
        </Segment>
        <Form>
          {((many_users && entries.length > 0) || !many_users) && (
            <Table padded striped attached unstackable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    <FormattedMessage
                      id="User name"
                      defaultMessage="User name"
                    />
                  </Table.HeaderCell>
                  {roles.map((role) => (
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
                {entries
                  .slice(currentPage * 10, pageSize * (currentPage + 1))
                  .map((userItem) => (
                    <RenderUsers
                      key={userItem.id}
                      onDelete={handleDeleteUser}
                      roles={roles}
                      user={userItem}
                      updateUser={updateUserRole}
                      inheritedRole={inheritedRole}
                      userschema={userschema}
                      listUsers={listUsersAction}
                      isUserManager={isUserManager}
                    />
                  ))}
              </Table.Body>
            </Table>
          )}
          {entries.length === 0 && search && (
            <Segment>
              {intl.formatMessage(messages.userSearchNoResults)}
            </Segment>
          )}
          <div className="contents-pagination">
            <Pagination
              current={currentPage}
              total={Math.ceil(entries?.length / pageSize)}
              onChangePage={onChangePage}
            />
          </div>
        </Form>
      </Segment.Group>
      {isClient &&
        createPortal(
          <Toolbar
            pathname={pathname}
            hideDefaultViewButtons
            inner={
              <>
                <Button
                  id="toolbar-save"
                  className="save"
                  aria-label={intl.formatMessage(messages.save)}
                  onClick={updateUserRoleSubmit}
                  loading={createRequest?.loading}
                >
                  <Icon
                    name={saveSVG}
                    className="circled"
                    size="30px"
                    title={intl.formatMessage(messages.save)}
                  />
                </Button>
                <Link to="/controlpanel" className="cancel">
                  <Icon
                    name={clearSVG}
                    className="circled"
                    aria-label={intl.formatMessage(messages.cancel)}
                    size="30px"
                    title={intl.formatMessage(messages.cancel)}
                  />
                </Link>
                <Button
                  id="toolbar-add"
                  aria-label={intl.formatMessage(messages.addUserButtonTitle)}
                  onClick={() => {
                    setShowAddUser(true);
                  }}
                  loading={createRequest?.loading}
                >
                  <Icon
                    name={addUserSvg}
                    size="45px"
                    color="#826A6A"
                    title={intl.formatMessage(messages.addUserButtonTitle)}
                  />
                </Button>
              </>
            }
          />,
          document.getElementById('toolbar'),
        )}
    </Container>
  );
};

export default UsersControlpanel;
