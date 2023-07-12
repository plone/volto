import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getParentUrl } from '@plone/volto/helpers';
import { Portal } from 'react-portal';
import { Button, Header } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import { toast } from 'react-toastify';
import { last, nth, join } from 'lodash';
import { Error, Form, Icon, Toolbar, Toast } from '@plone/volto/components';
import { getControlpanel, updateControlpanel } from '@plone/volto/actions';
import { usePrevious } from '@plone/volto/helpers';
import { useClient } from '@plone/volto/hooks';
import saveSVG from '@plone/volto/icons/save.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import { useHistory, useLocation } from 'react-router';

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

const ContentType = (props) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const intl = useIntl();
  const dispatch = useDispatch();

  const [visual] = useState(false);
  const [error, setError] = useState(null);

  const isClient = useClient();

  const form = useRef();

  const cpanelRequest = useSelector(
    (state) => state.controlpanels,
    shallowEqual,
  );
  const controlpanel = useSelector((state) => state.controlpanels.controlpanel);

  const id = last(pathname.split('/'));
  const parent = nth(pathname.split('/'), -2);

  const prevcpanelGetRequestLoading = usePrevious(cpanelRequest.get?.loading);
  const prevcpanelUpdateRequestLoading = usePrevious(
    cpanelRequest.update?.loading,
  );

  useEffect(() => {
    dispatch(getControlpanel(join([parent, id], '/')));
  }, [dispatch, id, parent]);

  useEffect(() => {
    // Control Panel GET
    if (prevcpanelGetRequestLoading && cpanelRequest.get.error) {
      setError(cpanelRequest.get.error);
    }

    // Control Panel PATCH
    if (prevcpanelUpdateRequestLoading && cpanelRequest.update.loaded) {
      toast.info(
        <Toast
          info
          title={intl.formatMessage(messages.info)}
          content={intl.formatMessage(messages.changesSaved)}
        />,
      );
    }
  }, [
    prevcpanelGetRequestLoading,
    prevcpanelUpdateRequestLoading,
    cpanelRequest.get?.error,
    cpanelRequest.update?.loaded,
    intl,
  ]);

  const onSubmit = (data) => {
    dispatch(updateControlpanel(controlpanel['@id'], data));
  };

  const onCancel = () => {
    history.push(getParentUrl(pathname));
  };

  // Error
  if (error) {
    return <Error error={error} />;
  }

  if (controlpanel) {
    if (controlpanel?.data?.filter_content_types === false) {
      controlpanel.data.filter_content_types = { title: 'all', token: 'all' };
    }
    if (controlpanel?.data?.filter_content_types === true) {
      if ((controlpanel?.data?.allowed_content_types || []).length) {
        controlpanel.data.filter_content_types = {
          title: 'some',
          token: 'some',
        };
      } else {
        controlpanel.data.filter_content_types = {
          title: 'none',
          token: 'none',
        };
      }
    }
    return (
      <div id="page-controlpanel" className="ui container">
        <Header disabled>
          {intl.formatMessage(messages.title, {
            id: controlpanel.title,
          })}
        </Header>
        <Form
          isEditForm
          ref={form}
          schema={controlpanel.schema}
          formData={controlpanel.data}
          onSubmit={onSubmit}
          onCancel={onCancel}
          pathname={pathname}
          visual={visual}
          hideActions
          loading={cpanelRequest.update.loading}
        />
        {isClient && (
          <Portal node={document.getElementById('toolbar')}>
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
                    disabled={cpanelRequest.update.loading}
                    loading={cpanelRequest.update.loading}
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
            />
          </Portal>
        )}
      </div>
    );
  }
  return <div />;
};

export default ContentType;
