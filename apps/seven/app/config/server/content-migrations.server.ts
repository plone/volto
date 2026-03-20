import config from '@plone/registry';
import type { Value } from '@plone/plate/components/editor';
import type { Content } from '@plone/types';
import '../types';

const SOMERSAULT_KEY = '__somersault__';

type SomersaultValue = Value;

const createSomersaultValue = (content: Content): SomersaultValue => {
  const orderedBlockIds = Array.isArray(content.blocks_layout?.items)
    ? content.blocks_layout.items
    : [];
  const somersaultBlockMigrations = config.getUtilities({
    type: 'somersaultBlockMigration',
  });

  return orderedBlockIds.flatMap((blockId) => {
    const block = content.blocks?.[blockId] as
      | Record<string, unknown>
      | undefined;
    if (!block) return [];

    return somersaultBlockMigrations.flatMap(
      (utility) =>
        utility.method({
          block,
          blockId,
          content,
        }) as SomersaultValue,
    );
  });
};

export const migrateContent = (content: Content) => {
  if (content.blocks?.[SOMERSAULT_KEY]) return content;
  if (!content.blocks || !Array.isArray(content.blocks_layout?.items)) {
    return content;
  }

  const somersaultMigrations = config.getUtilities({
    type: 'somersaultMigration',
  });

  const initialValue = createSomersaultValue(content);
  const migratedValue = somersaultMigrations.reduce<SomersaultValue>(
    (value, utility) =>
      utility.method({
        content,
        value,
      }) as SomersaultValue,
    initialValue,
  );

  content.blocks[SOMERSAULT_KEY] = {
    '@type': SOMERSAULT_KEY,
    value: migratedValue,
  } as (typeof content.blocks)[string];

  return content;
};
