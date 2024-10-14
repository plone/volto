import React from 'react';
import { useDispatch } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';
import { Button } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { Icon, Toast } from '@plone/volto/components';
import { BlockDataForm } from '@plone/volto/components/manage/Form';
import {
  flattenToAppURL,
  messages as defaultMessages,
} from '@plone/volto/helpers';
import { getContent } from '@plone/volto/actions';
import { isEmpty } from 'lodash';

import reloadSVG from '@plone/volto/icons/reload.svg';
import trashSVG from '@plone/volto/icons/delete.svg';

const messages = defineMessages({
  resetTeaser: {
    id: 'Reset the block',
    defaultMessage: 'Reset the block',
  },
  refreshTeaser: {
    id: 'Refresh source content',
    defaultMessage: 'Refresh source content',
  },
  invalidTeaser: {
    id: 'Invalid teaser source',
    defaultMessage: 'Invalid teaser source',
  },
});

const TeaserData = (props) => {
  const {
    block,
    blocksConfig,
    blocksErrors,
    data,
    onChangeBlock,
    navRoot,
    contentType,
  } = props;
  const dispatch = useDispatch();
  const intl = useIntl();

  const reset = () => {
    onChangeBlock(block, {
      ...data,
      href: '',
      title: '',
      description: '',
      head_title: '',
    });
  };

  const dataTransformer = (resp, data) => {
    let hrefData = {
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
        image: [resp?.image],
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
    if (data.href?.[0]?.['@id']) {
      dispatch(
        getContent(
          flattenToAppURL(data.href[0]['@id']),
          null,
          `${block}-teaser`,
        ),
      )
        .then((resp) => {
          if (resp) {
            let blockData = dataTransformer(resp, data);
            onChangeBlock(block, blockData);
          }
        })
        .catch((e) => {
          toast.error(
            <Toast
              error
              title={props.intl.formatMessage(defaultMessages.error)}
              content={props.intl.formatMessage(messages.invalidTeaser)}
            />,
          );
        });
    }
  };

  const isReseteable =
    isEmpty(data.href) && !data.title && !data.description && !data.head_title;

  const HeaderActions = (
    <Button.Group>
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

  const ActionButton = (
    <Button.Group className="refresh teaser">
      <Button
        aria-label={intl.formatMessage(messages.refreshTeaser)}
        basic
        onClick={() => refresh()}
        disabled={isEmpty(data.href)}
      >
        {intl.formatMessage(messages.refreshTeaser)}
        <Icon name={reloadSVG} size="20px" color="#00000099" />
      </Button>
    </Button.Group>
  );

  const schema = blocksConfig[data['@type']].blockSchema({
    data,
    intl,
  });
  const dataAdapter = blocksConfig[data['@type']].dataAdapter;

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
      headerActions={HeaderActions}
      actionButton={data.overwrite && ActionButton}
      navRoot={navRoot}
      contentType={contentType}
      errors={blocksErrors}
    />
  );
};

export default TeaserData;
