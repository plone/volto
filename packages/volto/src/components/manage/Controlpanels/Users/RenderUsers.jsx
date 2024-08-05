import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { Dropdown, Table, Checkbox } from 'semantic-ui-react';
import trashSVG from '@plone/volto/icons/delete.svg';
import editSVG from '@plone/volto/icons/editing.svg';
import { Icon, Toast } from '@plone/volto/components';
import { ModalForm } from '@plone/volto/components/manage/Form';
import { updateUser } from '@plone/volto/actions';
import ploneSVG from '@plone/volto/icons/plone.svg';
import { connect } from 'react-redux';
import { messages, canAssignRole } from '@plone/volto/helpers';
import { toast } from 'react-toastify';

const RenderUsers = (props) => {
  const {
    user,
    roles,
    onDelete,
    isUserManager,
    inheritedRole,
    userschema,
    updateRequest,
    updateUserData,
    listUsers,
  } = props;

  const [editUser, setEditUser] = useState({});
  const intl = useIntl();

  useEffect(() => {
    if (
      updateRequest.loading &&
      updateRequest.loaded &&
      editUser.id === user.id
    ) {
      setEditUser({});
      listUsers();
      toast.success(
        <Toast
          success
          title={intl.formatMessage(messages.success)}
          content={intl.formatMessage(messages.updateUserSuccess)}
        />,
      );
    }
  }, [updateRequest, editUser, user, listUsers, intl]);

  const onChange = (event, { value }) => {
    const [user, role] = value.split('&role=');
    updateUser(user, role);
  };

  const onEditUserSubmit = (data, callback) => {
    delete data.groups;
    delete data.roles;
    updateUserData(data.id, data);
  };

  const onEditUserError = () => {
    toast.error(
      <Toast
        error
        title={intl.formatMessage(messages.error)}
        content={intl.formatMessage(
          messages.addUserFormPasswordAndSendPasswordTogetherNotAllowed,
        )}
      />,
    );
  };

  const onClickEdit = ({ formData }) => {
    setEditUser({ ...formData });
  };

  const canDeleteUser = () => {
    if (isUserManager) return true;
    return !user.roles.includes('Manager');
  };

  return (
    <Table.Row key={user.username}>
      <Table.Cell className="fullname">
        {user.fullname ? user.fullname : user.username} ({user.username})
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
              checked={user.roles.includes(role.id)}
              onChange={onChange}
              value={`${user.id}&role=${role.id}`}
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
                    onClickEdit({ formData: user });
                  }}
                  value={user['@id']}
                >
                  <Icon name={editSVG} size="15px" />
                  <FormattedMessage id="Edit" defaultMessage="Edit" />
                </Dropdown.Item>
              )}
              <Dropdown.Item
                id="delete-user-button"
                onClick={onDelete}
                value={user['@id']}
              >
                <Icon name={trashSVG} size="15px" />
                <FormattedMessage id="Delete" defaultMessage="Delete" />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Table.Cell>
      {Object.keys(editUser).length > 0 && userschema.loaded && (
        <ModalForm
          className="modal"
          onSubmit={onEditUserSubmit}
          submitError={onEditUserError}
          formData={editUser}
          onCancel={() => setEditUser({})}
          title={intl.formatMessage(messages.updateUserFormTitle)}
          loading={updateRequest.loading}
          schema={userschema.userschema}
        />
      )}
    </Table.Row>
  );
};

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

export default connect(
  (state, props) => ({
    updateRequest: state.users?.update,
  }),
  { updateUserData: updateUser },
)(RenderUsers);
