/**
 * Checks if an object or array is empty.
 * @param obj - The object or array to check.
 * @returns True if the object or array is empty, false otherwise.
 */
export const isEmpty = (obj: object | Array<any>): boolean =>
  (Array.isArray(obj) || obj instanceof Object) &&
  !Object.entries(obj || {}).length;
