/**
 * Edit text cell block.
 * @module components/manage/Blocks/Title/Cell
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { includes } from 'lodash';
import config from '@plone/volto/registry';

import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import loadable from '@loadable/component';

const Editor = loadable(() => import('draft-js-plugins-editor'));

/**
 * Edit text cell class.
 * @class Cell
 * @extends Component
 */
class CellComponent extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    onSelectCell: PropTypes.func.isRequired,
    row: PropTypes.number,
    cell: PropTypes.number,
    value: PropTypes.object,
    selected: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    isTableBlockSelected: PropTypes.bool,
    disableNewBlocks: PropTypes.bool,
    editable: PropTypes.bool,
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
   * @constructs Cell
   */
  constructor(props) {
    super(props);

    const { EditorState, convertFromRaw } = props.draftJs;
    const createInlineToolbarPlugin = props.draftJsInlineToolbarPlugin.default;

    if (!__SERVER__) {
      this.draftConfig = config.settings.richtextEditorSettings(props);
      let editorState;
      editorState = EditorState.createWithContent(convertFromRaw(props.value));

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
   * Component did mount lifecycle method
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    if (this.node) {
      const onFocus = this.node.editor._onFocus;
      this.node.editor._onFocus = (event) => {
        onFocus(event);
        this.props.onSelectCell(this.props.row, this.props.cell);
      };
    }
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.isTableBlockSelected !== this.props.isTableBlockSelected &&
      this.props.cell === 0 &&
      this.props.row === 0
    ) {
      this.node.focus();
    }
  }

  /**
   * Change handler
   * @method onChange
   * @param {object} editorState Editor state.
   * @returns {undefined}
   */
  onChange(editorState) {
    this.setState({ editorState }, () => {
      this.props.onChange(this.props.row, this.props.cell, editorState);
    });
  }

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
    const isSoftNewlineEvent = this.props.draftJsLibIsSoftNewlineEvent.default;
    const { RichUtils } = this.props.draftJs;

    return (
      <div>
        <Editor
          readOnly={!this.props.editable}
          onChange={this.onChange}
          editorState={this.state.editorState}
          plugins={[
            this.state.inlineToolbarPlugin,
            ...this.draftConfig.richTextEditorPlugins,
          ]}
          blockRenderMap={this.draftConfig.extendedBlockRenderMap}
          blockStyleFn={this.draftConfig.blockStyleFn}
          customStyleMap={this.draftConfig.customStyleMap}
          handleReturn={(e) => {
            if (isSoftNewlineEvent(e)) {
              this.onChange(
                RichUtils.insertSoftNewline(this.state.editorState),
              );
              return 'handled';
            }
            if (!this.props.detached && !this.props.disableNewBlocks) {
              const selectionState = this.state.editorState.getSelection();
              const anchorKey = selectionState.getAnchorKey();
              const currentContent = this.state.editorState.getCurrentContent();
              const currentContentBlock =
                currentContent.getBlockForKey(anchorKey);
              const blockType = currentContentBlock.getType();
              if (!includes(this.draftConfig.listBlockTypes, blockType)) {
                this.props.onSelectBlock(
                  this.props.onAddBlock(
                    this.draftConfig.defaultBlockType,
                    this.props.index + 1,
                  ),
                );
                return 'handled';
              }
              return 'un-handled';
            }
            return {};
          }}
          ref={(node) => {
            this.node = node;
          }}
        />
        <InlineToolbar />
      </div>
    );
  }
}

export const Cell = injectLazyLibs([
  'draftJs',
  'draftJsBlockBreakoutPlugin',
  'draftJsCreateBlockStyleButton',
  'draftJsCreateInlineStyleButton',
  'draftJsFilters',
  'draftJsImportHtml',
  'draftJsInlineToolbarPlugin',
  'draftJsLibIsSoftNewlineEvent',
  'immutableLib',
])(CellComponent);

const Preloader = (props) => {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    Editor.load().then(() => setLoaded(true));
  }, []);
  return loaded ? <Cell {...props} /> : null;
};

export default Preloader;
