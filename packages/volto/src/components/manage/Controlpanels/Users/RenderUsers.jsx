/**
 * RenderUsers component.
 * @module components/manage/Controlpanels/Users/RenderUsers
 */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Table, Checkbox } from 'semantic-ui-react';
import trashSVG from '@plone/volto/icons/delete.svg';
import editSVG from '@plone/volto/icons/editing.svg';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import Toast from '@plone/volto/components/manage/Toast/Toast';
import { ModalForm } from '@plone/volto/components/manage/Form';
import { updateUser } from '@plone/volto/actions/users/users';
import ploneSVG from '@plone/volto/icons/plone.svg';
import { messages } from '@plone/volto/helpers/MessageLabels/MessageLabels';
import { canAssignRole } from '@plone/volto/helpers/User/User';
import { toast } from 'react-toastify';

/**
 * RenderUsers functional component.
 * @function RenderUsers
 */
const RenderUsers = (props) => {
  const [user, setUser] = useState({});

  const intl = useIntl();
  const dispatch = useDispatch();
  const updateRequest = useSelector((state) => state.users?.update);

  const {
    user: propsUser,
    listUsers,
    updateUser: updateUserRole,
    isUserManager,
    roles,
    inheritedRole,
    userschema,
    onDelete,
  } = props;

  // Use dispatch to call updateUser action
  const updateUserData = (userId, userData) => {
    dispatch(updateUser(userId, userData))
      .then(() => {
        // Handle success
        setUser({});
        if (listUsers) {
          listUsers();
        }
        toast.success(
          <Toast
            success
            title={intl.formatMessage(messages.success)}
            content={intl.formatMessage(messages.updateUserSuccess)}
          />,
        );
      })
      .catch(() => {
        // Handle error
        toast.error(
          <Toast
            error
            title={intl.formatMessage(messages.error)}
            content={intl.formatMessage(messages.thereWereSomeErrors)}
          />,
        );
      });
  };

  /**
   * @param {*} event
   * @param {*} { value }
   */
  const onChange = (_event, { value }) => {
    const [userId, role] = value.split('&role=');
    updateUserRole(userId, role);
  };

  const onEditUserSubmit = (data) => {
    // Do not handle groups and roles in this form
    delete data.groups;
    delete data.roles;
    updateUserData(data.id, data);
  };

  const onClickEdit = (formProps) => {
    const { formData } = formProps;
    setUser({ ...formData });
  };

  const canDeleteUser = () => {
    if (isUserManager) return true;
    return !propsUser.roles.includes('Manager');
  };

  return (
    <Table.Row key={propsUser.username}>
      <Table.Cell className="fullname">
        {propsUser.fullname ? propsUser.fullname : propsUser.username} (
        {propsUser.username})
      </Table.Cell>
      {roles.map((role) => (
        <Table.Cell key={role.id}>
          {inheritedRole && inheritedRole.includes(role.id) ? (
            <Icon
              name={ploneSVG}
              size="20px"
              color="#007EB1"
              title={'plone-svg'}
            />
          ) : (
            <Checkbox
              checked={propsUser.roles.includes(role.id)}
              onChange={onChange}
              value={`${propsUser.id}&role=${role.id}`}
              disabled={!canAssignRole(isUserManager, role)}
            />
          )}
        </Table.Cell>
      ))}
      <Table.Cell textAlign="right">
        {canDeleteUser() && (
          <Dropdown icon="ellipsis horizontal">
            <Dropdown.Menu className="left">
              {userschema && (
                <Dropdown.Item
                  id="edit-user-button"
                  onClick={() => {
                    onClickEdit({ formData: propsUser });
                  }}
                  value={propsUser['@id']}
                >
                  <Icon name={editSVG} size="15px" />
                  <FormattedMessage id="Edit" defaultMessage="Edit" />
                </Dropdown.Item>
              )}
              <Dropdown.Item
                id="delete-user-button"
                onClick={onDelete}
                value={propsUser['@id']}
              >
                <Icon name={trashSVG} size="15px" />
                <FormattedMessage id="Delete" defaultMessage="Delete" />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Table.Cell>
      {Object.keys(user).length > 0 && userschema.loaded && (
        <ModalForm
          className="modal"
          onSubmit={onEditUserSubmit}
          submitError={user.editUserError}
          formData={user}
          onCancel={() => setUser({})}
          title={intl.formatMessage(messages.updateUserFormTitle)}
          loading={updateRequest.loading}
          schema={userschema.userschema}
        />
      )}
    </Table.Row>
  );
};

// PropTypes to the component
RenderUsers.propTypes = {
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
  isUserManager: PropTypes.bool.isRequired,
};

export default RenderUsers;
