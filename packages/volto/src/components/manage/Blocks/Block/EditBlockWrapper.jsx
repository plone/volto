import React, { useEffect } from 'react';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import {
  applyBlockDefaults,
  applyBlockInitialValue,
  getBlocksFieldname,
  blockHasValue,
  buildStyleClassNamesFromData,
  buildStyleObjectFromData,
  buildStyleClassNamesExtenders,
} from '@plone/volto/helpers/Blocks/Blocks';
import dragSVG from '@plone/volto/icons/drag.svg';
import { Button } from 'semantic-ui-react';
import includes from 'lodash/includes';
import isBoolean from 'lodash/isBoolean';
import { defineMessages, injectIntl } from 'react-intl';
import cx from 'classnames';
import config from '@plone/volto/registry';
import BlockChooserButton from '@plone/volto/components/manage/BlockChooser/BlockChooserButton';

import trashSVG from '@plone/volto/icons/delete.svg';
import translateSVG from '@plone/volto/icons/translate.svg';

import { useDispatch, useSelector } from 'react-redux';

import { getContentTranslation } from '@plone/volto/actions/translations/translations';

const messages = defineMessages({
  delete: {
    id: 'delete',
    defaultMessage: 'delete',
  },
  translate: {
    id: 'translate',
    defaultMessage: 'translate',
  },
});

const EditBlockWrapper = (props) => {
  const hideHandler = (data) => {
    return (
      !!data.fixed ||
      (!config.experimental.addBlockButton.enabled &&
        !(blockHasValue(data) && props.blockProps.editable))
    );
  };

  const { intl, blockProps, draginfo, children } = props;
  const {
    allowedBlocks,
    showRestricted,
    block,
    blocksConfig,
    selected,
    type,
    onChangeBlock,
    onDeleteBlock,
    onInsertBlock,
    onSelectBlock,
    onMutateBlock,
    data: originalData,
    editable,
    properties,
    showBlockChooser,
    navRoot,
    contentType,
  } = blockProps;

  const dispatch = useDispatch();

  const content_translation = useSelector(
    (state) => state.content_translation || {},
  );

  const jsonSchemaToDict = (schema, data) => {
    const result = {};

    const jsonSchema = typeof schema === 'function' ? schema({ intl }) : schema;

    // Process fieldsets
    if ('properties' in jsonSchema) {
      // Process properties directly
      for (const propName of Object.keys(jsonSchema.properties)) {
        result[propName] = data[propName];
      }
    }
    return result;
  };

  useEffect(() => {
    if (
      Object.values(content_translation.subrequests || {}).every(
        (item) => item?.loaded,
      )
    ) {
      console.log('finished');

      const new_data = {};
      for (const [key, value] of Object.entries(
        content_translation.subrequests || {},
      )) {
        new_data[key] = value.data;
      }

      console.log('new_data', new_data);

      return;
    }
  }, [content_translation]);

  const onTranslateBlock = (props) => {
    const { canonical, onChangeBlock, source_language, target_language, type } =
      props;

    // get all translatable strings from the canonical block
    // it should return an object that has attribute names and the source language value
    console.log('canonical', canonical);
    const blockConfigInfo = config.blocks.blocksConfig[type];
    console.log('blockConfigInfo', blockConfigInfo);
    const translatable_strings = blockConfigInfo.getTranslatableProperties
      ? blockConfigInfo.getTranslatableProperties(canonical)
      : blockConfigInfo.blockSchema
        ? jsonSchemaToDict(blockConfigInfo.blockSchema, canonical)
        : {};
    console.log('translatable_strings', translatable_strings);

    for (const [key, value] of Object.entries(translatable_strings)) {
      dispatch(
        getContentTranslation(source_language, target_language, value, '', key),
      );
    }

    console.log('content_translation', content_translation);

    return;
  };

  const data = applyBlockDefaults({ data: originalData, ...blockProps, intl });

  const visible = selected && !hideHandler(data);

  const required = isBoolean(data.required)
    ? data.required
    : includes(config.blocks.requiredBlocks, type);

  let classNames = buildStyleClassNamesFromData(data.styles);
  classNames = buildStyleClassNamesExtenders({
    block,
    content: properties,
    data,
    classNames,
  });
  const style = buildStyleObjectFromData(data);

  // We need to merge the StyleWrapper styles with the draggable props from b-D&D
  const styleMergedWithDragProps = {
    ...draginfo.draggableProps,
    style: { ...style, ...draginfo.draggableProps.style },
  };

  return (
    <div
      ref={draginfo.innerRef}
      {...styleMergedWithDragProps}
      // Right now, we can have the alignment information in the styles property or in the
      // block data root, we inject the classname here for having control over the whole
      // Block Edit wrapper
      className={cx(`block-editor-${data['@type']}`, classNames, {
        [data.align]: data.align,
      })}
    >
      <div style={{ position: 'relative' }}>
        <div
          style={{
            visibility: visible ? 'visible' : 'hidden',
            display: 'inline-block',
          }}
          {...draginfo.dragHandleProps}
          className="drag handle wrapper"
        >
          <Icon name={dragSVG} size="18px" />
        </div>
        <div className={`ui drag block inner ${type}`}>
          {children}
          {selected && !required && editable && (
            <Button
              icon
              basic
              onClick={() => onDeleteBlock(block, true)}
              className="delete-button"
              aria-label={intl.formatMessage(messages.delete)}
            >
              <Icon name={trashSVG} size="18px" />
            </Button>
          )}
          {selected && !required && editable && (
            <Button
              icon
              basic
              onClick={() =>
                onTranslateBlock({
                  type: data['@type'], // block type
                  canonical:
                    blockProps.location.state.translationObject.blocks[
                      data['@canonical']
                    ], // original block data
                  onChangeBlock: props.onChangeBlock, // function
                  target_language: blockProps.location.state.language, // target Language
                  source_language: blockProps.location.state.languageFrom, // source Language
                })
              }
              className="translate-button"
              aria-label={intl.formatMessage(messages.translate)}
            >
              <Icon name={translateSVG} size="18px" />
            </Button>
          )}
          {config.experimental.addBlockButton.enabled && showBlockChooser && (
            <BlockChooserButton
              data={data}
              block={block}
              onInsertBlock={(id, value) => {
                if (blockHasValue(data)) {
                  onSelectBlock(onInsertBlock(id, value));
                } else {
                  const blocksFieldname = getBlocksFieldname(properties);
                  const newFormData = applyBlockInitialValue({
                    id,
                    value,
                    blocksConfig,
                    formData: {
                      ...properties,
                      [blocksFieldname]: {
                        ...properties[blocksFieldname],
                        [id]: value || null,
                      },
                    },
                  });
                  const newValue = newFormData[blocksFieldname][id];
                  onChangeBlock(id, newValue);
                }
              }}
              onMutateBlock={onMutateBlock}
              allowedBlocks={allowedBlocks}
              showRestricted={showRestricted}
              blocksConfig={blocksConfig}
              size="24px"
              properties={properties}
              navRoot={navRoot}
              contentType={contentType}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default injectIntl(EditBlockWrapper);
