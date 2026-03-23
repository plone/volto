import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { focusAtom } from 'jotai-optics';
import type { Content } from '@plone/types';

export const formAtom = atom<Content>({} as Content);

export const formSubmitAtom = atom<(() => void) | null>(null);

export const blockAtomFamily = atomFamily((id: string) =>
  focusAtom(formAtom, (optic) => optic.prop('blocks').prop(id)),
);
