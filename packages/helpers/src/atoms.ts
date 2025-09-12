import { useCallback } from 'react';
import { useHydrateAtoms } from 'jotai/utils';
import type { ReactNode } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import type { PrimitiveAtom, WritableAtom } from 'jotai';
import { focusAtom } from 'jotai-optics';
import type { OpticFor } from 'optics-ts';
import type { DeepKeys } from '@tanstack/react-form';

/**
 * Initialises atoms with the provided values.
 * This component uses `useHydrateAtoms` to set the initial state of the atoms
 * based on the `atomValues` prop.
 * It is useful for server-side rendering or when you want to set the initial state
 * of atoms based on some external data.
 * It _does not_ update the values once the component is mounted.
 * You have to subscribe to the atom in a child component to get the updated values.
 * Hence the name `InitAtoms`, which indicates that it is only for initialisation.
 * In the jotai docs, they call it "hydration" but it's not really hydration as
 * in SSR terminology.
 *
 * Usage:
 * <InitAtoms atomValues={[[atom1, value1], [atom2, value2]]}>
 *   <YourComponent />
 * </InitAtoms>
 */
export const InitAtoms = ({
  atomValues,
  children,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  atomValues: Iterable<
    readonly [WritableAtom<unknown, [any], unknown>, unknown]
  >;
  children: ReactNode;
}) => {
  // initialising on state with prop on render here
  useHydrateAtoms(new Map(atomValues));
  return children;
};

// Returns the Readable/Writeable focused Atom of a field
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
