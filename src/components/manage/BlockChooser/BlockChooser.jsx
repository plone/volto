import React from 'react';
import PropTypes from 'prop-types';
import { filter, map, groupBy, isEmpty } from 'lodash';
import { Accordion, Button } from 'semantic-ui-react';
import { useIntl, defineMessages } from 'react-intl';
import { Icon } from '@plone/volto/components';
import AnimateHeight from 'react-animate-height';
import config from '@plone/volto/registry';
import upSVG from '@plone/volto/icons/up-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';
import BlockChooserSearch from './BlockChooserSearch';
import { FormattedMessage } from 'react-intl';

const messages = defineMessages({
  fold: {
    id: 'Fold',
    defaultMessage: 'Fold',
  },
  unfold: {
    id: 'Unfold',
    defaultMessage: 'Unfold',
  },
});

const BlockChooser = ({
  currentBlock,
  onInsertBlock,
  onMutateBlock,
  allowedBlocks,
  showRestricted,
  blocksConfig = config.blocks.blocksConfig,
  blockChooserRef,
  properties = {},
}) => {
  const intl = useIntl();
  const useAllowedBlocks = !isEmpty(allowedBlocks);

  const filteredBlocksConfig = filter(blocksConfig, (item) => {
    if (showRestricted) {
      if (useAllowedBlocks) {
        return allowedBlocks.includes(item.id);
      } else {
        return true;
      }
    } else {
      if (useAllowedBlocks) {
        return allowedBlocks.includes(item.id);
      } else {
        // Overload restricted as a function, so we can decide the availability of a block
        // depending on this function, given properties (current present blocks) and the
        // block being evaluated
        return typeof item.restricted === 'function'
          ? !item.restricted({ properties, block: item })
          : !item.restricted;
      }
    }
  });

  let blocksAvailable = {};
  const mostUsedBlocks = filter(filteredBlocksConfig, (item) => item.mostUsed);
  if (mostUsedBlocks) {
    blocksAvailable.mostUsed = mostUsedBlocks;
  }
  const groupedBlocks = groupBy(filteredBlocksConfig, (item) => item.group);
  blocksAvailable = {
    ...blocksAvailable,
    ...groupedBlocks,
  };

  const groupBlocksOrder = filter(config.blocks.groupBlocksOrder, (item) =>
    Object.keys(blocksAvailable).includes(item.id),
  );
  const [activeIndex, setActiveIndex] = React.useState(0);

  function handleClick(e, titleProps) {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  }
  const [filterValue, setFilterValue] = React.useState('');

  const getFormatMessage = (message) =>
    intl.formatMessage({
      id: message,
      defaultMessage: message,
    });

  function blocksAvailableFilter(blocks) {
    return blocks.filter(
      (block) =>
        getFormatMessage(block.title).toLowerCase().includes(filterValue) ||
        filterVariations(block)?.length,
    );
  }
  function filterVariations(block) {
    return block.variations?.filter(
      (variation) =>
        getFormatMessage(variation.title).toLowerCase().includes(filterValue) &&
        !variation.title.toLowerCase().includes('default'),
    );
  }

  const ButtonGroup = ({ block }) => {
    const variations = filterVariations(block);
    return (
      <Button.Group key={block.id}>
        <Button
          icon
          basic
          className={block.id}
          onClick={(e) => {
            onInsertBlock
              ? onInsertBlock(currentBlock, {
                  '@type': block.id,
                })
              : onMutateBlock(currentBlock, {
                  '@type': block.id,
                });
            e.stopPropagation();
          }}
        >
          <Icon name={block.icon} size="36px" />
          {getFormatMessage(block.title)}
          {filterValue && variations?.[0]?.title && (
            <small>{getFormatMessage(variations[0].title)}</small>
          )}
        </Button>
      </Button.Group>
    );
  };

  return (
    <div
      className={`blocks-chooser${
        config.experimental.addBlockButton.enabled ? ' new-add-block' : ''
      }`}
      ref={blockChooserRef}
    >
      <BlockChooserSearch
        onChange={(value) => setFilterValue(value)}
        searchValue={filterValue}
      />
      {filterValue ? (
        <>
          {map(blocksAvailableFilter(filteredBlocksConfig), (block) => (
            <ButtonGroup block={block} key={block.id} />
          ))}
          {blocksAvailableFilter(filteredBlocksConfig).length === 0 && (
            <h4 style={{ textAlign: 'center', lineHeight: '40px' }}>
              <FormattedMessage
                id="No results found"
                defaultMessage="No results found"
              />
            </h4>
          )}
        </>
      ) : (
        <Accordion fluid styled className="form">
          {map(groupBlocksOrder, (groupName, index) => (
            <React.Fragment key={groupName.id}>
              <Accordion.Title
                aria-label={
                  activeIndex === index
                    ? `${intl.formatMessage(messages.fold)} ${
                        groupName.title
                      } blocks`
                    : `${intl.formatMessage(messages.unfold)} ${
                        groupName.title
                      } blocks`
                }
                active={activeIndex === index}
                index={index}
                onClick={handleClick}
              >
                {intl.formatMessage({
                  id: groupName.id,
                  defaultMessage: groupName.title,
                })}
                <div className="accordion-tools">
                  {activeIndex === 0 ? (
                    <Icon name={upSVG} size="20px" />
                  ) : (
                    <Icon name={downSVG} size="20px" />
                  )}
                </div>
              </Accordion.Title>
              <Accordion.Content
                className={groupName.id}
                active={activeIndex === index}
              >
                <AnimateHeight
                  animateOpacity
                  duration={500}
                  height={activeIndex === index ? 'auto' : 0}
                >
                  {map(blocksAvailable[groupName.id], (block) => (
                    <ButtonGroup block={block} key={block.id} />
                  ))}
                </AnimateHeight>
              </Accordion.Content>
            </React.Fragment>
          ))}
        </Accordion>
      )}
    </div>
  );
};

BlockChooser.propTypes = {
  currentBlock: PropTypes.string.isRequired,
  onMutateBlock: PropTypes.func,
  onInsertBlock: PropTypes.func,
  allowedBlocks: PropTypes.arrayOf(PropTypes.string),
  blocksConfig: PropTypes.objectOf(PropTypes.any),
};

export default React.forwardRef((props, ref) => (
  <BlockChooser {...props} blockChooserRef={ref} />
));
