import React from 'react';
import PropTypes from 'prop-types';
import { filter, map, groupBy } from 'lodash';
import { Accordion, Button } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Icon } from '@plone/volto/components';
import AnimateHeight from 'react-animate-height';
import { blocks } from '~/config';

import upSVG from '@plone/volto/icons/up-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';

const BlockChooser = ({ currentBlock, onMutateBlock, intl }) => {
  const mostUsedBlocks = filter(blocks.blocksConfig, (item) => item.mostUsed);
  const groupedBlocks = groupBy(blocks.blocksConfig, (item) => item.group);
  const blocksAvailable = { mostUsed: mostUsedBlocks, ...groupedBlocks };
  const [activeIndex, setActiveIndex] = React.useState(0);
  const copyBlock = useSelector((state) => state.sidebar.blockData);

  function handleClick(e, titleProps) {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  }

  return (
    <div className="blocks-chooser">
      <Button onClick={() => onMutateBlock(currentBlock, { ...copyBlock })}>
        Paste
      </Button>
      <Accordion fluid styled className="form">
        {map(blocks.groupBlocksOrder, (groupName, index) => (
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
                    (block) => !block.restricted,
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
};

export default injectIntl(BlockChooser);
