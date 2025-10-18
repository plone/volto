import { useMemo } from 'react';
import clsx from 'clsx';
import config from '@plone/registry';
import type { BlockViewProps } from '@plone/types';
import { getBlocksFieldName } from '@plone/helpers';

export const getBlocksTocEntries = (properties, tocData) => {
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
      const i = `${id}-${index}`;
      const level = entry[0];
      const title = entry[1];
      const items = [];
      if (!level || !levels.includes(level)) return;
      tocEntriesLayout.push(i);
      tocEntries[i] = {
        level,
        title: title || block.plaintext,
        items,
        id: i,
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
  const { data, variation } = props;

  const title = data.title ? data.title : '';
  const metadata = props.metadata || props.properties;
  const blocksFieldName = getBlocksFieldName(metadata);
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
    let prevEntry = {};
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
        prevEntry.items.push(entry);
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

  return (
    <nav
      aria-label={title && !data.hide_title ? title : ''}
      className={clsx('table-of-contents', variation?.id)}
    >
      {Renderer ? (
        <Renderer {...props} tocEntries={tocEntries} metadata={metadata} />
      ) : (
        <div>View extension not found</div>
      )}
    </nav>
  );
};

export default ToCBlockView;
