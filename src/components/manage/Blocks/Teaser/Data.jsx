import React, { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { BlockDataForm, Icon } from '@plone/volto/components';
import { isEmpty } from 'lodash';
import { getContent } from '@plone/volto/actions';
import { flattenToAppURL } from '@plone/volto/helpers';

import reloadSVG from '@plone/volto/icons/reload.svg';
import { useEffect } from 'react';

const messages = defineMessages({
  resetTeaser: {
    id: 'Reset the block',
    defaultMessage: 'Reset the block',
  },
  refreshTeaser: {
    id: 'Fetch newest data',
    defaultMessage: 'Fetch newest data',
  },
});

const TeaserData = (props) => {
  const { block, blocksConfig, data, onChangeBlock } = props;
  const intl = useIntl();
  const dispatch = useDispatch();
  const [refreshed, setRefreshed] = useState(false);

  const dataTransformer = (resp, data) => {
    let hrefData = {
      '@id': flattenToAppURL(resp['@id']),
      '@type': resp?.['@type'],
      Description: resp?.description,
      Title: resp.title,
      hasPreviewImage: resp?.preview_image ? true : false,
      head_title: resp.head_title ?? null,
      image_field: resp?.preview_image ? 'preview_image' : resp?.image ? 'image' : null,
      image_scales: {
        preview_image: [resp?.preview_image],
        image: [resp?.image?.image],
      },
      title: resp.title,
    };
    let blockData = {
      '@type': data['@type'],
      description: resp?.description,
      head_title: resp?.head_title,
      href: [hrefData],
      styles: data.styles,
      title: resp.title,
    };
    return blockData;
  };
  const refresh = () => {
    dispatch(getContent(flattenToAppURL(data.href[0]['@id']))).then((resp) => {
      if (resp) {
        let blockData = dataTransformer(resp, data);
        setRefreshed(true);
        onChangeBlock(block, blockData);
      }
    });
  };

  useEffect(() => {
    if (data.href && data.live) {
      dispatch(getContent(flattenToAppURL(data.href[0]['@id']))).then((resp) => {
        if (resp) {
          let blockData = dataTransformer(resp, data);
          onChangeBlock(block, blockData);
        }
      });
    }
  }, [data.href, data.live]);

  const dataAdapter = blocksConfig[data['@type']].dataAdapter;

  const teaserDataAdapter = ({ block, data, id, onChangeBlock, value }) => {
    let dataSaved = {
      ...data,
      [id]: value,
    };
    if (id === 'href' && !isEmpty(value) && !data.title && !data.description) {
      dataSaved = {
        ...dataSaved,
        title: value[0].Title,
        description: value[0].Description,
        head_title: value[0].head_title,
      };
    }
    onChangeBlock(block, dataSaved);
  };

  // const isReseteable = isEmpty(data.href) && !data.title && !data.description && !data.head_title;

  // const HeaderActions = (
  //   <Button.Group>
  //     <Button aria-label={intl.formatMessage(messages.refreshTeaser)} basic disabled={refreshed} onClick={() => refresh()}>
  //       <Icon name={reloadSVG} size="24px" color="grey" />
  //     </Button>
  //     <Button aria-label={intl.formatMessage(messages.resetTeaser)} basic disabled={isReseteable} onClick={() => reset()}>
  //       <Icon name={trashSVG} size="24px" color="red" />
  //     </Button>
  //   </Button.Group>
  // );

  const schema = data.overwrite ? blocksConfig[data['@type']].blockSchema({ intl }) : blocksConfig[data['@type']].enhancedSchema({ intl });

  return (
    <BlockDataForm
      schema={schema}
      title={schema.title}
      onChangeField={(id, value) => {
        teaserDataAdapter({
          block,
          data,
          id,
          onChangeBlock,
          value,
        });
      }}
      onChangeBlock={onChangeBlock}
      formData={data}
      block={block}
      blocksConfig={blocksConfig}
    />
  );
};

export default TeaserData;
