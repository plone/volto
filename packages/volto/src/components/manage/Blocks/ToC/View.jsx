/**
 * View toc block.
 * @module components/manage/Blocks/ToC/View
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import cx from 'classnames';
import { Message } from 'semantic-ui-react';
import { messages } from '@plone/volto/components/manage/Blocks/ToC/Schema';
import config from '@plone/volto/registry';
import { withBlockExtensions } from '@plone/volto/helpers';

import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
} from '@plone/volto/helpers';

export const getBlocksTocEntries = (properties, tocData) => {
  const blocksFieldName = getBlocksFieldname(properties);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(properties);

  const blocks = properties[blocksFieldName];
  const blocks_layout = properties[blocksLayoutFieldname];

  const levels =
    tocData.levels?.length > 0
      ? tocData.levels.map((l) => parseInt(l.slice(1)))
      : [1, 2, 3, 4, 5, 6];
  let rootLevel = Infinity;
  let blocksFormEntries = [];
  let tocEntries = {};
  let tocEntriesLayout = [];

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

/**
 * View toc block class.
 * @class View
 * @extends Component
 */
const View = (props) => {
  const { data } = props;

  const title = data.title ? data.title : '';
  const { variation } = props;
  const metadata = props.metadata || props.properties;
  const blocksFieldname = getBlocksFieldname(metadata);
  const levels = React.useMemo(
    () =>
      data.levels?.length > 0
        ? data.levels.map((l) => parseInt(l.slice(1)))
        : [1, 2, 3, 4, 5, 6],
    [data],
  );
  const tocEntries = React.useMemo(() => {
    let entries = [];
    let prevEntry = {};
    const { rootLevel, tocEntries, tocEntriesLayout } = getBlocksTocEntries(
      metadata,
      data,
    );

    tocEntriesLayout.forEach((id) => {
      const block = metadata[blocksFieldname][id];
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
  }, [data, levels, metadata, blocksFieldname]);

  const Renderer = variation?.view;
  return (
    <nav
      aria-label={title && !data.hide_title ? title : ''}
      className={cx('table-of-contents', variation?.id)}
    >
      {props.mode === 'edit' && !title && !tocEntries.length && (
        <Message>{props.intl.formatMessage(messages.toc)}</Message>
      )}

      {Renderer ? (
        <Renderer {...props} tocEntries={tocEntries} metadata={metadata} />
      ) : (
        <div>View extension not found</div>
      )}
    </nav>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  properties: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default injectIntl(withBlockExtensions(View));
