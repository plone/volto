export default useUndoManager;
declare function useUndoManager(state: any, onUndoRedo: any, { maxUndoLevels, enableHotKeys }: {
    maxUndoLevels: any;
    enableHotKeys?: boolean;
}): {
    doUndo: any;
    doRedo: any;
    canUndo: any;
    canRedo: any;
};
