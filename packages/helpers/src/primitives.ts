/**
 * Checks if an object or array is empty.
 * @param obj - The object or array to check.
 * @returns True if the object or array is empty, false otherwise.
 */
export const isEmpty = (obj: object | Array<any>): boolean =>
  (Array.isArray(obj) || obj instanceof Object) &&
  !Object.entries(obj || {}).length;

/**
 * Deep equality check for plain JSON-like values.
 * @param left - First value to compare.
 * @param right - Second value to compare.
 * @returns True when values are deeply equal.
 */
export function isDeepEqual(left: unknown, right: unknown): boolean {
  if (Object.is(left, right)) return true;

  if (
    typeof left !== 'object' ||
    typeof right !== 'object' ||
    left === null ||
    right === null
  ) {
    return false;
  }

  if (Array.isArray(left) || Array.isArray(right)) {
    if (!Array.isArray(left) || !Array.isArray(right)) return false;
    if (left.length !== right.length) return false;

    for (let i = 0; i < left.length; i += 1) {
      if (!isDeepEqual(left[i], right[i])) return false;
    }

    return true;
  }

  const leftEntries = Object.entries(left);
  const rightEntries = Object.entries(right);

  if (leftEntries.length !== rightEntries.length) return false;

  for (const [key, value] of leftEntries) {
    if (!(key in right)) return false;
    if (!isDeepEqual(value, (right as Record<string, unknown>)[key])) {
      return false;
    }
  }

  return true;
}
