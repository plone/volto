import type { Value } from 'platejs';

/**
 * Deep-clone a Value to guarantee mutability (handles frozen/readonly sources).
 * Returns the cloned array reference.
 */
export const cloneValueToWritable = (nodes: Value): Value => {
  if (!Array.isArray(nodes)) return nodes;

  try {
    return structuredClone(nodes) as Value;
  } catch {
    return JSON.parse(JSON.stringify(nodes)) as Value;
  }
};

/**
 * If a normalization produced a new Value reference, try to update the target
 * array in place so existing references (e.g., Plate initialValue) see changes.
 */
export const applyNormalizedValue = (target: Value, normalized: Value) => {
  if (target === normalized) return;
  if (!Array.isArray(target) || !Array.isArray(normalized)) return;
  try {
    target.splice(0, target.length, ...normalized);
  } catch {
    // If the target is readonly/frozen, we can't update in place; caller should
    // use the returned normalized value instead.
  }
};
