/**
 * WysiwygEditor container.
 * @module components/manage/WysiwygEditor/WysiwygEditor
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Editor from 'draft-js-plugins-editor';
import { stateToHTML } from 'draft-js-export-html';
import { convertFromHTML, EditorState, ContentState } from 'draft-js';
import { Form, Grid, Label, Segment, TextArea } from 'semantic-ui-react';
import { map } from 'lodash';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin';
import BlockTypeSelect from 'draft-js-side-toolbar-plugin/lib/components/BlockTypeSelect';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  BlockquoteButton,
  UnorderedListButton,
  OrderedListButton,
} from 'draft-js-buttons';
import createBlockStyleButton from 'draft-js-buttons/lib/utils/createBlockStyleButton';
import createLinkPlugin from 'draft-js-anchor-plugin';

const CodeBlockButton = createBlockStyleButton({
  blockType: 'code-block',
  children: <span>!</span>,
});
const linkPlugin = createLinkPlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin({
  structure: [BoldButton, ItalicButton, UnderlineButton, linkPlugin.LinkButton],
});
const sideToolbarPlugin = createSideToolbarPlugin({
  structure: [
    ({ getEditorState, setEditorState, theme }) => (
      <BlockTypeSelect
        getEditorState={getEditorState}
        setEditorState={setEditorState}
        theme={theme}
        structure={[
          HeadlineOneButton,
          HeadlineTwoButton,
          UnorderedListButton,
          OrderedListButton,
          BlockquoteButton,
          CodeBlockButton,
        ]}
      />
    ),
  ],
});
const { InlineToolbar } = inlineToolbarPlugin;
const { SideToolbar } = sideToolbarPlugin;

/**
 * WysiwygEditor container class.
 * @class WysiwygEditor
 * @extends Component
 */
export default class WysiwygEditor extends Component {
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
    onChange: PropTypes.func.isRequired,
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
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);

    if (!__SERVER__) {
      let editorState;
      if (props.value && props.value.data) {
        const blocksFromHTML = convertFromHTML(props.value.data);
        const contentState = ContentState.createFromBlockArray(blocksFromHTML);
        editorState = EditorState.createWithContent(contentState);
      } else {
        editorState = EditorState.createEmpty();
      }
      this.state = { editorState };
    }

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
    this.props.onChange(this.props.id, {
      'content-type': this.props.value
        ? this.props.value['content-type']
        : 'text/html',
      encoding: this.props.value ? this.props.value.encoding : 'utf8',
      data: stateToHTML(editorState.getCurrentContent()),
    });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { id, title, description, required, value, error } = this.props;

    if (__SERVER__) {
      return (
        <Form.Field
          inline
          required={required}
          error={error.length > 0}
          className={description ? 'help' : ''}
        >
          <div className="wrapper">
            <label htmlFor={`field-${id}`}>{title}</label>
            <TextArea id={id} name={id} value={value.data} />
            {description && <p className="help">{description}</p>}
            {map(error, message => (
              <Label key={message} basic color="red" pointing>
                {message}
              </Label>
            ))}
          </div>
        </Form.Field>
      );
    }
    return (
      <Form.Field
        inline
        required={required}
        error={error.length > 0}
        className={description ? 'help' : ''}
      >
        <Grid>
          <Grid.Row stretched>
            <Grid.Column width="4">
              <label htmlFor={`field-${id}`}>{title}</label>
            </Grid.Column>
            <Grid.Column width="8">
              <Segment>
                <div style={{ boxSizing: 'initial' }}>
                  <Editor
                    id={`field-${id}`}
                    onChange={this.onChange}
                    editorState={this.state.editorState}
                    plugins={[
                      inlineToolbarPlugin,
                      sideToolbarPlugin,
                      linkPlugin,
                    ]}
                  />
                </div>
              </Segment>
              {map(error, message => (
                <Label key={message} basic color="red" pointing>
                  {message}
                </Label>
              ))}
            </Grid.Column>
          </Grid.Row>
          {description && (
            <Grid.Row stretched>
              <Grid.Column stretched width="12">
                <span className="help">{description}</span>
              </Grid.Column>
            </Grid.Row>
          )}
        </Grid>
        <InlineToolbar />
        <SideToolbar />
      </Form.Field>
    );
  }
}
