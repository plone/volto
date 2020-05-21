/**
 * Edit text block.
 * @module components/manage/Blocks/Title/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { doesNodeContainClick } from 'semantic-ui-react/dist/commonjs/lib';
import Editor from 'draft-js-plugins-editor';
import createMentionPlugin from 'draft-js-mention-plugin';
import { convertFromRaw, convertToRaw, EditorState, RichUtils } from 'draft-js';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import isSoftNewlineEvent from 'draft-js/lib/isSoftNewlineEvent';
import { defineMessages, injectIntl } from 'react-intl';
import { includes, isEqual } from 'lodash';
import { filterEditorState } from 'draftjs-filters';
import { settings } from '~/config';
import { Icon, BlockChooser } from '@plone/volto/components';
import { suggestionsFilter } from '@plone/volto/helpers';
import addSVG from '@plone/volto/icons/circle-plus.svg';
import showSVG from '@plone/volto/icons/show.svg';
import codeSVG from '@plone/volto/icons/code.svg';
import 'draft-js-mention-plugin/lib/plugin.css';

const messages = defineMessages({
  text: {
    id: 'Type text…',
    defaultMessage: 'Type text…',
  },
  source: {
    id: 'Source',
    defaultMessage: 'Source',
  },
  preview: {
    id: 'Preview',
    defaultMessage: 'Preview',
  },
});

/**
 * Edit text block class.
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
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    detached: PropTypes.bool,
    index: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
    block: PropTypes.string.isRequired,
    onAddBlock: PropTypes.func.isRequired,
    onChangeBlock: PropTypes.func.isRequired,
    onDeleteBlock: PropTypes.func.isRequired,
    onMutateBlock: PropTypes.func.isRequired,
    onFocusPreviousBlock: PropTypes.func.isRequired,
    onFocusNextBlock: PropTypes.func.isRequired,
    onSelectBlock: PropTypes.func.isRequired,
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    detached: false,
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
      let hasMentions = false;
      if (props.data && props.data.text) {
        editorState = EditorState.createWithContent(
          convertFromRaw(props.data.text),
        );
        if (!!props.data.text.entityMap) {
          hasMentions = true;
        }
      } else {
        editorState = EditorState.createEmpty();
      }

      const mentionPlugin = createMentionPlugin({
        mentionPrefix: '@',
        entityMutability: 'IMMUTABLE',
      });

      this.mentions = Object.keys(this.props.properties).map((name) => {
        return {
          name: name,
        };
      });

      const inlineToolbarPlugin = createInlineToolbarPlugin({
        structure: settings.richTextEditorInlineToolbarButtons,
      });

      this.state = {
        editorState,
        mentionPlugin,
        inlineToolbarPlugin,
        hasMentions,
        suggestions: this.mentions,
        addNewBlockOpened: false,
        isPreview: false,
      };
    }

    this.onChange = this.onChange.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onAddMention = this.onAddMention.bind(this);
    this.onPreview = this.onPreview.bind(this);
    this.onCodeEditor = this.onCodeEditor.bind(this);
  }

  /**
   * Component will receive props
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    if (this.props.selected) {
      // See https://github.com/draft-js-plugins/draft-js-plugins/issues/800
      setTimeout(this.node.focus, 0);
    }
    document.addEventListener('mousedown', this.handleClickOutside, false);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.props.selected && nextProps.selected) {
      // See https://github.com/draft-js-plugins/draft-js-plugins/issues/800
      setTimeout(this.node.focus, 0);
      this.setState({
        editorState: EditorState.moveFocusToEnd(this.state.editorState),
      });
    }
  }

  /**
   * Component will unmount
   * @method componentWillUnmount
   * @returns {undefined}
   */
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside, false);
  }

  /**
   * Change handler
   * @method onChange
   * @param {object} editorState Editor state.
   * @returns {undefined}
   */
  onChange(editorState) {
    const shouldFilterPaste =
      editorState.getLastChangeType() === 'insert-fragment';

    if (
      !isEqual(
        convertToRaw(editorState.getCurrentContent()),
        convertToRaw(this.state.editorState.getCurrentContent()),
      )
    ) {
      if (shouldFilterPaste) {
        let filteredState = editorState;
        filteredState = filterEditorState(
          {
            blocks: ['unordered-list-item', 'ordered-list-item'],
            styles: ['BOLD', 'ITALIC'],
            entities: [
              {
                type: 'LINK',
                attributes: ['url'],
              },
            ],
            whitespacedCharacters: [],
          },
          filteredState,
        );
        editorState = filteredState;
      }
      this.props.onChangeBlock(this.props.block, {
        ...this.props.data,
        text: convertToRaw(editorState.getCurrentContent()),
      });
    }
    this.setState({ editorState });
  }

  /**
   * On search change
   * @method onSearchChange
   * @param {string} value Value
   * @returns {undefined}
   */
  onSearchChange({ value }) {
    this.setState({
      suggestions: suggestionsFilter(value, this.mentions),
    });
  }

  /**
   * On add mention
   * @method onAddMention
   * @returns {undefined}
   */
  onAddMention() {
    this.setState({
      hasMentions: true,
    });
  }

  /**
   * Preview mode handler
   * @method onPreview
   * @returns {undefined}
   */
  onPreview() {
    this.setState({
      isPreview: !this.state.isPreview,
    });
  }

  /**
   * Code Editor mode handler
   * @method onPreview
   * @returns {undefined}
   */
  onCodeEditor() {
    this.setState({ isPreview: !this.state.isPreview });
  }

  toggleAddNewBlock = () =>
    this.setState((state) => ({ addNewBlockOpened: !state.addNewBlockOpened }));

  handleClickOutside = (e) => {
    if (
      this.props.blockNode.current &&
      doesNodeContainClick(this.props.blockNode.current, e)
    )
      return;
    this.setState(() => ({
      addNewBlockOpened: false,
    }));
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (__SERVER__) {
      return <div />;
    }

    const { InlineToolbar } = this.state.inlineToolbarPlugin;
    const { MentionSuggestions } = this.state.mentionPlugin;

    return (
      <>
        {this.props.selected && !!this.state.hasMentions && (
          <div className="toolbar">
            <Button.Group>
              <Button
                icon
                basic
                aria-label={this.props.intl.formatMessage(messages.source)}
                active={!this.state.isPreview}
                onClick={this.onCodeEditor}
              >
                <Icon name={codeSVG} size="24px" />
              </Button>
            </Button.Group>
            <Button.Group>
              <Button
                icon
                basic
                aria-label={this.props.intl.formatMessage(messages.preview)}
                active={this.state.isPreview}
                onClick={this.onPreview}
              >
                <Icon name={showSVG} size="24px" />
              </Button>
            </Button.Group>
          </div>
        )}
        {this.state.isPreview && 'Preview here'}
        {!this.state.isPreview && (
          <>
            <Editor
              onChange={this.onChange}
              editorState={this.state.editorState}
              plugins={[
                this.state.inlineToolbarPlugin,
                this.state.mentionPlugin,
                ...settings.richTextEditorPlugins,
              ]}
              blockRenderMap={settings.extendedBlockRenderMap}
              blockStyleFn={settings.blockStyleFn}
              customStyleMap={settings.customStyleMap}
              placeholder={this.props.intl.formatMessage(messages.text)}
              handleReturn={(e) => {
                if (isSoftNewlineEvent(e)) {
                  this.onChange(
                    RichUtils.insertSoftNewline(this.state.editorState),
                  );
                  return 'handled';
                }
                if (!this.props.detached) {
                  const selectionState = this.state.editorState.getSelection();
                  const anchorKey = selectionState.getAnchorKey();
                  const currentContent = this.state.editorState.getCurrentContent();
                  const currentContentBlock = currentContent.getBlockForKey(
                    anchorKey,
                  );
                  const blockType = currentContentBlock.getType();
                  if (!includes(settings.listBlockTypes, blockType)) {
                    this.props.onSelectBlock(
                      this.props.onAddBlock('text', this.props.index + 1),
                    );
                    return 'handled';
                  }
                  return 'un-handled';
                }
                return {};
              }}
              handleKeyCommand={(command, editorState) => {
                if (
                  command === 'backspace' &&
                  editorState.getCurrentContent().getPlainText().length === 0
                ) {
                  this.props.onDeleteBlock(this.props.block, true);
                }
              }}
              onUpArrow={() => {
                const selectionState = this.state.editorState.getSelection();
                const currentCursorPosition = selectionState.getStartOffset();

                if (currentCursorPosition === 0) {
                  this.props.onFocusPreviousBlock(this.props.block, this.node);
                }
              }}
              onDownArrow={() => {
                const selectionState = this.state.editorState.getSelection();
                const { editorState } = this.state;
                const currentCursorPosition = selectionState.getStartOffset();
                const blockLength = editorState
                  .getCurrentContent()
                  .getFirstBlock()
                  .getLength();

                if (currentCursorPosition === blockLength) {
                  this.props.onFocusNextBlock(this.props.block, this.node);
                }
              }}
              ref={(node) => {
                this.node = node;
              }}
            />
            <MentionSuggestions
              suggestions={this.state.suggestions}
              onSearchChange={this.onSearchChange}
              onAddMention={this.onAddMention}
            />
            <InlineToolbar />
          </>
        )}
        {!this.props.detached &&
          (!this.props.data.text ||
            (this.props.data.text &&
              this.props.data.text.blocks &&
              this.props.data.text.blocks.length === 1 &&
              this.props.data.text.blocks[0].text === '')) && (
            <Button
              basic
              icon
              onClick={this.toggleAddNewBlock}
              className="block-add-button"
            >
              <Icon name={addSVG} className="block-add-button" size="24px" />
            </Button>
          )}
        {this.state.addNewBlockOpened && (
          <BlockChooser
            onMutateBlock={this.props.onMutateBlock}
            currentBlock={this.props.block}
          />
        )}
      </>
    );
  }
}

export default injectIntl(Edit);
