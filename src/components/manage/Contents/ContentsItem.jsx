/**
 * Contents item component.
 * @module components/manage/Contents/ContentsItem
 */

import React from 'react';
import { Icon, Table, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import moment from 'moment';
import { DragSource, DropTarget } from 'react-dnd';
import { FormattedMessage } from 'react-intl';

import { getIcon } from '@plone/volto/helpers';

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
}) =>
  connectDropTarget(
    connectDragPreview(
      <tr key={item['@id']} style={{ opacity: isDragging ? 0 : 1 }}>
        <Table.Cell>
          {connectDragSource(
            <i aria-hidden="true" className="grey content icon drag handle" />,
          )}
        </Table.Cell>
        <Table.Cell>
          <Icon
            name={selected ? 'check square' : 'square outline'}
            color={selected ? 'blue' : 'black'}
            value={item['@id']}
            onClick={onClick}
          />
        </Table.Cell>
        <Table.Cell>
          <Link to={`${item['@id']}${item.is_folderish ? '/contents' : ''}`}>
            <Icon name={getIcon(item['@type'], item.is_folderish)} />{' '}
            {item.title}
          </Link>
        </Table.Cell>
        {map(indexes, index => (
          <Table.Cell key={index.id}>
            {index.type === 'boolean' && (item[index.id] ? 'Yes' : 'No')}
            {index.type === 'string' && item[index.id]}
            {index.type === 'date' && (
              <span
                title={
                  item[index.id] !== 'None'
                    ? moment(item[index.id]).format('LLLL')
                    : 'None'
                }
              >
                {item[index.id] !== 'None'
                  ? moment(item[index.id]).fromNow()
                  : 'None'}
              </span>
            )}
          </Table.Cell>
        ))}
        <Table.Cell textAlign="right">
          <Dropdown icon="ellipsis horizontal">
            <Dropdown.Menu className="left">
              <Link className="item" to={`${item['@id']}/edit`}>
                <Icon name="write" />{' '}
                <FormattedMessage id="Edit" defaultMessage="Edit" />
              </Link>
              <Link className="item" to={item['@id']}>
                <Icon name="eye" />{' '}
                <FormattedMessage id="View" defaultMessage="View" />
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item onClick={onCut} value={item['@id']}>
                <Icon name="cut" />{' '}
                <FormattedMessage id="Cut" defaultMessage="Cut" />
              </Dropdown.Item>
              <Dropdown.Item onClick={onCopy} value={item['@id']}>
                <Icon name="copy" />{' '}
                <FormattedMessage id="Copy" defaultMessage="Copy" />
              </Dropdown.Item>
              <Dropdown.Item onClick={onDelete} value={item['@id']}>
                <Icon name="trash" />{' '}
                <FormattedMessage id="Delete" defaultMessage="Delete" />
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={onMoveToTop} value={order}>
                <Icon name="arrow up" />{' '}
                <FormattedMessage
                  id="Move to top of folder"
                  defaultMessage="Move to top of folder"
                />
              </Dropdown.Item>
              <Dropdown.Item onClick={onMoveToBottom} value={order}>
                <Icon name="arrow down" />{' '}
                <FormattedMessage
                  id="Move to bottom of folder"
                  defaultMessage="Move to bottom of folder"
                />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
      </tr>,
    ),
  );

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

export default DropTarget(
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
  connect => ({
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
);
