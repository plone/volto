/**
 * Edit image block.
 * @module components/manage/Blocks/Image/Edit
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { ImageSidebar, SidebarPortal } from '@plone/volto/components';
import { withBlockExtensions } from '@plone/volto/helpers';
import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers';

import MediaWidget from '@plone/volto/components/manage/Widgets/MediaSelectWidget';

/**
 * Edit image block function.
 * @function Edit
 */
const Edit = (props) => {
  const { data, block, onChangeBlock, editable, selected } = props;
  return (
    <div
      className={cx(
        'block image align',
        {
          center: !Boolean(data.align),
        },
        data.align,
      )}
    >
      {data.url ? (
        <img
          className={cx({
            'full-width': data.align === 'full',
            large: data.size === 'l',
            medium: data.size === 'm',
            small: data.size === 's',
          })}
          src={
            isInternalURL(data.url)
              ? // Backwards compat in the case that the block is storing the full server URL
                (() => {
                  if (data.size === 'l')
                    return `${flattenToAppURL(data.url)}/@@images/image`;
                  if (data.size === 'm')
                    return `${flattenToAppURL(
                      data.url,
                    )}/@@images/image/preview`;
                  if (data.size === 's')
                    return `${flattenToAppURL(data.url)}/@@images/image/mini`;
                  return `${flattenToAppURL(data.url)}/@@images/image`;
                })()
              : data.url
          }
          alt={data.alt || ''}
        />
      ) : (
        <div>
          {editable && (
            <MediaWidget
              inline
              id="url"
              title="Source"
              onChange={(id, value) => {
                onChangeBlock(block, {
                  ...data,
                  [id]: value,
                });
              }}
            />
          )}
        </div>
      )}
      <SidebarPortal selected={selected}>
        <ImageSidebar {...props} />
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
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  content: PropTypes.objectOf(PropTypes.any).isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default withBlockExtensions(Edit);
