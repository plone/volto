import React from 'react';
import PropTypes from 'prop-types';
import { filter, map, groupBy, isEmpty } from 'lodash';
import { Accordion, Button } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import { Icon } from '@plone/volto/components';
import AnimateHeight from 'react-animate-height';
import config from '@plone/volto/registry';

import upSVG from '@plone/volto/icons/up-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';

const BlockChooser = ({
  currentBlock,
  onMutateBlock,
  allowedBlocks,
  showRestricted,
  intl,
}) => {
  const blocksConfig = filter(
    config.blocks.blocksConfig,
    (item) => isEmpty(allowedBlocks) || allowedBlocks.includes(item.id),
  );

  let blocksAvailable = {};
  const mostUsedBlocks = filter(blocksConfig, (item) => item.mostUsed);
  if (mostUsedBlocks) {
    blocksAvailable.mostUsed = mostUsedBlocks;
  }
  const groupedBlocks = groupBy(blocksConfig, (item) => item.group);
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

  return (
    <div className="blocks-chooser">
      <Accordion fluid styled className="form">
        {map(groupBlocksOrder, (groupName, index) => (
          <React.Fragment key={groupName.id}>
            <Accordion.Title
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
                {map(
                  filter(
                    blocksAvailable[groupName.id],
                    (block) => showRestricted || !block.restricted,
                  ),
                  (block) => (
                    <Button.Group key={block.id}>
                      <Button
                        icon
                        basic
                        className={block.id}
                        onClick={() =>
                          onMutateBlock(currentBlock, { '@type': block.id })
                        }
                      >
                        <Icon name={block.icon} size="36px" />
                        {intl.formatMessage({
                          id: block.id,
                          defaultMessage: block.title,
                        })}
                      </Button>
                    </Button.Group>
                  ),
                )}
              </AnimateHeight>
            </Accordion.Content>
          </React.Fragment>
        ))}
      </Accordion>
    </div>
  );
};

BlockChooser.propTypes = {
  currentBlock: PropTypes.string.isRequired,
  onMutateBlock: PropTypes.func.isRequired,
  allowedBlocks: PropTypes.arrayOf(PropTypes.string),
};

export default injectIntl(BlockChooser);
