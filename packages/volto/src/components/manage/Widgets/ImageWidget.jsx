import React from 'react';
import { Button, Dimmer, Loader, Message } from 'semantic-ui-react';
import { useIntl, defineMessages } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import loadable from '@loadable/component';

import useLinkEditor from '@plone/volto/components/manage/AnchorPlugin/useLinkEditor';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';

import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers';
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
    id: 'addImage',
    defaultMessage: 'Browse the site, drop an image, or use an URL',
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
    id: 'uploadingImage',
    defaultMessage: 'Uploading image',
  },
});

const UnconnectedImageInput = (props) => {
  const {
    id,
    pathname,
    onChange,
    onFocus,
    openObjectBrowser,
    value,
    imageSize = 'teaser',
    selected = true,
    hideLinkPicker = false,
    hideObjectBrowserPicker = false,
    restrictFileUpload = false,
    description,
  } = props;

  const intl = useIntl();
  const linkEditor = useLinkEditor();
  const location = useLocation();
  const dispatch = useDispatch();
  const contextUrl = pathname ?? location.pathname;

  const [uploading, setUploading] = React.useState(false);
  const [dragging, setDragging] = React.useState(false);

  const requestId = `image-upload-${id}`;

  const handleUpload = React.useCallback(
    (eventOrFile) => {
      if (restrictFileUpload === true) return;
      eventOrFile.target && eventOrFile.stopPropagation();
      setUploading(true);
      const file = eventOrFile.target
        ? eventOrFile.target.files[0]
        : eventOrFile[0];
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
            requestId,
          ),
        ).then((resp) => {
          if (resp) {
            setUploading(false);
            onChange(id, resp['@id']);
          }
        });
      });
    },
    [restrictFileUpload, dispatch, contextUrl, requestId, onChange, id],
  );

  const onDragEnter = React.useCallback(() => {
    if (restrictFileUpload === false) setDragging(true);
  }, [restrictFileUpload]);
  const onDragLeave = React.useCallback(() => setDragging(false), []);

  return value ? (
    <div
      className="image-upload-widget-image"
      onClick={onFocus}
      onKeyDown={onFocus}
      role="toolbar"
    >
      {selected && <ImageToolbar {...props} />}
      <img
        className={props.className}
        src={`${flattenToAppURL(value)}/@@images/image/${imageSize}`}
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
              <img src={imageBlockSVG} alt="" />
              <div>{description || intl.formatMessage(messages.addImage)}</div>
              <div className="toolbar-wrapper">
                <div className="toolbar-inner" ref={linkEditor.anchorNode}>
                  {hideObjectBrowserPicker === false && (
                    <Button.Group>
                      <Button
                        title={intl.formatMessage(messages.pickAnImage)}
                        icon
                        basic
                        onClick={(e) => {
                          onFocus && onFocus();
                          e.preventDefault();
                          openObjectBrowser({
                            mode: 'link',
                            overlay: true,
                            onSelectItem: onChange,
                          });
                        }}
                      >
                        <Icon name={navTreeSVG} size="24px" />
                      </Button>
                    </Button.Group>
                  )}
                  {restrictFileUpload === false && (
                    <Button.Group>
                      <label className="ui button compact basic icon">
                        <Icon name={uploadSVG} size="24px" />
                        <input
                          {...getInputProps({
                            type: 'file',
                            onChange: handleUpload,
                            style: { display: 'none' },
                          })}
                          title={intl.formatMessage(messages.uploadAnImage)}
                        />
                      </label>
                    </Button.Group>
                  )}

                  {hideLinkPicker === false && (
                    <Button.Group>
                      <Button
                        icon
                        basic
                        title={intl.formatMessage(messages.linkAnImage)}
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

export const ImageInput = withObjectBrowser(UnconnectedImageInput);

const ImageUploadWidget = (props) => (
  <FormFieldWrapper {...props} className="image-upload-widget">
    <ImageInput {...props} />
  </FormFieldWrapper>
);

export default ImageUploadWidget;
