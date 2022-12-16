import React, { useState, useEffect } from 'react';

import { getBaseUrl, usePrevious } from '@plone/volto/helpers';
import { Icon } from '@plone/volto/components';
import { Button, Dimmer, Input, Loader, Message } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import loadable from '@loadable/component';
import { defineMessages, useIntl } from 'react-intl';
import { createContent } from '@plone/volto/actions';
import { readAsDataURL } from 'promise-file-reader';

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
});

const ImageInput = (props) => {
  const { id, onChange } = props;
  const intl = useIntl();
  const placeholder =
    props.data.placeholder ||
    intl.formatMessage(messages.ImageBlockInputPlaceholder);

  const [url, setUrl] = useState('');
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  let loading = '';
  const dispatch = useDispatch();

  const request = useSelector(
    (state) => state.content.subrequests[props.block],
  );
  const content = request?.data;
  const urlUploaded = content ? content['@id'] : null;
  const requestLoaded = request ? request.loaded : null;

  useEffect(() => {
    if (loading) {
      if (loading && requestLoaded && uploading) {
        setUploading(false);
        onChange(id, urlUploaded);
      }
    }
  }, [id, urlUploaded, requestLoaded, loading, uploading, onChange]);

  loading = usePrevious(request?.loading);

  /**
   * Upload image handler
   * not powered by react-dropzone
   * @method onUploadImage
   * @returns {undefined}
   */
  const onUploadImage = (e) => {
    e.stopPropagation();
    const file = e.target.files[0];
    setUploading(true);
    readAsDataURL(file).then((data) => {
      const fields = data.match(/^data:(.*);(.*),(.*)$/);
      dispatch(
        createContent(
          getBaseUrl(props.pathname),
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
          props.block,
        ),
      );
    });
  };

  /**
   * Submit url handler
   * @method onSubmitUrl
   * @param {object} e Event
   * @returns {undefined}
   */
  const onSubmitUrl = () => {
    onChange(id, url);
  };

  /**
   * Drop handler
   * @method onDrop
   * @param {array} files File objects
   * @returns {undefined}
   */
  const onDrop = (file) => {
    setUploading(true);
    readAsDataURL(file[0]).then((data) => {
      const fields = data.match(/^data:(.*);(.*),(.*)$/);
      dispatch(
        createContent(
          getBaseUrl(props.pathname),
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
          props.block,
        ),
      );
    });
  };

  const onDragEnter = () => {
    setDragging(true);
  };

  const onDragLeave = () => {
    setDragging(false);
  };

  /**
   * Change url handler
   * @method onChangeUrl
   * @param {Object} target Target object
   * @returns {undefined}
   */
  const onChangeUrl = ({ target }) => {
    setUrl(target.value);
  };

  /**
   * Keydown handler on Variant Menu Form
   * This is required since the ENTER key is already mapped to a onKeyDown
   * event and needs to be overriden with a child onKeyDown.
   * @method onKeyDownVariantMenuForm
   * @param {Object} e Event object
   * @returns {undefined}
   */
  const onKeyDownVariantMenuForm = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      onSubmitUrl();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      // TODO: Do something on ESC key
    }
  };

  return (
    <div className="image-widget">
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
                        props.openObjectBrowser({
                          onSelectItem: (url, item) => onChange(id, url, item),
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
                      props.onSelectBlock(props.id);
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
                          onChange(id, '');
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
    </div>
  );
};

export default ImageInput;
