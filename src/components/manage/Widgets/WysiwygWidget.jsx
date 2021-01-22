/**
 * WysiwygWidget container.
 * @module components/manage/Widgets/WysiwygWidget
 */

import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { compose } from 'redux';

// NOTE: you can uncomment this and the bug is gone but then the Editor is not
// loaded through Loadable:
//import Editor from 'draft-js-plugins-editor';

// TODO: remove the imports of draft.js related modules from below, which are
// not loaded through Loadable:
import { stateFromHTML } from 'draft-js-import-html';
import { convertToRaw, EditorState } from 'draft-js';
import redraft from 'redraft';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';

import { Form, Label, TextArea } from 'semantic-ui-react';
import { map } from 'lodash';
import { defineMessages, injectIntl } from 'react-intl';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';

import { settings } from '~/config';
import { FormFieldWrapper } from '@plone/volto/components';

import loadable from '@loadable/component';
const LibDraftJsPluginsEditor = loadable.lib(() =>
  import('draft-js-plugins-editor'),
);
const LibDraftJsImportHtml = loadable.lib(() => import('draft-js-import-html'));
const LibDraftJs = loadable.lib(() => import('draft-js'));
const LibRedraft = loadable.lib(() => import('redraft'));
const LibDraftJsInlineToolbarPlugin = loadable.lib(() =>
  import('draft-js-inline-toolbar-plugin'),
);

const messages = defineMessages({
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  idTitle: {
    id: 'Short Name',
    defaultMessage: 'Short Name',
  },
  idDescription: {
    id: 'Used for programmatic access to the fieldset.',
    defaultMessage: 'Used for programmatic access to the fieldset.',
  },
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  description: {
    id: 'Description',
    defaultMessage: 'Description',
  },
  required: {
    id: 'Required',
    defaultMessage: 'Required',
  },
  delete: {
    id: 'Delete',
    defaultMessage: 'Delete',
  },
});

/**
 * WysiwygWidget container class.
 * @class WysiwygWidget
 * @extends Component
 */
