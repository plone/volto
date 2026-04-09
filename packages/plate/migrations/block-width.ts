import type { Value } from 'platejs';
import {
  applyBlockWidthDefaultsInValue,
} from '../components/editor/plugins/block-width-plugin';

export const migrateLegacyBlockWidthsInValue = (value: Value) => {
  applyBlockWidthDefaultsInValue(value);
  return value;
};
