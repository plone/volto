import React from 'react';
import { Button, Segment } from 'semantic-ui-react';
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
  navigateTo,
}) => {
  return (
    <Segment as="ul" className="object-listing">
      {currentSearchResults &&
        currentSearchResults.items.map(item => (
          <li
            role="presentation"
            key={item.id}
            className={cx('', {
              'selected-item': selected === item['@id'],
              disabled:
                mode === 'image'
                  ? !settings.imageObjects.includes(item['@type']) &&
                    !item.is_folderish
                  : false,
            })}
            onClick={() => handleClickOnItem(item)}
            onDoubleClick={() => handleDoubleClickOnItem(item)}
          >
            <span>
              {getIcon(item['@type'])}
              {item.id}
            </span>
            {item.is_folderish && mode === 'image' && (
              <Icon name={rightArrowSVG} size="24px" />
            )}
            {item.is_folderish && mode === 'link' && (
              <Button.Group>
                <Button
                  basic
                  icon
                  onClick={e => {
                    e.stopPropagation();
                    navigateTo(item['@id']);
                  }}
                >
                  <Icon name={rightArrowSVG} size="24px" />
                </Button>
              </Button.Group>
            )}
          </li>
        ))}
    </Segment>
  );
};

export default ObjectBrowserNav;
