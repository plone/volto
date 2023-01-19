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
import { ImageUploadWidget } from '@plone/volto/components';

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
    <ImageUploadWidget
      onChange={(id, image) => {
        const url = image ? image['@id'] : null;

        onChangeBlock(block, {
          ...data,
          url,
        });
      }}
    />
  );
};

export default HeroImage;
