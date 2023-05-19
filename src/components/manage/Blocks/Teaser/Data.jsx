import React from 'react';
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
  refreshTeaser: {
    id: 'Refresh source content',
    defaultMessage: 'Refresh source content',
  },
});

const TeaserData = (props) => {
  const { block, blocksConfig, data, onChangeBlock } = props;
  const intl = useIntl();
  const dispatch = useDispatch();

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
      overwrite: data.overwrite,
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

  const ActionButton = (
    <Button.Group className="refresh teaser">
      <Button aria-label={intl.formatMessage(messages.refreshTeaser)} basic onClick={() => refresh()}>
        {intl.formatMessage(messages.refreshTeaser)}
        <Icon name={reloadSVG} size="20px" color="#00000099" />
      </Button>
    </Button.Group>
  );

  const schema = data.overwrite ? blocksConfig[data['@type']].blockSchema({ intl }) : blocksConfig[data['@type']].enhancedSchema({ intl });

  return (
    <BlockDataForm
      schema={schema}
      title={schema.title}
      onChangeField={(id, value) => {
        dataAdapter({
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
      actionButton={data.overwrite && ActionButton}
    />
  );
};

export default TeaserData;
