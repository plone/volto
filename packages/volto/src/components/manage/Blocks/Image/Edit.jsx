/**
 * Edit image block.
 * @module components/manage/Blocks/Image/Edit
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { toast } from 'react-toastify';
import { useIntl, defineMessages } from 'react-intl';

import { injectIntl } from 'react-intl';
import cx from 'classnames';
import { ImageSidebar, SidebarPortal, Toast } from '@plone/volto/components';
import { createContent } from '@plone/volto/actions';

import {
  flattenToAppURL,
  isInternalURL,
  withBlockExtensions,
} from '@plone/volto/helpers';
import config from '@plone/volto/registry';

import { ImageInput } from '@plone/volto/components/manage/Widgets/ImageWidget';

/**
 * Edit image block function.
 * @function Edit
 */

const messages = defineMessages({
  notImage: {
    id: 'The provided link does not lead to an image.',
    defaultMessage: 'The provided link does not lead to an image.',
  },
});

async function checkImage(url, intl) {
  return fetch(url, {
    method: 'HEAD',
  })
    .then((response) => {
      // Check if the response is OK and the content type is an image
      return (
        response.ok && response.headers.get('content-type').startsWith('image/')
      );
    })
    .catch((error) => {
      toast.error(
        <Toast error title={intl.formatMessage(messages.notImage)} />,
        { autoClose: false, toastId: 'not_image' },
      );
      return false;
    });
}

function Edit(props) {
  const { data } = props;
  const intl = useIntl();
  const Image = config.getComponent({ name: 'Image' }).component;

  const handleChange = React.useCallback(
    async (id, image, { title, image_field, image_scales } = {}) => {
      const url = image ? image['@id'] || image : '';
      let check = await checkImage(url, intl);
      if (check) {
        props.onChangeBlock(props.block, {
          ...props.data,
          url: flattenToAppURL(url),
          image_field,
          image_scales,
          alt: props.data.alt || title || '',
        });
      } else {
        toast.error(
          <Toast error title={intl.formatMessage(messages.notImage)} />,
          { autoClose: false, toastId: 'not_image' },
        );
      }
    },
    [intl, props],
  );

  return (
    <>
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
          <Image
            className={cx({
              'full-width': data.align === 'full',
              large: data.size === 'l',
              medium: data.size === 'm',
              small: data.size === 's',
            })}
            item={
              data.image_scales
                ? {
                    '@id': data.url,
                    image_field: data.image_field,
                    image_scales: data.image_scales,
                  }
                : undefined
            }
            src={
              data.image_scales
                ? undefined
                : isInternalURL(data.url)
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
            sizes={config.blocks.blocksConfig.image.getSizes(data)}
            alt={data.alt || ''}
            loading="lazy"
            responsive={true}
          />
        ) : (
          <ImageInput
            onChange={handleChange}
            placeholderLinkInput={data.placeholder}
            block={props.block}
            id={props.block}
            objectBrowserPickerType={'image'}
          />
        )}
        <SidebarPortal selected={props.selected}>
          <ImageSidebar {...props} />
        </SidebarPortal>
      </div>
    </>
  );
}

export default compose(
  injectIntl,
  withBlockExtensions,
  connect(
    (state, ownProps) => ({
      request: state.content.subrequests[ownProps.block] || {},
      content: state.content.subrequests[ownProps.block]?.data,
    }),
    { createContent },
  ),
)(Edit);
