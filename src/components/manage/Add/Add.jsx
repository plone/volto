/**
 * Add container.
 * @module components/manage/Add/Add
 */

import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { asyncConnect } from 'redux-connect';
import { isEmpty, pick } from 'lodash';

import { addContent, getSchema } from '../../../actions';
import { Form } from '../../../components';
import config from '../../../config';
import { getBaseUrl } from '../../../helpers';

@asyncConnect(
  [
    {
      key: 'schema',
      promise: ({ store: { dispatch } }) =>
        dispatch(getSchema('Document')),
    },
    {
      key: 'content',
      promise: ({ location, store: { dispatch, getState } }) => {
        const form = getState().form;
        if (!isEmpty(form)) {
          return dispatch(addContent(
            getBaseUrl(location.pathname),
            { ...pick(form, ['title', 'description', 'text']), '@type': 'Document' },
          ));
        }
        return Promise.resolve(getState().content);
      },
    },
  ],
)
@connect(
  (state, props) => ({
    request: state.content.add,
    content: state.content.data,
    schema: state.schema.schema,
    pathname: props.location.pathname,
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
   * @returns {undefined}
   */
  onSubmit(data) {
    this.props.addContent(getBaseUrl(this.props.pathname),
                          { ...data, '@type': 'Document' });
  }

  /**
   * Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  onCancel() {
    browserHistory.push(getBaseUrl(this.props.pathname));
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
          <h1>Add {this.props.schema.title}</h1>
          <Form
            schema={this.props.schema}
            onSubmit={this.onSubmit}
            onCancel={this.onCancel}
          />
        </div>
      );
    }
    return <div />;
  }
}
