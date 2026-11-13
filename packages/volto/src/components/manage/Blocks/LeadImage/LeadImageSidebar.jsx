import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import { Segment } from 'semantic-ui-react';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import Image from '@plone/volto/components/theme/Image/Image';
import { BlockDataForm } from '@plone/volto/components/manage/Form';
import config from '@plone/volto/registry';
import { LeadImageBlockSchema } from './schema';

import imageSVG from '@plone/volto/icons/image.svg';

const messages = defineMessages({
  AltText: {
    id: 'Alt text',
    defaultMessage: 'Alt text',
  },
});

// The alt text is stored in the content item's `image_caption` field, not in
// the block data, so it is added to the block schema only for the sidebar form.
const CONTENT_FIELDS = ['image_caption'];

const LeadImageSidebar = (props) => {
  const {
    properties,
    data,
    block,
    blocksConfig = config.blocks.blocksConfig,
    blocksErrors,
    onChangeBlock,
    onChangeField,
    navRoot,
    contentType,
    intl,
  } = props;

  const blockSchema =
    blocksConfig?.[data['@type']]?.blockSchema ?? LeadImageBlockSchema;
  const schema = addContentFields(
    typeof blockSchema === 'function'
      ? blockSchema({ ...props, intl })
      : blockSchema,
    intl,
  );

  // Keep the content fields out of the block data, but preserve them if an
  // older block stored them there.
  const onChangeBlockData = (id, newData) =>
    onChangeBlock(id, {
      ...omit(newData, CONTENT_FIELDS),
      ...pick(data, CONTENT_FIELDS),
    });

  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="Lead Image" defaultMessage="Lead Image" />
        </h2>
      </header>

      {!properties.image && (
        <>
          <Segment className="sidebar-metadata-container" secondary>
            <FormattedMessage
              id="No image set in Lead Image content field"
              defaultMessage="No image set in Lead Image content field"
            />
            <Icon name={imageSVG} size="100px" color="#b8c6c8" />
          </Segment>
        </>
      )}
      {properties.image && (
        <>
          <Segment className="sidebar-metadata-container" secondary>
            {properties.image.filename}
            {properties.image.data && (
              <Image
                // TODO understand when this actually happens
                src={`data:${properties.image['content-type']};base64,${properties.image.data}`}
                width={properties.image.width}
                height={properties.image.height}
                alt={data.image_caption || properties.image_caption || ''}
                className="responsive"
                style={{
                  aspectRatio: `${properties.image.width} / ${properties.image.height}`,
                }}
              />
            )}
            {!properties.image.data && (
              <Image
                item={properties}
                imageField="image"
                alt={data.image_caption || properties.image_caption || ''}
                responsive={true}
                sizes="188px"
              />
            )}
          </Segment>
          <BlockDataForm
            schema={schema}
            onChangeField={(id, value) => {
              if (CONTENT_FIELDS.includes(id)) {
                onChangeField(id, value);
              } else {
                onChangeBlockData(block, {
                  ...data,
                  [id]: value,
                });
              }
            }}
            onChangeBlock={onChangeBlockData}
            formData={{
              ...data,
              image_caption: properties.image_caption,
            }}
            block={block}
            blocksConfig={blocksConfig}
            navRoot={navRoot}
            contentType={contentType}
            errors={blocksErrors}
          />
        </>
      )}
    </Segment.Group>
  );
};

function addContentFields(schema, intl) {
  return {
    ...schema,
    fieldsets: schema.fieldsets.map((fieldset, index) =>
      index === 0
        ? { ...fieldset, fields: [...CONTENT_FIELDS, ...fieldset.fields] }
        : fieldset,
    ),
    properties: {
      ...schema.properties,
      image_caption: {
        title: intl.formatMessage(messages.AltText),
      },
    },
  };
}

LeadImageSidebar.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  onChangeField: PropTypes.func.isRequired,
};

export default injectIntl(LeadImageSidebar);
