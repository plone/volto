import React from 'react';
import PropTypes from 'prop-types';
import { filter, map, groupBy } from 'lodash';
import { Accordion, Button } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import { Icon } from '@plone/volto/components';
import AnimateHeight from 'react-animate-height';
import { tiles } from '~/config';

import upSVG from '@plone/volto/icons/up-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';

const TileChooser = ({ currentTile, onMutateTile, intl }) => {
  const mostUsedTiles = filter(tiles.tilesConfig, item => item.mostUsed);
  const groupedTiles = groupBy(tiles.tilesConfig, item => item.group);
  const tilesAvailable = { mostUsed: mostUsedTiles, ...groupedTiles };
  const [activeIndex, setActiveIndex] = React.useState(0);

  function handleClick(e, titleProps) {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  }

  return (
    <div className="tiles-chooser">
      <Accordion fluid styled className="form">
        {map(tiles.groupTilesOrder, (groupName, index) => (
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
                    tilesAvailable[groupName.id],
                    tile => !tile.restricted,
                  ),
                  tile => (
                    <Button.Group key={tile.id}>
                      <Button
                        icon
                        basic
                        className={tile.id}
                        onClick={() =>
                          onMutateTile(currentTile, { '@type': tile.id })
                        }
                      >
                        <Icon name={tile.icon} size="36px" />
                        {intl.formatMessage({
                          id: tile.id,
                          defaultMessage: tile.title,
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

TileChooser.propTypes = {
  currentTile: PropTypes.string.isRequired,
  onMutateTile: PropTypes.func.isRequired,
};

export default injectIntl(TileChooser);
