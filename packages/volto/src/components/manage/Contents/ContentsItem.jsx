/**
 * Contents item component.
 * @module components/manage/Contents/ContentsItem
 */

import React from 'react';
import { Button, Table, Menu, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { useIntl, defineMessages, FormattedMessage } from 'react-intl';
import { Circle, FormattedDate, Icon, Popup } from '@plone/volto/components';
import { getContentIcon } from '@plone/volto/helpers';
import moreSVG from '@plone/volto/icons/more.svg';
import checkboxUncheckedSVG from '@plone/volto/icons/checkbox-unchecked.svg';
import checkboxCheckedSVG from '@plone/volto/icons/checkbox-checked.svg';
import cutSVG from '@plone/volto/icons/cut.svg';
import deleteSVG from '@plone/volto/icons/delete.svg';
import copySVG from '@plone/volto/icons/copy.svg';
import showSVG from '@plone/volto/icons/show.svg';
import moveUpSVG from '@plone/volto/icons/move-up.svg';
import moveDownSVG from '@plone/volto/icons/move-down.svg';
import editingSVG from '@plone/volto/icons/editing.svg';
import dragSVG from '@plone/volto/icons/drag.svg';
import cx from 'classnames';

import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

const messages = defineMessages({
  private: {
    id: 'private',
    defaultMessage: 'Private',
  },
  pending: {
    id: 'pending',
    defaultMessage: 'Pending',
  },
  published: {
    id: 'published',
    defaultMessage: 'Published',
  },
  intranet: {
    id: 'intranet',
    defaultMessage: 'Intranet',
  },
  draft: {
    id: 'draft',
    defaultMessage: 'Draft',
  },
  no_workflow_state: {
    id: 'no workflow state',
    defaultMessage: 'No workflow state',
  },
  none: {
    id: 'None',
    defaultMessage: 'None',
  },
});

function getColor(string) {
  switch (string) {
    case 'private':
      return '#ed4033';
    case 'published':
      return '#007bc1';
    case 'intranet':
      return '#51aa55';
    case 'draft':
      return '#f6a808';
    default:
      return 'grey';
  }
}

/**
 * Contents item component class.
 * @function ContentsItemComponent
 * @returns {string} Markup of the component.
 */
export const ContentsItemComponent = ({
  item,
  selected,
  onClick,
  indexes,
  onCut,
  onCopy,
  onDelete,
  onMoveToTop,
  onMoveToBottom,
  connectDragPreview,
  connectDragSource,
  connectDropTarget,
  isDragging,
  order,
}) => {
  const intl = useIntl();

  return connectDropTarget(
    connectDragPreview(
      <tr
        key={item['@id']}
        className={cx('', { 'dragging-row': isDragging })}
        aria-label={item['@id']}
      >
        <Table.Cell className={cx('', { 'dragging-cell': isDragging })}>
          {connectDragSource(
            <div style={{ display: 'inline-block' }}>
              <Button icon basic>
                <Icon
                  name={dragSVG}
                  size="20px"
                  color="#878f93"
                  className="content drag handle"
                />
              </Button>
            </div>,
          )}
        </Table.Cell>
        <Table.Cell className={cx('', { 'dragging-cell': isDragging })}>
          {selected ? (
            <Button
              icon
              basic
              aria-label="Unchecked"
              onClick={(e) => onClick(e, item['@id'])}
            >
              <Icon
                name={checkboxCheckedSVG}
                color="#007eb1"
                size="24px"
                className="checked"
              />
            </Button>
          ) : (
            <Button
              icon
              basic
              aria-label="Checked"
              onClick={(e) => onClick(e, item['@id'])}
            >
              <Icon
                name={checkboxUncheckedSVG}
                color="#826a6a"
                size="24px"
                className="unchecked"
              />
            </Button>
          )}
        </Table.Cell>
        <Table.Cell className={cx('', { 'dragging-cell': isDragging })}>
          <Link
            className="icon-align-name"
            to={`${item['@id']}${item.is_folderish ? '/contents' : ''}`}
          >
            <div className="expire-align">
              <Icon
                name={getContentIcon(item['@type'], item.is_folderish)}
                size="20px"
                className="icon-margin"
                color="#878f93"
                title={item['Type'] || item['@type']}
              />{' '}
              <span title={item.title}> {item.title}</span>
            </div>
            {item.ExpirationDate !== 'None' &&
              new Date(item.ExpirationDate).getTime() <
                new Date().getTime() && (
                <Button className="button-margin" size="mini">
                  <FormattedMessage id="Expired" defaultMessage="Expired" />
                </Button>
              )}
            {item.EffectiveDate !== 'None' &&
              new Date(item.EffectiveDate).getTime() > new Date().getTime() && (
                <Button className="button-margin effective-future" size="mini">
                  <FormattedMessage id="Scheduled" defaultMessage="Scheduled" />
                </Button>
              )}
          </Link>
        </Table.Cell>
        {map(indexes, (index) => (
          <Table.Cell
            className={cx('', { 'dragging-cell': isDragging })}
            key={index.id}
          >
            {index.type === 'boolean' &&
              (item[index.id] ? (
                <FormattedMessage id="Yes" defaultMessage="Yes" />
              ) : (
                <FormattedMessage id="No" defaultMessage="No" />
              ))}
            {index.type === 'string' &&
              index.id !== 'review_state' &&
              item[index.id]}
            {index.id === 'review_state' && (
              <div>
                <span>
                  <Circle color={getColor(item[index.id])} size="15px" />
                </span>
                {messages[item[index.id]]
                  ? intl.formatMessage(messages[item[index.id]])
                  : item['review_title'] ||
                    item['review_state'] ||
                    intl.formatMessage(messages.no_workflow_state)}
              </div>
            )}
            {index.type === 'date' && (
              <>
                {item[index?.id] && item[index.id] !== 'None' ? (
                  <FormattedDate date={item[index.id]} />
                ) : (
                  intl.formatMessage(messages.none)
                )}
              </>
            )}
            {index.type === 'array' && (
              <span>{item[index.id]?.join(', ')}</span>
            )}
          </Table.Cell>
        ))}
        <Table.Cell
          className={cx('', { 'dragging-cell': isDragging })}
          textAlign="right"
        >
          <Popup
            menu={true}
            position="bottom right"
            flowing={true}
            basic={true}
            on="click"
            popper={{
              className: 'dropdown-popup',
            }}
            trigger={
              <Icon
                name={moreSVG}
                className="dropdown-popup-trigger"
                size="24px"
                color="#007eb1"
              />
            }
          >
            <Menu vertical borderless fluid>
              <Link className="item icon-align" to={`${item['@id']}/edit`}>
                <Icon name={editingSVG} color="#007eb1" size="24px" />{' '}
                <FormattedMessage id="Edit" defaultMessage="Edit" />
              </Link>
              <Link className="item right-dropdown icon-align" to={item['@id']}>
                <Icon name={showSVG} color="#007eb1" size="24px" />{' '}
                <FormattedMessage id="View" defaultMessage="View" />
              </Link>
              <Divider />
              <Menu.Item
                onClick={onCut}
                value={item['@id']}
                className="right-dropdown icon-align"
              >
                <Icon name={cutSVG} color="#007eb1" size="24px" />{' '}
                <FormattedMessage id="Cut" defaultMessage="Cut" />
              </Menu.Item>
              <Menu.Item
                onClick={onCopy}
                value={item['@id']}
                className="right-dropdown icon-align"
              >
                <Icon name={copySVG} color="#007eb1" size="24px" />{' '}
                <FormattedMessage id="Copy" defaultMessage="Copy" />
              </Menu.Item>
              <Menu.Item
                onClick={onDelete}
                value={item['@id']}
                className="right-dropdown icon-align"
              >
                <Icon name={deleteSVG} color="#e40166" size="24px" />{' '}
                <FormattedMessage id="Delete" defaultMessage="Delete" />
              </Menu.Item>
              <Divider />
              <Menu.Item
                onClick={onMoveToTop}
                value={order}
                className="right-dropdown icon-align"
              >
                <Icon name={moveUpSVG} color="#007eb1" size="24px" />{' '}
                <FormattedMessage
                  id="Move to top of folder"
                  defaultMessage="Move to top of folder"
                />
              </Menu.Item>
              <Menu.Item
                onClick={onMoveToBottom}
                value={order}
                className="right-dropdown icon-align"
              >
                <Icon name={moveDownSVG} color="#007eb1" size="24px" />{' '}
                <FormattedMessage
                  id="Move to bottom of folder"
                  defaultMessage="Move to bottom of folder"
                />
              </Menu.Item>
            </Menu>
          </Popup>
        </Table.Cell>
      </tr>,
    ),
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
ContentsItemComponent.propTypes = {
  item: PropTypes.shape({
    '@id': PropTypes.string,
    title: PropTypes.string,
    is_folderish: PropTypes.bool,
    '@type': PropTypes.string,
  }).isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  indexes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      type: PropTypes.string,
    }),
  ).isRequired,
  onCut: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMoveToTop: PropTypes.func.isRequired,
  onMoveToBottom: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  order: PropTypes.number.isRequired,
  onOrderItem: PropTypes.func.isRequired,
};

