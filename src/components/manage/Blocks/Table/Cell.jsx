import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { includes } from 'lodash';
import config from '@plone/volto/registry';

import { usePrevious } from '@plone/volto/helpers';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import loadable from '@loadable/component';

const Editor = loadable(() => import('draft-js-plugins-editor'));

const CellComponent = (props) => {
  const {
    value,
    draftJs,
    draftJsInlineToolbarPlugin,
    isTableBlockSelected,
    onSelectCell,
    row,
    cell,
    editable,
    detached,
    disableNewBlocks,
    onSelectBlock,
    onAddBlock,
    index,
  } = props;

  const node = useRef();

  const { EditorState, convertFromRaw } = draftJs;
  const createInlineToolbarPlugin = draftJsInlineToolbarPlugin.default;
  let draftConfig;
  let editorstate;
  editorState = EditorState.createWithContent(convertFromRaw(props.value));

  if (!__SERVER__) {
    draftConfig = config.settings.richtextEditorSettings(props);
  }

  const [editorState, setEditorState] = useState(editorstate);

  const [inlineToolbarPlugin] = useState(
    createInlineToolbarPlugin({
      structure: draftConfig.richTextEditorInlineToolbarButtons,
    }),
  );

  const previsTableBlockSelected = usePrevious(isTableBlockSelected);

  useEffect(() => {
    if (node) {
      const onFocus = node.editor._onFocus;
      node.editor._onFocus = (event) => {
        onFocus(event);
        onSelectCell(row, cell);
      };
    }
  });

  useEffect(() => {
    if (
      isTableBlockSelected !== previsTableBlockSelected &&
      cell === 0 &&
      row === 0
    ) {
      node.focus();
    }
  });

  const onChange = (editorState) => {
    setEditorState(props.onChange(row, cell, editorState));
  };

  if (__SERVER__) {
    return <div />;
  }

  const { InlineToolbar } = inlineToolbarPlugin;
  const isSoftNewlineEvent = draftJsLibIsSoftNewlineEvent.default;
  const { RichUtils } = draftJs;

  return (
    <div>
      <Editor
        readOnly={!editable}
        onChange={onChange}
        editorState={editorState}
        plugins={[inlineToolbarPlugin, ...draftConfig.richTextEditorPlugins]}
        blockRenderMap={draftConfig.extendedBlockRenderMap}
        blockStyleFn={draftConfig.blockStyleFn}
        customStyleMap={draftConfig.customStyleMap}
        handleReturn={(e) => {
          if (isSoftNewlineEvent(e)) {
            onChange(RichUtils.insertSoftNewline(editorState));
            return 'handled';
          }
          if (!detached && !disableNewBlocks) {
            const selectionState = editorState.getSelection();
            const anchorKey = selectionState.getAnchorKey();
            const currentContent = editorState.getCurrentContent();
            const currentContentBlock = currentContent.getBlockForKey(
              anchorKey,
            );
            const blockType = currentContentBlock.getType();
            if (!includes(draftConfig.listBlockTypes, blockType)) {
              onSelectBlock(
                onAddBlock(draftConfig.defaultBlockType, index + 1),
              );
              return 'handled';
            }
            return 'un-handled';
          }
          return {};
        }}
        ref={node}
      />
      <InlineToolbar />
    </div>
  );
};

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
CellComponent.propTypes = {
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

CellComponent.defaultProps = {
  detached: false,
  editable: true,
};
export default Preloader;
