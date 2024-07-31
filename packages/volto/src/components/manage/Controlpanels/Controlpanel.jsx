/**
 * Controlpanel component.
 * @module components/manage/Controlpanels/Controlpanel
 */

import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from '@plone/volto/helpers';
import { createPortal } from 'react-dom';
import { Button, Container } from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';
import { toast } from 'react-toastify';

import { Icon, Toolbar, Toast } from '@plone/volto/components';
import { Form } from '@plone/volto/components/manage/Form';
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

/**
 * Controlpanel functional component.
 */
const Controlpanel = (props) => {
  const {
    updateControlpanel,
    getControlpanel,
    id,
    updateRequest,
    controlpanel,
    pathname,
    intl,
    history,
  } = props;

  const [isClient, setIsClient] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    getControlpanel(id);
    setIsClient(true);
  }, [getControlpanel, id]);

  useEffect(() => {
    if (updateRequest.loading && updateRequest.loaded) {
      toast.info(
        <Toast
          info
          title={intl.formatMessage(messages.info)}
          content={intl.formatMessage(messages.changesSaved)}
        />,
      );
    }
  }, [updateRequest, intl]);

  /**
   * Submit handler
   * @method onSubmit
   * @param {object} data Form data.
   * @returns {undefined}
   */
  const onSubmit = (data) => {
    updateControlpanel(controlpanel['@id'], data);
  };

  /**
   * Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  const onCancel = () => {
    history.goBack();
  };

  const { filterControlPanelsSchema } = config.settings;

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
                    onClick={onCancel}
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

Controlpanel.propTypes = {
  updateControlpanel: PropTypes.func.isRequired,
  getControlpanel: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  updateRequest: PropTypes.shape({
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
  }).isRequired,
  controlpanel: PropTypes.shape({
    '@id': PropTypes.string,
    data: PropTypes.object,
    schema: PropTypes.object,
    title: PropTypes.string,
  }),
  pathname: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

Controlpanel.defaultProps = {
  controlpanel: null,
};

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      controlpanel: state.controlpanels.controlpanel,
      updateRequest: state.controlpanels.update,
      id: props.match.params.id,
      pathname: props.location.pathname,
    }),
    { updateControlpanel, getControlpanel },
  ),
  withRouter,
)(Controlpanel);
