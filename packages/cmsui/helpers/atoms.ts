import { useCallback } from 'react';
import { useSetAtom } from 'jotai';
import { focusAtom } from 'jotai-optics';
import type { PrimitiveAtom, WritableAtom } from 'jotai';
import type { DeepKeys } from '@tanstack/react-form';

// Sets a field in a focused (only mutating that specific leaf of the atom)
// given a formAtom and a field name
export function useSetFieldFocusAtom<T>({
  anAtom,
  field,
}: {
  anAtom: PrimitiveAtom<T>;
  field: DeepKeys<T>;
}) {
  return useSetAtom(
    focusAtom(
      anAtom,
      // @ts-ignore
      useCallback((optic: OpticFor<T>) => optic.prop(field), [field]),
    ),
  );
}
