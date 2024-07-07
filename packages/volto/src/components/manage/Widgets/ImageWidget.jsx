import React, { useEffect, useRef } from 'react';
import { Button, Dimmer, Loader, Message } from 'semantic-ui-react';
import { useIntl, defineMessages } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import loadable from '@loadable/component';
import { connect } from 'react-redux';
import { compose } from 'redux';
import useLinkEditor from '@plone/volto/components/manage/AnchorPlugin/useLinkEditor';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';

import {
  flattenToAppURL,
  getBaseUrl,
  isInternalURL,
  validateFileUploadSize,
  usePrevious,
} from '@plone/volto/helpers';
import { createContent } from '@plone/volto/actions';
import { readAsDataURL } from 'promise-file-reader';
import { FormFieldWrapper, Icon } from '@plone/volto/components';

import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';
import linkSVG from '@plone/volto/icons/link.svg';
import uploadSVG from '@plone/volto/icons/upload.svg';

const Dropzone = loadable(() => import('react-dropzone'));

export const ImageToolbar = ({ className, data, id, onChange, selected }) => (
  <div className="image-upload-widget-toolbar">
    <Button.Group>
      <Button icon basic onClick={() => onChange(id, null)}>
        <Icon className="circled" name={clearSVG} size="24px" color="#e40166" />
      </Button>
    </Button.Group>
  </div>
);

const messages = defineMessages({
  addImage: {
    id: 'Browse the site, drop an image, or type a URL',
    defaultMessage: 'Browse the site, drop an image, or use a URL',
  },
  pickAnImage: {
    id: 'pickAnImage',
    defaultMessage: 'Pick an existing image',
  },
  uploadAnImage: {
    id: 'uploadAnImage',
    defaultMessage: 'Upload an image from your computer',
  },
  linkAnImage: {
    id: 'linkAnImage',
    defaultMessage: 'Enter a URL to an image',
  },
  uploadingImage: {
    id: 'Uploading image',
    defaultMessage: 'Uploading image',
  },
});

