const EditorUtils = ({ draftJs }) => ({
  createLinkAtSelection(editorState, url) {
    const contentState = editorState
      .getCurrentContent()
      .createEntity('LINK', 'MUTABLE', { url });
    const entityKey = contentState.getLastCreatedEntityKey();
    const withLink = draftJs.RichUtils.toggleLink(
      editorState,
      editorState.getSelection(),
      entityKey,
    );
    return draftJs.EditorState.forceSelection(
      withLink,
      editorState.getSelection(),
    );
  },

  removeLinkAtSelection(editorState) {
    const selection = editorState.getSelection();
    return draftJs.RichUtils.toggleLink(editorState, selection, null);
  },

  getCurrentEntityKey(editorState) {
    const selection = editorState.getSelection();
    const anchorKey = selection.getAnchorKey();
    const contentState = editorState.getCurrentContent();
    const anchorBlock = contentState.getBlockForKey(anchorKey);
    const index = selection.isBackward
      ? selection.focusOffset
      : selection.anchorOffset;

    return anchorBlock.getEntityAt(index);
  },

  getCurrentEntity(editorState) {
    const contentState = editorState.getCurrentContent();
    const entityKey = this.getCurrentEntityKey(editorState);
    return entityKey ? contentState.getEntity(entityKey) : null;
  },

  hasEntity(editorState, entityType) {
    const entity = this.getCurrentEntity(editorState);
    return entity && entity.getType() === entityType;
  },
});

export default EditorUtils;
