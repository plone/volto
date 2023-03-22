/**
 * View toc block.
 * @module components/manage/Blocks/ToC/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import cx from 'classnames';
import { Message } from 'semantic-ui-react';
import { withBlockExtensions } from '@plone/volto/helpers';

import { getBlocksTocEntries } from '@plone/volto/helpers';

/**
 * View toc block class.
 * @class View
 * @extends Component
 */
const View = (props) => {
  const { data } = props;
  const { variation } = props;
  const metadata = props.metadata || props.properties;

  const tocEntries = React.useMemo(() => {
    let entries = [];
    let prevEntry = {};

    const { rootLevel, tocEntries, tocEntriesLayout } = getBlocksTocEntries(
      metadata,
      data,
    );

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
  }, [data, metadata]);

  const Renderer = variation?.view;
  return (
    <div className={cx('table-of-contents', variation?.id)}>
      {props.mode === 'edit' && !data.title && !tocEntries.length && (
        <Message>Table of content</Message>
      )}

      {Renderer ? (
        <Renderer {...props} tocEntries={tocEntries} properties={metadata} />
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
