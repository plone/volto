import React from 'react';
import { MapsSchema } from './schema';
import { useIntl, defineMessages } from 'react-intl';
import globeSVG from '@plone/volto/icons/globe.svg';
import { Icon } from '@plone/volto/components';
import { BlockDataForm } from '@plone/volto/components/manage/Form';
import { Segment } from 'semantic-ui-react';

const messages = defineMessages({
  Maps: {
    id: 'Maps',
    defaultMessage: 'Maps',
  },
  NoMaps: {
    id: 'No map selected',
    defaultMessage: 'No map selected',
  },
});

const MapsSidebar = (props) => {
  const { data, block, blocksErrors, onChangeBlock, navRoot, contentType } =
    props;
  const intl = useIntl();
  const schema = MapsSchema({ ...props, intl });

  return (
    <>
      {!data.url ? (
        <Segment className="sidebar-metadata-container" secondary>
          {props.intl.formatMessage(messages.NoMaps)}
          <Icon name={globeSVG} size="100px" color="#b8c6c8" />
        </Segment>
      ) : (
        <BlockDataForm
          schema={schema}
          title={intl.formatMessage(messages.Maps)}
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
          onChangeBlock={onChangeBlock}
          formData={data}
          block={block}
          navRoot={navRoot}
          contentType={contentType}
          errors={blocksErrors}
        />
      )}
    </>
  );
};

export default MapsSidebar;
