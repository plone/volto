import React, { useState } from 'react';
// import cx from 'classnames';
import AddLinkForm from '@plone/volto/components/manage/AnchorPlugin/components/LinkButton/AddLinkForm';
import { PositionedToolbar } from '@plone/volto-slate/editor/ui';
import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers';
import { useLocation } from 'react-router-dom';
import { Button, Dimmer, Loader, Message } from 'semantic-ui-react';
import loadable from '@loadable/component';
import { readAsDataURL } from 'promise-file-reader';
import { Icon } from '@plone/volto/components';

import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';
import linkSVG from '@plone/volto/icons/link.svg';
import uploadSVG from '@plone/volto/icons/upload.svg';
import useWhyDidYouUpdate from '@plone/volto/helpers/Utils/useWhyDidYouUpdate';

import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';

export const ImageToolbar = ({ className, data, id, onChange, selected }) =>
  (selected && (
    <div className="image-upload-widget-toolbar">
      <Button.Group>
        <Button icon basic onClick={() => onChange(id, null)}>
          <Icon
            className="circled"
            name={clearSVG}
            size="24px"
            color="#e40166"
          />
        </Button>
      </Button.Group>
    </div>
  )) ||
  null;

const Dropzone = loadable(() => import('react-dropzone'));

const messages = {
  addImage: 'Browse the site, drop an image, or use an URL',
};

function getPositionStyle(el) {
  const rect = el.getBoundingClientRect();

  return {
    style: {
      opacity: 1,
      top: rect.top + window.pageYOffset - 6,
      left: rect.left + window.pageXOffset + rect.width / 2,
    },
  };
}

const useLinkEditor = (id, value, api) => {
  const [showLinkEditor, setShowLinkEditor] = React.useState(false);
  const show = React.useCallback(() => setShowLinkEditor(true), []);
  const savedPosition = React.useRef();
  const anchorNode = React.useRef();

  if (anchorNode.current && !savedPosition.current) {
    savedPosition.current = getPositionStyle(anchorNode.current);
  }
  useWhyDidYouUpdate('useLinkEditor', { showLinkEditor, value, api });

  const LinkEditor = React.useCallback(
    (props) => {
      return showLinkEditor && anchorNode.current && savedPosition.current ? (
        <PositionedToolbar
          className="add-link"
          position={savedPosition.current}
        >
          <AddLinkForm
            block="draft-js"
            placeholder={'Add link'}
            data={{ url: value || '' }}
            theme={{}}
            onChangeValue={(url) => {
              savedPosition.current = null;
              setShowLinkEditor(false);
              api.current.onChange(id, url);
            }}
            onClear={() => {
              // clear button was pressed in the link edit popup
              api.current.onChange(id, null);
            }}
            onOverrideContent={(c) => {
              // dispatch(setPluginOptions(pid, { show_sidebar_editor: false }));
              savedPosition.current = null;
              setShowLinkEditor(false);
            }}
          />
        </PositionedToolbar>
      ) : null;
    },
    [showLinkEditor, value, api, id],
  );

  return {
    anchorNode,
    show,
    LinkEditor,
  };
};

const ImageUploadWidget = (props) => {
  const {
    id,
    pathname,
    onChange,
    onFocus,
    // placeholder,
    openObjectBrowser,
    createContent,
    value,
    imageSize = 'teaser',
  } = props;

  const api = React.useRef({});
  api.current.onChange = onChange;

  const linkEditor = useLinkEditor(id, value, api);
  const location = useLocation();
  const contextUrl = pathname ?? location.pathname;

  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const [url, setUrl] = useState(value || ''); // This is to support typing the image URL in the input

  const requestId = `image-upload-${id}`;

  /**
   * Drop handler
   * @method onDrop
   * @param {array} files File objects
   * @returns {undefined}
   */
  const onDrop = (file) => {
    setUploading(true);
    readAsDataURL(file[0]).then((fileData) => {
      const fields = fileData.match(/^data:(.*);(.*),(.*)$/);
      createContent(
        getBaseUrl(contextUrl),
        {
          '@type': 'Image',
          title: file[0].name,
          image: {
            data: fields[3],
            encoding: fields[2],
            'content-type': fields[1],
            filename: file[0].name,
          },
        },
        requestId,
      ).then((resp) => {
        if (resp) {
          onChange(id, resp['@id']);
          setUploading(false);
        }
      });
    });
  };

  /**
   * Upload image handler (not used), but useful in case that we want a button
   * not powered by react-dropzone
   * @method onUploadImage
   * @returns {undefined}
   */
  const onUploadImage = (e) => {
    e.stopPropagation();
    const file = e.target.files[0];
    setUploading(true);
    readAsDataURL(file).then((fileData) => {
      const fields = fileData.match(/^data:(.*);(.*),(.*)$/);
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
      ).then((resp) => {
        if (resp) {
          setUploading(false);
          onChange(id, resp['@id']);
        }
      });
    });
  };

  const onDragEnter = React.useCallback(() => setDragging(true), []);
  const onDragLeave = React.useCallback(() => setDragging(false), []);

  // data.align === 'center' ? 'great' : 'teaser'

  return value ? (
    <div
      className="image-upload-widget-image"
      onClick={onFocus}
      onKeyDown={onFocus}
      role="toolbar"
    >
      <ImageToolbar {...props} />
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
                  <Loader indeterminate>Uploading image</Loader>
                </Dimmer>
              )}
              <img src={imageBlockSVG} alt="" />
              <div>{messages.addImage}</div>
              <div className="toolbar-wrapper">
                <div className="toolbar-inner" ref={linkEditor.anchorNode}>
                  <Button.Group>
                    <Button
                      title="Pick an existing image"
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
                  <Button.Group>
                    <label className="ui button compact basic icon">
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
                  <Button.Group>
                    <Button
                      icon
                      basic
                      onClick={(e) => {
                        !props.selected && onFocus && onFocus();
                        linkEditor.show();
                      }}
                    >
                      <Icon name={linkSVG} circled size="24px" />
                    </Button>
                  </Button.Group>
                </div>
                {linkEditor.anchorNode && <linkEditor.LinkEditor />}
              </div>
            </Message>
          </div>
        )}
      </Dropzone>
    </div>
  );
};
export default withObjectBrowser(ImageUploadWidget);
