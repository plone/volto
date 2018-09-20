/**
 * Controlpanel component.
 * @module components/manage/Controlpanels/Controlpanel
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Router, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';
import { Portal } from 'react-portal';
import { Icon, Container } from 'semantic-ui-react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

import { Form, Toolbar } from '../../../components';
import {
  addMessage,
  updateControlpanel,
  getControlpanel,
} from '../../../actions';
import { getBaseUrl } from '../../../helpers';

const messages = defineMessages({
  changesSaved: {
    id: 'Changes saved.',
    defaultMessage: 'Changes saved.',
  },
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
});

@injectIntl
@connect(
  (state, props) => ({
    controlpanel: state.controlpanels.controlpanel,
    updateRequest: state.controlpanels.update,
    id: props.params.id,
    pathname: props.location.pathname,
  }),
  dispatch =>
    bindActionCreators(
      { addMessage, updateControlpanel, getControlpanel },
      dispatch,
    ),
)
/**
 * Controlpanel class.
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
    addMessage: PropTypes.func.isRequired,
    updateControlpanel: PropTypes.func.isRequired,
    getControlpanel: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    updateRequest: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    controlpanel: PropTypes.shape({
      '@id': PropTypes.string,
      data: PropTypes.Object,
      schema: PropTypes.Object,
      title: PropTypes.string,
    }),
    intl: intlShape.isRequired,
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
  }

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.getControlpanel(this.props.id);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.updateRequest.loading && nextProps.updateRequest.loaded) {
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
    Router.goBack();
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
          <Container>
            <Form
              title={this.props.controlpanel.title}
              schema={this.props.controlpanel.schema}
              formData={this.props.controlpanel.data}
              onSubmit={this.onSubmit}
              onCancel={this.onCancel}
              loading={this.props.updateRequest.loading}
            />
          </Container>
          <Portal node={__CLIENT__ && document.getElementById('toolbar')}>
            <Toolbar
              pathname={this.props.pathname}
              inner={
                <Link
                  to={`${getBaseUrl(this.props.pathname)}controlpanel`}
                  className="item"
                >
                  <Icon
                    name="arrow left"
                    size="big"
                    color="blue"
                    title={this.props.intl.formatMessage(messages.back)}
                  />
                </Link>
              }
            />
          </Portal>
        </div>
      );
    }
    return <div />;
  }
}
