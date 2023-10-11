import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { includes } from 'lodash';
import config from '@plone/volto/registry';


import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import loadable from '@loadable/component';


const Editor = loadable(() => import('draft-js-plugins-editor'));


const CellComponent = (props) => {
const {
onSelectCell,
row,
cell,
value,
selected,
onChange,
isTableBlockSelected,
disableNewBlocks,
editable,
draftJs,
draftJsInlineToolbarPlugin,
draftJsLibIsSoftNewlineEvent,
draftJsFilters,
immutableLib,
index,
onSelectBlock,
onAddBlock,
} = props;


const { EditorState, convertFromRaw, RichUtils } = draftJs;
const createInlineToolbarPlugin = draftJsInlineToolbarPlugin.default;


const [editorState, setEditorState] = useState(
EditorState.createWithContent(convertFromRaw(value)),
);
const [inlineToolbarPlugin] = useState(
createInlineToolbarPlugin({
structure: config.settings.richtextEditorSettings(props)
.richTextEditorInlineToolbarButtons,
}),
);

const isSoftNewlineEvent = draftJsLibIsSoftNewlineEvent.default;


useEffect(() => {
if (node) {
const onFocus = node.editor._onFocus;
node.editor._onFocus = (event) => {
onFocus(event);
onSelectCell(row, cell);
};
}
}, [node, onSelectCell, row, cell]);


useEffect(() => {
if (
isTableBlockSelected !== props.isTableBlockSelected &&
cell === 0 &&
row === 0
) {
  node.focus();
  }
  }, [isTableBlockSelected, props.isTableBlockSelected, cell, row, node]);
  
  
  const onChangeEditorState = (newEditorState) => {
  setEditorState(newEditorState);
  onChange(row, cell, newEditorState);
  };
  
  
  return (
  props.open && (
  <div>
  <Editor
  readOnly={!editable}
  onChange={onChangeEditorState}
  editorState={editorState}
  plugins={[inlineToolbarPlugin]}
  blockRenderMap={config.settings.richtextEditorSettings(props).extendedBlockRenderMap}
  blockStyleFn={config.settings.richtextEditorSettings(props).blockStyleFn}
  customStyleMap={config.settings.richtextEditorSettings(props).customStyleMap}
  handleReturn={(e) => {
  if (isSoftNewlineEvent(e)) {
  onChangeEditorState(
  RichUtils.insertSoftNewline(editorState),
  );
  return 'handled';
  }
  if (!props.detached && !disableNewBlocks) {
    const selectionState = editorState.getSelection();
    const anchorKey = selectionState.getAnchorKey();
    const currentContent = editorState.getCurrentContent();
    const currentContentBlock =
    currentContent.getBlockForKey(anchorKey);
    const blockType = currentContentBlock.getType();
    if (!includes(config.settings.richtextEditorSettings(props).listBlockTypes, blockType)) {
    onSelectBlock(
    onAddBlock(
    config.settings.richtextEditorSettings(props).defaultBlockType,
    index + 1,
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
  <inlineToolbarPlugin.InlineToolbar />
  </div>
  )
  );
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
    draftJs: PropTypes.object.isRequired,
    draftJsInlineToolbarPlugin: PropTypes.object.isRequired,
    draftJsLibIsSoftNewlineEvent: PropTypes.object.isRequired,
    draftJsFilters: PropTypes.object.isRequired,
    immutableLib: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onSelectBlock: PropTypes.func.isRequired,
    onAddBlock: PropTypes.func.isRequired,
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
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
    Editor.load().then(() => setLoaded(true));
    }, []);
    return loaded ? <Cell {...props} /> : null;
    };
    
    
    export default Preloader;
                