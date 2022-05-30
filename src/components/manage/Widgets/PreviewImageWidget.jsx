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

const messages = defineMessages({
  Image: {
    id: 'Image',
    defaultMessage: 'Image',
  },
  Origin: {
    id: 'Origin',
    defaultMessage: 'Origin',
  },
  AltText: {
    id: 'Alt text',
    defaultMessage: 'Alt text',
  },
  AltTextHint: {
    id: 'Alt text hint',
    defaultMessage: 'Leave empty if the image is purely decorative.',
  },
  AltTextHintLinkText: {
    id: 'Alt text hint link text',
    defaultMessage: 'Describe the purpose of the image.',
  },
  Align: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
  },
  LinkTo: {
    id: 'Link to',
    defaultMessage: 'Link to',
  },
  openLinkInNewTab: {
    id: 'Open in a new tab',
    defaultMessage: 'Open in a new tab',
  },
  NoImageSelected: {
    id: 'No image selected',
    defaultMessage: 'No image selected',
  },
  externalURL: {
    id: 'External URL',
    defaultMessage: 'External URL',
  },
  size: {
    id: 'Size',
    defaultMessage: 'Size',
  },
});
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
const PreviewImageWidget = (props) => {
  // Can show a preview of uploaded image.
  // If there's no uploaded image, shows a placeholder

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
