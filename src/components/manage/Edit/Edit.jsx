/**
 * Edit container.
 * @module components/manage/Edit/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { asyncConnect } from 'redux-connect';
import { isEmpty, pick } from 'lodash';

import {
  Form, // Layout,
} from '../../../components';
import { editContent, getContent, getSchema } from '../../../actions';
import { getBaseUrl } from '../../../helpers';

/**
 * EditComponent class.
 * @class EditComponent
 * @extends Component
 */

@connect(
  (state, props) => ({
    content: state.content.data,
    schema: state.schema.schema,
    getRequest: state.content.get,
    editRequest: state.content.edit,
    pathname: props.location.pathname,
  }),
  dispatch =>
    bindActionCreators({ editContent, getContent, getSchema }, dispatch),
)
export class EditComponent extends Component {
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
    }),
    schema: PropTypes.objectOf(PropTypes.any),
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    schema: null,
    content: null,
  };

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
    this.props.getContent(getBaseUrl(this.props.pathname));
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
      browserHistory.push(getBaseUrl(this.props.pathname));
    }
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {object} data Form data.
   * @returns {undefined}
   */
  onSubmit(data) {
    this.props.editContent(getBaseUrl(this.props.pathname), data);
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
    if (this.props.schema && this.props.content) {
      return (
        <div id="page-edit">
          <Helmet title="Edit" />
          {/*
          <Layout
            layout={[
              [
                {
                  width: 4,
                  content: '<p>Column <b>one</b></p>',
                  url: './@@plone.app.standardtiles.html/1',
                },
                {
                  width: 8,
                  content: '<p>Column <b>two</b></p>',
                  url: './@@plone.app.standardtiles.html/2',
                },
              ],
              [
                {
                  width: 12,
                  content: '<p>Column <b>full</b></p>',
                  url: './@@plone.app.standardtiles.html/3',
                },
              ],
            ]}
          />
          */}
          <h1>Edit {this.props.schema.title}</h1>
          <Form
            schema={this.props.schema}
            formData={this.props.content}
            onSubmit={this.onSubmit}
            onCancel={this.onCancel}
          />
        </div>
      );
    }
    return <div />;
  }
}

export default asyncConnect([
  {
    key: 'schema',
    promise: ({ store: { dispatch, getState } }) =>
      dispatch(getSchema(getState().content.data['@type'])),
  },
  {
    key: 'content',
    promise: ({ location, store: { dispatch, getState } }) => {
      const form = getState().form;
      if (!isEmpty(form)) {
        return dispatch(
          editContent(
            getBaseUrl(location.pathname),
            pick(form, ['title', 'description', 'text']),
          ),
        );
      }
      return Promise.resolve(getState().content);
    },
  },
])(EditComponent);
