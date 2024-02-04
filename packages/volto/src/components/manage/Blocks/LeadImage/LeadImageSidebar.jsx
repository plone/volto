import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { BlockDataForm } from '@plone/volto/components';
import { defineMessages, useIntl } from 'react-intl';
import { Icon } from '@plone/volto/components';
import imageSVG from '@plone/volto/icons/image.svg';
import { LeadImageSchema } from './Schema';

const messages = defineMessages({
  NoImageSelected: {
    id: 'No image set in Lead Image content field',
    defaultMessage: 'No image set in Lead Image content field',
  },
  ImageSelected: {
    id: 'Image selected',
    defaultMessage: 'Image selected',
  },
});


const LeadImageSidebar = (props) => {
  const { data, block, onChangeBlock, openObjectBrowser, required } = props;
  const intl = useIntl();
  const schema = LeadImageSchema({ ...props, intl });

  return (
    <>
      <Segment className="sidebar-metadata-container" secondary>
  {data.image ? (
    intl.formatMessage(messages.ImageSelected)
  ) : (
    intl.formatMessage(messages.NoImageSelected)
  )}
  <Icon name={imageSVG} size="100px" color="#b8c6c8" />
</Segment>

       : (
        <BlockDataForm
          schema={schema}
          title={intl.formatMessage({ id: 'Lead Image' })}
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
          onChangeBlock={onChangeBlock}
          formData={data}
          block={block}
          required={required}
        />
      )
    </>
  );
};

LeadImageSidebar.propTypes = {
  data: PropTypes.object.isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  openObjectBrowser: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default LeadImageSidebar;
