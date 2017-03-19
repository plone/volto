/**
 * Edit container.
 * @module components/manage/Edit/Edit
 */

import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { asyncConnect } from 'redux-connect';

import { Form } from '../../../components';
import { editContent, getContent, getSchema } from '../../../actions';

@asyncConnect(
  [
    {
      key: 'schema',
      promise: ({ store: { dispatch, getState } }) =>
        dispatch(getSchema(getState().content.data['@type'])),
    },
  ],
)
@connect(
  (state, props) => ({
    content: state.content.data,
    schema: state.schema.schema,
    getRequest: state.content.get,
    editRequest: state.content.edit,
    pathname: props.location.pathname,
  }),
  dispatch => bindActionCreators({ editContent, getContent, getSchema }, dispatch),
)
/**
 * Edit container class.
 * @class Edit
 * @extends Component
 */
export default class Edit extends Component {

  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    editContent: PropTypes.func.isRequired,
    getContent: PropTypes.func.isRequired,
    getSchema: PropTypes.func.isRequired,
    editRequest: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    getRequest: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    pathname: PropTypes.string.isRequired,
    content: PropTypes.shape({
      '@type': PropTypes.string,
      text: PropTypes.shape({
        data: PropTypes.string,
      }),
    }),
    schema: PropTypes.objectOf(PropTypes.any),
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
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.getContent(this.props.pathname.split('/edit')[0]);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.getRequest.loading && nextProps.getRequest.loaded) {
      this.props.getSchema(nextProps.content['@type']);
    }
    if (this.props.editRequest.loading && nextProps.editRequest.loaded) {
      browserHistory.push(this.props.pathname.replace('/edit', ''));
    }
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {object} data Form data.
   * @returns {bool} Should continue.
   */
  onSubmit(data) {
    this.props.editContent(this.props.pathname.replace('/edit', ''),
                           data);
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
    if (this.props.schema && this.props.content) {
      return (
        <div id="page-edit">
          <Helmet title="Edit" />
          <div className="container">
            <Form
              schema={this.props.schema}
              formData={{
                ...this.props.content,
                text: this.props.content.text ? this.props.content.text.data : '',
              }}
              onSubmit={this.onSubmit}
              onCancel={this.onCancel}
            />
          </div>
        </div>
      );
    }
    /*
    if (this.props.content && this.props.content.layout) {
      return (
        <div id="page-home">
          <Helmet title="Home" />
          <Layout layout={this.props.content.layout} />
        </div>
      );
    }
    */
    return <div />;
  }
}
