import React, { useState, useRef } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Button, Label } from 'semantic-ui-react';
import { BlockDataForm, Icon } from '@plone/volto/components';
import { isEmpty } from 'lodash';
import { getContent } from '@plone/volto/actions';
import { flattenToAppURL } from '@plone/volto/helpers';
import { dataMinusOverwrites } from './utils';

import trashSVG from '@plone/volto/icons/delete.svg';
import reloadSVG from '@plone/volto/icons/reload.svg';
import checkSVG from '@plone/volto/icons/check.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

const messages = defineMessages({
  resetTeaser: {
    id: 'Reset the block',
    defaultMessage: 'Reset the block',
  },
  refreshTeaser: {
    id: 'Fetch newest data',
    defaultMessage: 'Fetch newest data',
  },
  overwrittenField: {
    id: 'This field has been overwritten.',
    defaultMessage: 'This field has been overwritten.',
  },
  confirmationPrompt: {
    id: 'Please confirm the overwrite above.',
    defaultMessage: 'Please confirm the overwrite above.',
  },
  resetOverwrite: {
    id: 'Reset the Overwrite',
    defaultMessage: 'Reset the Overwrite',
  },
  keepOverwrite: {
    id: 'Keep the Overwrite',
    defaultMessage: 'Keep the Overwrite',
  },
  overwrite: {
    id: 'Confirm Overwrites:',
    defaultMessage: 'Confirm Overwrites:',
  },
  liveDataPrompt: {
    id: 'Overwritten fields will be excluded from live data.',
    defaultMessage: 'Overwritten fields will be excluded from live data.',
  },
});

const TeaserData = (props) => {
  const { block, blocksConfig, data, onChangeBlock } = props;
  const intl = useIntl();
  const dispatch = useDispatch();
  const [refreshed, setRefreshed] = useState(false);
  const errors = useRef({});
  const [fetchedData, setFetchedData] = useState({});

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
    errors.current = data.overwritten.reduce(
      (err, n) => (
        (err[n] = { message: intl.formatMessage(messages.overwrittenField) }),
        err
      ),
      {},
    );

    dispatch(getContent(flattenToAppURL(data.href[0]['@id']))).then((resp) => {
      if (resp) {
        setFetchedData(resp);
        let blockData = dataMinusOverwrites(resp, data);

        if (data.overwritten.length > 0) {
          for (const field of data.overwritten) {
            if (field in blockData) {
              blockData[field] = data[field];
            }
          }
        }

        setRefreshed(true);
        onChangeBlock(block, blockData);
      }
    });
  };

  const onOverwrite = ({ id, value }) => {
    const overwritten = data.overwritten;
    const ignore = ['is_live', 'href', 'image_override', 'styles', 'align'];
    if (!overwritten.includes(id) && !ignore.includes(id)) {
      overwritten.push(id);
      onChangeBlock(block, {
        ...data,
        overwritten: overwritten,
      });
    }
  };

  const accept = (field) => {
    if (data[field]) {
      onChangeBlock(block, { ...data, [field]: fetchedData[field] });
      delete errors.current[field];
    }
  };

  const decline = (field) => {
    if (data[field]) {
      onChangeBlock(block, { ...data });
      delete errors.current[field];
    }
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

    onOverwrite({ id, value });
  };

  const isReseteable =
    isEmpty(data.href) && !data.title && !data.description && !data.head_title;

  const HeaderActions = (
    <Button.Group>
      {!data.is_live && (
        <Button
          aria-label={intl.formatMessage(messages.refreshTeaser)}
          basic
          disabled={refreshed}
          className={'hidden'}
          onClick={() => refresh()}
        >
          <Icon name={reloadSVG} size="24px" color="grey" />
        </Button>
      )}
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

  const Prompts = (
    <Button.Group className="teaser block overwrite actions">
      <h3>{intl.formatMessage(messages.overwrite)}</h3>
      {Object.keys(errors.current).length > 0 &&
        Object.keys(errors.current)?.map((i) => (
          <div>
            <Label>{i?.replace('-', ' ')?.replace('_', ' ')}</Label>
            <Button.Group>
              <Button
                aria-label={intl.formatMessage(messages.keepOverwrite)}
                basic
                onClick={() => decline(i)}
              >
                <Icon name={clearSVG} size="28px" color="red" />
              </Button>
              <Button
                aria-label={intl.formatMessage(messages.resetOverwrite)}
                basic
                onClick={() => accept(i)}
              >
                <Icon name={checkSVG} size="28px" color="green" />
              </Button>
            </Button.Group>
          </div>
        ))}
    </Button.Group>
  );

  const schema = blocksConfig[data['@type']].blockSchema({ intl });

  const errorOptions = { hideErrorBox: true, type: 'warning' };

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
      errors={refreshed ? errors.current : {}}
      blocksConfig={blocksConfig}
      headerActions={HeaderActions}
      prompts={Object.keys(errors.current).length > 0 ? Prompts : null}
      errorOptions={errorOptions}
    />
  );
};

export default TeaserData;
