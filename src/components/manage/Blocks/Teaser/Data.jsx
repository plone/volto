import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { getContent, resetContent } from '@plone/volto/actions';
import { BlockDataForm, Icon, Popup } from '@plone/volto/components';
import { isEmpty } from 'lodash';
import { flattenToAppURL } from '@plone/volto/helpers';
import TeaserBody from './Body';

import syncSVG from '@plone/volto/icons/sync.svg';
import trashSVG from '@plone/volto/icons/delete.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

const messages = defineMessages({
  targetPreview: {
    id: 'Target Preview',
    defaultMessage: 'Target Preview',
  },
  noTargetSelected: {
    id: 'No target selected',
    defaultMessage: 'No target selected',
  },
  syncLocalDataWithTarget: {
    id: 'Sync local data with target',
    defaultMessage: 'Sync local data with target',
  },
  resetTarget: {
    id: 'Resets the target',
    defaultMessage: 'Resets the target',
  },
  resetTeaser: {
    id: 'Reset the block',
    defaultMessage: 'Reset the block',
  },
});

const TeaserData = (props) => {
  const { block, blocksConfig, data, onChangeBlock } = props;
  const intl = useIntl();
  const _ = intl.formatMessage;

  const href = data.href?.[0];
  const dispatch = useDispatch();
  const targetContent = useSelector(
    (state) => state.content.subrequests[block]?.data,
  );

  const syncronize = () => {
    onChangeBlock(block, {
      title: targetContent.title,
      description: targetContent.description,
      head_title: targetContent.head_title,
    });
  };

  const resetTarget = () => {
    onChangeBlock(block, {
      href: '',
    });
    dispatch(resetContent(block));
  };

  const reset = () => {
    onChangeBlock(block, {
      href: '',
      title: '',
      description: '',
      head_title: '',
    });
    dispatch(resetContent(block));
  };

  const targetContentAdapter = targetContent
    ? {
        title: targetContent.title,
        description: targetContent.description,
        head_title: targetContent.head_title,
        href: [
          {
            '@id': targetContent?.['@id'],
            image_field: 'preview_image',
            '@type': targetContent['@type'],
            effective: targetContent.effective,
          },
        ],
      }
    : null;

  React.useEffect(() => {
    if (!isEmpty(href)) {
      dispatch(getContent(flattenToAppURL(href['@id']), null, block));
    } else {
      dispatch(resetContent(block));
    }
  }, [block, href, dispatch]);

  const schema = blocksConfig[data['@type']].blockSchema({ intl });

  return (
    <>
      <BlockDataForm
        schema={schema}
        title={schema.title}
        onChangeField={(id, value) => {
          onChangeBlock(block, {
            ...data,
            [id]: value,
            ...(id === 'href' &&
              !isEmpty(value) &&
              !data.title &&
              !data.description && {
                title: value[0].Title,
                description: value[0].Description,
                head_title: value[0].head_title,
              }),
          });
        }}
        onChangeBlock={onChangeBlock}
        formData={data}
        block={block}
        blocksConfig={blocksConfig}
      />

      <header className="header pulled teaser-preview">
        <h2>{_(messages.targetPreview)}</h2>
      </header>
      {targetContent ? (
        <>
          <Button.Group className="teaser-toolbar">
            <Popup
              trigger={
                <Button basic icon onClick={() => syncronize()}>
                  <Icon name={syncSVG} size="28px" />
                </Button>
              }
              position="top center"
              content={_(messages.syncLocalDataWithTarget)}
              size="mini"
            />
            <Popup
              trigger={
                <Button basic icon onClick={() => resetTarget()}>
                  <Icon name={clearSVG} size="28px" />
                </Button>
              }
              position="top center"
              content={_(messages.resetTarget)}
              size="mini"
            />
            <Popup
              trigger={
                <Button basic icon onClick={() => reset()}>
                  <Icon name={trashSVG} size="28px" color="red" />
                </Button>
              }
              position="top center"
              content={_(messages.resetTeaser)}
              size="mini"
            />
          </Button.Group>
          <TeaserBody {...props} data={targetContentAdapter} />
        </>
      ) : (
        <div className="teaser-notargetselected">
          {_(messages.noTargetSelected)}
        </div>
      )}
    </>
  );
};

export default TeaserData;
