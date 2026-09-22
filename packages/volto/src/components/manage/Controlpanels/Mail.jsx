import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getParentUrl } from '@plone/volto/helpers/Url/Url';
import { createPortal } from 'react-dom';
import { Button, Header } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import last from 'lodash/last';
import Error from '@plone/volto/components/theme/Error/Error';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import Toolbar from '@plone/volto/components/manage/Toolbar/Toolbar';
import Toast from '@plone/volto/components/manage/Toast/Toast';
import { Form } from '@plone/volto/components/manage/Form';
import {
  getControlpanel,
  updateControlpanel,
} from '@plone/volto/actions/controlpanels/controlpanels';
import { useClient } from '@plone/volto/hooks/client/useClient';

import saveSVG from '@plone/volto/icons/save.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import { emailNotification } from '@plone/volto/actions/emailNotification/emailNotification';

const messages = defineMessages({
  title: {
    id: 'Mail',
    defaultMessage: 'Mail',
  },
  changesSaved: {
    id: 'Changes saved.',
    defaultMessage: 'Changes saved.',
  },
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  save: {
    id: 'Save',
    defaultMessage: 'Save',
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
  info: {
    id: 'Info',
    defaultMessage: 'Info',
  },
});

function MailControlpanel() {
  const dispatch = useDispatch();
  const intl = useIntl();
  const isClient = useClient();
  const history = useHistory();
  const pathname = useLocation().pathname;

  const controlpanel = useSelector((state) => state.controlpanels.controlpanel);
  const cpanelRequest = useSelector((state) => state.controlpanels);

  const id = last(pathname.split('/'));

  const [visual] = useState(false);
  const [error, setError] = useState(null);

  const form = useRef(null);

  useEffect(() => {
    dispatch(getControlpanel(id)).catch((err) => {
      setError(err);
    });
  }, [dispatch, id]);

  const onSubmit = (data) => {
    if (controlpanel?.['@id']) {
      dispatch(updateControlpanel(controlpanel['@id'], data)).then(() => {
        toast.info(
          <Toast
            info
            title={intl.formatMessage(messages.info)}
            content={intl.formatMessage(messages.changesSaved)}
          />,
        );
      });
    }
  };

  const onCancel = () => {
    history.push(getParentUrl(pathname));
  };

  if (error) {
    return <Error error={error} />;
  }

  if (controlpanel?.data) {
    const localControlpanel = {
      ...controlpanel,
      data: {
        ...controlpanel.data,
      },
    };

    if (localControlpanel?.data?.filter_content_types === false) {
      localControlpanel.data.filter_content_types = {
        title: 'all',
        token: 'all',
      };
    }
    if (localControlpanel?.data?.filter_content_types === true) {
      if ((localControlpanel?.data?.allowed_content_types || []).length) {
        localControlpanel.data.filter_content_types = {
          title: 'some',
          token: 'some',
        };
      } else {
        localControlpanel.data.filter_content_types = {
          title: 'none',
          token: 'none',
        };
      }
    }

    const saveAndSendTestEmail = () => {
      const email_from_address = controlpanel?.data.email_from_address;
      const email_message =
        'Hi,\n\nThis is a test message sent from the Plone ' +
        "'Mail settings' control panel. Your receipt of this " +
        "message (at the address specified in the Site 'From' " +
        'address field) indicates that your e-mail server is ' +
        'working!\n\n' +
        'Have a nice day.\n\n' +
        'Love,\n\nPlone';
      const email_subject = 'Test e-mail from Plone';

      dispatch(
        emailNotification(email_from_address, email_message, '', email_subject),
      );
      // TODO: error handling
    };

    return (
      <div id="page-controlpanel" className="ui container">
        <Header>
          {intl.formatMessage(messages.title)}
          <Button onClick={saveAndSendTestEmail}>
            Save and send test e-mail
          </Button>
        </Header>
        <Form
          isEditForm
          ref={form}
          schema={localControlpanel.schema}
          formData={localControlpanel.data}
          onSubmit={onSubmit}
          onCancel={onCancel}
          pathname={pathname}
          visual={visual}
          hideActions
          loading={cpanelRequest.update?.loading}
        />
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
                    onClick={() => form.current.onSubmit()}
                    disabled={cpanelRequest.update?.loading}
                    loading={cpanelRequest.update?.loading}
                  >
                    <Icon
                      name={saveSVG}
                      className="circled"
                      size="30px"
                      title={intl.formatMessage(messages.save)}
                    />
                  </Button>
                  <Button
                    className="cancel"
                    aria-label={intl.formatMessage(messages.cancel)}
                    onClick={() => onCancel()}
                  >
                    <Icon
                      name={clearSVG}
                      className="circled"
                      size="30px"
                      title={intl.formatMessage(messages.cancel)}
                    />
                  </Button>
                </>
              }
            />,
            document.getElementById('toolbar'),
          )}
      </div>
    );
  }
  return <div />;
}

export default MailControlpanel;
