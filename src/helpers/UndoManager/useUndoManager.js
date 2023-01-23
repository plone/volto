import React from 'react';
import Undoo from 'undoo';

import { setBlocksClipboard } from '@plone/volto/actions';
import { useDispatch } from 'react-redux';

// Code based on Apache-2.0 License
// https://github.com/reaviz/reaflow/blob/78d60aa04f514947a17097c906efdbbd6bae5080/src/helpers/useUndo.ts

const useUndoManager = (
  state,
  onUndoRedo,
  { maxUndoLevels, enableHotKeys = true },
) => {
  const dispatch = useDispatch();
  const [canUndo, setCanUndo] = React.useState(false);
  const [canRedo, setCanRedo] = React.useState(false);
  const manager = React.useRef(new Undoo({ maxLength: maxUndoLevels }));
  // Reference:
  // https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback
  const callbackRef = React.useRef(onUndoRedo);
  React.useEffect(() => {
    callbackRef.current = onUndoRedo;
  }, [onUndoRedo]);

  const doUndo = React.useCallback(() => {
    manager.current.undo(({ state }) => {
      const nextUndo = manager.current.canUndo();
      const nextRedo = manager.current.canRedo();
      setCanUndo(nextUndo);
      setCanRedo(nextRedo);

      if (Object.keys(state.blocksClipboard).length !== 0) {
        const actionType = Object.keys(state.blocksClipboard)[0];

        const blocksData = state.blocksClipboard?.copy
          ? state.blocksClipboard.copy
          : state.blocksClipboard.cut;
        dispatch(setBlocksClipboard({ [actionType]: blocksData }));
      }

      callbackRef.current({
        state,
        type: 'undo',
        canUndo: nextUndo,
        canRedo: nextRedo,
      });
    });
  }, [dispatch]);

  React.useEffect(() => {
    manager.current.save({
      state,
    });

    setCanUndo(manager.current.canUndo());
    setCanRedo(manager.current.canRedo());
  }, [state]);

  const doRedo = React.useCallback(() => {
    manager.current.redo(({ state }) => {
      const nextUndo = manager.current.canUndo();
      const nextRedo = manager.current.canRedo();
      setCanUndo(nextUndo);
      setCanRedo(nextRedo);

      callbackRef.current({
        state,
        type: 'redo',
        canUndo: nextUndo,
        canRedo: nextRedo,
      });
    });
  }, []);

  const handleKeys = React.useCallback(
    (event) => {
      const keyName = event.key;

      if (keyName === 'Control' || keyName === 'Meta') {
        // do not alert when only Control key is pressed.
        return;
      }
      if (event.ctrlKey || event.metaKey) {
        if (keyName === 'z') {
          event.preventDefault();
          event.stopPropagation();
          doUndo();
        } else if (keyName === 'y') {
          event.preventDefault();
          event.stopPropagation();
          doRedo();
        }
      } else {
        return;
      }
    },
    [doUndo, doRedo],
  );

  React.useEffect(() => {
    if (!enableHotKeys) return;
    document.addEventListener('keydown', handleKeys);
    return () => document.removeEventListener('keydown', handleKeys);
  }, [enableHotKeys, handleKeys]);

  return {
    doUndo,
    doRedo,
    canUndo,
    canRedo,
  };
};

export default useUndoManager;
