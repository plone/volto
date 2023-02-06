import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { BlockDataForm, Icon } from '@plone/volto/components';
import { isEmpty } from 'lodash';
import { getContent } from '@plone/volto/actions';
import { getBaseUrl, flattenToAppURL } from '@plone/volto/helpers';

import trashSVG from '@plone/volto/icons/delete.svg';
import reloadSVG from '@plone/volto/icons/reload.svg';

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

  const reset = () => {
    onChangeBlock(block, {
      ...data,
      href: '',
      title: '',
      description: '',
      head_title: '',
    });
  };

  const refresh = () => {
    dispatch(getContent(getBaseUrl(data.href[0]['@id']))).then((resp) => {
      if (resp) {
        let dataBlock = {
          '@type': data['@type'],
          description: resp?.description,
          head_title: resp?.head_title,
          href: [
            {
              '@id': flattenToAppURL(resp['@id']),
              '@type': resp?.['@type'],
              Description: resp?.description,
              Title: resp.title,
              hasPreviewImage: resp?.preview_image ? true : false,
              head_title: resp.head_title ?? null,
              image_field: resp?.preview_image
                ? 'preview_image'
                : resp?.image
                ? 'image'
                : null,
              image_scales: {
                preview_image: [resp?.preview_image],
                image: [resp?.image?.image],
              },
              title: resp.title,
            },
          ],
          styles: data.styles,
          title: resp.title,
        };
        onChangeBlock(block, dataBlock);
      }
    });
  };

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

  const isReseteable =
    isEmpty(data.href) && !data.title && !data.description && !data.head_title;

  const HeaderActions = (
    <Button.Group>
      <Button
        aria-label={intl.formatMessage(messages.refreshTeaser)}
        basic
        disabled={isReseteable}
        onClick={() => refresh()}
      >
        <Icon name={reloadSVG} size="24px" color="grey" />
      </Button>
      <Button
        aria-label={intl.formatMessage(messages.resetTeaser)}
        basic
        disabled={isReseteable}
        onClick={() => reset()}
      >
        <Icon name={trashSVG} size="24px" color="red" />
      </Button>
    </Button.Group>
  );

  const schema = blocksConfig[data['@type']].blockSchema({ intl });

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
      headerActions={HeaderActions}
    />
  );
};

export default TeaserData;
