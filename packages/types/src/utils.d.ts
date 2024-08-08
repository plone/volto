/**
 * Get the type of the elements in an array
 */
export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;
