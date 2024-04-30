/**
 * Controlpanel component.
 * @module components/manage/Controlpanels/Controlpanel
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import {
  Helmet,
  tryParseJSON,
  extractInvariantErrors,
} from '@plone/volto/helpers';
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
  error: {
    id: 'Error',
    defaultMessage: 'Error',
  },
});

/**
 * Controlpanel class.
 * @class Controlpanel
 * @extends Component
 */
class Controlpanel extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
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
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    controlpanel: null,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Controlpanel
   */
  constructor(props) {
    super(props);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { isClient: false, error: null };
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.getControlpanel(this.props.id);
    this.setState({ isClient: true });
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.updateRequest.loading && nextProps.updateRequest.error) {
      const message =
        nextProps.updateRequest.error?.response?.body?.error?.message ||
        nextProps.updateRequest.error?.response?.body?.message ||
        nextProps.updateRequest.error?.response?.text ||
        '';

      const error =
        new DOMParser().parseFromString(message, 'text/html')?.all?.[0]
          ?.textContent || message;

      const errorsList = tryParseJSON(error);
      let invariantErrors = [];
      if (Array.isArray(errorsList)) {
        invariantErrors = extractInvariantErrors(errorsList);
      }

      this.setState({ error: error });

      if (invariantErrors.length > 0) {
        toast.error(
          <Toast
            error
            title={this.props.intl.formatMessage(messages.error)}
            content={invariantErrors.join(' - ')}
          />,
        );
      }
    }

    if (this.props.updateRequest.loading && nextProps.updateRequest.loaded) {
      toast.info(
        <Toast
          info
          title={this.props.intl.formatMessage(messages.info)}
          content={this.props.intl.formatMessage(messages.changesSaved)}
        />,
      );
    }
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {object} data Form data.
   * @returns {undefined}
   */
  onSubmit(data) {
    this.props.updateControlpanel(this.props.controlpanel['@id'], data);
  }

  /**
   * Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  onCancel() {
    this.props.history.goBack();
  }
  form = React.createRef();

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { filterControlPanelsSchema } = config.settings;

    if (this.props.controlpanel) {
      return (
        <div id="page-controlpanel">
          <Helmet title={this.props.controlpanel.title} />
          <Container>
            <Form
              ref={this.form}
              title={this.props.controlpanel.title}
              schema={filterControlPanelsSchema(this.props.controlpanel)}
              formData={this.props.controlpanel.data}
              requestError={this.state.error}
              onSubmit={this.onSubmit}
              onCancel={this.onCancel}
              hideActions
              loading={this.props.updateRequest.loading}
            />
          </Container>
          {this.state.isClient &&
            createPortal(
              <Toolbar
                pathname={this.props.pathname}
                hideDefaultViewButtons
                inner={
                  <>
                    <Button
                      id="toolbar-save"
                      className="save"
                      aria-label={this.props.intl.formatMessage(messages.save)}
                      onClick={() => this.form.current.onSubmit()}
                      disabled={this.props.updateRequest.loading}
                      loading={this.props.updateRequest.loading}
                    >
                      <Icon
                        name={saveSVG}
                        className="circled"
                        size="30px"
                        title={this.props.intl.formatMessage(messages.save)}
                      />
                    </Button>
                    <Button
                      className="cancel"
                      aria-label={this.props.intl.formatMessage(
                        messages.cancel,
                      )}
                      onClick={() => this.onCancel()}
                    >
                      <Icon
                        name={clearSVG}
                        className="circled"
                        size="30px"
                        title={this.props.intl.formatMessage(messages.cancel)}
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
}

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
