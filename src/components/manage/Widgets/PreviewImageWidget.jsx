import { Segment } from 'semantic-ui-react';

import { FormattedMessage } from 'react-intl';
import React from 'react';
import PropTypes from 'prop-types';

import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers';

import imageSVG from '@plone/volto/icons/image.svg';
import videoSVG from '@plone/volto/icons/videocamera.svg';
import { FormFieldWrapper, Icon } from '@plone/volto/components';

const thumbUrl = (url, preview_size) =>
  `${flattenToAppURL(url)}/@@images/image/${preview_size}`;

const previewPlaceholderSVG = (type) => {
  switch (type) {
    case 'image':
      return imageSVG;
    case 'video':
      return videoSVG;
    default:
      return imageSVG;
  }
};

/** Widget to show preview of images/block in the sidebar
 *
 *  Can show preview of an image pertaining to a field
 *  If there's no previewField image, it shows a placeholder
 *
 * ```jsx
 * {
 *  previewField: 'url',
 *  widget: 'preview_image',
 * formData: formData // current BlockData
 * }
 * ```
 */
const PreviewImageWidget = (props) => {
  const {
    preview_size = 'mini',
    formData: blockData = {},
    previewField,
  } = props;
  const widgetProps = { wrapped: false, noForInFieldLabel: true };
  return (
    <FormFieldWrapper {...props} {...widgetProps}>
      {blockData?.[previewField] ? (
        <Segment className="sidebar-metadata-container" secondary>
          {blockData[previewField].split('/').slice(-1)[0]}
          {isInternalURL(blockData[previewField]) && (
            <img
              src={thumbUrl(blockData[previewField], preview_size)}
              alt={blockData.alt}
            />
          )}
          {!isInternalURL(blockData[previewField]) && (
            <img
              src={blockData[previewField]}
              alt={blockData.alt}
              style={{ width: '50%' }}
            />
          )}
        </Segment>
      ) : (
        <>
          <Segment className="sidebar-metadata-container" secondary>
            <FormattedMessage
              id="No {type} selected"
              defaultMessage="No {type} selected"
              values={{
                type: blockData?.['@type'],
              }}
            />
            <Icon
              name={previewPlaceholderSVG(blockData?.['@type'])}
              size="100px"
              color="#b8c6c8"
            />
          </Segment>
        </>
      )}
    </FormFieldWrapper>
  );
};

PreviewImageWidget.propTypes = {
  preview_size: PropTypes.string,
  formData: PropTypes.object.isRequired,
  previewField: PropTypes.string,
};

export default PreviewImageWidget;
