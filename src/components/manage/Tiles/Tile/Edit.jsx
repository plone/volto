/**
 * Edit tile.
 * @module components/manage/Tiles/Tile/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import { defineMessages, injectIntl } from 'react-intl';
import { tiles } from '~/config';
import { Button } from 'semantic-ui-react';
import includes from 'lodash/includes';
import cx from 'classnames';

import Icon from '../../../../components/theme/Icon/Icon';
import dragSVG from '../../../../icons/drag.svg';
import trashSVG from '../../../../icons/delete.svg';

const messages = defineMessages({
  unknownBlock: {
    id: 'Unknown Block',
    defaultMessage: 'Unknown Block {block}',
  },
});

const itemSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
};

const ItemTypes = {
  ITEM: 'tile',
};

const itemTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.onMoveTile(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

/**
 * Edit tile class.
 * @class Edit
 * @extends Component
 */
class Edit extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    type: PropTypes.string.isRequired,
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    selected: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    onMoveTile: PropTypes.func.isRequired,
    onDeleteTile: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { type } = this.props;
    const tileHasOwnFocusManagement =
      tiles.tilesConfig?.[type]?.['tileHasOwnFocusManagement'] || null;
    if (
      !tileHasOwnFocusManagement &&
      this.props.selected &&
      this.tileNode.current
    ) {
      this.tileNode.current.focus();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { type } = this.props;
    const tileHasOwnFocusManagement =
      tiles.tilesConfig?.[type]?.['tileHasOwnFocusManagement'] || null;
    if (
      !tileHasOwnFocusManagement &&
      nextProps.selected &&
      this.tileNode.current
    ) {
      this.tileNode.current.focus();
    }
  }

  tileNode = React.createRef();

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const {
      id,
      type,
      selected,
      connectDragSource,
      connectDropTarget,
      connectDragPreview,
    } = this.props;

    const Tile = tiles.tilesConfig?.[type]?.['edit'] || null;
    const tileHasOwnFocusManagement =
      tiles.tilesConfig?.[type]?.['tileHasOwnFocusManagement'] || null;

    const hideHandler =
      this.props.data['@type'] === 'text' &&
      (!this.props.data.text ||
        (this.props.data.text &&
          this.props.data.text.blocks &&
          this.props.data.text.blocks.length === 1 &&
          this.props.data.text.blocks[0].text === ''));

    return connectDropTarget(
      connectDragPreview(
        <div className={`ui drag tile inner ${type}`}>
          {selected &&
            connectDragSource(
              <div
                className={
                  hideHandler
                    ? 'drag handle wrapper hidden'
                    : 'drag handle wrapper'
                }
              >
                <Icon className="drag handle" name={dragSVG} size="18px" />
              </div>,
            )}
          {Tile !== null ? (
            <div
              role="presentation"
              onClick={() => this.props.onSelectTile(this.props.tile)}
              onKeyDown={
                !tileHasOwnFocusManagement
                  ? e =>
                      this.props.handleKeyDown(
                        e,
                        this.props.index,
                        this.props.tile,
                        this.tileNode.current,
                      )
                  : null
              }
              className={cx(`tile ${type}`, { selected: this.props.selected })}
              style={{ outline: 'none' }}
              ref={this.tileNode}
              // The tabIndex is required for the keyboard navigation
              /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
              tabIndex={!tileHasOwnFocusManagement ? -1 : null}
            >
              <Tile {...this.props} tileNode={this.tileNode} />
            </div>
          ) : (
            <div
              role="presentation"
              onKeyDown={e =>
                this.props.handleKeyDown(
                  e,
                  this.props.index,
                  this.props.tile,
                  this.tileNode.current,
                )
              }
              className={cx(`tile ${type}`, { selected: this.props.selected })}
              style={{ outline: 'none' }}
              ref={this.tileNode}
              // The tabIndex is required for the keyboard navigation
              tabIndex={-1}
            >
              {this.props.intl.formatMessage(messages.unknownBlock, {
                block: type,
              })}
            </div>
          )}
          {selected && !includes(tiles.requiredTiles, type) && (
            <Button
              icon
              basic
              onClick={() => this.props.onDeleteTile(id)}
              className="delete-button"
              aria-label="delete"
            >
              <Icon name={trashSVG} size="18px" />
            </Button>
          )}
        </div>,
      ),
    );
  }
}

export default compose(
  injectIntl,
  DropTarget(ItemTypes.ITEM, itemTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  })),
  DragSource(ItemTypes.ITEM, itemSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
  })),
)(Edit);
