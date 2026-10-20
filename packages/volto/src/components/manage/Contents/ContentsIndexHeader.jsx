import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
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

export const ContentsIndexHeaderComponent = ({
  id,
  width,
  label,
  dndKitSortable,
  dndKitUtilities,
}) => {
  const intl = useIntl();

  const { useSortable } = dndKitSortable;
  const { CSS } = dndKitUtilities;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `index:${id}`,
    data: {
      type: 'index',
      indexId: id,
    },
  });

  return (
    <th
      ref={setNodeRef}
      className={`${widthValues[width - 2]} wide`}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
      {...attributes}
      {...listeners}
    >
      {intl.formatMessage({
        id: label,
        defaultMessage: label,
      })}
    </th>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
ContentsIndexHeaderComponent.propTypes = {
  id: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

export default injectLazyLibs(['dndKitSortable', 'dndKitUtilities'])(
  ContentsIndexHeaderComponent,
);
