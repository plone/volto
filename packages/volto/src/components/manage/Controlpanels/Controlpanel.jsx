import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Helmet from '@plone/volto/helpers/Helmet/Helmet';
import { useClient } from '@plone/volto/hooks/client/useClient';
import {
  tryParseJSON,
  extractInvariantErrors,
} from '@plone/volto/helpers/FormValidation/FormValidation';
import { createPortal } from 'react-dom';
import { Button, Container } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import Icon from '@plone/volto/components/theme/Icon/Icon';
import Toolbar from '@plone/volto/components/manage/Toolbar/Toolbar';
import Toast from '@plone/volto/components/manage/Toast/Toast';
import { Form } from '@plone/volto/components/manage/Form';
import {
  updateControlpanel,
  getControlpanel,
} from '@plone/volto/actions/controlpanels/controlpanels';
import { getSite } from '@plone/volto/actions/site/site';

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
  error: {
    id: 'Error',
    defaultMessage: 'Error',
  },
});

const Controlpanel = () => {
  const { filterControlPanelsSchema } = config.settings;
  const intl = useIntl();
  const id = useParams().id;
  const pathname = useLocation().pathname;
  const history = useHistory();
  const isClient = useClient();

  const dispatch = useDispatch();
  const controlpanel = useSelector((state) => state.controlpanels.controlpanel);
  const updateRequest = useSelector((state) => state.controlpanels.update);
  const [error, setError] = useState(null);

  const formRef = useRef();
  const onCancel = () => {
    history.goBack();
  };
  const onSubmit = (data) => {
    dispatch(updateControlpanel(controlpanel['@id'], data))
      .then(() => {
        dispatch(getSite());
        toast.info(
          <Toast
            info
            title={intl.formatMessage(messages.info)}
            content={intl.formatMessage(messages.changesSaved)}
          />,
        );
      })
      .catch((err) => {
        const message =
          err?.response?.body?.error?.message ||
          err?.response?.body?.message ||
          err?.response?.text ||
          '';
        const error =
          new DOMParser().parseFromString(message, 'text/html')?.all?.[0]
            ?.textContent || message;
        const errorsList = tryParseJSON(error);
        let invariantErrors = [];
        if (Array.isArray(errorsList)) {
          invariantErrors = extractInvariantErrors(errorsList);
        }
        setError(error);
        if (invariantErrors.length > 0) {
          toast.error(
            <Toast
              error
              title={intl.formatMessage(messages.error)}
              content={invariantErrors.join(' - ')}
            />,
          );
        }
      });
  };

  useEffect(() => {
    dispatch(getControlpanel(id)).catch((error) => setError(error));
  }, [dispatch, id]);

  if (controlpanel) {
    return (
      <div id="page-controlpanel">
        <Helmet title={controlpanel.title} />
        <Container>
          <Form
            ref={formRef}
            title={controlpanel.title}
            schema={filterControlPanelsSchema(controlpanel)}
            formData={controlpanel.data}
            requestError={error}
            onSubmit={onSubmit}
            onCancel={onCancel}
            hideActions
            loading={updateRequest.loading}
          />
        </Container>
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
                    onClick={() => formRef.current.onSubmit()}
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
                    onClick={() => this.onCancel()}
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
};

export default Controlpanel;
