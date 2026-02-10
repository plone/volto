import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import isEqual from 'es-toolkit/compat/isEqual';

export const inlineFormFieldsetsState = atomFamily(
  ({ name, initialState }) => atom(initialState),
  (a, b) => a.name === b.name && isEqual(a.fielsetList, b.fielsetList),
);
