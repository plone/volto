import React, { useState } from 'react';
import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers';
import { Button, Dimmer, Input, Loader, Message } from 'semantic-ui-react';
import loadable from '@loadable/component';
import { readAsDataURL } from 'promise-file-reader';
import { Icon } from '@plone/volto/components';

import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';
import aheadSVG from '@plone/volto/icons/ahead.svg';
import uploadSVG from '@plone/volto/icons/upload.svg';

import { HeroToolbar } from '@plone/volto/components/manage/Blocks/Hero/components';

const Dropzone = loadable(() => import('react-dropzone'));

const HeroImage = (props) => {
  const {
    id,
    data,
    block,
    pathname,
    isEditMode,
    onSelectBlock,
    onChangeBlock,
    placeholder,
    openObjectBrowser,
    createContent,
  } = props;

  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState('');
  const [dragging, setDragging] = useState(false);

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
        getBaseUrl(pathname),
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
        block,
      ).then((resp) => {
        if (resp) {
          onChangeBlock(block, {
            ...data,
            url: resp['@id'],
          });
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
      ).then((resp) => {
        if (resp) {
          onChangeBlock(block, {
            ...data,
            url: resp['@id'],
          });
          setUploading(false);
        }
      });
    });
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
   * Submit url handler
   * @method onSubmitUrl
   * @param {object} e Event
   * @returns {undefined}
   */
  const onSubmitUrl = () => {
    onChangeBlock(props.block, {
      ...data,
      url: flattenToAppURL(url),
    });
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
  const onDragEnter = () => {
    setDragging(true);
  };
  const onDragLeave = () => {
    setDragging(false);
  };

  return (
    <>
      {data.url ? (
        <>
          <HeroToolbar {...props} />
          <img
            className="hero-image"
            src={`${flattenToAppURL(data.url)}/@@images/image/${
              data.align === 'center' ? 'great' : 'teaser'
            }`}
            alt=""
            loading={isEditMode ? 'eager' : 'lazy'}
          />
        </>
      ) : (
        isEditMode && (
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
                            openObjectBrowser();
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
        )
      )}
    </>
  );
};

export default HeroImage;
