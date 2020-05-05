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
import addSVG from '@plone/volto/icons/circle-plus.svg';
import 'draft-js-mention-plugin/lib/plugin.css';

const messages = defineMessages({
  text: {
    id: 'Type text…',
    defaultMessage: 'Type text…',
  },
});

var suggestionsFilter = function(searchValue, suggestions) {
  var value = searchValue.toLowerCase();
  var filteredSuggestions = suggestions.filter(function(suggestion) {
    return !value || suggestion.name.toLowerCase().indexOf(value) > -1;
  });
  return filteredSuggestions;
};

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
      if (props.data && props.data.text) {
        editorState = EditorState.createWithContent(
          convertFromRaw(props.data.text),
        );
      } else {
        editorState = EditorState.createEmpty();
      }

      const mentionPlugin = createMentionPlugin({
        mentionPrefix: '@',
        entityMutability: 'MUTABLE',
      });

      const suggestions = Object.keys(this.props.properties).map(name => {
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
        suggestions,
        addNewBlockOpened: false,
      };
    }

    this.onChange = this.onChange.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onAddMention = this.onAddMention.bind(this);
  }

  /**
   * Component will receive props
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    if (this.props.selected) {
      this.node.focus();
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
      this.node.focus();
      this.setState({
        editorState: EditorState.moveFocusToEnd(this.state.editorState),
      });
    }
  }

  /**
   * Component will receive props
   * @method componentWillUnmount
   * @returns {undefined}
   */
  componentWillUnmount() {
    if (this.props.selected) {
      this.node.focus();
    }
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
   *
   */
  onSearchChange = ({ value }) => {
    this.setState({
      suggestions: suggestionsFilter(value, this.state.suggestions),
    });
  };

  /**
   *
   */
  onAddMention = ({ value }) => {};

  toggleAddNewBlock = () =>
    this.setState(state => ({ addNewBlockOpened: !state.addNewBlockOpened }));

  handleClickOutside = e => {
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
          handleReturn={e => {
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
          ref={node => {
            this.node = node;
          }}
        />
        <MentionSuggestions
          suggestions={this.state.suggestions}
          onSearchChange={this.onSearchChange}
          onAddMention={this.onAddMention}
        />
        <InlineToolbar />
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
