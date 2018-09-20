/**
 * Add container.
 * @module components/manage/Add/Add
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router, withRouter } from 'react-router-dom';
import { asyncConnect } from 'redux-connect';
import { keys, isEmpty, pick } from 'lodash';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { Portal } from 'react-portal';
import { Icon } from 'semantic-ui-react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import qs from 'query-string';
import config from '~/config';

import { createContent, getSchema } from '../../../actions';
import { Form, Toolbar } from '../../../components';
import {
  getBaseUrl,
  hasTilesData,
  getTilesFieldname,
  getTilesLayoutFieldname,
} from '../../../helpers';

const messages = defineMessages({
  add: {
    id: 'Add {type}',
    defaultMessage: 'Add {type}',
  },
  save: {
    id: 'Save',
    defaultMessage: 'Save',
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
  properties: {
    id: 'Properties',
    defaultMessage: 'Properties',
  },
  visual: {
    id: 'Visual',
    defaultMessage: 'Visual',
  },
});

@DragDropContext(HTML5Backend)
@injectIntl
@connect(
  (state, props) => ({
    createRequest: state.content.create,
    schemaRequest: state.schema,
    content: state.content.data,
    schema: state.schema.schema,
    pathname: props.location.pathname,
    returnUrl: qs.parse(props.location.search).return_url,
    type: qs.parse(props.location.search).type,
  }),
  dispatch => bindActionCreators({ createContent, getSchema }, dispatch),
)
/**
 * AddComponent class.
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
    createContent: PropTypes.func.isRequired,
    getSchema: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    schema: PropTypes.objectOf(PropTypes.any),
    content: PropTypes.shape({
      // eslint-disable-line react/no-unused-prop-types
      '@id': PropTypes.string,
      '@type': PropTypes.string,
    }),
    returnUrl: PropTypes.string,
    createRequest: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    schemaRequest: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    type: PropTypes.string,
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
    returnUrl: null,
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
    this.state = {
      visual: false,
    };
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onToggleVisual = this.onToggleVisual.bind(this);
  }

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.getSchema(this.props.type);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (
      this.props.createRequest.loading &&
      nextProps.createRequest.loaded &&
      nextProps.content['@type'] === this.props.type
    ) {
      this.props.history.push(
        this.props.returnUrl ||
          nextProps.content['@id'].replace(config.apiPath, ''),
      );
    }
    if (this.props.schemaRequest.loading && nextProps.schemaRequest.loaded) {
      if (hasTilesData(nextProps.schema.properties)) {
        this.setState({
          visual: true,
        });
      }
    }
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {object} data Form data.
   * @returns {undefined}
   */
  onSubmit(data) {
    this.props.createContent(getBaseUrl(this.props.pathname), {
      ...data,
      '@static_behaviors': this.props.schema.definitions
        ? keys(this.props.schema.definitions)
        : null,
      '@type': this.props.type,
    });
  }

  /**
   * Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  onCancel() {
    this.props.history.push(getBaseUrl(this.props.pathname));
  }

  /**
   * Toggle visual
   * @method onToggleVisual
   * @returns {undefined}
   */
  onToggleVisual() {
    this.setState({
      visual: !this.state.visual,
    });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (this.props.schemaRequest.loaded) {
      return (
        <div id="page-add">
          <Helmet
            title={this.props.intl.formatMessage(messages.add, {
              type: this.props.type,
            })}
          />
          <Form
            ref={instance => {
              if (instance) {
                this.form = instance.refs.wrappedInstance;
              }
            }}
            schema={this.props.schema}
            formData={{
              [getTilesFieldname(this.props.schema.properties)]: null,
              [getTilesLayoutFieldname(this.props.schema.properties)]: null,
            }}
            onSubmit={this.onSubmit}
            hideActions
            pathname={this.props.pathname}
            visual={this.state.visual}
            title={this.props.intl.formatMessage(messages.add, {
              type: this.props.type,
            })}
            loading={this.props.createRequest.loading}
          />
          <Portal node={__CLIENT__ && document.getElementById('toolbar')}>
            <Toolbar
              pathname={this.props.pathname}
              inner={
                <div>
                  <a className="item" onClick={() => this.form.onSubmit()}>
                    <Icon
                      name="save"
                      size="big"
                      color="blue"
                      title={this.props.intl.formatMessage(messages.save)}
                    />
                  </a>
                  {hasTilesData(this.props.schema.properties) && (
                    <a className="item" onClick={() => this.onToggleVisual()}>
                      <Icon
                        name={this.state.visual ? 'tasks' : 'block layout'}
                        size="big"
                        title={this.props.intl.formatMessage(
                          this.state.visual
                            ? messages.properties
                            : messages.visual,
                        )}
                      />
                    </a>
                  )}
                  <a className="item" onClick={() => this.onCancel()}>
                    <Icon
                      name="close"
                      size="big"
                      color="red"
                      title={this.props.intl.formatMessage(messages.cancel)}
                    />
                  </a>
                </div>
              }
            />
          </Portal>
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
      dispatch(getSchema(qs.parse(location.search).type)),
  },
  {
    key: 'content',
    promise: ({ location, store: { dispatch, getState } }) => {
      const { form } = getState();
      if (!isEmpty(form)) {
        return dispatch(
          createContent(getBaseUrl(location.pathname), {
            ...pick(form, ['title', 'description', 'text']),
            '@type': 'Document',
          }),
        );
      }
      return Promise.resolve(getState().content);
    },
  },
])(withRouter(AddComponent));
