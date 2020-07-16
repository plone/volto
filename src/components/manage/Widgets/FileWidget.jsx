/**
 * FileWidget component.
 * @module components/manage/Widgets/FileWidget
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Image } from 'semantic-ui-react';
import { readAsDataURL } from 'promise-file-reader';

import deleteSVG from '@plone/volto/icons/delete.svg';
import { Icon, FormFieldWrapper } from '@plone/volto/components';
import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';
import Dropzone from 'react-dropzone';

/**
 * FileWidget component class.
 * @function FileWidget
 * @returns {string} Markup of the component.
 */
const FileWidget = ({
  id,
  title,
  required,
  description,
  error,
  value,
  onChange,
  fieldSet,
  wrapped,
}) => {
  const fileInput = React.useRef(null);
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
      let imagePreview = document.getElementById(`field-${id}-image`);
      imagePreview.src = reader.result;
    };
    reader.readAsDataURL(files[0]);
  };

  return (
    <FormFieldWrapper
      id={id}
      title={title}
      description={description}
      required={required}
      error={error}
      wrapped={wrapped}
      fieldSet={fieldSet}
    >
      <Dropzone disableClick onDrop={onDrop} className="dropzone">
        <Image
          className="image-preview"
          id={`field-${id}-image`}
          size="small"
          src={imageBlockSVG}
        />
        <label className="label-file-widget-input" htmlFor={`field-${id}`}>
          choose a file
        </label>
        <Input
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
              let imagePreview = document.getElementById(`field-${id}-image`);
              imagePreview.src = reader.result;
            };
            reader.readAsDataURL(target.files[0]);
          }}
        />
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
              fileInput.current.inputRef.value = null;
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

export default FileWidget;
