import { atom, createStore } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { focusAtom } from 'jotai-optics';
import type { Content } from '@plone/types';

export const store = createStore();

export const formAtom = atom<Content>({} as Content);

export const blockAtomFamily = atomFamily((id: string) =>
  focusAtom(formAtom, (optic) => optic.prop('blocks').prop(id)),
);
