import React from 'react';
import PropTypes from 'prop-types';
import { BlockDataForm } from '@plone/volto/components';
import { TableSchema } from './schema';
import { useIntl } from 'react-intl';

const TableSidebar = (props) => {
  const { data, block, onChangeBlock, selectedCell } = props;
  const intl = useIntl();
  const table = data.table;
  const cell = table.rows[selectedCell.row].cells[selectedCell.cell];
  const formData = {
    cellType: cell.type === 'header',
    ...table,
  };
  const schema = TableSchema({ formData, intl });

  return (
    <BlockDataForm
      schema={schema}
      title={schema.title}
      onChangeField={(id, value) => {
        if (id !== 'cellType') {
          table[id] = value;
        } else {
          cell.type = value === true ? 'header' : 'data';
        }
        onChangeBlock(block, {
          ...data,
          table,
        });
      }}
      formData={formData}
      block={block}
    />
  );
};

TableSidebar.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default TableSidebar;
