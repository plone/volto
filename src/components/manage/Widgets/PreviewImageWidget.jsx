import { Segment } from 'semantic-ui-react';

import { defineMessages, FormattedMessage } from 'react-intl';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  flattenToAppURL,
  isInternalURL,
  blockHasValue,
  getBlocksFieldname,
  getBlocksLayoutFieldname,
} from '@plone/volto/helpers';

import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';
import imageSVG from '@plone/volto/icons/image.svg';
import videoSVG from '@plone/volto/icons/videocamera.svg';
import { FormFieldWrapper, Icon } from '@plone/volto/components';
import UrlWidget from '@plone/volto/components/manage/Widgets/UrlWidget';
import { stubTrue } from 'lodash';

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

/** Widget to show preview of images/block
 *
 *  Can show a preview of uploaded image in the sidebar
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
    previewField = 'url',
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

export default PreviewImageWidget;
