/**
 * View toc block.
 * @module components/manage/Blocks/ToC/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import cx from 'classnames';
import { Message } from 'semantic-ui-react';
import config from '@plone/volto/registry';
import { withBlockExtensions } from '@plone/volto/helpers';

import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
} from '@plone/volto/helpers';

/**
 * View toc block class.
 * @class View
 * @extends Component
 */
const View = (props) => {
  const { properties, data } = props;
  const { variation } = props;
  const blocksFieldname = getBlocksFieldname(properties);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(properties);
  const levels = React.useMemo(
    () =>
      data.levels?.length > 0
        ? data.levels.map((l) => parseInt(l.slice(1)))
        : [1, 2, 3, 4, 5, 6],
    [data],
  );
  const tocEntries = React.useMemo(() => {
    let rootLevel = Infinity;
    let entries = [];
    let prevEntry = {};
    let tocEntries = {};
    let tocEntriesLayout = [];

    properties[blocksLayoutFieldname].items.forEach((id) => {
      const block = properties[blocksFieldname][id];
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
        tocEntries[id] = { level, title: title || block.plaintext, items, id };
        if (level < rootLevel) {
          rootLevel = level;
        }
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
  }, [data, levels, properties, blocksFieldname, blocksLayoutFieldname]);

  const Renderer = variation?.view;
  return (
    <div className={cx('table-of-contents', variation?.id)}>
      {props.mode === 'edit' && !data.title && !tocEntries.length && (
        <Message>Table of content</Message>
      )}

      {Renderer ? (
        <Renderer {...props} tocEntries={tocEntries} properties={properties} />
      ) : (
        <div>View extension not found</div>
      )}
    </div>
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
