/**
 * Edit block.
 * @module components/manage/Blocks/Block/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import { defineMessages, injectIntl } from 'react-intl';
import { blocks } from '~/config';
import { Button } from 'semantic-ui-react';
import includes from 'lodash/includes';
import cx from 'classnames';
import { setSidebarTab } from '@plone/volto/actions';

import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import dragSVG from '@plone/volto/icons/drag.svg';
import trashSVG from '@plone/volto/icons/delete.svg';

const messages = defineMessages({
  unknownBlock: {
    id: 'Unknown Block',
    defaultMessage: 'Unknown Block {block}',
  },
  delete: {
    id: 'delete',
    defaultMessage: 'delete',
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
  ITEM: 'block',
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
    props.onMoveBlock(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

/**
 * Edit block class.
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
    // properties is mapped to formData, so it's not connected to changes of the object
    properties: PropTypes.objectOf(PropTypes.any).isRequired,
    selected: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    onMoveBlock: PropTypes.func.isRequired,
    onDeleteBlock: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { type } = this.props;
    const blockHasOwnFocusManagement =
      blocks.blocksConfig?.[type]?.['blockHasOwnFocusManagement'] || null;
    if (
      !blockHasOwnFocusManagement &&
      this.props.selected &&
      this.blockNode.current
    ) {
      this.blockNode.current.focus();
    }
    if (this.props.selected) {
      this.props.setSidebarTab(blocks.blocksConfig?.[type]?.sidebarBar || 0);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { selected, type } = this.props;
    const blockHasOwnFocusManagement =
      blocks.blocksConfig?.[type]?.['blockHasOwnFocusManagement'] || null;
    if (
      !blockHasOwnFocusManagement &&
      nextProps.selected &&
      selected !== nextProps.selected &&
      this.blockNode.current
    ) {
      this.blockNode.current.focus();
    }
    if (
      (!this.props.selected && nextProps.selected) ||
      type !== nextProps.type
    ) {
      this.props.setSidebarTab(
        blocks.blocksConfig?.[nextProps.type]?.sidebarTab || 0,
      );
    }
  }

  blockNode = React.createRef();

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

    const Block = blocks.blocksConfig?.[type]?.['edit'] || null;
    const blockHasOwnFocusManagement =
      blocks.blocksConfig?.[type]?.['blockHasOwnFocusManagement'] || null;

    const hideHandler =
      this.props.data['@type'] === 'text' &&
      (!this.props.data.text ||
        (this.props.data.text &&
          this.props.data.text.blocks &&
          this.props.data.text.blocks.length === 1 &&
          this.props.data.text.blocks[0].text === ''));

    return connectDropTarget(
      connectDragPreview(
        <div className={`ui drag block inner ${type}`}>
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
          {Block !== null ? (
            <div
              role="presentation"
              onClick={() => this.props.onSelectBlock(this.props.id)}
              onKeyDown={
                !blockHasOwnFocusManagement
                  ? (e) =>
                      this.props.handleKeyDown(
                        e,
                        this.props.index,
                        this.props.id,
                        this.blockNode.current,
                      )
                  : null
              }
              className={cx(`block ${type}`, { selected: this.props.selected })}
              style={{ outline: 'none' }}
              ref={this.blockNode}
              // The tabIndex is required for the keyboard navigation
              /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
              tabIndex={!blockHasOwnFocusManagement ? -1 : null}
            >
              <Block {...this.props} blockNode={this.blockNode} />
            </div>
          ) : (
            <div
              role="presentation"
              onKeyDown={(e) =>
                this.props.handleKeyDown(
                  e,
                  this.props.index,
                  this.props.id,
                  this.blockNode.current,
                )
              }
              className={cx(`block ${type}`, { selected: this.props.selected })}
              style={{ outline: 'none' }}
              ref={this.blockNode}
              // The tabIndex is required for the keyboard navigation
              tabIndex={-1}
            >
              {this.props.intl.formatMessage(messages.unknownBlock, {
                block: type,
              })}
            </div>
          )}
          {selected && !includes(blocks.requiredBlocks, type) && (
            <Button
              icon
              basic
              onClick={() => this.props.onDeleteBlock(id)}
              className="delete-button"
              aria-label={this.props.intl.formatMessage(messages.delete)}
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
  withObjectBrowser,
  DropTarget(ItemTypes.ITEM, itemTarget, (connect) => ({
    connectDropTarget: connect.dropTarget(),
  })),
  DragSource(ItemTypes.ITEM, itemSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
  })),
  connect(null, { setSidebarTab }),
)(Edit);