class WysiwygWidget extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    /**
     * Id of the field
     */
    id: PropTypes.string.isRequired,
    /**
     * Title of the field
     */
    title: PropTypes.string.isRequired,
    /**
     * Description of the field
     */
    description: PropTypes.string,
    /**
     * True if field is required
     */
    required: PropTypes.bool,
    /**
     * Value of the field
     */
    value: PropTypes.shape({
      /**
       * Content type of the value
       */
      'content-type': PropTypes.string,
      /**
       * Data of the value
       */
      data: PropTypes.string,
      /**
       * Encoding of the value
       */
      encoding: PropTypes.string,
    }),
    /**
     * List of error messages
     */
    error: PropTypes.arrayOf(PropTypes.string),
    /**
     * On change handler
     */
    onChange: PropTypes.func,
    /**
     * On delete handler
     */
    onDelete: PropTypes.func,
    /**
     * On edit handler
     */
    onEdit: PropTypes.func,
    /**
     * Wrapped form component
     */
    wrapped: PropTypes.bool,
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    description: null,
    required: false,
    value: {
      'content-type': 'text/html',
      data: '',
      encoding: 'utf8',
    },
    error: [],
    onEdit: null,
    onDelete: null,
    onChange: null,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygWidget
   */
  constructor(props) {
    super(props);

    this.state = { editorState: null, inlineToolbarPlugin: null };

    this.schema = {
      fieldsets: [
        {
          id: 'default',
          title: props.intl.formatMessage(messages.default),
          fields: ['title', 'id', 'description', 'required'],
        },
      ],
      properties: {
        id: {
          type: 'string',
          title: props.intl.formatMessage(messages.idTitle),
          description: props.intl.formatMessage(messages.idDescription),
        },
        title: {
          type: 'string',
          title: props.intl.formatMessage(messages.title),
        },
        description: {
          type: 'string',
          widget: 'textarea',
          title: props.intl.formatMessage(messages.description),
        },
        required: {
          type: 'boolean',
          title: props.intl.formatMessage(messages.required),
        },
      },
      required: ['id', 'title'],
    };

    this.onChange = this.onChange.bind(this);
  }

  /**
   * Change handler
   * @method onChange
   * @param {object} editorState Editor state.
   * @returns {undefined}
   */
  onChange(editorState) {
    this.setState({ editorState });
    const mockStore = configureStore();

    this.props.onChange(this.props.id, {
      'content-type': this.props.value
        ? this.props.value['content-type']
        : 'text/html',
      encoding: this.props.value ? this.props.value.encoding : 'utf8',
      data: ReactDOMServer.renderToStaticMarkup(
        <Provider
          store={mockStore({
            userSession: {
              token: this.props.token,
            },
          })}
        >
          <MemoryRouter>
            {this.libRedraftRef.current.redraft(
              this.libDraftJsRef.current.convertToRaw(
                editorState.getCurrentContent(),
              ),
              settings.ToHTMLRenderers,
              settings.ToHTMLOptions,
            )}
          </MemoryRouter>
        </Provider>,
      ),
    });
  }

  firstRender = true;
  libRedraftRef = React.createRef();
  libDraftJsRef = React.createRef();

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const {
      id,
      title,
      description,
      required,
      value,
      error,
      fieldSet,
    } = this.props;

    if (__SERVER__) {
      return (
        <Form.Field
          inline
          required={required}
          error={error.length > 0}
          className={description ? 'help' : ''}
          id={`${fieldSet || 'field'}-${id}`}
        >
          <div className="wrapper">
            <label htmlFor={`field-${id}`}>{title}</label>
            <TextArea id={id} name={id} value={value ? value.data : ''} />
            {description && <p className="help">{description}</p>}
            {map(error, (message) => (
              <Label key={message} basic color="red" pointing>
                {message}
              </Label>
            ))}
          </div>
        </Form.Field>
      );
    }

    return (
      <>
        <LibRedraft ref={this.libRedraftRef} />
        <LibDraftJsPluginsEditor>
          {({ default: Editor }) => {
            return (
              <LibDraftJsInlineToolbarPlugin>
                {({ default: createInlineToolbarPlugin }) => {
                  return (
                    <LibDraftJsImportHtml>
                      {({ stateFromHTML }) => {
                        return (
                          <LibDraftJs ref={this.libDraftJsRef}>
                            {({ EditorState }) => {
                              if (this.firstRender) {
                                this.firstRender = false;

                                let editorState;
                                if (this.props.value && this.props.value.data) {
                                  const contentState = stateFromHTML(
                                    this.props.value.data,
                                    {
                                      customBlockFn:
                                        settings.FromHTMLCustomBlockFn,
                                    },
                                  );
                                  editorState = EditorState.createWithContent(
                                    contentState,
                                  );
                                } else {
                                  editorState = EditorState.createEmpty();
                                }

                                const inlineToolbarPlugin = createInlineToolbarPlugin(
                                  {
                                    structure:
                                      settings.richTextEditorInlineToolbarButtons,
                                  },
                                );

                                this.setState({
                                  editorState,
                                  inlineToolbarPlugin,
                                });
                                return null;
                              }

                              if (!this.state?.inlineToolbarPlugin) {
                                return null;
                              }

                              const {
                                InlineToolbar,
                              } = this.state.inlineToolbarPlugin;

                              return (
                                !!this.state.editorState &&
                                !!this.state.inlineToolbarPlugin && (
                                  <FormFieldWrapper
                                    {...this.props}
                                    className="wysiwyg"
                                  >
                                    <div style={{ boxSizing: 'initial' }}>
                                      {this.props.onChange ? (
                                        <>
                                          <Editor
                                            id={`field-${id}`}
                                            readOnly={this.props.isDisabled}
                                            onChange={this.onChange}
                                            editorState={this.state.editorState}
                                            plugins={[
                                              this.state.inlineToolbarPlugin,
                                              ...settings.richTextEditorPlugins,
                                            ]}
                                            blockRenderMap={
                                              settings.extendedBlockRenderMap
                                            }
                                            blockStyleFn={settings.blockStyleFn}
                                            customStyleMap={
                                              settings.customStyleMap
                                            }
                                          />
                                          {this.props.onChange && (
                                            <InlineToolbar />
                                          )}
                                        </>
                                      ) : (
                                        <div className="DraftEditor-root" />
                                      )}
                                    </div>
                                  </FormFieldWrapper>
                                )
                              );
                            }}
                          </LibDraftJs>
                        );
                      }}
                    </LibDraftJsImportHtml>
                  );
                }}
              </LibDraftJsInlineToolbarPlugin>
            );
          }}
        </LibDraftJsPluginsEditor>
      </>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      token: state.userSession.token,
    }),
    {},
  ),
)(WysiwygWidget);
