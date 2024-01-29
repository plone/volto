export default useUndoManager;
declare function useUndoManager(state: any, onUndoRedo: any, { maxUndoLevels, enableHotKeys }: {
    maxUndoLevels: any;
    enableHotKeys?: boolean;
}): {
    doUndo: () => void;
    doRedo: () => void;
    canUndo: boolean;
    canRedo: boolean;
};
