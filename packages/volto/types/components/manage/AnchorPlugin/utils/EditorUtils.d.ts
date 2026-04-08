export default EditorUtils;
declare function EditorUtils({ draftJs }: {
    draftJs: any;
}): {
    createLinkAtSelection(editorState: any, url: any): any;
    removeLinkAtSelection(editorState: any): any;
    getCurrentEntityKey(editorState: any): any;
    getCurrentEntity(editorState: any): any;
    hasEntity(editorState: any, entityType: any): boolean;
};
