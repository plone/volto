/**
 * WysiwygWidget container.
 * @module components/manage/WysiwygWidget/WysiwygWidget
 */

import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import { connect, Provider } from 'react-redux';
import { compose } from 'redux';
import redraft from 'redraft';
import { Form, Label, TextArea } from 'semantic-ui-react';
import { map } from 'lodash';
import { defineMessages, injectIntl } from 'react-intl';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import config from '@plone/volto/registry';

import { FormFieldWrapper } from '@plone/volto/components';

import loadable from '@loadable/component';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

const Editor = loadable(() => import('draft-js-plugins-editor'));

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
 * WysiwygWidget HTML richtext editing widget
 *
 * To use it, in schema properties, declare a field like:
 *
 * ```jsx
 * {
 *  title: "Rich text",
 *  widget: 'richtext',
 * }
 * ```
 *
 */
class WysiwygWidgetComponent extends Component {
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
     * Placeholder for the editor
     */
    placeholder: PropTypes.string,
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

    const { stateFromHTML } = props.draftJsImportHtml;
    const { EditorState } = props.draftJs;
    const createInlineToolbarPlugin = props.draftJsInlineToolbarPlugin.default;

    this.draftConfig = config.settings.richtextEditorSettings(props);

    if (!__SERVER__) {
      let editorState;
      if (props.value && props.value.data) {
        const contentState = stateFromHTML(props.value.data, {
          customBlockFn: this.draftConfig.FromHTMLCustomBlockFn,
        });
        editorState = EditorState.createWithContent(contentState);
      } else {
        editorState = EditorState.createEmpty();
      }

      const inlineToolbarPlugin = createInlineToolbarPlugin({
        structure: this.draftConfig.richTextEditorInlineToolbarButtons,
      });

      this.state = { editorState, inlineToolbarPlugin };
    }

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
    const { convertToRaw } = this.props.draftJs;
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
            {redraft(
              convertToRaw(editorState.getCurrentContent()),
              config.settings.richtextViewSettings.ToHTMLRenderers,
              config.settings.richtextViewSettings.ToHTMLOptions,
            )}
          </MemoryRouter>
        </Provider>,
      ),
    });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { id, title, description, required, value, error, fieldSet } =
      this.props;

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
    const { InlineToolbar } = this.state.inlineToolbarPlugin;

    return (
      <FormFieldWrapper {...this.props} className="wysiwyg">
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
                  ...this.draftConfig.richTextEditorPlugins,
                ]}
                placeholder={this.props.placeholder}
                blockRenderMap={this.draftConfig.extendedBlockRenderMap}
                blockStyleFn={this.draftConfig.blockStyleFn}
                customStyleMap={this.draftConfig.customStyleMap}
              />
              {this.props.onChange && <InlineToolbar />}
            </>
          ) : (
            <div className="DraftEditor-root" />
          )}
        </div>
      </FormFieldWrapper>
    );
  }
}

export const WysiwygWidget = compose(
  injectIntl,
  injectLazyLibs([
    'draftJs',
    'draftJsBlockBreakoutPlugin',
    'draftJsCreateBlockStyleButton',
    'draftJsCreateInlineStyleButton',
    'draftJsFilters',
    'draftJsImportHtml',
    'draftJsInlineToolbarPlugin',
    'draftJsLibIsSoftNewlineEvent',
    'immutableLib',
  ]),
  connect(
    (state, props) => ({
      token: state.userSession.token,
    }),
    {},
  ),
)(WysiwygWidgetComponent);

const Preloader = (props) => {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    Editor.load().then(() => setLoaded(true));
  }, []);
  return loaded ? <WysiwygWidget {...props} /> : null;
};

export default Preloader;
