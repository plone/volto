/**
 * RegistryImageWidget component.
 * @module components/manage/Widgets/RegistryImageWidget
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Dimmer } from 'semantic-ui-react';
import { readAsDataURL } from 'promise-file-reader';
import { injectIntl } from 'react-intl';
import deleteSVG from '@plone/volto/icons/delete.svg';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import loadable from '@loadable/component';
import { defineMessages, useIntl } from 'react-intl';
import { toPublicURL } from '@plone/volto/helpers/Url/Url';
import { validateFileUploadSize } from '@plone/volto/helpers/FormValidation/FormValidation';
import Image from '@plone/volto/components/theme/Image/Image';

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
    id: 'Drop file here to replace the existing file',
    defaultMessage: 'Drop file here to replace the existing file',
  },
  fileDrag: {
    id: 'Drop file here to upload a new file',
    defaultMessage: 'Drop file here to upload a new file',
  },
  replaceFile: {
    id: 'Replace existing file',
    defaultMessage: 'Replace existing file',
  },
  addNewFile: {
    id: 'Choose a file',
    defaultMessage: 'Choose a file',
  },
});

/**
 * RegistryImageWidget component class.
 * @function RegistryImageWidget
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
const RegistryImageWidget = (props) => {
  const { id, value, onChange, isDisabled } = props;
  const intl = useIntl();

  // State to manage the preview image source
  const [previewSrc, setPreviewSrc] = useState(() => {
    const fileName = value?.split(';')[0];
    return fileName
      ? `${toPublicURL('/')}@@site-logo/${atob(
          fileName.replace('filenameb64:', ''),
        )}`
      : '';
  });

  /**
   * Drop handler
   * @method onDrop
   * @param {array} files File objects
   * @returns {undefined}
   */
  const onDrop = (files) => {
    const file = files[0];
    if (!validateFileUploadSize(file, intl.formatMessage)) return;

    readAsDataURL(file).then((data) => {
      const fields = data.match(/^data:(.*);(.*),(.*)$/);
      onChange(id, `filenameb64:${btoa(file.name)};datab64:${fields[3]}}`);
    });

    let reader = new FileReader();
    reader.onload = function () {
      const fields = reader.result.match(/^data:(.*);(.*),(.*)$/);
      if (imageMimetypes.includes(fields[1])) {
        setPreviewSrc(reader.result);
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
            {previewSrc ? (
              <Image
                className="image-preview small ui image"
                id={`field-${id}-image`}
                src={previewSrc}
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
              disabled={isDisabled}
            />
          </div>
        )}
      </Dropzone>
      <div className="field-file-name">
        {value && (
          <Button
            icon
            basic
            className="delete-button"
            aria-label="delete file"
            disabled={isDisabled}
            onClick={() => {
              onChange(id, '');
              setPreviewSrc(''); // Clear the preview image
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
RegistryImageWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  wrapped: PropTypes.bool,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
RegistryImageWidget.defaultProps = {
  description: null,
  required: false,
  error: [],
  value: null,
};

export default injectIntl(RegistryImageWidget);
