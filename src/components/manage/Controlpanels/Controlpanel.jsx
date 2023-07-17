import { useEffect, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Helmet, usePrevious } from '@plone/volto/helpers';
import { useClient } from '@plone/volto/hooks';
import { Portal } from 'react-portal';
import { Button, Container } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import { Form, Icon, Toolbar, Toast } from '@plone/volto/components';
import { updateControlpanel, getControlpanel } from '@plone/volto/actions';

import config from '@plone/volto/registry';

import saveSVG from '@plone/volto/icons/save.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

const messages = defineMessages({
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

const Controlpanel = (props) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const history = useHistory();
  const isClient = useClient();
  const controlpanel = useSelector(
    (state) => state.controlpanels.controlpanel,
    shallowEqual,
  );
  const updateRequest = useSelector((state) => state.controlpanels.update);
  const id = props.match.params.id;
  const form = useRef();
  const { filterControlPanelsSchema } = config.settings;

  const prevupdateRequestloading = usePrevious(updateRequest.loading);

  useEffect(() => {
    dispatch(getControlpanel(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (prevupdateRequestloading && updateRequest.loaded) {
      toast.info(
        <Toast
          info
          title={intl.formatMessage(messages.info)}
          content={intl.formatMessage(messages.changesSaved)}
        />,
      );
    }
  }, [intl, prevupdateRequestloading, updateRequest.loaded]);

  const onSubmit = (data) => {
    dispatch(updateControlpanel(controlpanel['@id'], data));
  };

  const onCancel = () => {
    history.goBack();
  };

  if (controlpanel) {
    return (
      <div id="page-controlpanel">
        <Helmet title={controlpanel.title} />
        <Container>
          <Form
            ref={form}
            title={controlpanel.title}
            schema={filterControlPanelsSchema(controlpanel)}
            formData={controlpanel.data}
            onSubmit={onSubmit}
            onCancel={onCancel}
            hideActions
            loading={updateRequest.loading}
          />
        </Container>
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
                    disabled={updateRequest.loading}
                    loading={updateRequest.loading}
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

export default Controlpanel;
