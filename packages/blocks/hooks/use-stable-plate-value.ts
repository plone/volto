import * as React from 'react';

import type { Value } from 'platejs';

import { normalizeLegacyValue } from '@plone/plate/components/editor/plugins/normalize-legacy';

/**
 * Normalize a Plate value once (for legacy Slate shapes) and keep a stable
 * reference for the lifetime of the editor. Accepts an optional cloneFn if you
 * don't want to mutate the source (e.g., Redux state).
 */
export function useStablePlateValue(
  rawValue?: Value,
  cloneFn: (val: Value) => Value = defaultClone,
): Value | undefined {
  const valueRef = React.useRef<Value>();
  const initializedRef = React.useRef(false);

  if (!initializedRef.current) {
    if (rawValue) {
      // Clone to avoid mutating upstream state, then normalize once.
      const writable = cloneFn(rawValue);
      valueRef.current = normalizeLegacyValue(writable);
    } else {
      valueRef.current = rawValue as Value | undefined;
    }
    initializedRef.current = true;
  }

  return valueRef.current;
}

function defaultClone(val: Value): Value {
  try {
    return structuredClone(val) as Value;
  } catch {
    return JSON.parse(JSON.stringify(val)) as Value;
  }
}