const UnconnectedImageInput = (props) => {
  const {
    id,
    onChange,
    onFocus,
    openObjectBrowser,
    value,
    imageSize = 'teaser',
    selected = true,
    hideLinkPicker = false,
    hideObjectBrowserPicker = false,
    restrictFileUpload = false,
    objectBrowserPickerType = 'image',
    description,
    placeholderLinkInput = '',
    onSelectItem,
  } = props;
  const imageValue = value?.[0]?.['@id'] || value;

  const intl = useIntl();
  const linkEditor = useLinkEditor();
  const location = useLocation();
  const dispatch = useDispatch();
  const contextUrl = location.pathname;

  const [uploading, setUploading] = React.useState(false);
  const [dragging, setDragging] = React.useState(false);

  const imageUploadInputRef = useRef(null);

  const requestId = `image-upload-${id}`;

  const loaded = props.request.loaded;
  const { content } = props;
  const imageId = content?.['@id'];
  const image = content?.image;
  let loading = false;

  useEffect(() => {
    if (uploading && loading && loaded) {
      setUploading(false);
      onChange(id, imageId, {
        image_field: 'image',
        image_scales: { image: [image] },
      });
    }
  }, [loading, loaded, uploading, imageId, image, id, onChange]); // Explicitly list all dependencies

  loading = usePrevious(props.request?.loading);

  const handleUpload = React.useCallback(
    (eventOrFile) => {
      if (restrictFileUpload === true) return;
      eventOrFile.target && eventOrFile.stopPropagation();

      setUploading(true);
      const file = eventOrFile.target
        ? eventOrFile.target.files[0]
        : eventOrFile[0];
      if (!validateFileUploadSize(file, intl.formatMessage)) return;
      readAsDataURL(file).then((fileData) => {
        const fields = fileData.match(/^data:(.*);(.*),(.*)$/);
        dispatch(
          createContent(
            getBaseUrl(contextUrl),
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
            props.block || requestId,
          ),
        );
      });
    },
    [
      restrictFileUpload,
      intl.formatMessage,
      dispatch,
      props,
      contextUrl,
      requestId,
    ],
  );

  const onDragEnter = React.useCallback(() => {
    if (restrictFileUpload === false) setDragging(true);
  }, [restrictFileUpload]);
  const onDragLeave = React.useCallback(() => setDragging(false), []);

  return imageValue ? (
    <div
      className="image-upload-widget-image"
      onClick={onFocus}
      onKeyDown={onFocus}
      role="toolbar"
    >
      {selected && <ImageToolbar {...props} />}
      <img
        className={props.className}
        src={
          isInternalURL(imageValue)
            ? `${flattenToAppURL(imageValue)}/@@images/image/${imageSize}`
            : imageValue
        }
        alt=""
      />
    </div>
  ) : (
    <div
      className="image-upload-widget"
      onClick={onFocus}
      onKeyDown={onFocus}
      role="toolbar"
    >
      <Dropzone
        noClick
        onDrop={handleUpload}
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
              <img src={imageBlockSVG} alt="" className="placeholder" />
              <p>{description || intl.formatMessage(messages.addImage)}</p>
              <div className="toolbar-wrapper">
                <div className="toolbar-inner" ref={linkEditor.anchorNode}>
                  {hideObjectBrowserPicker === false && (
                    <Button.Group>
                      <Button
                        aria-label={intl.formatMessage(messages.pickAnImage)}
                        icon
                        basic
                        onClick={(e) => {
                          onFocus && onFocus();
                          e.preventDefault();
                          openObjectBrowser({
                            mode: objectBrowserPickerType,
                            onSelectItem: onSelectItem
                              ? onSelectItem
                              : (url, { title, image_field, image_scales }) => {
                                  onChange(props.id, flattenToAppURL(url), {
                                    title,
                                    image_field,
                                    image_scales,
                                  });
                                },
                            currentPath: contextUrl,
                          });
                        }}
                      >
                        <Icon name={navTreeSVG} size="24px" />
                      </Button>
                    </Button.Group>
                  )}
                  {restrictFileUpload === false && (
                    <Button.Group>
                      <Button
                        aria-label={intl.formatMessage(messages.uploadAnImage)}
                        icon
                        basic
                        compact
                        onClick={() => {
                          imageUploadInputRef.current.click();
                        }}
                      >
                        <Icon name={uploadSVG} size="24px" />
                      </Button>
                      <input
                        {...getInputProps({
                          type: 'file',
                          ref: imageUploadInputRef,
                          onChange: handleUpload,
                          style: { display: 'none' },
                        })}
                      />
                    </Button.Group>
                  )}

                  {hideLinkPicker === false && (
                    <Button.Group>
                      <Button
                        icon
                        basic
                        aria-label={intl.formatMessage(messages.linkAnImage)}
                        onClick={(e) => {
                          !props.selected && onFocus && onFocus();
                          linkEditor.show();
                        }}
                      >
                        <Icon name={linkSVG} circled size="24px" />
                      </Button>
                    </Button.Group>
                  )}
                </div>
                {linkEditor.anchorNode && (
                  <linkEditor.LinkEditor
                    value={imageValue}
                    placeholder={
                      placeholderLinkInput ||
                      intl.formatMessage(messages.linkAnImage)
                    }
                    objectBrowserPickerType={objectBrowserPickerType}
                    onChange={(_, e) =>
                      onChange(
                        props.id,
                        isInternalURL(e) ? flattenToAppURL(e) : e,
                        {},
                      )
                    }
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

export const ImageInput = compose(
  connect(
    (state, ownProps) => {
      const requestId = `image-upload-${ownProps.id}`;
      return {
        request: state.content.subrequests[ownProps.block || requestId] || {},
        content: state.content.subrequests[ownProps.block || requestId]?.data,
      };
    },
    { createContent },
  ),
)(withObjectBrowser(UnconnectedImageInput));

const ImageUploadWidget = (props) => {
  const { fieldSet, id, title } = props;
  return (
    <FormFieldWrapper
      {...props}
      columns={1}
      className="block image-upload-widget"
    >
      <div className="wrapper">
        <label
          id={`fieldset-${fieldSet}-field-label-${id}`}
          htmlFor={`field-${id}`}
        >
          {title}
        </label>
      </div>
      <ImageInput {...props} />
    </FormFieldWrapper>
  );
};

export default ImageUploadWidget;
