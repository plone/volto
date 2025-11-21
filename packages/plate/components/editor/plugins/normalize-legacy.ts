import type { Value } from 'platejs';

import { KEYS } from 'platejs';
import {
  migrateLegacyBoldInValue,
  migrateLegacyBold,
} from './legacy-bold-plugin';
import { migrateLegacyLinksInValueStatic } from './legacy-link-plugin';

/**
 * Run legacy migrations on a value synchronously (useful for SSR).
 * Mutates the provided value; returns the same reference for convenience.
 */
export const normalizeLegacyValue = (value?: Value, linkType = KEYS.link) => {
  if (!value) return value;

  // These functions are idempotent and safe to run multiple times.
  migrateLegacyBoldInValue(value);
  migrateLegacyLinksInValueStatic(value, linkType);

  return value;
};

export const legacyMigrations = {
  migrateLegacyBold,
  migrateLegacyBoldInValue,
  migrateLegacyLinksInValueStatic,
  normalizeLegacyValue,
};
