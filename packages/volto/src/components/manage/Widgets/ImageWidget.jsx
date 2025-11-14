import React, { useEffect, useRef } from 'react';
import { Button, Dimmer, Loader, Message } from 'semantic-ui-react';
import { useIntl, defineMessages } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import loadable from '@loadable/component';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { toast } from 'react-toastify';
import useLinkEditor from '@plone/volto/components/manage/AnchorPlugin/useLinkEditor';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import config from '@plone/volto/registry';

import {
  flattenToAppURL,
  getBaseUrl,
  getParentUrl,
  isInternalURL,
  normalizeUrl,
  removeProtocol,
} from '@plone/volto/helpers/Url/Url';
import { validateFileUploadSize } from '@plone/volto/helpers/FormValidation/FormValidation';
import { usePrevious } from '@plone/volto/helpers/Utils/usePrevious';
import { createContent } from '@plone/volto/actions/content/content';
import { readAsDataURL } from 'promise-file-reader';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import Toast from '@plone/volto/components/manage/Toast/Toast';

import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';
import linkSVG from '@plone/volto/icons/link.svg';
import uploadSVG from '@plone/volto/icons/upload.svg';
import Image from '../../theme/Image/Image';
import { urlValidator } from '@plone/volto/helpers/FormValidation/validators';
import { searchContent } from '@plone/volto/actions/search/search';

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
  Error: {
    id: 'Error',
    defaultMessage: 'Error',
  },
  imageUploadErrorMessage: {
    id: 'imageUploadErrorMessage',
    defaultMessage: 'Please upload an image instead.',
  },
  externalURLsNotAllowed: {
    id: 'externalURLsNotAllowed',
    defaultMessage: 'External URLs are not allowed in this field.',
  },
  internalImageNotFoundErrorMessage: {
    id: 'internalImageNotFoundErrorMessage',
    defaultMessage: 'No image was found in the internal path you provided.',
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
  const imageValue = value?.[0]?.['@id'] || value?.['@id'] || value;

  const intl = useIntl();
  const linkEditor = useLinkEditor();
  const location = useLocation();
  const dispatch = useDispatch();
  const isFolderish = useSelector(
    (state) => state?.content?.data?.is_folderish,
  );
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
  const isRelationChoice = props.factory === 'Relation Choice';

  useEffect(() => {
    if (uploading && loading && loaded) {
      setUploading(false);
      if (isRelationChoice) {
        onChange(id, content, {
          image_field: 'image',
          image_scales: { image: [image] },
        });
      } else {
        onChange(id, imageId, {
          image_field: 'image',
          image_scales: { image: [image] },
        });
      }
    }
  }, [
    loading,
    loaded,
    uploading,
    imageId,
    image,
    id,
    content,
    isRelationChoice,
    onChange,
  ]);

  loading = usePrevious(props.request?.loading);

  const handleUpload = React.useCallback(
    (eventOrFile) => {
      let uploadUrl = getBaseUrl(contextUrl);
      if (!isFolderish) uploadUrl = getParentUrl(uploadUrl);
      if (restrictFileUpload === true) return;
      eventOrFile.target && eventOrFile.stopPropagation();

      setUploading(true);
      const file = eventOrFile.target
        ? eventOrFile.target.files[0]
        : eventOrFile[0];
      if (!validateFileUploadSize(file, intl.formatMessage)) {
        setUploading(false);
        return;
      }
      readAsDataURL(file).then((fileData) => {
        const fields = fileData.match(/^data:(.*);(.*),(.*)$/);
        dispatch(
          createContent(
            uploadUrl,
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
      contextUrl,
      isFolderish,
      restrictFileUpload,
      intl.formatMessage,
      dispatch,
      props.block,
      requestId,
    ],
  );

  const onDragEnter = React.useCallback(() => {
    if (restrictFileUpload === false) setDragging(true);
  }, [restrictFileUpload]);
  const onDragLeave = React.useCallback(() => setDragging(false), []);

  const validateManualLink = React.useCallback(
    (url) => {
      if (!url.startsWith('/')) {
        const error = urlValidator({
          value: url,
          formatMessage: intl.formatMessage,
        });
        // if (error && url !== '') {
        //   this.setState({ errors: [error] });
        // } else {
        //   this.setState({ errors: [] });
        // }
        return !Boolean(error);
      } else {
        return isInternalURL(url);
      }
    },
    [intl.formatMessage],
  );

  const onSubmitURL = React.useCallback(
    (url) => {
      if (validateManualLink(url)) {
        if (isInternalURL(url)) {
          // convert it into an internal on if possible
          props
            .searchContent(
              '/',
              {
                portal_type: config.settings.imageObjects,
                'path.query': flattenToAppURL(url),
                'path.depth': '0',
                sort_on: 'getObjPositionInParent',
                metadata_fields: '_all',
                b_size: 1000,
              },
              `${props.block}-${props.mode}`,
            )
            .then((resp) => {
              if (resp.items?.length > 0) {
                onChange(props.id, resp.items[0], {});
              } else {
                toast.error(
                  <Toast
                    error
                    title={intl.formatMessage(messages.Error)}
                    content={intl.formatMessage(
                      messages.internalImageNotFoundErrorMessage,
                    )}
                  />,
                );
              }
            });
        } else {
          if (isRelationChoice) {
            toast.error(
              <Toast
                error
                title={intl.formatMessage(messages.Error)}
                content={intl.formatMessage(messages.imageUploadErrorMessage)}
              />,
            );
          } else {
            // if it's an external link, we save it as is
            onChange(props.id, [
              {
                '@id': normalizeUrl(url),
                title: removeProtocol(url),
              },
            ]);
          }
        }
      }
    },
    [validateManualLink, props, intl, isRelationChoice, onChange],
  );

  return imageValue ? (
    <div
      className="image-upload-widget-image"
      onClick={onFocus}
      onKeyDown={onFocus}
      role="toolbar"
    >
      {selected && <ImageToolbar {...props} />}
      {/* If it's relation choice (preview_image_link) */}
      {isRelationChoice ? (
        <Image item={value} width="fit-content" height="auto" loading="lazy" />
      ) : (
        <Image
          className={props.className}
          src={
            isInternalURL(imageValue)
              ? `${flattenToAppURL(imageValue)}/@@images/image/${imageSize}`
              : imageValue
          }
          alt=""
        />
      )}
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
        accept="image/*"
        onDrop={(acceptedFiles) => {
          setDragging(false);
          if (acceptedFiles.length > 0) {
            handleUpload(acceptedFiles);
          } else {
            toast.error(
              <Toast
                error
                title={intl.formatMessage(messages.Error)}
                content={intl.formatMessage(messages.imageUploadErrorMessage)}
              />,
            );
          }
        }}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        className="dropzone"
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <Message>
              {dragging && <Dimmer active />}
              {uploading && (
                <Dimmer active>
                  <Loader indeterminate>
                    {intl.formatMessage(messages.uploadingImage)}
                  </Loader>
                </Dimmer>
              )}
              <Image src={imageBlockSVG} alt="" className="placeholder" />
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
                            onSelectItem: isRelationChoice
                              ? (url, item) => {
                                  // we save the whole item if it's a relation choice
                                  onChange(props.id, item);
                                }
                              : onSelectItem
                                ? onSelectItem
                                : // else we save the url along with the image field and scales
                                  (
                                    url,
                                    { title, image_field, image_scales },
                                  ) => {
                                    onChange(props.id, flattenToAppURL(url), {
                                      title,
                                      image_field,
                                      image_scales,
                                    });
                                  },
                            currentPath: contextUrl,
                          });
                        }}
                        type="button"
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
                        type="button"
                      >
                        <Icon name={uploadSVG} size="24px" />
                      </Button>
                      <input
                        {...getInputProps({
                          type: 'file',
                          ref: imageUploadInputRef,
                          onChange: handleUpload,
                          style: { display: 'none' },
                          accept: 'image/*',
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
                        type="button"
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
                    onChange={(_, e) => {
                      onSubmitURL(e);
                      // onChange(
                      //   props.id,
                      //   isInternalURL(e) ? flattenToAppURL(e) : e,
                      //   {},
                      // );
                    }}
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
  // This HOC goes first because it injects block in case that it's not present (not a block, but a DX field)
  withObjectBrowser,
  connect(
    (state, ownProps) => {
      const requestId = `image-upload-${ownProps.id}`;
      return {
        request: state.content.subrequests[ownProps.block || requestId] || {},
        content: state.content.subrequests[ownProps.block || requestId]?.data,
      };
    },
    { createContent, searchContent },
  ),
)(UnconnectedImageInput);

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
