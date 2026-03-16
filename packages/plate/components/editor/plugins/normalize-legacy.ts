import type { Value } from 'platejs';

import { KEYS } from 'platejs';
import {
  migrateLegacyBoldInValue,
  migrateLegacyBold,
} from './legacy-bold-plugin';
import {
  migrateLegacyItalic,
  migrateLegacyItalicInValue,
} from './legacy-italic-plugin';
import { migrateLegacyLinksInValueStatic } from './legacy-link-plugin';
import {
  migrateLegacyStrikethrough,
  migrateLegacyStrikethroughInValue,
} from './legacy-strikethrough-plugin';
import { migrateLegacyListsInValue } from './legacy-list-plugin';
import { applyNormalizedValue, cloneValueToWritable } from './legacy-utils';

/**
 * Run legacy migrations on a value synchronously (useful for SSR).
 * Mutates the provided value; returns the same reference for convenience.
 */
export const normalizeLegacyValue = (value?: Value, linkType = KEYS.link) => {
  if (!value) return value;

  let mutableValue = cloneValueToWritable(value);

  // These functions are idempotent and safe to run multiple times.
  mutableValue = migrateLegacyBoldInValue(mutableValue);
  mutableValue = migrateLegacyItalicInValue(mutableValue);
  mutableValue = migrateLegacyStrikethroughInValue(mutableValue);
  mutableValue = migrateLegacyLinksInValueStatic(mutableValue, linkType);
  mutableValue = migrateLegacyListsInValue(mutableValue);

  applyNormalizedValue(value, mutableValue);
  return mutableValue;
};

export const legacyMigrations = {
  migrateLegacyBold,
  migrateLegacyBoldInValue,
  migrateLegacyItalic,
  migrateLegacyItalicInValue,
  migrateLegacyStrikethrough,
  migrateLegacyStrikethroughInValue,
  migrateLegacyLinksInValueStatic,
  normalizeLegacyValue,
};
