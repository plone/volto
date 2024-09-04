/**
 * Add container.
 * @module components/manage/Add/Add
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  BodyClass,
  Helmet,
  extractInvariantErrors,
} from '@plone/volto/helpers';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { keys, isEmpty } from 'lodash';
import { defineMessages, injectIntl } from 'react-intl';
import { Button, Grid, Menu } from 'semantic-ui-react';
import { createPortal } from 'react-dom';
import { v4 as uuid } from 'uuid';
import qs from 'query-string';
import { toast } from 'react-toastify';

import {
  createContent,
  getSchema,
  changeLanguage,
  setFormData,
} from '@plone/volto/actions';
import {
  Icon,
  Toolbar,
  Sidebar,
  Toast,
  TranslationObject,
} from '@plone/volto/components';
import { Form } from '@plone/volto/components/manage/Form';
import {
  getBaseUrl,
  hasBlocksData,
  flattenToAppURL,
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  getLanguageIndependentFields,
  langmap,
  toGettextLang,
  getSimpleDefaultBlocks,
  getDefaultBlocks,
} from '@plone/volto/helpers';

import { preloadLazyLibs } from '@plone/volto/helpers/Loadable';
import { tryParseJSON } from '@plone/volto/helpers';

import config from '@plone/volto/registry';

import saveSVG from '@plone/volto/icons/save.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

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
  error: {
    id: 'Error',
    defaultMessage: 'Error',
  },
  translateTo: {
    id: 'Translate to {lang}',
    defaultMessage: 'Translate to {lang}',
  },
  someErrors: {
    id: 'There are some errors.',
    defaultMessage: 'There are some errors.',
  },
});

/**
 * Add class.
 * @class Add
 * @extends Component
 */
