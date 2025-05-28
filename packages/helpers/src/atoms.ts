import { useHydrateAtoms } from 'jotai/utils';
import type { WritableAtom } from 'jotai';
import type { ReactNode } from 'react';

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
