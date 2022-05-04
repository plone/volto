import React from 'react';
import { connect } from 'react-redux';
import { Button, Segment, Popup } from 'semantic-ui-react';
import { useIntl, defineMessages } from 'react-intl';
import cx from 'classnames';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import { getContentIcon } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

import rightArrowSVG from '@plone/volto/icons/right-key.svg';
import leftArrowSVG from '@plone/volto/icons/left-key.svg';
import homeSVG from '@plone/volto/icons/home.svg';

const messages = defineMessages({
  browse: {
    id: 'Browse',
    defaultMessage: 'Browse',
  },
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  select: {
    id: 'Select',
    defaultMessage: 'Select',
  },
});
// TODO: getBlocks in Block configuration
// TODO: Merge/Use 'volto-slate/utils' getAllBlocks
const getBlocks = (data) => {
  if (!data?.blocks_layout?.items?.length) return [];
  return data.blocks_layout.items.map((block, index) => {
    const type = data.blocks[block]['@type'];
    return {
      type: type || `unknown_${index}`,
      title:
        data.blocks[block].id ||
        config.blocks.blocksConfig[type]?.title ||
        type ||
        `unknown_${index}`,
      id: data.blocks[block].id || block,
      ...(config.blocks.blocksConfig[type]?.getBlocks?.({
        ...data.blocks[block],
        parentId: block,
      }) || {}),
    };
  });
};

const addHighlight = (id) => {
  const element = document.getElementById(id);
  if (element && !element.classList.contains('block-highlight')) {
    element.classList.add('block-highlight');
  }
};

const removeHighlight = (id) => {
  const element = document.getElementById(id);
  if (element && element.classList.contains('block-highlight')) {
    element.classList.remove('block-highlight');
  }
};

const BlocksBrowserNav = (props) => {
  const {
    selected,
    handleClickOnItem,
    handleDoubleClickOnItem,
    content,
  } = props;
  const blocksData = getBlocks(content);
  const [selectedBlocks, setSelectedBlocks] = React.useState(null);
  const [parent, setParent] = React.useState(null);
  const intl = useIntl();
  const isSelected = (item) => {
    let ret = false;
    if (selected) {
      selected
        .filter((item) => item != null)
        .forEach((_item) => {
          if (_item['id'] === item['id']) {
            ret = true;
          }
        });
    }
    return ret;
  };

  const blocks = selectedBlocks || blocksData;

  return (
    <Segment as="ul" className="object-listing">
      {selectedBlocks ? (
        <Button.Group>
          <Button
            basic
            icon
            onClick={(e) => {
              e.stopPropagation();
              setSelectedBlocks(null);
              removeHighlight(parent);
              setParent(null);
            }}
            aria-label={intl.formatMessage(messages.back)}
          >
            <Icon name={leftArrowSVG} size="24px" />
          </Button>
        </Button.Group>
      ) : (
        ''
      )}
      {blocks &&
        blocks.map((item) => (
          <li
            role="presentation"
            aria-label={`${intl.formatMessage(messages.select)} ${item.id}`}
            key={item.id}
            className={cx('', {
              'selected-item': isSelected(item),
            })}
            onClick={() => handleClickOnItem(item)}
            onDoubleClick={() => handleDoubleClickOnItem(item)}
            onMouseOver={() => {
              addHighlight(item.id);
            }}
            onMouseOut={() => {
              removeHighlight(item.id);
            }}
            onFocus={() => {}}
            onBlur={() => {}}
          >
            <span title={item['title']}>
              <Popup
                key={item['id']}
                content={
                  <>
                    <Icon name={homeSVG} size="18px" /> {item['title']}
                  </>
                }
                trigger={
                  <span>
                    <Icon
                      name={getContentIcon(item['title'], false)}
                      size="24px"
                    />
                  </span>
                }
              />

              {item['title']}
            </span>
            {item.blocks?.length ? (
              <Button.Group>
                <Button
                  basic
                  icon
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedBlocks(item.blocks);
                    if (!parent) {
                      setParent(item.id);
                    }
                  }}
                  aria-label={`${intl.formatMessage(messages.browse)} ${
                    item.id
                  }`}
                >
                  <Icon name={rightArrowSVG} size="24px" />
                </Button>
              </Button.Group>
            ) : (
              ''
            )}
          </li>
        ))}
    </Segment>
  );
};

export default connect((state) => ({
  content: state.content.data,
}))(BlocksBrowserNav);
