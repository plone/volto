/**
 * Add container.
 * @module components/manage/Add/Add
 */

import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import { addContent, getSchema } from '../../../actions';
import { Form } from '../../../components';
import config from '../../../config';

@connect(
  state => ({
    request: state.content.add,
    content: state.content.data,
    schema: state.schema.schema,
    pathname: state.routing.locationBeforeTransitions.pathname,
  }),
  dispatch => bindActionCreators({ addContent, getSchema }, dispatch),
)
/**
 * Add container class.
 * @class Add
 * @extends Component
 */
export default class Add extends Component {

  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    addContent: PropTypes.func.isRequired,
    getSchema: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    schema: PropTypes.objectOf(PropTypes.any),
    content: PropTypes.shape({ // eslint-disable-line react/no-unused-prop-types
      '@id': PropTypes.string,
    }),
    request: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
  }

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    schema: null,
    content: null,
  }

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
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
    this.props.getSchema('Document');
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.request.loading && nextProps.request.loaded) {
      browserHistory.push(nextProps.content['@id'].replace(config.apiPath, ''));
    }
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {object} data Form data.
   * @returns {bool} Should continue.
   */
  onSubmit(data) {
    this.props.addContent(this.props.pathname.replace('/add', ''),
                          { ...data, '@type': 'Document' });
    return false;
  }

  /**
   * Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  onCancel() {
    browserHistory.push(this.props.pathname.replace('/edit', ''));
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (this.props.schema) {
      return (
        <div id="page-add">
          <Helmet title="Add: Document" />
          <div className="container">
            <Form
              schema={this.props.schema}
              onSubmit={this.onSubmit}
              onCancel={this.onCancel}
            />
          </div>
        </div>
      );
    }
    return <div />;
  }
}
