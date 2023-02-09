/**
 * Edit video block.
 * @module components/manage/Blocks/Title/Edit
 */

import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages } from 'react-intl';
import cx from 'classnames';

import { SidebarPortal, VideoSidebar } from '@plone/volto/components';
import Body from '@plone/volto/components/manage/Blocks/Video/Body';
import { withBlockExtensions } from '@plone/volto/helpers';
import MediaWidget from '@plone/volto/components/manage/Widgets/MediaSelectWidget';

const messages = defineMessages({
  VideoFormDescription: {
    id: 'Specify a youtube video or playlist url',
    defaultMessage: 'Specify a youtube video or playlist url',
  },
  VideoBlockInputPlaceholder: {
    id: 'Type a Video (YouTube, Vimeo or mp4) URL',
    defaultMessage: 'Type a Video (YouTube, Vimeo or mp4) URL',
  },
});

/**
 * Edit video block function.
 * @function Edit
 */
const Edit = (props) => {
  const { data, editable, block, onChangeBlock, selected } = props;
  return (
    <div
      className={cx(
        'block video align',
        {
          selected: selected,
          center: !Boolean(data.align),
        },
        data.align,
      )}
    >
      {data.url ? (
        <Body data={data} isEditMode={true} />
      ) : (
        <div>
          {editable && (
            <MediaWidget
              inline
              mode="video"
              id="url"
              title="Source"
              block={block}
              onChange={(id, value) => {
                onChangeBlock(block, {
                  ...data,
                  [id]: value,
                });
              }}
              handlesErrors={false}
            />
          )}
        </div>
      )}
      <SidebarPortal selected={selected}>
        <VideoSidebar {...props} />
      </SidebarPortal>
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Edit.propTypes = {
  selected: PropTypes.bool.isRequired,
  block: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  onSelectBlock: PropTypes.func.isRequired,
  onDeleteBlock: PropTypes.func.isRequired,
  onFocusPreviousBlock: PropTypes.func.isRequired,
  onFocusNextBlock: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
};

export default withBlockExtensions(Edit);
