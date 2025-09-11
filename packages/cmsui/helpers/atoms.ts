import { useCallback } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
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

// Returns the [value, setter] (`useAtom`-ed) ready to use focused atom of a field
// (when referring to a Seven Form)
export function useFieldFocusedAtom<T>(
  atom: PrimitiveAtom<T>,
  field: DeepKeys<T>,
) {
  return useAtom(
    focusAtom(
      atom,
      // @ts-expect-error https://github.com/jotaijs/jotai-optics/issues/6
      useCallback((optic: OpticFor<T>) => optic.prop(field), [field]),
    ),
  );
}

// Returns the setter of a focused atom of a field
// given a formAtom and a field name
export function useSetFieldFocusedAtom<T>(
  atom: PrimitiveAtom<T>,
  field: DeepKeys<T>,
) {
  return useSetAtom(
    focusAtom(
      atom,
      // @ts-expect-error https://github.com/jotaijs/jotai-optics/issues/6
      useCallback((optic: OpticFor<T>) => optic.prop(field), [field]),
    ),
  );
}

// Returns the value of focused atom of a field
// given a formAtom and a field name
export function useFieldValueFocusedAtom<T>(
  atom: PrimitiveAtom<T>,
  field: DeepKeys<T>,
) {
  return useAtomValue(
    focusAtom(
      atom,
      // @ts-expect-error https://github.com/jotaijs/jotai-optics/issues/6
      useCallback((optic: OpticFor<T>) => optic.prop(field), [field]),
    ),
  );
}
