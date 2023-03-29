import React, { useEffect, useState, useCallback } from 'react';
import { Button, Dimmer, Loader, Message } from 'semantic-ui-react';
import { useIntl, defineMessages } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import loadable from '@loadable/component';
import { toast } from 'react-toastify';

import useLinkEditor from '@plone/volto/components/manage/AnchorPlugin/useLinkEditor';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import ObjectBrowserWidget from '@plone/volto/components/manage/Widgets/ObjectBrowserWidget';

import {
  flattenToAppURL,
  getBaseUrl,
  isInternalURL,
} from '@plone/volto/helpers';
import { createContent } from '@plone/volto/actions';
import { readAsDataURL } from 'promise-file-reader';
import { isEmpty } from 'lodash';
import {
  FormFieldWrapper,
  Icon,
  UniversalLink,
  Toast,
} from '@plone/volto/components';

import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';
import linkSVG from '@plone/volto/icons/link.svg';
import uploadSVG from '@plone/volto/icons/upload.svg';
import openinnewtabSVG from '@plone/volto/icons/openinnewtab.svg';

const Dropzone = loadable(() => import('react-dropzone'));

export const ImageToolbar = ({ className, data, id, onChange, selected }) => (
  <div className="media-upload-widget-toolbar">
    <Button.Group>
      <Button icon basic onClick={() => onChange(id, null)}>
        <Icon className="circled" name={clearSVG} size="24px" color="#e40166" />
      </Button>
    </Button.Group>
  </div>
);

const messages = defineMessages({
  addMedia: {
    id: 'addMedia',
    defaultMessage: 'Browse the site, drop {type} file, or use an URL',
  },
  pickMedia: {
    id: 'Media',
    defaultMessage: 'Pick an existing {type}',
  },
  uploadMedia: {
    id: 'uploadMedia',
    defaultMessage: 'Upload  {type} from your computer',
  },
  linkMedia: {
    id: 'linkMedia',
    defaultMessage: 'Enter a URL to {type}',
  },
  uploadingMedia: {
    id: 'uploadingMedia',
    defaultMessage: 'Uploading {type}',
  },
  image: {
    id: 'image',
    defaultMessage: 'image',
  },
  video: {
    id: 'video',
    defaultMessage: 'video',
  },
});

