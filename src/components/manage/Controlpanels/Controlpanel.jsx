/**
 * Controlpanel component.
 * @module components/manage/Controlpanels/Controlpanel
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { Icon, Button } from 'semantic-ui-react';
import {
  FormattedMessage,
  defineMessages,
  injectIntl,
  intlShape,
} from 'react-intl';

import { Form } from '../../../components';
import {
  addMessage,
  editControlpanel,
  getControlpanel,
} from '../../../actions';

const messages = defineMessages({
  changesSaved: {
    id: 'Changes saved.',
    defaultMessage: 'Changes saved.',
  },
});

@injectIntl
@connect(
  (state, props) => ({
    controlpanel: state.controlpanel.controlpanel,
    editRequest: state.controlpanel.edit,
    id: props.params.id,
  }),
  dispatch =>
    bindActionCreators(
      { addMessage, editControlpanel, getControlpanel },
      dispatch,
    ),
)
/**
 * Component to display a controlpanel.
 * @class Controlpanel
 * @extends Component
 */
export default class Controlpanel extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    /**
     * Action to add a notification message
     */
    addMessage: PropTypes.func.isRequired,
    /**
     * Action to edit a controlpanel
     */
    editControlpanel: PropTypes.func.isRequired,
    /**
     * Action to get controlpanel data
     */
    getControlpanel: PropTypes.func.isRequired,
    /**
     * Id of the controlpanel
     */
    id: PropTypes.string.isRequired,
    /**
     * Edit request status
     */
    editRequest: PropTypes.shape({
      /**
       * Loading status
       */
      loading: PropTypes.bool,
      /**
       * Loaded status
       */
      loaded: PropTypes.bool,
    }).isRequired,
    /**
     * Controlpanel data
     */
    controlpanel: PropTypes.shape({
      /**
       * Id of the controlpanel
       */
      '@id': PropTypes.string,
      /**
       * Values of the controlpanel
       */
      data: PropTypes.Object,
      /**
       * Schema of the controlpanel
       */
      schema: PropTypes.Object,
      /**
       * Title of the controlpanel
       */
      title: PropTypes.string,
    }).isRequired,
    /**
     * i18n object
     */
    intl: intlShape.isRequired,
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
  }

  /**
   * Component will mount
   * @method componentWillMount
   */
  componentWillMount() {
    this.props.getControlpanel(this.props.id);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.editRequest.loading && nextProps.editRequest.loaded) {
      this.props.addMessage(
        null,
        this.props.intl.formatMessage(messages.changesSaved),
        'info',
      );
    }
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {object} data Form data.
   */
  onSubmit(data) {
    this.props.editControlpanel(this.props.controlpanel['@id'], data);
  }

  /**
   * Cancel handler
   * @method onCancel
   */
  onCancel() {
    browserHistory.goBack();
  }

  /**
   * Site setup handler
   * @method onSiteSetup
   */
  onSiteSetup() {
    browserHistory.push('/controlpanel');
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (this.props.controlpanel) {
      return (
        <div id="page-controlpanel">
          <Helmet title={this.props.controlpanel.title} />
          <div className="container">
            <Button onClick={this.onSiteSetup}>
              <Icon name="angle left" />{' '}
              <FormattedMessage id="Site Setup" defaultMessage="Site Setup" />
            </Button>
            <article id="content">
              <header>
                <h1 className="documentFirstHeading">
                  {this.props.controlpanel.title}
                </h1>
              </header>
              <section id="content-core">
                <Form
                  schema={this.props.controlpanel.schema}
                  formData={this.props.controlpanel.data}
                  onSubmit={this.onSubmit}
                  onCancel={this.onCancel}
                />
              </section>
            </article>
          </div>
        </div>
      );
    }
    return <div />;
  }
}