class Add extends Component {
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
    location: PropTypes.objectOf(PropTypes.any),
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
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      isClient: false,
      error: null,
      formSelected: 'addForm',
    };
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.getSchema(this.props.type, getBaseUrl(this.props.pathname));
    this.setState({ isClient: true });
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      this.props.createRequest.loading &&
      nextProps.createRequest.loaded &&
      nextProps.content['@type'] === this.props.type
    ) {
      this.props.setFormData({});
      this.props.history.push(
        this.props.returnUrl || flattenToAppURL(nextProps.content['@id']),
      );
    }

    if (this.props.createRequest.loading && nextProps.createRequest.error) {
      const message =
        nextProps.createRequest.error.response?.body?.message ||
        nextProps.createRequest.error.response?.text;

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
        erroMessage = errorsList.error?.message || error;
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
      ...(config.settings.isMultilingual &&
        this.props.location?.state?.translationOf && {
          translation_of: this.props.location.state.translationOf,
          language: this.props.location.state.language,
        }),
    });
  }

  /**
   * Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  onCancel() {
    this.props.setFormData({});
    if (this.props.location?.state?.translationOf) {
      const language = this.props.location.state.languageFrom;
      const langFileName = toGettextLang(language);
      import(
        /* @vite-ignore */ '@root/../locales/' + langFileName + '.json'
      ).then((locale) => {
        this.props.changeLanguage(language, locale.default);
      });
      this.props.history.push(this.props.location?.state?.translationOf);
    } else {
      this.props.history.push(getBaseUrl(this.props.pathname));
    }
  }

  form = React.createRef();

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (this.props.schemaRequest.loaded) {
      const visual = hasBlocksData(this.props.schema.properties);
      const blocksFieldname = getBlocksFieldname(this.props.schema.properties);
      const blocksLayoutFieldname = getBlocksLayoutFieldname(
        this.props.schema.properties,
      );
      const translationObject = this.props.location?.state?.translationObject;

      const translateTo = translationObject
        ? langmap?.[this.props.location?.state?.language]?.nativeName
        : null;

      // Get initial blocks from local config, if any
      let initialBlocks, initialBlocksLayout;
      const initialContentTypeBlocks =
        config.blocks?.initialBlocks[this.props.type];
      if (initialContentTypeBlocks) {
        if (typeof initialContentTypeBlocks?.[0] === 'string') {
          // Simple (legacy) default blocks definition
          [initialBlocks, initialBlocksLayout] = getSimpleDefaultBlocks(
            initialContentTypeBlocks,
          );
        } else {
          [initialBlocks, initialBlocksLayout] = getDefaultBlocks(
            initialContentTypeBlocks,
          );
        }
      }

      // Lookup initialBlocks and initialBlocksLayout within schema, if any
      const schemaBlocks =
        this.props.schema.properties[blocksFieldname]?.default;
      const schemaBlocksLayout =
        this.props.schema.properties[blocksLayoutFieldname]?.default?.items;

      if (!isEmpty(schemaBlocksLayout) && !isEmpty(schemaBlocks)) {
        initialBlocks = {};
        initialBlocksLayout = [];
        schemaBlocksLayout.forEach((value) => {
          if (!isEmpty(schemaBlocks[value])) {
            let newUid = uuid();
            initialBlocksLayout.push(newUid);
            initialBlocks[newUid] = schemaBlocks[value];
            initialBlocks[newUid].block = newUid;

            // Layout ID - keep a reference to the original block id within layout
            initialBlocks[newUid]['@layout'] = value;
          }
        });
      }

      //copy blocks from translationObject
      if (translationObject && blocksFieldname && blocksLayoutFieldname) {
        initialBlocks = {};
        initialBlocksLayout = [];
        const originalBlocks = JSON.parse(
          JSON.stringify(translationObject[blocksFieldname]),
        );
        const originalBlocksLayout =
          translationObject[blocksLayoutFieldname].items;

        originalBlocksLayout.forEach((value) => {
          if (!isEmpty(originalBlocks[value])) {
            let newUid = uuid();
            initialBlocksLayout.push(newUid);
            initialBlocks[newUid] = originalBlocks[value];
            initialBlocks[newUid].block = newUid;

            // Layout ID - keep a reference to the original block id within layout
            initialBlocks[newUid]['@canonical'] = value;
          }
        });
      }

      const lifData = () => {
        const data = {};
        if (translationObject) {
          getLanguageIndependentFields(this.props.schema).forEach(
            (lif) => (data[lif] = translationObject[lif]),
          );
        }
        return data;
      };

      const pageAdd = (
        <div id="page-add">
          <Helmet
            title={this.props.intl.formatMessage(messages.add, {
              type: this.props.type,
            })}
          />
          <Form
            ref={this.form}
            key="translated-or-new-content-form"
            navRoot={
              this.props.content?.['@components']?.navroot?.navroot || {}
            }
            schema={this.props.schema}
            type={this.props.type}
            formData={{
              ...(blocksFieldname && {
                [blocksFieldname]:
                  initialBlocks ||
                  this.props.schema.properties[blocksFieldname]?.default,
              }),
              ...(blocksLayoutFieldname && {
                [blocksLayoutFieldname]: {
                  items:
                    initialBlocksLayout ||
                    this.props.schema.properties[blocksLayoutFieldname]?.default
                      ?.items,
                },
              }),
              // Copy the Language Independent Fields values from the to-be translated content
              // into the default values of the translated content Add form.
              ...lifData(),
              parent: {
                '@id': this.props.content?.['@id'] || '',
              },
            }}
            requestError={this.state.error}
            onSubmit={this.onSubmit}
            hideActions
            pathname={this.props.pathname}
            visual={visual}
            title={
              this.props?.schema?.title
                ? this.props.intl.formatMessage(messages.add, {
                    type: this.props.schema.title,
                  })
                : null
            }
            loading={this.props.createRequest.loading}
            isFormSelected={this.state.formSelected === 'addForm'}
            onSelectForm={() => {
              this.setState({ formSelected: 'addForm' });
            }}
            global
            // Properties to pass to the BlocksForm to match the View ones
            history={this.props.history}
            location={this.props.location}
            token={this.props.token}
          />
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
                      loading={this.props.createRequest.loading}
                      disabled={this.props.createRequest.loading}
                    >
                      <Icon
                        name={saveSVG}
                        className="circled"
                        size="30px"
                        title={this.props.intl.formatMessage(messages.save)}
                      />
                    </Button>
                    <Button className="cancel" onClick={() => this.onCancel()}>
                      <Icon
                        name={clearSVG}
                        className="circled"
                        aria-label={this.props.intl.formatMessage(
                          messages.cancel,
                        )}
                        size="30px"
                        title={this.props.intl.formatMessage(messages.cancel)}
                      />
                    </Button>
                  </>
                }
              />,
              document.getElementById('toolbar'),
            )}
          {visual &&
            this.state.isClient &&
            createPortal(<Sidebar />, document.getElementById('sidebar'))}
        </div>
      );

      return translationObject ? (
        <>
          <BodyClass className="babel-view" />
          <Grid
            celled="internally"
            stackable
            columns={2}
            id="page-add-translation"
          >
            <Grid.Column className="source-object">
              <TranslationObject
                translationObject={translationObject}
                schema={this.props.schema}
                pathname={this.props.pathname}
                visual={visual}
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
                  <Menu.Item name={translateTo.toUpperCase()} active={true}>
                    {`${this.props.intl.formatMessage(messages.translateTo, {
                      lang: translateTo,
                    })}`}
                  </Menu.Item>
                </Menu>
                {pageAdd}
              </div>
            </Grid.Column>
          </Grid>
        </>
      ) : (
        pageAdd
      );
    }
    return <div />;
  }
}

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      createRequest: state.content.create,
      schemaRequest: state.schema,
      content: state.content.data,
      schema: state.schema.schema,
      pathname: props.location.pathname,
      returnUrl: qs.parse(props.location.search).return_url,
      type: qs.parse(props.location.search).type,
    }),
    { createContent, getSchema, changeLanguage, setFormData },
  ),
  preloadLazyLibs('cms'),
)(Add);
