/**
 * Add container.
 * @module components/manage/Add/Add
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

import { addContent, getSchema } from '../../../actions';
import { Form } from '../../../components';
import config from '../../../config';
import { getBaseUrl } from '../../../helpers';

const messages = defineMessages({
  add: {
    id: 'Add {type}',
    defaultMessage: 'Add {type}',
  },
});

@injectIntl
@connect(
  (state, props) => ({
    request: state.content.add,
    content: state.content.data,
    schema: state.schema.schema,
    pathname: props.location.pathname,
    type: props.location.query.type,
  }),
  dispatch => bindActionCreators({ addContent, getSchema }, dispatch),
)
/**
 * Component to display an add view.
 * @class AddComponent
 * @extends Component
 */
export class AddComponent extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    /**
     * Action to add content
     */
    addContent: PropTypes.func.isRequired,
    /**
     * Action to get a schema
     */
    getSchema: PropTypes.func.isRequired,
    /**
     * Pathname of the parent of the object to be added
     */
    pathname: PropTypes.string.isRequired,
    /**
     * Schema of the object to be added
     */
    schema: PropTypes.objectOf(PropTypes.any),
    /**
     * Content of the object to be added
     */
    content: PropTypes.shape({
      /**
       * Id of the object
       */
      '@id': PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    }),
    /**
     * Request status of the actions
     */
    request: PropTypes.shape({
      /**
       * Loading state
       */
      loading: PropTypes.bool,
      /**
       * Loaded state
       */
      loaded: PropTypes.bool,
    }).isRequired,
    /**
     * Type to be added
     */
    type: PropTypes.string,
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
    type: 'Default',
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
   * Component will mount
   * @method componentWillMount
   */
  componentWillMount() {
    this.props.getSchema(this.props.type);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
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
   */
  onSubmit(data) {
    this.props.addContent(getBaseUrl(this.props.pathname), {
      ...data,
      '@type': this.props.type,
    });
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
    if (this.props.schema) {
      return (
        <div id="page-add">
          <Helmet
            title={this.props.intl.formatMessage(messages.add, {
              type: this.props.type,
            })}
          />
          <h1>
            <FormattedMessage
              id="Add {type}"
              defaultMessage="Add {type}"
              values={{ type: this.props.type }}
            />
          </h1>
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

export default asyncConnect([
  {
    key: 'schema',
    promise: ({ location, store: { dispatch } }) =>
      dispatch(getSchema(location.query.type)),
  },
  {
    key: 'content',
    promise: ({ location, store: { dispatch, getState } }) => {
      const form = getState().form;
      if (!isEmpty(form)) {
        return dispatch(
          addContent(getBaseUrl(location.pathname), {
            ...pick(form, ['title', 'description', 'text']),
            '@type': 'Document',
          }),
        );
      }
      return Promise.resolve(getState().content);
    },
  },
])(AddComponent);