const DragDropConnector = (props) => {
  const { DropTarget, DragSource } = props.reactDnd;

  const DndConnectedContentsItem = React.useMemo(
    () =>
      DropTarget(
        'item',
        {
          hover(props, monitor) {
            const id = monitor.getItem().id;
            const dragOrder = monitor.getItem().order;
            const hoverOrder = props.order;

            if (dragOrder === hoverOrder) {
              return;
            }

            props.onOrderItem(id, dragOrder, hoverOrder - dragOrder, false);

            monitor.getItem().order = hoverOrder;
          },
          drop(props, monitor) {
            const id = monitor.getItem().id;
            const dragOrder = monitor.getItem().startOrder;
            const dropOrder = props.order;

            if (dragOrder === dropOrder) {
              return;
            }

            props.onOrderItem(id, dragOrder, dropOrder - dragOrder, true);

            monitor.getItem().order = dropOrder;
          },
        },
        (connect) => ({
          connectDropTarget: connect.dropTarget(),
        }),
      )(
        DragSource(
          'item',
          {
            beginDrag(props) {
              return {
                id: props.item['@id'],
                order: props.order,
                startOrder: props.order,
              };
            },
          },
          (connect, monitor) => ({
            connectDragSource: connect.dragSource(),
            connectDragPreview: connect.dragPreview(),
            isDragging: monitor.isDragging(),
          }),
        )(ContentsItemComponent),
      ),
    [DragSource, DropTarget],
  );

  return <DndConnectedContentsItem {...props} />;
};

export default injectLazyLibs('reactDnd')(DragDropConnector);
