import { useCallback } from 'react';
import { useSetAtom } from 'jotai';
import { focusAtom } from 'jotai-optics';
import type { OpticFor } from 'optics-ts';
import type { PrimitiveAtom } from 'jotai';
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
      // @ts-expect-error https://github.com/jotaijs/jotai-optics/issues/6
      useCallback((optic: OpticFor<T>) => optic.prop(field), [field]),
    ),
  );
}

// Returns the Readable/Writeable focused atom of a field
// given a formAtom and a field name
export function useFieldFocusAtom<T>(
  anAtom: PrimitiveAtom<T>,
  field: DeepKeys<T>,
) {
  return focusAtom(
    anAtom,
    // @ts-expect-error https://github.com/jotaijs/jotai-optics/issues/6
    useCallback((optic: OpticFor<T>) => optic.prop(field), [field]),
  );
}
