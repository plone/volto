/**
 * FileWidget component.
 * @module components/manage/Widgets/FileWidget
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dimmer } from 'semantic-ui-react';
import { readAsDataURL } from 'promise-file-reader';
import { injectIntl } from 'react-intl';
import deleteSVG from '@plone/volto/icons/delete.svg';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import Toast from '@plone/volto/components/manage/Toast/Toast';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import Image from '@plone/volto/components/theme/Image/Image';
import loadable from '@loadable/component';
import { validateFileUploadSize } from '@plone/volto/helpers/FormValidation/FormValidation';
import { defineMessages, useIntl } from 'react-intl';
import { toast } from 'react-toastify';

const imageMimetypes = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/jpg',
  'image/gif',
  'image/svg+xml',
];
const Dropzone = loadable(() => import('react-dropzone'));

const messages = defineMessages({
  releaseDrag: {
    id: 'Drop files here ...',
    defaultMessage: 'Drop files here ...',
  },
  editFile: {
    id: 'Drop a file here or click to replace the current one',
    defaultMessage: 'Drop a file here or click to replace the current one',
  },
  fileDrag: {
    id: 'Drop a file here or click to upload',
    defaultMessage: 'Drop a file here or click to upload',
  },
  replaceFile: {
    id: 'Replace existing file',
    defaultMessage: 'Replace existing file',
  },
  addNewFile: {
    id: 'Choose a file',
    defaultMessage: 'Choose a file',
  },
  maxSizeError: {
    id: 'The file you uploaded exceeded the maximum allowed size of {size} bytes',
    defaultMessage:
      'The file you uploaded exceeded the maximum allowed size of {size} bytes',
  },
  acceptError: {
    id: 'File is not of the accepted type {accept}',
    defaultMessage: 'File is not of the accepted type {accept}',
  },
  dragAndDropActionA11y: {
    id: 'File upload area. Press Enter to open the file browser',
    defaultMessage: 'File upload area. Press Enter to open the file browser',
  },
  requiredField: {
    id: 'This field is required.',
    defaultMessage: 'This field is required.',
  },
  downloadFile: {
    id: 'field.file.downloadFile',
    defaultMessage: 'Download {filename}',
  },
});

/**
 * FileWidget component class.
 * @function FileWidget
 * @returns {string} Markup of the component.
 *
 * To use it, in schema properties, declare a field like:
 *
 * ```jsx
 * {
 *  title: "File",
 *  widget: 'file',
 * }
 * ```
 * or:
 *
 * ```jsx
 * {
 *  title: "File",
 *  type: 'object',
 * }
 * ```
 *
 */
const FileWidget = (props) => {
  const { id, value, onChange, isDisabled } = props;
  const [fileType, setFileType] = React.useState(false);
  const intl = useIntl();

  const imgAttrs = React.useMemo(() => {
    const data = {};
    if (value?.download) {
      data.item = {
        '@id': value.download.substring(0, value.download.indexOf('/@@images')),
        image: value,
      };
    } else if (value?.data) {
      data.src = `data:${value['content-type']};${value.encoding},${value.data}`;
    }
    return data;
  }, [value]);

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
  const onDrop = (files, rejectedFiles) => {
    rejectedFiles.forEach((file) => {
      file.errors.forEach((err) => {
        if (err.code === 'file-too-large') {
          toast.error(
            <Toast
              error
              title={intl.formatMessage(messages.maxSizeError, {
                size: props.size,
              })}
            />,
          );
        }

        if (err.code === 'file-invalid-type') {
          toast.error(
            <Toast
              error
              title={intl.formatMessage(messages.acceptError, {
                accept: props.accept,
              })}
            />,
          );
        }
      });
    });
    if (files.length < 1) return;
    const file = files[0];
    if (!validateFileUploadSize(file, intl.formatMessage)) return;
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
        if (imagePreview) imagePreview.src = reader.result;
      } else {
        setFileType(false);
      }
    };
    reader.readAsDataURL(files[0]);
  };

  const statusTextA11y = [
    props.required && intl.formatMessage(messages.requiredField), // Required field status
    props.error?.length && props.error.join(' '), // Validation error messages
    value?.filename, // Current file name if a file is uploaded
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <FormFieldWrapper {...props}>
      <Dropzone
        onDrop={onDrop}
        {...(props.size ? { maxSize: props.size } : {})}
        {...(props.accept ? { accept: props.accept } : {})}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            className="file-widget-dropzone"
            role="button"
            aria-label={intl.formatMessage(messages.dragAndDropActionA11y)}
            aria-describedby={`field-${id}-status`}
            {...getRootProps()}
          >
            {isDragActive && <Dimmer active></Dimmer>}
            {fileType ? (
              <Image
                className="image-preview small ui image"
                id={`field-${id}-image`}
                {...imgAttrs}
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

            {/* aria-hidden: keyboard access is handled by the parent div (role="button").
                The label is a visual affordance only. The stopPropagation prevents the Dropzone
                from opening the file dialog twice on click. */}
            <label
              className="label-file-widget-input"
              htmlFor={`field-${id}`}
              aria-hidden="true"
              onClick={(e) => e.stopPropagation()}
            >
              {value
                ? intl.formatMessage(messages.replaceFile)
                : intl.formatMessage(messages.addNewFile)}
            </label>
            <span id={`field-${id}-status`} className="visually-hidden">
              {statusTextA11y}
            </span>
            <input
              {...getInputProps({
                type: 'file',
                style: { display: 'none' },
              })}
              id={`field-${id}`}
              aria-required={props.required}
              aria-invalid={props.error?.length > 0}
              name={id}
              disabled={isDisabled}
            />
          </div>
        )}
      </Dropzone>
      <div className="field-file-name">
        {value && (
          <UniversalLink
            href={value.download}
            aria-label={intl.formatMessage(messages.downloadFile, {
              filename: value.filename,
            })}
            download={true}
          >
            {value.filename}
          </UniversalLink>
        )}
        {value && (
          <Button
            type="button"
            icon
            basic
            className="delete-button"
            aria-label="delete file"
            disabled={isDisabled}
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
