import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { readAsDataURL } from 'promise-file-reader';
import { Button, Dimmer, Input, Loader, Message } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import loadable from '@loadable/component';
import cx from 'classnames';

import { Icon, ImageSidebar, SidebarPortal } from '@plone/volto/components';
import { createContent } from '@plone/volto/actions';
import {
  flattenToAppURL,
  getBaseUrl,
  isInternalURL,
  validateFileUploadSize,
  withBlockExtensions,
  usePrevious,
} from '@plone/volto/helpers';
import config from '@plone/volto/registry';

import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';
import aheadSVG from '@plone/volto/icons/ahead.svg';
import uploadSVG from '@plone/volto/icons/upload.svg';

const Dropzone = loadable(() => import('react-dropzone'));

const messages = defineMessages({
  ImageBlockInputPlaceholder: {
    id: 'Browse the site, drop an image, or type an URL',
    defaultMessage: 'Browse the site, drop an image, or type an URL',
  },
  uploadingImage: {
    id: 'Uploading image',
    defaultMessage: 'Uploading image',
  },
});

const Edit = React.memo((props) => {
  const {
    block,
    data,
    onChangeBlock,
    pathname,
    editable,
    openObjectBrowser,
    onSelectBlock,
    id,
    selected,
  } = props;
  const intl = useIntl();
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState('');
  const [dragging, setDragging] = useState(false);

  const request = useSelector(
    (state) => state.content.subrequests[block] || {},
  );
  const content = useSelector(
    (state) => state.content.subrequests[block]?.data,
  );
  const prevRequestLoading = usePrevious(request.loading);

  useEffect(() => {
    if (prevRequestLoading && request.loaded && uploading) {
      setUploading(false);
      onChangeBlock(block, {
        ...data,
        url: content['@id'],
        image_field: 'image',
        image_scales: { image: [content.image] },
        alt: '',
      });
    }
  }, [
    content,
    block,
    data,
    prevRequestLoading,
    request.loaded,
    uploading,
    onChangeBlock,
  ]);

  const onUploadImage = useCallback(
    (e) => {
      e.stopPropagation();
      const file = e.target.files[0];
      if (!validateFileUploadSize(file, intl.formatMessage)) return;
      setUploading(true);
      readAsDataURL(file).then((data) => {
        const fields = data.match(/^data:(.*);(.*),(.*)$/);
        dispatch(
          createContent(
            getBaseUrl(pathname),
            {
              '@type': 'Image',
              title: file.name,
              image: {
                data: fields[3],
                encoding: fields[2],
                'content-type': fields[1],
                filename: file.name,
              },
            },
            block,
          ),
        );
      });
    },
    [block, dispatch, intl, pathname],
  );

  const onChangeUrl = ({ target }) => {
    setUrl(target.value);
  };

  const onSubmitUrl = useCallback(() => {
    onChangeBlock(block, {
      ...data,
      url: flattenToAppURL(url),
      image_field: undefined,
      image_scales: undefined,
    });
  }, [block, data, url, onChangeBlock]);

  const onDrop = useCallback(
    (files) => {
      if (!validateFileUploadSize(files[0], intl.formatMessage)) {
        setDragging(false);
        return;
      }
      setUploading(true);

      readAsDataURL(files[0]).then((data) => {
        const fields = data.match(/^data:(.*);(.*),(.*)$/);
        dispatch(
          createContent(
            getBaseUrl(pathname),
            {
              '@type': 'Image',
              title: files[0].name,
              image: {
                data: fields[3],
                encoding: fields[2],
                'content-type': fields[1],
                filename: files[0].name,
              },
            },
            block,
          ),
        );
      });
    },
    [pathname, block, dispatch, intl],
  );

  const onKeyDownVariantMenuForm = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        onSubmitUrl();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        // TODO: Do something on ESC key
      }
    },
    [onSubmitUrl],
  );
  const onDragEnter = () => {
    setDragging(true);
  };
  const onDragLeave = () => {
    setDragging(false);
  };

  const Image = config.getComponent({ name: 'Image' }).component;
  const placeholder = useMemo(
    () =>
      data.placeholder ||
      intl.formatMessage(messages.ImageBlockInputPlaceholder),
    [data, intl],
  );

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
        <div>
          {editable && (
            <Dropzone
              noClick
              onDrop={onDrop}
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              className="dropzone"
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <Message>
                    {dragging && <Dimmer active></Dimmer>}
                    {uploading && (
                      <Dimmer active>
                        <Loader indeterminate>
                          {intl.formatMessage(messages.uploadingImage)}
                        </Loader>
                      </Dimmer>
                    )}
                    <div className="no-image-wrapper">
                      <img src={imageBlockSVG} alt="" />
                      <div className="toolbar-inner">
                        <Button.Group>
                          <Button
                            basic
                            icon
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              openObjectBrowser({
                                onSelectItem: (
                                  url,
                                  { title, image_field, image_scales },
                                ) => {
                                  onChangeBlock(block, {
                                    ...data,
                                    url,
                                    image_field,
                                    image_scales,
                                    alt: data.alt || title || '',
                                  });
                                },
                              });
                            }}
                          >
                            <Icon name={navTreeSVG} size="24px" />
                          </Button>
                        </Button.Group>
                        <Button.Group>
                          <label className="ui button basic icon">
                            <Icon name={uploadSVG} size="24px" />
                            <input
                              {...getInputProps({
                                type: 'file',
                                onChange: onUploadImage,
                                style: { display: 'none' },
                              })}
                            />
                          </label>
                        </Button.Group>
                        <Input
                          onKeyDown={onKeyDownVariantMenuForm}
                          onChange={onChangeUrl}
                          placeholder={placeholder}
                          value={url}
                          onClick={(e) => {
                            e.target.focus();
                          }}
                          onFocus={(e) => {
                            onSelectBlock(id);
                          }}
                        />
                        {url && (
                          <Button.Group>
                            <Button
                              basic
                              className="cancel"
                              onClick={(e) => {
                                e.stopPropagation();
                                setUrl('');
                              }}
                            >
                              <Icon name={clearSVG} size="30px" />
                            </Button>
                          </Button.Group>
                        )}
                        <Button.Group>
                          <Button
                            basic
                            primary
                            disabled={!url}
                            onClick={(e) => {
                              e.stopPropagation();
                              onSubmitUrl();
                            }}
                          >
                            <Icon name={aheadSVG} size="30px" />
                          </Button>
                        </Button.Group>
                      </div>
                    </div>
                  </Message>
                </div>
              )}
            </Dropzone>
          )}
        </div>
      )}
      <SidebarPortal selected={selected}>
        <ImageSidebar {...props} />
      </SidebarPortal>
    </div>
  );
});

Edit.propTypes = {
  selected: PropTypes.bool.isRequired,
  block: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  content: PropTypes.objectOf(PropTypes.any).isRequired,
  request: PropTypes.shape({
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
  }).isRequired,
  pathname: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  onSelectBlock: PropTypes.func.isRequired,
  onDeleteBlock: PropTypes.func.isRequired,
  onFocusPreviousBlock: PropTypes.func.isRequired,
  onFocusNextBlock: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  createContent: PropTypes.func.isRequired,
  openObjectBrowser: PropTypes.func.isRequired,
};
export default compose(withBlockExtensions)(Edit);
