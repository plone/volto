/**
 * Controlpanel component.
 * @module components/manage/Controlpanels/Controlpanel
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';
import { Portal } from 'react-portal';
import { Container } from 'semantic-ui-react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

import { Form, Icon, Toolbar } from '../../../components';
import {
  addMessage,
  updateControlpanel,
  getControlpanel,
} from '../../../actions';

import backSVG from '../../../icons/back.svg';

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

/**
 * Controlpanel class.
 * @class Controlpanel
 * @extends Component
 */
@injectIntl
@connect(
  (state, props) => ({
    controlpanel: state.controlpanels.controlpanel,
    updateRequest: state.controlpanels.update,
    id: props.match.params.id,
    pathname: props.location.pathname,
  }),
  dispatch =>
    bindActionCreators(
      { addMessage, updateControlpanel, getControlpanel },
      dispatch,
    ),
)
class Controlpanel extends Component {
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
      data: PropTypes.object,
      schema: PropTypes.object,
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
    this.props.history.goBack();
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
              hideDefaultViewButtons
              inner={
                <Link to="/controlpanel" className="item">
                  <Icon
                    name={backSVG}
                    className="contents circled"
                    size="32px"
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

export default withRouter(Controlpanel);
