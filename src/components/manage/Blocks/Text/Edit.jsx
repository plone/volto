/**
 * Edit text block.
 * @module components/manage/Blocks/Title/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import { defineMessages, injectIntl } from 'react-intl';
import { includes, isEqual } from 'lodash';
import config from '@plone/volto/registry';

import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import { BlockChooserButton } from '@plone/volto/components';

import loadable from '@loadable/component';

const Editor = loadable(() => import('draft-js-plugins-editor'));

const messages = defineMessages({
  text: {
    id: 'Type text…',
    defaultMessage: 'Type text…',
  },
});

/**
 * Edit text block class.
 * @class Edit
 * @extends Component
 */
export class EditComponent extends Component {
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
    onInsertBlock: PropTypes.func.isRequired,
    onChangeBlock: PropTypes.func.isRequired,
    onDeleteBlock: PropTypes.func.isRequired,
    onMutateBlock: PropTypes.func.isRequired,
    onFocusPreviousBlock: PropTypes.func.isRequired,
    onFocusNextBlock: PropTypes.func.isRequired,
    onSelectBlock: PropTypes.func.isRequired,
    editable: PropTypes.bool,
    allowedBlocks: PropTypes.arrayOf(PropTypes.string),
    showRestricted: PropTypes.bool,
    formTitle: PropTypes.string,
    formDescription: PropTypes.string,
    blocksConfig: PropTypes.objectOf(PropTypes.any),
    properties: PropTypes.objectOf(PropTypes.any),
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    detached: false,
    editable: true,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);

    const { settings } = config;

    this.draftConfig = settings.richtextEditorSettings(props);

    const { EditorState, convertFromRaw } = props.draftJs;
    const createInlineToolbarPlugin = props.draftJsInlineToolbarPlugin.default;

    if (!__SERVER__) {
      let editorState;
      if (props.data && props.data.text) {
        editorState = EditorState.createWithContent(
          convertFromRaw(props.data.text),
        );
      } else {
        editorState = EditorState.createEmpty();
      }

      const inlineToolbarPlugin = createInlineToolbarPlugin({
        structure: this.draftConfig.richTextEditorInlineToolbarButtons,
      });

      this.state = {
        editorState,
        inlineToolbarPlugin,
      };
    }

    this.onChange = this.onChange.bind(this);
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
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.props.selected && nextProps.selected) {
      const selectionState = this.state.editorState.getSelection();

      if (selectionState.getStartOffset() < selectionState.getEndOffset()) {
        //keep selection
      } else {
        //nothing is selected, move focus to end
        // See https://github.com/draft-js-plugins/draft-js-plugins/issues/800
        setTimeout(this.node.focus, 0);
        const { EditorState } = this.props.draftJs;

        this.setState({
          editorState: EditorState.moveFocusToEnd(this.state.editorState),
        });
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { convertToRaw, EditorState, convertFromRaw } = this.props.draftJs;
    if (
      !isEqual(this.props.data, prevProps.data) &&
      !isEqual(
        convertToRaw(this.state.editorState.getCurrentContent()),
        this.props.data.text,
      )
    ) {
      const editorState =
        this.props.data && this.props.data.text
          ? EditorState.createWithContent(convertFromRaw(this.props.data.text))
          : EditorState.createEmpty();

      this.setState({
        editorState: editorState,
      });
    }
  }

  /**
   * @param {*} nextProps
   * @param {*} nextState
   * @returns {boolean}
   * @memberof Edit
   */
  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.selected ||
      !isEqual(this.props.data, nextProps.data) ||
      !isEqual(this.state.editorState, nextState.editorState)
    );
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

    const { convertToRaw } = this.props.draftJs;
    const { filterEditorState } = this.props.draftJsFilters;

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
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    // console.log('draft config', this.draftConfig);

    if (__SERVER__) {
      return <div />;
    }

    const placeholder =
      this.props.data.placeholder ||
      this.props.formTitle ||
      this.props.intl.formatMessage(messages.text);

    const disableNewBlocks =
      this.props.data?.disableNewBlocks || this.props.detached;
    const { InlineToolbar } = this.state.inlineToolbarPlugin;
    // const { settings } = config;

    const isSoftNewlineEvent = this.props.draftJsLibIsSoftNewlineEvent.default;
    const { RichUtils } = this.props.draftJs;

    return (
      <>
        <Editor
          readOnly={!this.props.editable}
          onChange={this.onChange}
          editorState={this.state.editorState}
          plugins={[
            this.state.inlineToolbarPlugin,
            // ...settings.richTextEditorPlugins,
            ...this.draftConfig.richTextEditorPlugins,
          ]}
          blockRenderMap={this.draftConfig.extendedBlockRenderMap}
          blockStyleFn={this.draftConfig.blockStyleFn}
          customStyleMap={this.draftConfig.customStyleMap}
          placeholder={placeholder}
          handleReturn={(e) => {
            if (isSoftNewlineEvent(e)) {
              this.onChange(
                RichUtils.insertSoftNewline(this.state.editorState),
              );
              return 'handled';
            }
            if (!disableNewBlocks) {
              const selectionState = this.state.editorState.getSelection();
              const anchorKey = selectionState.getAnchorKey();
              const currentContent = this.state.editorState.getCurrentContent();
              const currentContentBlock = currentContent.getBlockForKey(
                anchorKey,
              );
              const blockType = currentContentBlock.getType();
              if (!includes(this.draftConfig.listBlockTypes, blockType)) {
                this.props.onSelectBlock(
                  this.props.onAddBlock(
                    config.settings.defaultBlockType,
                    this.props.index + 1,
                  ),
                );
                return 'handled';
              }
              return 'un-handled';
            }
            return {};
          }}
          handleKeyCommand={(command, editorState) => {
            if (this.props.data.required) {
              return;
            }
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
        <InlineToolbar />
        {!config.experimental.addBlockButton.enabled && this.props.selected && (
          <BlockChooserButton
            data={this.props.data}
            block={this.props.block}
            onInsertBlock={(id, value) => {
              this.props.onSelectBlock(this.props.onInsertBlock(id, value));
            }}
            allowedBlocks={this.props.allowedBlocks}
            blocksConfig={this.props.blocksConfig}
            size="24px"
            properties={this.props.properties}
          />
        )}
      </>
    );
  }
}

export const Edit = compose(
  injectIntl,
  injectLazyLibs([
    'draftJs',
    'draftJsLibIsSoftNewlineEvent',
    'draftJsFilters',
    'draftJsInlineToolbarPlugin',
    'draftJsBlockBreakoutPlugin',
    'draftJsCreateInlineStyleButton',
    'draftJsCreateBlockStyleButton',
    'immutableLib',
    // TODO: add all plugin dependencies, also in Wysiwyg and Cell
  ]),
)(EditComponent);

const Preloader = (props) => {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    Editor.load().then(() => setLoaded(true));
  }, []);
  return loaded ? <Edit {...props} /> : null;
};

export default Preloader;
