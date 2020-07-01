import React from 'react';
import { Button, Segment, Popup } from 'semantic-ui-react';
import cx from 'classnames';
import { Icon } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import { settings } from '~/config';
import rightArrowSVG from '@plone/volto/icons/right-key.svg';
import homeSVG from '@plone/volto/icons/home.svg';

const ObjectBrowserNav = ({
  currentSearchResults,
  selected,
  getIcon,
  handleClickOnItem,
  handleDoubleClickOnItem,
  mode,
  navigateTo,
  isSelectable,
}) => {
  const isSelected = (item) => {
    let ret = false;
    if (selected) {
      selected
        .filter((item) => item != null)
        .forEach((_item) => {
          if (flattenToAppURL(_item['@id']) === flattenToAppURL(item['@id'])) {
            ret = true;
          }
        });
    }
    return ret;
  };

  return (
    <Segment as="ul" className="object-listing">
      {currentSearchResults &&
        currentSearchResults.items.map((item) => (
          <li
            role="presentation"
            key={item.id}
            className={cx('', {
              'selected-item': isSelected(item),

              disabled:
                mode === 'image'
                  ? !settings.imageObjects.includes(item['@type']) &&
                    !item.is_folderish
                  : !isSelectable(item),
            })}
            onClick={() => handleClickOnItem(item)}
            onDoubleClick={() => handleDoubleClickOnItem(item)}
          >
            <span title={`${item['@id']} (${item['@type']})`}>
              <Popup
                key={item['@id']}
                content={
                  <>
                    <Icon name={homeSVG} size="18px" />{' '}
                    {flattenToAppURL(item['@id'])} ( {item['@type']})
                  </>
                }
                trigger={<span>{getIcon(item['@type'])}</span>}
              />

              {item.title}
            </span>
            {item.is_folderish && mode === 'image' && (
              <Icon name={rightArrowSVG} size="24px" />
            )}
            {item.is_folderish && (mode === 'link' || mode === 'multiple') && (
              <Button.Group>
                <Button
                  basic
                  icon
                  onClick={(e) => {
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
