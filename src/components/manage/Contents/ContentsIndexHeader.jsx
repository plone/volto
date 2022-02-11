/**
 * Contents index header component.
 * @module components/manage/Contents/ContentsIndexHeader
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

const widthValues = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fiveteen',
  'sixteen',
];

/**
 * Contents index header component class.
 * @function ContentsIndexHeaderComponent
 * @returns {string} Markup of the component.
 */
export const ContentsIndexHeaderComponent = ({
  intl,
  width,
  label,
  connectDragSource,
  connectDropTarget,
  isDragging,
}) =>
  connectDropTarget(
    connectDragSource(
      <th
        className={`${widthValues[width - 2]} wide`}
        style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}
      >
        {intl.formatMessage({
          id: label,
          defaultMessage: label,
        })}
      </th>,
    ),
  );

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
ContentsIndexHeaderComponent.propTypes = {
  width: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  order: PropTypes.number.isRequired,
  onOrderIndex: PropTypes.func.isRequired,
};

const DragDropConnector = (props) => {
  const { DropTarget, DragSource } = props.reactDnd;

  const DndConnectedContentsIndexHeader = React.useMemo(
    () =>
      DropTarget(
        'index',
        {
          hover(props, monitor) {
            const dragOrder = monitor.getItem().order;
            const hoverOrder = props.order;

            if (dragOrder === hoverOrder) {
              return;
            }

            props.onOrderIndex(dragOrder, hoverOrder - dragOrder);

            monitor.getItem().order = hoverOrder;
          },
        },
        (connect) => ({
          connectDropTarget: connect.dropTarget(),
        }),
      )(
        DragSource(
          'index',
          {
            beginDrag(props) {
              return {
                id: props.label,
                order: props.order,
              };
            },
          },
          (connect, monitor) => ({
            connectDragSource: connect.dragSource(),
            isDragging: monitor.isDragging(),
          }),
        )(injectIntl(ContentsIndexHeaderComponent)),
      ),
    [DragSource, DropTarget],
  );

  return <DndConnectedContentsIndexHeader {...props} />;
};

export default injectLazyLibs('reactDnd')(DragDropConnector);
