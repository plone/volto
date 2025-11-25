import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { defineMessages, useIntl } from 'react-intl';
import { createPortal } from 'react-dom';
import { Container } from 'semantic-ui-react';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

import Helmet from '@plone/volto/helpers/Helmet/Helmet';
import { useClient } from '@plone/volto/hooks/client/useClient';
import { Form } from '@plone/volto/components/manage/Form';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import Toast from '@plone/volto/components/manage/Toast/Toast';
import Toolbar from '@plone/volto/components/manage/Toolbar/Toolbar';
import { updatePassword } from '@plone/volto/actions/users/users';
import { getBaseUrl } from '@plone/volto/helpers/Url/Url';
import backSVG from '@plone/volto/icons/back.svg';

const messages = defineMessages({
  changePassword: {
    id: 'Change Password',
    defaultMessage: 'Change Password',
  },
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  oldPasswordTitle: {
    id: 'Current password',
    defaultMessage: 'Current password',
  },
  oldPasswordDescription: {
    id: 'Enter your current password.',
    defaultMessage: 'Enter your current password.',
  },
  newPasswordTitle: {
    id: 'New password',
    defaultMessage: 'New password',
  },
  newPasswordDescription: {
    id: 'Enter your new password. Minimum 8 characters.',
    defaultMessage: 'Enter your new password. Minimum 8 characters.',
  },
  newPasswordRepeatTitle: {
    id: 'Confirm password',
    defaultMessage: 'Confirm password',
  },
  newPasswordRepeatDescription: {
    id: 'Re-enter the password. Make sure the passwords are identical.',
    defaultMessage:
      'Re-enter the password. Make sure the passwords are identical.',
  },
  saved: {
    id: 'Changes saved',
    defaultMessage: 'Changes saved',
  },
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  success: {
    id: 'Success',
    defaultMessage: 'Success',
  },
});

const ChangePassword = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const isClient = useClient();

  const userId = useSelector(
    (state) =>
      state.userSession.token ? jwtDecode(state.userSession.token).sub : '',
    shallowEqual,
  );
  const loading = useSelector((state) => state.users.update_password.loading);
  const { pathname } = useLocation();
  const history = useHistory();

  const onSubmit = (data) => {
    if (data.newPassword === data.newPasswordRepeat) {
      dispatch(updatePassword(userId, data.oldPassword, data.newPassword)).then(
        () => {
          toast.success(
            <Toast
              success
              title={intl.formatMessage(messages.success)}
              content={intl.formatMessage(messages.saved)}
            />,
          );
        },
      );
    }
  };

  const onCancel = () => {
    history.goBack();
  };

  return (
    <Container id="page-change-password">
      <Helmet title={intl.formatMessage(messages.changePassword)} />
      <Form
        schema={{
          fieldsets: [
            {
              id: 'default',
              title: intl.formatMessage(messages.default),
              fields: ['oldPassword', 'newPassword', 'newPasswordRepeat'],
            },
          ],
          properties: {
            oldPassword: {
              description: intl.formatMessage(messages.oldPasswordDescription),
              title: intl.formatMessage(messages.oldPasswordTitle),
              type: 'string',
              widget: 'password',
            },
            newPassword: {
              description: intl.formatMessage(messages.newPasswordDescription),
              title: intl.formatMessage(messages.newPasswordTitle),
              type: 'string',
              widget: 'password',
            },
            newPasswordRepeat: {
              description: intl.formatMessage(
                messages.newPasswordRepeatDescription,
              ),
              title: intl.formatMessage(messages.newPasswordRepeatTitle),
              type: 'string',
              widget: 'password',
            },
          },
          required: ['oldPassword', 'newPassword', 'newPasswordRepeat'],
        }}
        onSubmit={onSubmit}
        onCancel={onCancel}
        loading={loading}
      />
      {isClient &&
        createPortal(
          <Toolbar
            pathname={pathname}
            hideDefaultViewButtons
            inner={
              <Link to={`${getBaseUrl(pathname)}`} className="item">
                <Icon
                  name={backSVG}
                  className="contents circled"
                  size="30px"
                  title={intl.formatMessage(messages.back)}
                />
              </Link>
            }
          />,
          document.getElementById('toolbar'),
        )}
    </Container>
  );
};

export default ChangePassword;
