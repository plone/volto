/**
 * Edit container.
 * @module components/manage/Edit/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router, withRouter } from 'react-router-dom';
import { asyncConnect } from 'redux-connect';
import { isEmpty, pick } from 'lodash';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { Portal } from 'react-portal';
import { Icon } from 'semantic-ui-react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import qs from 'query-string';

import { Form, Toolbar } from '../../../components';
import { updateContent, getContent, getSchema } from '../../../actions';
import { getBaseUrl, hasTilesData } from '../../../helpers';

const messages = defineMessages({
  edit: {
    id: 'Edit {title}',
    defaultMessage: 'Edit {title}',
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
    content: state.content.data,
    schema: state.schema.schema,
    getRequest: state.content.get,
    schemaRequest: state.schema,
    updateRequest: state.content.update,
    pathname: props.location.pathname,
    returnUrl: qs.parse(props.location.search).return_url,
  }),
  dispatch =>
    bindActionCreators(
      {
        updateContent,
        getContent,
        getSchema,
      },
      dispatch,
    ),
)
/**
 * EditComponent class.
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
    updateContent: PropTypes.func.isRequired,
    getContent: PropTypes.func.isRequired,
    getSchema: PropTypes.func.isRequired,
    updateRequest: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    schemaRequest: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    getRequest: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    pathname: PropTypes.string.isRequired,
    returnUrl: PropTypes.string,
    content: PropTypes.shape({
      '@type': PropTypes.string,
    }),
    schema: PropTypes.objectOf(PropTypes.any),
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
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs EditComponent
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
    if (this.props.schemaRequest.loading && nextProps.schemaRequest.loaded) {
      if (hasTilesData(nextProps.schema.properties)) {
        this.setState({
          visual: true,
        });
      }
    }
    if (this.props.updateRequest.loading && nextProps.updateRequest.loaded) {
      this.props.history.push(
        this.props.returnUrl || getBaseUrl(this.props.pathname),
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
    this.props.updateContent(getBaseUrl(this.props.pathname), data);
  }

  /**
   * Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  onCancel() {
    this.props.history.push(
      this.props.returnUrl || getBaseUrl(this.props.pathname),
    );
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
    if (this.props.schemaRequest.loaded && this.props.content) {
      return (
        <div id="page-edit">
          <Helmet
            title={this.props.intl.formatMessage(messages.edit, {
              title: this.props.schema.title,
            })}
          />
          <Form
            ref={instance => {
              if (instance) {
                this.form = instance.refs.wrappedInstance;
              }
            }}
            schema={this.props.schema}
            formData={this.props.content}
            onSubmit={this.onSubmit}
            hideActions
            pathname={this.props.pathname}
            visual={this.state.visual}
            title={this.props.intl.formatMessage(messages.edit, {
              title: this.props.schema.title,
            })}
            loading={this.props.updateRequest.loading}
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
    promise: ({ store: { dispatch, getState } }) =>
      dispatch(getSchema(getState().content.data['@type'])),
  },
  {
    key: 'content',
    promise: ({ location, store: { dispatch, getState } }) => {
      const { form } = getState();
      if (!isEmpty(form)) {
        return dispatch(
          updateContent(
            getBaseUrl(location.pathname),
            pick(form, ['title', 'description', 'text']),
          ),
        );
      }
      return Promise.resolve(getState().content);
    },
  },
])(withRouter(EditComponent));
