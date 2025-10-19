import { useMemo } from 'react';
import clsx from 'clsx';
import config from '@plone/registry';
import type { BlocksFormData, BlockViewProps, Content } from '@plone/types';
import { getBlocksFieldName } from '@plone/helpers';

export const getBlocksTocEntries = (
  properties: Content,
  tocData: BlocksFormData,
): ReturnedToCEntries => {
  const blocksFieldName = getBlocksFieldName(properties);
  const blocksLayoutFieldName = getBlocksFieldName(properties, 'blocks_layout');

  const blocks = properties[blocksFieldName];
  const blocks_layout = properties[blocksLayoutFieldName];

  const levels =
    tocData.levels?.length > 0
      ? tocData.levels.map((l) => parseInt(l.slice(1)))
      : [1, 2, 3, 4, 5, 6];
  let rootLevel = Infinity;
  let blocksFormEntries = [];
  const tocEntries = {};
  const tocEntriesLayout = [];

  blocks_layout.items.forEach((id) => {
    const block = blocks[id];
    const blockConfig = config.blocks.blocksConfig[block['@type']];

    if (!block || !blockConfig) {
      return null;
    }
    if (!blockConfig.tocEntries && !blockConfig.tocEntry) {
      return null;
    }

    const blockTocEntry = blockConfig.tocEntry?.(block, tocData);

    const blockTocEntries = [
      ...(blockConfig.tocEntries?.(block, tocData) ||
        (blockTocEntry ? [blockTocEntry] : [])),
    ];

    blocksFormEntries = [...blocksFormEntries, ...blockTocEntries];

    blockTocEntries.forEach((entry, index) => {
      const tocEntryId = `${id}-${index}`;
      const level = entry[0];
      const title = entry[1];
      const items = [];
      if (!level || !levels.includes(level)) return;
      tocEntriesLayout.push(tocEntryId);
      tocEntries[tocEntryId] = {
        level,
        title: title || block.plaintext,
        items,
        id: tocEntryId,
      };
      if (level < rootLevel) {
        rootLevel = level;
      }
    });
  });

  return {
    rootLevel,
    blocksFormEntries,
    tocEntries,
    tocEntriesLayout,
  };
};

const ToCBlockView = (props: BlockViewProps) => {
  const { data, blocksConfig } = props;

  const title = data.title && !data.hide_title ? data.title : '';
  const metadata = props.metadata || props.properties;
  const blocksFieldName = getBlocksFieldName(metadata);
  const variation = (blocksConfig.toc.variations || []).find(
    (v) => v.id === data.variation,
  );
  const Renderer = variation?.view;

  const levels = useMemo(
    () =>
      data.levels?.length > 0
        ? data.levels.map((l) => parseInt(l.slice(1)))
        : [1, 2, 3, 4, 5, 6],
    [data],
  );

  const tocEntries = useMemo(() => {
    const entries = [];
    let prevEntry: Partial<ToCEntry> = {};
    const { rootLevel, tocEntries, tocEntriesLayout } = getBlocksTocEntries(
      metadata,
      data,
    );

    tocEntriesLayout.forEach((id) => {
      const block = metadata[blocksFieldName][id];
      if (typeof block === 'undefined') {
        return null;
      }
      if (!config.blocks.blocksConfig[block['@type']]?.tocEntry) return null;
      const entry = config.blocks.blocksConfig[block['@type']]?.tocEntry(
        block,
        data,
      );

      if (entry) {
        const level = entry[0];
        const title = entry[1];
        const items = [];
        if (!title?.trim() && !block.plaintext?.trim()) return;
        if (!level || !levels.includes(level)) return;
        tocEntriesLayout.push(id);
        tocEntries[id] = {
          level,
          title: title || block.plaintext,
          items,
          id,
          override_toc: block.override_toc,
          plaintext: block.plaintext,
        };
      }
    });

    tocEntriesLayout.forEach((id) => {
      const entry = tocEntries[id];
      if (entry.level === rootLevel) {
        entries.push(entry);
        prevEntry = entry;
        return;
      }
      if (!prevEntry.id) return;
      if (entry.level > prevEntry.level) {
        entry.parentId = prevEntry.id;
        (prevEntry.items || []).push(entry);
        prevEntry = entry;
      } else if (entry.level < prevEntry.level) {
        let parent = tocEntries[prevEntry.parentId];
        while (entry.level <= parent.level) {
          parent = tocEntries[parent.parentId];
        }
        entry.parentId = parent.id;
        parent.items.push(entry);
        prevEntry = entry;
      } else {
        entry.parentId = prevEntry.parentId;
        tocEntries[prevEntry.parentId].items.push(entry);
        prevEntry = entry;
      }
    });

    return entries;
  }, [data, levels, metadata, blocksFieldName]);

  return tocEntries.length > 0 ? (
    <nav
      aria-label={title as string}
      className={clsx('table-of-contents', variation?.id)}
    >
      {Renderer ? (
        <Renderer {...props} tocEntries={tocEntries} metadata={metadata} />
      ) : (
        <div>View extension not found</div>
      )}
    </nav>
  ) : null;
};

export interface ToCEntry {
  id: string;
  level: number;
  title: string;
  items: ToCEntry[];
  override_toc?: boolean;
  plaintext?: string;
  parentId?: string;
}

interface ReturnedToCEntries {
  tocEntries: Record<string, ToCEntry>;
  rootLevel: number;
  blocksFormEntries: Array<[number, string]>;
  tocEntriesLayout: string[];
}

export default ToCBlockView;
