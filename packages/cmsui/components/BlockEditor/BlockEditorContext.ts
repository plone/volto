import { atom } from 'jotai';
import { createContext } from 'react';

export type BlockEditorContextValue = {
  moveBlockUp: (blockId: string) => void;
  moveBlockDown: (blockId: string) => void;
  deleteBlock: (blockId: string) => void;
};

export const BlockEditorContext = createContext<BlockEditorContextValue | null>(
  null,
);

export const selectedBlockAtom = atom<string | null>(null);
