/**
 * FileWidget component.
 * @module components/manage/Widgets/FileWidget
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Image, Dimmer } from 'semantic-ui-react';
import { readAsDataURL } from 'promise-file-reader';
import { injectIntl } from 'react-intl';
import deleteSVG from '@plone/volto/icons/delete.svg';
import { Icon, FormFieldWrapper } from '@plone/volto/components';
import Dropzone from 'react-dropzone';
import { flattenToAppURL } from '@plone/volto/helpers';
import { defineMessages, useIntl } from 'react-intl';

const imageMimetypes = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/jpg',
  'image/gif',
  'image/svg+xml',
];

const messages = defineMessages({
  releaseDrag: {
    id: 'Drop files here ....',
    defaultMessage: 'Drop files here ....',
  },
  editFile: {
    id: 'Drag to replace the file item',
    defaultMessage: 'Drag to replace the file item',
  },
  fileDrag: {
    id: 'Drag the new item to upload',
    defaultMessage: 'Drag the new item to upload',
  },
  replaceFile: {
    id: 'Replace existing File/Image',
    defaultMessage: 'Replace existing File/Image',
  },
  addNewFile: {
    id: 'Choose a File/Image',
    defaultMessage: 'Choose a File/Image',
  },
});

/**
 * FileWidget component class.
 * @function FileWidget
 * @returns {string} Markup of the component.
 */
const FileWidget = (props) => {
  const { id, value, onChange } = props;
  const [fileType, setFileType] = React.useState(false);
  const intl = useIntl();

  React.useEffect(() => {
    if (value && imageMimetypes.includes(value['content-type'])) {
      setFileType(true);
    }
  }, [value]);

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
  };

  return (
    <FormFieldWrapper {...props}>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div className="file-widget-dropzone" {...getRootProps()}>
            {isDragActive && <Dimmer active></Dimmer>}
            {fileType ? (
              <Image
                className="image-preview"
                id={`field-${id}-image`}
                size="small"
                src={
                  value?.download
                    ? `${flattenToAppURL(value.download)}?id=${Date.now()}`
                    : null
                }
              />
            ) : (
              <div className="dropzone-placeholder">
                {isDragActive ? (
                  <p className="dropzone-text">
                    {intl.formatMessage(messages.releaseDrag)}
                  </p>
                ) : value ? (
                  <p className="dropzone-text">
                    {intl.formatMessage(messages.editFile)}
                  </p>
                ) : (
                  <p className="dropzone-text">
                    {intl.formatMessage(messages.fileDrag)}
                  </p>
                )}
              </div>
            )}

            <label className="label-file-widget-input">
              {value
                ? intl.formatMessage(messages.replaceFile)
                : intl.formatMessage(messages.addNewFile)}
            </label>
            <input
              {...getInputProps({
                type: 'file',
                style: { display: 'none' },
              })}
              id={`field-${id}`}
              name={id}
              type="file"
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
              setFileType(false);
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
