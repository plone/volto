/**
 * Edit container.
 * @module components/manage/Edit/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet, extractInvariantErrors } from '@plone/volto/helpers';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { asyncConnect, hasApiExpander } from '@plone/volto/helpers';
import { defineMessages, injectIntl } from 'react-intl';
import { Button, Grid, Menu } from 'semantic-ui-react';
import { createPortal } from 'react-dom';
import qs from 'query-string';
import { find } from 'lodash';
import { toast } from 'react-toastify';

import {
  Forbidden,
  Icon,
  Sidebar,
  Toast,
  Toolbar,
  Unauthorized,
  CompareLanguages,
  TranslationObject,
} from '@plone/volto/components';
import { Form } from '@plone/volto/components/manage/Form';
import {
  updateContent,
  getContent,
  lockContent,
  unlockContent,
  getSchema,
  listActions,
  setFormData,
} from '@plone/volto/actions';
import {
  flattenToAppURL,
  getBaseUrl,
  hasBlocksData,
} from '@plone/volto/helpers';
import { preloadLazyLibs } from '@plone/volto/helpers/Loadable';
import { tryParseJSON } from '@plone/volto/helpers';

import saveSVG from '@plone/volto/icons/save.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

import config from '@plone/volto/registry';

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
  error: {
    id: 'Error',
    defaultMessage: 'Error',
  },
  someErrors: {
    id: 'There are some errors.',
    defaultMessage: 'There are some errors.',
  },
});

/**
 * Edit class.
 * @class Edit
 * @extends Component
 */
