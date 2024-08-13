import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Button } from 'semantic-ui-react';
import { useIntl, FormattedMessage, defineMessages } from 'react-intl';
import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers';
import { Icon, Image } from '@plone/volto/components';
import { BlockDataForm } from '@plone/volto/components/manage/Form';
import { ImageSchema } from './schema';
import imageSVG from '@plone/volto/icons/image.svg';
import trashSVG from '@plone/volto/icons/delete.svg';

const ImageSidebar = (props) => {
  const {
    blocksConfig,
    blocksErrors,
    data,
    block,
    onChangeBlock,
    navRoot,
    contentType,
  } = props;
  const intl = useIntl();
  const schema = ImageSchema({ formData: data, intl });
  return (
    <>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="Image" defaultMessage="Image" />
        </h2>
        <Button.Group>
          <Button
            title={intl.formatMessage(messages.clear)}
            basic
            disabled={!data.url}
            onClick={() => {
              onChangeBlock(block, {
                ...data,
                url: undefined,
                image_scales: undefined,
                image_field: undefined,
                alt: data.url.title === data.alt ? undefined : data.alt,
              });
            }}
          >
            <Icon name={trashSVG} size="24px" color="red" />
          </Button>
        </Button.Group>
      </header>

      <Segment
        className="sidebar-metadata-container image-sidebar"
        secondary
        attached
      >
        {data.url ? (
          <>
            <div>{(data.url?.['@id'] ?? data.url).split('/').slice(-1)[0]}</div>
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
                      `${flattenToAppURL(data.url)}/@@images/image/preview`
                    : data.url
              }
              sizes="188px"
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
        blocksConfig={blocksConfig}
        navRoot={navRoot}
        contentType={contentType}
        errors={blocksErrors}
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
  clear: {
    id: 'image_block_clear',
    defaultMessage: 'Clear image',
  },
});