const MediaSelectWidget = (props) => {
  const {
    id,
    pathname,
    onChange,
    onFocus,
    openObjectBrowser,
    value,
    imageSize = 'teaser',
    selected = true,
    inline,
    handlesErrors = true,
    mode = 'image',
  } = props;
  !inline && console.log(value);
  const intl = useIntl();
  const linkEditor = useLinkEditor();
  const location = useLocation();
  const dispatch = useDispatch();
  const contextUrl = pathname ?? location.pathname;

  const [dragging, setDragging] = useState(false);

  const requestId = `media-upload-${id}`;

  const uploadState = useSelector((state) => {
    return state.content.subrequests['media-upload-url'];
  });
  const uploadError = useSelector((state) => {
    return state.content.subrequests?.['media-upload-url']?.error;
  });

  useEffect(() => {
    if (uploadError && handlesErrors) {
      toast.error(
        <>
          <Toast
            error
            title="Upload error:"
            content={uploadState?.error?.response.body.message}
          />
        </>,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadError]);

  const typesMap = {
    image: { type: 'Image', field: 'image' },
    video: { type: 'File', field: 'file' },
  };

  const handleUpload = useCallback(
    (eventOrFile) => {
      eventOrFile.target && eventOrFile.stopPropagation();
      const file = eventOrFile.target
        ? eventOrFile.target.files[0]
        : eventOrFile[0];
      readAsDataURL(file).then((fileData) => {
        const fields = fileData.match(/^data:(.*);(.*),(.*)$/);
        dispatch(
          createContent(
            getBaseUrl(contextUrl),
            {
              '@type': typesMap[mode].type,
              title: file.name,
              [typesMap[mode].field]: {
                data: fields[3],
                encoding: fields[2],
                'content-type': fields[1],
                filename: file.name,
              },
            },
            requestId,
          ),
        ).then((resp) => {
          if (resp) {
            onChange(id, resp['@id']);
          }
        });
      });
    },
    [dispatch, contextUrl, typesMap, mode, requestId, onChange, id],
  );

  const onDragEnter = useCallback(() => setDragging(true), []);
  const onDragLeave = useCallback(() => setDragging(false), []);

  return !isEmpty(value) ? (
    <div
      className="media-upload-widget-image"
      onClick={onFocus}
      onKeyDown={onFocus}
      role="toolbar"
    >
      {/* {mode === 'image' && !inline && selected && <ImageToolbar {...props} />} */}
      <img
        className={props.className}
        src={`${flattenToAppURL(value)}/@@images/image/${imageSize}`}
        alt=""
      />
      <ObjectBrowserWidget
        {...props}
        value={[{ '@id': value, title: value }]}
        mode="link"
      />
    </div>
  ) : (
    <div
      className="media-upload-widget"
      onClick={onFocus}
      onKeyDown={onFocus}
      role="toolbar"
    >
      {!inline ? (
        <FormFieldWrapper {...props} noForInFieldLabel className="image" />
      ) : null}
      <Dropzone
        noClick
        onDrop={handleUpload}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        className="dropzone"
      >
        {({ getRootProps, getInputProps, open }) => (
          <div {...getRootProps()}>
            <Message>
              {dragging && <Dimmer active></Dimmer>}
              {uploadState?.loading && (
                <Dimmer active>
                  <Loader indeterminate>
                    {intl.formatMessage(messages.uploadingMedia, {
                      type: intl.formatMessage(messages[mode]),
                    })}
                  </Loader>
                </Dimmer>
              )}
              <img src={imageBlockSVG} alt="" />
              <div>
                {intl.formatMessage(messages.addMedia, {
                  type: intl.formatMessage(messages[mode]),
                })}
              </div>
              <div className="toolbar-wrapper">
                <div className="toolbar-inner" ref={linkEditor.anchorNode}>
                  <Button.Group>
                    <Button
                      title={intl.formatMessage(messages.pickMedia, {
                        type: intl.formatMessage(messages[mode]),
                      })}
                      icon
                      basic
                      onClick={(e) => {
                        onFocus && onFocus();
                        e.preventDefault();
                        openObjectBrowser({
                          mode: 'link',
                          overlay: true,
                          onSelectItem: (url, item) => onChange(id, url, item),
                        });
                      }}
                    >
                      <Icon name={navTreeSVG} size="24px" />
                    </Button>
                  </Button.Group>
                  <Button.Group>
                    <label className="ui button compact basic icon">
                      <Icon name={uploadSVG} size="24px" />
                      <input
                        {...getInputProps({
                          type: 'file',
                          onChange: handleUpload,
                          style: { display: 'none' },
                        })}
                        title={intl.formatMessage(messages.uploadMedia, {
                          type: intl.formatMessage(messages[mode]),
                        })}
                      />
                    </label>
                  </Button.Group>
                  <Button.Group>
                    <Button
                      icon
                      basic
                      title={intl.formatMessage(messages.linkMedia, {
                        type: intl.formatMessage(messages[mode]),
                      })}
                      onClick={(e) => {
                        !props.selected && onFocus && onFocus();
                        linkEditor.show();
                      }}
                    >
                      <Icon name={linkSVG} circled size="24px" />
                    </Button>
                  </Button.Group>
                </div>
                {linkEditor.anchorNode && (
                  <linkEditor.LinkEditor
                    value={value}
                    onChange={onChange}
                    id={id}
                  />
                )}
              </div>
            </Message>
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default withObjectBrowser(MediaSelectWidget);