class Edit extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    updateContent: PropTypes.func.isRequired,
    getContent: PropTypes.func.isRequired,
    getSchema: PropTypes.func.isRequired,
    lockContent: PropTypes.func.isRequired,
    unlockContent: PropTypes.func.isRequired,
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
    objectActions: PropTypes.array,
    newId: PropTypes.string,
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
      visual: true,
      isClient: false,
      error: null,
      formSelected: 'editForm',
      newId: null,
    };
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    if (this.props.getRequest.loaded && this.props.content?.['@type']) {
      this.props.getSchema(
        this.props.content['@type'],
        getBaseUrl(this.props.pathname),
      );
    }
    this.setState({
      isClient: true,
      comparingLanguage: null,
    });
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.getRequest.loading && nextProps.getRequest.loaded) {
      if (nextProps.content['@type']) {
        this.props.getSchema(
          nextProps.content['@type'],
          getBaseUrl(this.props.pathname),
        );
      }
    }
    if (this.props.schemaRequest.loading && nextProps.schemaRequest.loaded) {
      if (!hasBlocksData(nextProps.schema.properties)) {
        this.setState({
          visual: false,
        });
      }
    }
    // Hack for make the Plone site editable by Volto Editor without checkings
    if (this.props?.content?.['@type'] === 'Plone Site') {
      this.setState({
        visual: true,
      });
    }
    if (this.props.updateRequest.loading && nextProps.updateRequest.loaded) {
      this.props.setFormData({});
      this.props.history.push(
        this.props.returnUrl || getBaseUrl(this.props.pathname),
      );
    }

    if (this.props.updateRequest.loading && nextProps.updateRequest.error) {
      const message =
        nextProps.updateRequest.error?.response?.body?.error?.message ||
        nextProps.updateRequest.error?.response?.body?.message ||
        nextProps.updateRequest.error?.response?.text ||
        '';

      const error =
        new DOMParser().parseFromString(message, 'text/html')?.all[0]
          ?.textContent || message;

      const errorsList = tryParseJSON(error);
      let erroMessage;
      if (Array.isArray(errorsList)) {
        const invariantErrors = extractInvariantErrors(errorsList);
        if (invariantErrors.length > 0) {
          // Plone invariant validation message.
          erroMessage = invariantErrors.join(' - ');
        } else {
          // Error in specific field.
          erroMessage = this.props.intl.formatMessage(messages.someErrors);
        }
      } else {
        erroMessage = error;
      }

      this.setState({ error: error });

      toast.error(
        <Toast
          error
          title={this.props.intl.formatMessage(messages.error)}
          content={erroMessage}
        />,
      );
    }

    if (
      nextProps.compare_to &&
      ((this.state.compareTo &&
        nextProps.compare_to['@id'] !== this.state.compareTo['@id']) ||
        !this.state.compareTo)
    ) {
      this.setState({ compareTo: nextProps.compare_to });
    }
  }

  /**
   * Component will unmount
   * @method componentWillUnmount
   * @returns {undefined}
   */
  componentWillUnmount() {
    if (this.props.content?.lock?.locked) {
      const baseUrl = getBaseUrl(this.props.pathname);
      const { newId } = this.state;
      // Unlock the page, taking a possible id change into account
      this.props.unlockContent(
        newId ? baseUrl.replace(/\/[^/]*$/, '/' + newId) : baseUrl,
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
    const lock_token = this.props.content?.lock?.token;
    const headers = lock_token ? { 'Lock-Token': lock_token } : {};
    // if the id has changed, remember it for unlock control
    if ('id' in data) {
      this.setState({ newId: data.id });
    }
    this.props.updateContent(getBaseUrl(this.props.pathname), data, headers);
  }

  /**
   * Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  onCancel() {
    this.props.setFormData({});
    this.props.history.push(
      this.props.returnUrl || getBaseUrl(this.props.pathname),
    );
  }

  setComparingLanguage(lang, content_id) {
    this.setState({ comparingLanguage: lang });
    this.props.getContent(
      flattenToAppURL(content_id),
      null,
      'compare_to',
      null,
    );
  }

  form = React.createRef();
  toolbarRef = React.createRef;
  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const editPermission = find(this.props.objectActions, { id: 'edit' });

    const pageEdit = (
      <Form
        isEditForm
        ref={this.form}
        navRoot={this.props.content?.['@components']?.navroot?.navroot || {}}
        schema={this.props.schema}
        type={this.props.content?.['@type']}
        formData={this.props.content}
        requestError={this.state.error}
        onSubmit={this.onSubmit}
        hideActions
        pathname={this.props.pathname}
        visual={this.state.visual}
        title={
          this.props?.schema?.title
            ? this.props.intl.formatMessage(messages.edit, {
                title: this.props.schema.title,
              })
            : null
        }
        loading={this.props.updateRequest.loading}
        isFormSelected={this.state.formSelected === 'editForm'}
        onSelectForm={() => {
          this.setState({ formSelected: 'editForm' });
        }}
        global
        // Properties to pass to the BlocksForm to match the View ones
        history={this.props.history}
        location={this.props.location}
        token={this.props.token}
      />
    );

    return (
      <div id="page-edit">
        {this.props.objectActions?.length > 0 && (
          <>
            {editPermission && (
              <>
                <Helmet
                  title={
                    this.props?.schema?.title
                      ? this.props.intl.formatMessage(messages.edit, {
                          title: this.props.schema.title,
                        })
                      : null
                  }
                >
                  {this.props.content?.language && (
                    <html lang={this.props.content.language.token} />
                  )}
                </Helmet>

                {this.state.comparingLanguage && this.state.compareTo ? (
                  <Grid
                    celled="internally"
                    stackable
                    columns={2}
                    id="page-compare-translation"
                  >
                    <Grid.Column className="source-object">
                      <TranslationObject
                        translationObject={this.state.compareTo}
                        schema={this.props.schema}
                        pathname={this.props.pathname}
                        visual={this.state.visual}
                        isFormSelected={
                          this.state.formSelected === 'translationObjectForm'
                        }
                        onSelectForm={() => {
                          this.setState({
                            formSelected: 'translationObjectForm',
                          });
                        }}
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <div className="new-translation">
                        <Menu pointing secondary attached tabular>
                          <Menu.Item
                            name={this.props.content.language?.token.toUpperCase()}
                            active={true}
                          >
                            {this.props.content.language?.token.toUpperCase()}
                          </Menu.Item>
                        </Menu>

                        {pageEdit}
                      </div>
                    </Grid.Column>
                  </Grid>
                ) : (
                  pageEdit
                )}
              </>
            )}

            {editPermission &&
              this.state.visual &&
              this.state.isClient &&
              createPortal(<Sidebar />, document.getElementById('sidebar'))}
          </>
        )}
        {!editPermission && (
          <>
            {this.props.token ? (
              <Forbidden
                pathname={this.props.pathname}
                staticContext={this.props.staticContext}
              />
            ) : (
              <Unauthorized
                pathname={this.props.pathname}
                staticContext={this.props.staticContext}
              />
            )}
          </>
        )}
        {this.state.isClient &&
          createPortal(
            <Toolbar
              pathname={this.props.pathname}
              hideDefaultViewButtons
              inner={
                <>
                  <Button
                    id="toolbar-save"
                    className="save"
                    aria-label={this.props.intl.formatMessage(messages.save)}
                    onClick={() => this.form.current.onSubmit()}
                    disabled={this.props.updateRequest.loading}
                    loading={this.props.updateRequest.loading}
                  >
                    <Icon
                      name={saveSVG}
                      className="circled"
                      size="30px"
                      title={this.props.intl.formatMessage(messages.save)}
                    />
                  </Button>
                  <Button
                    className="cancel"
                    aria-label={this.props.intl.formatMessage(messages.cancel)}
                    onClick={() => this.onCancel()}
                  >
                    <Icon
                      name={clearSVG}
                      className="circled"
                      size="30px"
                      title={this.props.intl.formatMessage(messages.cancel)}
                    />
                  </Button>

                  {config.settings.isMultilingual && (
                    <CompareLanguages
                      content={this.props.content}
                      visual={this.state.visual}
                      setComparingLanguage={(lang, id) => {
                        this.setComparingLanguage(lang, id);
                      }}
                      comparingLanguage={this.state.comparingLanguage}
                      pathname={this.props.location.pathname}
                      toolbarRef={this.toolbarRef}
                    />
                  )}
                </>
              }
            />,
            document.getElementById('toolbar'),
          )}
      </div>
    );
  }
}

export const __test__ = compose(
  injectIntl,
  connect(
    (state, props) => ({
      objectActions: state.actions.actions.object,
      token: state.userSession.token,
      content: state.content.data,
      compare_to: state.content.subrequests?.compare_to?.data,
      schema: state.schema.schema,
      getRequest: state.content.get,
      schemaRequest: state.schema,
      updateRequest: state.content.update,
      createRequest: state.content.create,
      pathname: props.location.pathname,
      returnUrl: qs.parse(props.location.search).return_url,
    }),
    {
      updateContent,
      getContent,
      getSchema,
      lockContent,
      unlockContent,
    },
  ),
)(Edit);

export default compose(
  injectIntl,
  asyncConnect([
    {
      key: 'actions',
      promise: async ({ location, store: { dispatch } }) => {
        // Do not trigger the actions action if the expander is present
        if (!hasApiExpander('actions', getBaseUrl(location.pathname))) {
          return await dispatch(listActions(getBaseUrl(location.pathname)));
        }
      },
    },
    {
      key: 'content',
      promise: async ({ location, store: { dispatch } }) => {
        const content = await dispatch(
          getContent(getBaseUrl(location.pathname)),
        );
        if (content?.lock !== undefined) {
          await dispatch(lockContent(getBaseUrl(location.pathname)));
        }
        return content;
      },
    },
  ]),
  connect(
    (state, props) => ({
      objectActions: state.actions.actions.object,
      token: state.userSession.token,
      content: state.content.data,
      compare_to: state.content.subrequests?.compare_to?.data,
      schema: state.schema.schema,
      getRequest: state.content.get,
      schemaRequest: state.schema,
      updateRequest: state.content.update,
      pathname: props.location.pathname,
      returnUrl: qs.parse(props.location.search).return_url,
    }),
    {
      updateContent,
      getContent,
      getSchema,
      lockContent,
      unlockContent,
      setFormData,
    },
  ),
  preloadLazyLibs('cms'),
)(Edit);
