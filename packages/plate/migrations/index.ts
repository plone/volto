import type { Value } from 'platejs';
import { KEYS } from 'platejs';

import {
  migrateLegacyBold,
  migrateLegacyBoldInValue,
} from '../components/editor/plugins/legacy-bold-plugin';
import {
  migrateLegacyItalic,
  migrateLegacyItalicInValue,
} from '../components/editor/plugins/legacy-italic-plugin';
import { migrateLegacyLinksInValueStatic } from '../components/editor/plugins/legacy-link-plugin';
import {
  migrateLegacyStrikethrough,
  migrateLegacyStrikethroughInValue,
} from '../components/editor/plugins/legacy-strikethrough-plugin';
import { migrateLegacyListsInValue } from '../components/editor/plugins/legacy-list-plugin';
import {
  applyNormalizedValue,
  cloneValueToWritable,
} from '../components/editor/plugins/legacy-utils';
import { migrateLegacyBlockWidthsInValue } from './block-width';

export {
  migrateLegacyBold,
  migrateLegacyBoldInValue,
  migrateLegacyBlockWidthsInValue,
  migrateLegacyItalic,
  migrateLegacyItalicInValue,
  migrateLegacyLinksInValueStatic,
  migrateLegacyStrikethrough,
  migrateLegacyStrikethroughInValue,
  migrateLegacyListsInValue,
};

export const normalizeLegacyValue = (value?: Value, linkType = KEYS.link) => {
  if (!value) return value;

  let mutableValue = cloneValueToWritable(value);

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
  migrateLegacyBlockWidthsInValue,
  migrateLegacyLinksInValueStatic,
  migrateLegacyListsInValue,
  normalizeLegacyValue,
};
