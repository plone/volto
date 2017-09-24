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
  FormattedMessage,
  defineMessages,
  injectIntl,
  intlShape,
} from 'react-intl';

import { Form } from '../../../components';
import { editContent, getContent, getSchema } from '../../../actions';
import { getBaseUrl } from '../../../helpers';

const messages = defineMessages({
  edit: {
    id: 'Edit {title}',
    defaultMessage: 'Edit {title}',
  },
});

@injectIntl
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
/**
 * Component to display the edit form.
 * @class EditComponent
 * @extends Component
 */
export class EditComponent extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    /**
     * Action to edit content
     */
    editContent: PropTypes.func.isRequired,
    /**
     * Action to get content
     */
    getContent: PropTypes.func.isRequired,
    /**
     * Action to get the schema
     */
    getSchema: PropTypes.func.isRequired,
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
     * Edit request status
     */
    getRequest: PropTypes.shape({
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
     * Pathname of the object
     */
    pathname: PropTypes.string.isRequired,
    /**
     * Content of the object
     */
    content: PropTypes.shape({
      /**
       * Type of the object
       */
      '@type': PropTypes.string,
    }),
    /**
     * Schema of the object
     */
    schema: PropTypes.objectOf(PropTypes.any),
    /**
     * i18n object
     */
    intl: intlShape.isRequired,
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
   */
  componentDidMount() {
    this.props.getContent(getBaseUrl(this.props.pathname));
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
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
   */
  onSubmit(data) {
    this.props.editContent(getBaseUrl(this.props.pathname), data);
  }

  /**
   * Cancel handler
   * @method onCancel
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
          <Helmet
            title={this.props.intl.formatMessage(messages.edit, {
              title: this.props.schema.title,
            })}
          />
          <h1>
            <FormattedMessage
              id="Edit {title}"
              defaultMessage="Edit {title}"
              values={{
                title: this.props.schema.title,
              }}
            />
          </h1>
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
