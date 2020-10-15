/**
 * FileWidget component.
 * @module components/manage/Widgets/FileWidget
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Image, Dimmer } from 'semantic-ui-react';
import { readAsDataURL } from 'promise-file-reader';
import { injectIntl } from 'react-intl';
import deleteSVG from '@plone/volto/icons/delete.svg';
import { Icon, FormFieldWrapper } from '@plone/volto/components';
import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';
import Dropzone from 'react-dropzone';
import { flattenToAppURL } from '@plone/volto/helpers';

const imageMimetypes = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/jpg',
  'image/gif',
  'image/svg+xml',
];

/**
 * FileWidget component class.
 * @function FileWidget
 * @returns {string} Markup of the component.
 */
const FileWidget = (props) => {
  const { id, value, onChange } = props;
  const fileInput = React.useRef(null);
  const [fileType, setFileType] = React.useState(true);
  const [dragging, setDragging] = React.useState(false);

  /**
   * Drop handler
   * @method onDrop
   * @param {array} files File objects
   * @returns {undefined}
   */
  const onDrop = (files) => {
    const file = files[0];
    readAsDataURL(file).then((data) => {
      const fields = data.match(/^data:(.*);(.*),(.*)$/);
      onChange(id, {
        data: fields[3],
        encoding: fields[2],
        'content-type': fields[1],
        filename: file.name,
      });
    });

    let reader = new FileReader();
    reader.onload = function () {
      const fields = reader.result.match(/^data:(.*);(.*),(.*)$/);
      if (imageMimetypes.includes(fields[1])) {
        setFileType(true);
        let imagePreview = document.getElementById(`field-${id}-image`);
        imagePreview.src = reader.result;
      } else {
        setFileType(false);
      }
    };
    reader.readAsDataURL(files[0]);
    setDragging(false);
  };

  const onDragEnter = () => {
    setDragging(true);
  };
  const onDragLeave = () => {
    setDragging(false);
  };

  return (
    <FormFieldWrapper {...props}>
      <Dropzone
        onDrop={onDrop}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            {dragging && <Dimmer active></Dimmer>}
            {fileType ? (
              <Image
                className="image-preview"
                id={`field-${id}-image`}
                size="small"
                src={
                  value?.download
                    ? flattenToAppURL(value.download)
                    : imageBlockSVG
                }
              />
            ) : null}
            <label className="label-file-widget-input" htmlFor={`field-${id}`}>
              {value?.download
                ? 'Replace existing File/Image'
                : 'Choose a File/Image'}
            </label>
            <Input
              {...getInputProps}
              id={`field-${id}`}
              name={id}
              className="file-widget-input"
              type="file"
              ref={fileInput}
              onChange={({ target }) => {
                const file = target.files[0];
                readAsDataURL(file).then((data) => {
                  const fields = data.match(/^data:(.*);(.*),(.*)$/);
                  onChange(id, {
                    data: fields[3],
                    encoding: fields[2],
                    'content-type': fields[1],
                    filename: file.name,
                  });
                });

                let reader = new FileReader();
                reader.onload = function () {
                  const fields = reader.result.match(/^data:(.*);(.*),(.*)$/);
                  if (imageMimetypes.includes(fields[1])) {
                    setFileType(true);
                    let imagePreview = document.getElementById(
                      `field-${id}-image`,
                    );
                    imagePreview.src = reader.result;
                  } else {
                    setFileType(false);
                  }
                };
                reader.readAsDataURL(target.files[0]);
              }}
            />
          </div>
        )}
      </Dropzone>
      <div className="field-file-name">
        {value && value.filename}
        {value && (
          <Button
            icon
            basic
            className="delete-button"
            aria-label="delete file"
            onClick={() => {
              onChange(id, null);
              let imagePreview = document.getElementById(`field-${id}-image`);
              imagePreview.src = imageBlockSVG;
              setFileType(false);
              fileInput.current.inputRef.current.value = null;
            }}
          >
            <Icon name={deleteSVG} size="20px" />
          </Button>
        )}
      </div>
    </FormFieldWrapper>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
FileWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.shape({
    '@type': PropTypes.string,
    title: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
  wrapped: PropTypes.bool,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
FileWidget.defaultProps = {
  description: null,
  required: false,
  error: [],
  value: null,
};

export default injectIntl(FileWidget);
