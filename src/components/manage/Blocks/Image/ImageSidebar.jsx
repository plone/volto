import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Button } from 'semantic-ui-react';
import { useIntl, FormattedMessage, defineMessages } from 'react-intl';
import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers';
import { BlockDataForm, Icon, Image } from '@plone/volto/components';
import { ImageSchema } from './schema';
import imageSVG from '@plone/volto/icons/image.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

const ImageSidebar = (props) => {
  const { data, block, onChangeBlock } = props;
  const intl = useIntl();
  const schema = ImageSchema({ formData: data, intl });
  return (
    <>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="Image" defaultMessage="Image" />
        </h2>
      </header>

      <Segment className="sidebar-metadata-container" secondary attached>
        {data.url ? (
          <>
            <div>
              {(data.url?.['@id'] ?? data.url).split('/').slice(-1)[0]}
              <Button
                basic
                className="cancel"
                onClick={(e) => {
                  e.stopPropagation();
                  onChangeBlock(block, {
                    ...data,
                    url: undefined,
                    alt: data.url.title === data.alt ? undefined : data.alt,
                  });
                }}
              >
                <Icon name={clearSVG} size="30px" />
              </Button>
            </div>
            <Image
              item={
                data.image_scales
                  ? {
                      '@id': data.url,
                      image_field: data.image_field,
                      image_scales: data.image_scales,
                    }
                  : undefined
              }
              src={
                data.image_scales
                  ? undefined
                  : isInternalURL(data.url)
                  ? // Backwards compat in the case that the block is storing the full server URL
                    (() => {
                      if (data.size === 'l')
                        return `${flattenToAppURL(data.url)}/@@images/image`;
                      if (data.size === 'm')
                        return `${flattenToAppURL(
                          data.url,
                        )}/@@images/image/preview`;
                      if (data.size === 's')
                        return `${flattenToAppURL(
                          data.url,
                        )}/@@images/image/mini`;
                      return `${flattenToAppURL(data.url)}/@@images/image`;
                    })()
                  : data.url
              }
              alt={intl.formatMessage(messages.preview)}
              loading="lazy"
              responsive={true}
              style={{ width: '50%' }}
            />
          </>
        ) : (
          <>
            <FormattedMessage
              id="No image selected"
              defaultMessage="No image selected"
            />
            <Icon name={imageSVG} size="100px" color="#b8c6c8" />
          </>
        )}
      </Segment>
      <BlockDataForm
        schema={schema}
        title={schema.title}
        onChangeField={(id, value) => {
          onChangeBlock(block, {
            ...data,
            [id]: value,
          });
        }}
        onChangeBlock={onChangeBlock}
        formData={data}
        block={block}
      />
    </>
  );
};

ImageSidebar.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default ImageSidebar;

const messages = defineMessages({
  preview: {
    id: 'image_block_preview',
    defaultMessage: 'Image preview',
  },
});
