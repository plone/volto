import config from '@plone/registry';
import {
  migrateLegacyBoldInValue,
  migrateLegacyBlockWidthsInValue,
  migrateLegacyItalicInValue,
  migrateLegacyLinksInValueStatic,
  migrateLegacyListsInValue,
  migrateLegacyStrikethroughInValue,
} from '@plone/plate/migrations';
import type {
  SomersaultBlockMigrationArgs,
  SomersaultMigrationArgs,
} from '../types';

export default function install() {
  config.registerUtility({
    name: 'somersaultBlockMigrationTitle',
    type: 'somersaultBlockMigration',
    method: ({ block, content }: SomersaultBlockMigrationArgs) =>
      block['@type'] === 'title'
        ? [
            {
              type: 'title',
              children: [
                {
                  text: typeof content.title === 'string' ? content.title : '',
                },
              ],
            },
          ]
        : [],
  });

  config.registerUtility({
    name: 'somersaultBlockMigrationLegacyValue',
    type: 'somersaultBlockMigration',
    method: ({ block }: SomersaultBlockMigrationArgs) =>
      Array.isArray(block.value) ? block.value : [],
  });

  config.registerUtility({
    name: 'somersaultMigrationLegacyBold',
    type: 'somersaultMigration',
    method: ({ value }: SomersaultMigrationArgs) =>
      migrateLegacyBoldInValue(value),
  });

  config.registerUtility({
    name: 'somersaultMigrationLegacyItalic',
    type: 'somersaultMigration',
    method: ({ value }: SomersaultMigrationArgs) =>
      migrateLegacyItalicInValue(value),
  });

  config.registerUtility({
    name: 'somersaultMigrationLegacyStrikethrough',
    type: 'somersaultMigration',
    method: ({ value }: SomersaultMigrationArgs) =>
      migrateLegacyStrikethroughInValue(value),
  });

  config.registerUtility({
    name: 'somersaultMigrationLegacyLinks',
    type: 'somersaultMigration',
    method: ({ value }: SomersaultMigrationArgs) =>
      migrateLegacyLinksInValueStatic(value),
  });

  config.registerUtility({
    name: 'somersaultMigrationLegacyLists',
    type: 'somersaultMigration',
    method: ({ value }: SomersaultMigrationArgs) =>
      migrateLegacyListsInValue(value),
  });

  config.registerUtility({
    name: 'somersaultMigrationBlockWidths',
    type: 'somersaultMigration',
    method: ({ value }: SomersaultMigrationArgs) =>
      migrateLegacyBlockWidthsInValue(value),
  });
}
