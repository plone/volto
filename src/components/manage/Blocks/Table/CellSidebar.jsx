import React from 'react';
import PropTypes from 'prop-types';
import { BlockDataForm } from '@plone/volto/components';
import { CellSchema } from './schema';
import { useIntl } from 'react-intl';

const CellSidebar = (props) => {
  const { data, block, onChangeBlock, selectedCell } = props;
  const intl = useIntl();
  const table = data.table;
  const cell = table.rows[selectedCell.row].cells[selectedCell.cell];
  const formData = {
    type: cell.type === 'header',
  };
  const schema = CellSchema({ formData, intl });

  return (
    <BlockDataForm
      schema={schema}
      title={schema.title}
      onChangeField={(_, value) => {
        cell.type = value === true ? 'header' : 'data';
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

CellSidebar.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default CellSidebar;
