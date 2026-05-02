import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getParentUrl } from '@plone/volto/helpers/Url/Url';
import { createPortal } from 'react-dom';
import { Button, Header } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import last from 'lodash/last';
import nth from 'lodash/nth';
import join from 'lodash/join';
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

const messages = defineMessages({
  title: {
    id: '{id} Content Type',
    defaultMessage: '{id} Content Type',
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

function ContentType(props) {
  const dispatch = useDispatch();
  const intl = useIntl();
  const isClient = useClient();

  const controlpanel = useSelector((state) => state.controlpanels.controlpanel);
  const cpanelRequest = useSelector((state) => state.controlpanels);

  const pathname = props.location.pathname;
  const id = last(pathname.split('/'));
  const parent = nth(pathname.split('/'), -2);

  const [visual] = useState(false);
  const [error, setError] = useState(null);

  const form = useRef(null);

  useEffect(() => {
    dispatch(getControlpanel(join([parent, id], '/')))
      .catch((err) => {
        setError(err);
      });
  }, [dispatch, parent, id]);

  const onSubmit = (data) => {
    if (controlpanel?.['@id']) {
      dispatch(updateControlpanel(controlpanel['@id'], data))
        .then(() => {
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
    props.history.push(getParentUrl(pathname));
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

    return (
      <div id="page-controlpanel" className="ui container">
        <Header disabled>
          {intl.formatMessage(messages.title, {
            id: localControlpanel.title,
          })}
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

ContentType.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ContentType;
