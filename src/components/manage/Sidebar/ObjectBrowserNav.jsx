import React from 'react';
import { Segment } from 'semantic-ui-react';
import cx from 'classnames';
import { Icon } from '@plone/volto/components';
import { settings } from '~/config';
import rightArrowSVG from '@plone/volto/icons/right-key.svg';

const ObjectBrowserNav = ({
  currentSearchResults,
  selected,
  getIcon,
  handleClickOnItem,
  handleDoubleClickOnItem,
  mode,
  isExternalSelected,
}) => {
  return (
    <Segment
      as="ul"
      className="object-listing"
      disabled={mode === 'link' && isExternalSelected}
    >
      {currentSearchResults &&
        currentSearchResults.items.map(item => (
          <li
            key={item.id}
            className={cx('', {
              'selected-item': selected === item['@id'],
              disabled:
                !settings.imageObjects.includes(item['@type']) &&
                !item.is_folderish,
            })}
            onClick={() => handleClickOnItem(item)}
            onDoubleClick={() => handleDoubleClickOnItem(item)}
          >
            <span>
              {getIcon(item['@type'])}
              {item.id}
            </span>
            {item.is_folderish && <Icon name={rightArrowSVG} size="24px" />}
          </li>
        ))}
    </Segment>
  );
};

export default ObjectBrowserNav;
