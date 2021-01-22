/**
 * Edit text cell block.
 * @module components/manage/Blocks/Table/Cell
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { includes } from 'lodash';

import { settings } from '~/config';

import loadable from '@loadable/component';
const LibDraftJsPluginsEditor = loadable.lib(() =>
  import('draft-js-plugins-editor'),
);
const LibDraftJs = loadable.lib(() => import('draft-js'));
const LibDraftJsInlineToolbarPlugin = loadable.lib(() =>
  import('draft-js-inline-toolbar-plugin'),
);
const LibDraftJsIsSoftNewlineEvent = loadable.lib(() =>
  import('draft-js/lib/isSoftNewlineEvent'),
);

/**
 * Edit text cell class.
 * @class Cell
 * @extends Component
 */
class Cell extends Component {
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
   * @constructs Cell
   */
  constructor(props) {
    super(props);

    this.state = {};

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

  firstRender = true;

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (__SERVER__) {
      return <div />;
    }

    return (
      <LibDraftJsIsSoftNewlineEvent>
        {({ default: isSoftNewlineEvent }) => {
          return (
            <LibDraftJsPluginsEditor>
              {({ default: Editor }) => {
                return (
                  <LibDraftJsInlineToolbarPlugin>
                    {({ default: createInlineToolbarPlugin }) => {
                      return (
                        <LibDraftJs>
                          {({ convertFromRaw, EditorState, RichUtils }) => {
                            if (this.firstRender) {
                              this.firstRender = false;

                              let editorState;
                              editorState = EditorState.createWithContent(
                                convertFromRaw(this.props.value),
                              );

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

                            const InlineToolbar = this.state
                              ?.inlineToolbarPlugin?.InlineToolbar;

                            return (
                              !!this.state.editorState &&
                              !!this.state.inlineToolbarPlugin && (
                                <div>
                                  <Editor
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
                                    customStyleMap={settings.customStyleMap}
                                    handleReturn={(e) => {
                                      if (isSoftNewlineEvent(e)) {
                                        this.onChange(
                                          RichUtils.insertSoftNewline(
                                            this.state.editorState,
                                          ),
                                        );
                                        return 'handled';
                                      }
                                      if (
                                        !this.props.detached &&
                                        !this.props.disableNewBlocks
                                      ) {
                                        const selectionState = this.state.editorState.getSelection();
                                        const anchorKey = selectionState.getAnchorKey();
                                        const currentContent = this.state.editorState.getCurrentContent();
                                        const currentContentBlock = currentContent.getBlockForKey(
                                          anchorKey,
                                        );
                                        const blockType = currentContentBlock.getType();
                                        if (
                                          !includes(
                                            settings.listBlockTypes,
                                            blockType,
                                          )
                                        ) {
                                          this.props.onSelectBlock(
                                            this.props.onAddBlock(
                                              settings.defaultBlockType,
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
                              )
                            );
                          }}
                        </LibDraftJs>
                      );
                    }}
                  </LibDraftJsInlineToolbarPlugin>
                );
              }}
            </LibDraftJsPluginsEditor>
          );
        }}
      </LibDraftJsIsSoftNewlineEvent>
    );
  }
}

export default Cell;
